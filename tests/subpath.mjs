import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';
const url = process.env.TEST_SUBPATH_URL || 'http://127.0.0.1:4174/anjos/';
const browser = await chromium.launch({ headless: true, ...(process.env.PLAYWRIGHT_EXECUTABLE_PATH ? { executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH } : {}) });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
const errors = [];
page.on('pageerror', e => errors.push(e.message));
try {
  assert.equal((await page.goto(url, { waitUntil: 'networkidle' })).status(), 200);
  assert.equal(await page.locator('h1').isVisible(), true);
  for (const section of await page.locator('main > section').all()) await section.scrollIntoViewIfNeeded();
  assert.deepEqual(await page.locator('img').evaluateAll(images => images.filter(i => !i.complete || !i.naturalWidth).map(i => i.src)), []);
  for (const src of await page.locator('img').evaluateAll(images => images.map(i => i.src))) assert.ok(src.startsWith(url));
  await page.getByRole('button', { name: 'Ampliar imagem: Acolhimento à comunidade', exact: true }).click();
  assert.equal(await page.locator('dialog').evaluate(el => el.open), true);
  assert.ok((await page.locator('dialog img').evaluate(img => img.src)).startsWith(url));
  await page.keyboard.press('Escape');
  assert.deepEqual(errors, []);
  await writeFile(new URL('../docs/qa/subpath.json', import.meta.url), JSON.stringify({ url, passed: true, errors }, null, 2));
  console.log('OK: build em /anjos/, imagens locais, CSS, JavaScript e lightbox');
} finally { await browser.close(); }
