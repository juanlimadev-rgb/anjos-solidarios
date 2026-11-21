import { chromium } from 'playwright';
import { writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const browser = await chromium.launch({ headless: true, ...(process.env.PLAYWRIGHT_EXECUTABLE_PATH ? { executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH } : {}) });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.addInitScript(() => {
  window.qaMetrics = { cls: 0, lcp: 0 };
  new PerformanceObserver(list => { for (const e of list.getEntries()) if (!e.hadRecentInput) window.qaMetrics.cls += e.value; }).observe({ type: 'layout-shift', buffered: true });
  new PerformanceObserver(list => { for (const e of list.getEntries()) window.qaMetrics.lcp = e.startTime; }).observe({ type: 'largest-contentful-paint', buffered: true });
});
await page.goto(process.env.TEST_URL || 'http://127.0.0.1:5173/', { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
const output = { metrics: await page.evaluate(() => window.qaMetrics), contrast: [], zoomOverflow: {} };
output.contrast = await page.evaluate(() => {
  const rgb = color => color.match(/[\d.]+/g)?.map(Number) || [];
  const luminance = color => rgb(color).slice(0, 3).map(c => { c /= 255; return c <= .04045 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4; }).reduce((sum, c, i) => sum + c * [.2126, .7152, .0722][i], 0);
  return [...document.querySelectorAll('body *')].filter(el => {
    return [...el.childNodes].some(n => n.nodeType === Node.TEXT_NODE && n.textContent.trim()) && el.checkVisibility() && !el.closest('[aria-hidden="true"], .sr-only, :disabled');
  }).map(el => {
    const s = getComputedStyle(el);
    let node = el, background;
    while (node) {
      const b = getComputedStyle(node).backgroundColor;
      if (rgb(b).length === 3 || rgb(b)[3] === 1) { background = b; break; }
      node = node.parentElement;
    }
    if (!background || getComputedStyle(el).opacity !== '1') return null;
    const a = luminance(s.color), b = luminance(background);
    const ratio = (Math.max(a, b) + .05) / (Math.min(a, b) + .05);
    const large = parseFloat(s.fontSize) >= 24 || parseFloat(s.fontSize) >= 18.66 && Number(s.fontWeight) >= 700;
    return { text: el.textContent.trim().slice(0, 70), color: s.color, background, ratio: +ratio.toFixed(2), minimum: large ? 3 : 4.5, passed: ratio >= (large ? 3 : 4.5) };
  }).filter(Boolean);
});
await page.addStyleTag({ content: 'html { font-size: 200%; }' });
for (const width of [320, 390, 768, 1440]) {
  await page.setViewportSize({ width, height: 1000 });
  output.zoomOverflow[width] = await page.locator('body *').evaluateAll(nodes => nodes.filter(el => el.checkVisibility() && el.getBoundingClientRect().right > innerWidth + 1).map(el => ({ element: el.tagName, class: el.className, right: el.getBoundingClientRect().right, text: el.textContent.slice(0, 55) })));
}
await writeFile(process.env.AUDIT_OUTPUT || new URL('../docs/qa/audit.json', import.meta.url), JSON.stringify(output, null, 2));
console.log(JSON.stringify({ metrics: output.metrics, contrastFailures: output.contrast.filter(c => !c.passed), zoomOverflow: output.zoomOverflow }, null, 2));
await browser.close();
assert.deepEqual(output.contrast.filter(c => !c.passed), [], 'Falhas de contraste nos textos medidos');
for (const overflow of Object.values(output.zoomOverflow)) assert.deepEqual(overflow, [], 'Overflow com texto ampliado');
