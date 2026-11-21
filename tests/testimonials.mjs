import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';

const url = process.env.TEST_URL || 'http://127.0.0.1:5173/';
const output = new URL('../docs/qa/depoimentos-publicos/', import.meta.url);
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, ...(process.env.PLAYWRIGHT_EXECUTABLE_PATH ? { executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH } : {}) });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, locale: 'pt-BR' });
const report = { url, checks: [], widths: [], errors: [] };
page.on('pageerror', error => report.errors.push(error.message));
page.on('console', message => { if (message.type() === 'error') report.errors.push(message.text()); });
const check = async (name, fn) => { await fn(); report.checks.push(name); console.log('OK:', name); };
try {
  await page.goto(url, { waitUntil: 'networkidle' });
  const section = page.locator('#depoimentos');
  await section.scrollIntoViewIfNeeded();
  const slides = section.locator('.testimonial-slide');
  const count = await slides.count();
  await check('Relato confirmado e mensagens institucionais identificados separadamente', async () => {
    assert.ok(count >= 1);
    if (process.env.EXPECTED_TESTIMONIALS) assert.equal(count, Number(process.env.EXPECTED_TESTIMONIALS));
    assert.match(await section.textContent(), /Roberto Costa/);
    assert.doesNotMatch(await section.textContent(), /Personagem de demonstração|Exemplo ilustrativo|autorização pendente/);
    assert.equal(await slides.first().locator('.testimonial-kind').textContent(), 'Depoimento');
    for (const slide of (await slides.all()).slice(1)) assert.equal(await slide.locator('.testimonial-kind').textContent(), 'Mensagem da instituição');
    assert.doesNotMatch(await section.textContent(), /Juan Lima|Anne Beatriz|Andressa|Mariana Alves/);
    assert.equal(await section.locator('.testimonial-slide[aria-hidden="false"]').count(), 1);
    if (count === 1) assert.equal(await section.locator('.testimonial-controls').count(), 0);
  });
  await check('Leitura e navegação dos relatos publicados', async () => {
    if (count > 1) {
      await section.getByRole('button', { name: 'Próximo depoimento', exact: true }).click();
      await page.waitForFunction(() => document.querySelector('.testimonial-slide[aria-hidden="false"]').getAttribute('aria-label').startsWith('2 '));
      await section.getByRole('button', { name: 'Depoimento anterior', exact: true }).click();
      await page.waitForFunction(() => document.querySelector('.testimonial-slide[aria-hidden="false"]').getAttribute('aria-label').startsWith('1 '));
    }
    assert.match(await section.locator('.testimonial-slide[aria-hidden="false"]').innerText(), /Doador/);
    assert.equal(await section.getByRole('link', { name: 'Compartilhe sua experiência', exact: true }).getAttribute('href'), '#contato');
  });
  await check('Dez larguras e texto ampliado, sem overflow', async () => {
    for (const width of [320, 360, 375, 390, 430, 768, 1024, 1280, 1440, 1920]) {
      await page.setViewportSize({ width, height: 1000 });
      await section.scrollIntoViewIfNeeded();
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      report.widths.push(width);
      if ([390, 1440].includes(width)) await section.screenshot({ path: new URL('depoimentos-' + width + '.png', output).pathname.replace(/^\/(?=[A-Za-z]:)/, ''), animations: 'disabled', style: '.site-header, .skip-link, .floating-whatsapp { visibility: hidden !important; }' });
    }
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.addStyleTag({ content: 'html { font-size: 200%; }' });
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    }
  });
  assert.deepEqual(report.errors, []);
  report.passed = true;
  report.count = count;
} catch (error) {
  report.passed = false;
  report.failure = error.stack;
  console.error(error);
  process.exitCode = 1;
} finally {
  await writeFile(new URL('results.json', output), JSON.stringify(report, null, 2));
  await browser.close();
}
