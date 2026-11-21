import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';

const output = new URL('../docs/qa/carrossel-fixture/', import.meta.url);
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, ...(process.env.PLAYWRIGHT_EXECUTABLE_PATH ? { executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH } : {}) });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, locale: 'pt-BR' });
const report = { checks: [], errors: [], widths: [] };
page.on('pageerror', error => report.errors.push(error.message));
page.on('console', message => { if (message.type() === 'error') report.errors.push(message.text()); });
const carousel = page.locator('#depoimentos');
const active = () => carousel.locator('.testimonial-slide[aria-hidden="false"]');
const next = () => carousel.getByRole('button', { name: 'Próximo depoimento', exact: true });
const previous = () => carousel.getByRole('button', { name: 'Depoimento anterior', exact: true });
const choose = async name => {
  const option = carousel.locator('select option').filter({ hasText: name });
  await carousel.getByRole('combobox', { name: 'Escolher depoimento', exact: true }).selectOption(await option.getAttribute('value'));
};
const isActive = async name => { await page.clock.runFor(400); assert.match(await active().innerText(), new RegExp(name)); };
const waitForRotation = async value => {
  for (let attempt = 0; attempt < 40; attempt++) {
    await page.clock.runFor(50);
    // IntersectionObserver depende também dos frames reais do navegador/CDN.
    await page.waitForTimeout(50);
    if (await carousel.locator('.testimonial-stage').getAttribute('aria-live') === value) return;
  }
  assert.equal(await carousel.locator('.testimonial-stage').getAttribute('aria-live'), value);
};
const check = async (name, fn) => { await fn(); report.checks.push(name); console.log('OK:', name); };
try {
  await page.clock.install();
  await page.goto(process.env.TEST_CAROUSEL_URL || 'http://127.0.0.1:5173/tests/fixtures/testimonials.html', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => { document.querySelector('#depoimentos').scrollIntoView({ block: 'center', behavior: 'instant' }); });
  await check('14 textos, origem identificada e seleção compacta', async () => {
    assert.equal(await carousel.locator('.testimonial-slide').count(), 14);
    assert.equal(await active().count(), 1);
    assert.equal(await carousel.locator('select option').count(), 14);
    assert.equal(await carousel.locator('.testimonial-dot').count(), 0);
    await isActive('Roberto Costa');
    await carousel.getByRole('combobox', { name: 'Escolher depoimento', exact: true }).focus();
    await page.keyboard.press('ArrowDown');
    await isActive('Juan Lima');
    for (const name of ['Juan Lima', 'Anne Beatriz', 'Andressa', 'Mariana Alves', 'Pedro Henrique', 'Camila Santos', 'Lucas Oliveira', 'Juliana Costa', 'Rafael Souza', 'Beatriz Rocha', 'Gabriel Lima', 'Fernanda Melo', 'Thiago Ribeiro']) {
      await choose(name);
      await isActive(name);
      assert.match(await active().innerText(), /Exemplo ilustrativo/);
      assert.match(await active().innerText(), /Personagem de demonstração/);
    }
    await next().click(); await isActive('Roberto Costa');
    assert.match(await active().innerText(), /Depoimento/);
    assert.doesNotMatch(await active().innerText(), /autorização pendente/);
    await previous().click(); await isActive('Thiago Ribeiro');
  });
  await check('Teclado, foco estável e transição sem mudança de altura', async () => {
    await next().focus();
    await page.keyboard.press('Home'); await isActive('Roberto Costa');
    const height = (await carousel.boundingBox()).height;
    for (let i = 0; i < 14; i++) {
      await page.keyboard.press('ArrowRight');
      assert.equal((await carousel.boundingBox()).height, height);
      assert.equal(await next().evaluate(el => el === document.activeElement), true);
    }
    await page.keyboard.press('End'); await isActive('Thiago Ribeiro');
    await page.keyboard.press('ArrowLeft'); await isActive('Fernanda Melo');
  });
  await check('Rotação automática, pausa, hover e foco', async () => {
    await page.keyboard.press('Home');
    await carousel.getByRole('button', { name: 'Iniciar troca automática', exact: true }).click();
    await page.mouse.move(0, 0);
    await page.evaluate(() => document.querySelector('#depoimentos').scrollIntoView({ block: 'center', behavior: 'instant' }));
    await page.clock.runFor(400);
    await waitForRotation('off');
    await page.clock.runFor(9200);
    await isActive('Juan Lima');
    await carousel.locator('.testimonial-stage').hover();
    await page.clock.runFor(18000);
    await isActive('Juan Lima');
    await page.mouse.move(0, 0);
    await waitForRotation('off');
    await page.clock.runFor(9200);
    await isActive('Anne Beatriz');
    await carousel.getByRole('button', { name: 'Pausar troca automática', exact: true }).click();
    await page.mouse.move(0, 0);
    await page.clock.runFor(18000);
    await isActive('Anne Beatriz');
    await carousel.getByRole('button', { name: 'Iniciar troca automática', exact: true }).click();
    await next().focus();
    await page.mouse.move(0, 0);
    await page.clock.runFor(18000);
    await isActive('Anne Beatriz');
    assert.equal(await carousel.getByRole('button', { name: 'Iniciar troca automática', exact: true }).isVisible(), true);
  });
  await check('Pausa fora da tela e com página oculta', async () => {
    await carousel.getByRole('button', { name: 'Iniciar troca automática', exact: true }).click();
    await page.mouse.move(0, 0);
    await page.evaluate(() => document.querySelector('#depoimentos').scrollIntoView({ block: 'center', behavior: 'instant' }));
    await waitForRotation('off');
    await page.evaluate(() => { document.querySelector('#inicio').scrollIntoView({ behavior: 'instant' }); });
    await waitForRotation('polite');
    await page.clock.runFor(18000);
    await isActive('Anne Beatriz');
    await page.evaluate(() => { Object.defineProperty(document, 'hidden', { configurable: true, value: true }); document.dispatchEvent(new Event('visibilitychange')); document.querySelector('#depoimentos').scrollIntoView({ block: 'center', behavior: 'instant' }); });
    await waitForRotation('polite');
    await page.clock.runFor(18000);
    await isActive('Anne Beatriz');
    await page.evaluate(() => { Object.defineProperty(document, 'hidden', { configurable: true, value: false }); document.dispatchEvent(new Event('visibilitychange')); });
    await next().click();
  });
  await check('Deslize horizontal e preservação do gesto vertical', async () => {
    await page.setViewportSize({ width: 390, height: 844 });
    await choose('Roberto Costa');
    const stage = carousel.locator('.testimonial-stage');
    await stage.dispatchEvent('pointerdown', { pointerType: 'touch', clientX: 250, clientY: 200 });
    await stage.dispatchEvent('pointerup', { pointerType: 'touch', clientX: 100, clientY: 205 });
    await isActive('Juan Lima');
    await stage.dispatchEvent('pointerdown', { pointerType: 'touch', clientX: 100, clientY: 200 });
    await stage.dispatchEvent('pointerup', { pointerType: 'touch', clientX: 250, clientY: 205 });
    await isActive('Roberto Costa');
    await stage.dispatchEvent('pointerdown', { pointerType: 'touch', clientX: 250, clientY: 200 });
    await stage.dispatchEvent('pointerup', { pointerType: 'touch', clientX: 150, clientY: 400 });
    await isActive('Roberto Costa');
    assert.equal(await stage.evaluate(el => getComputedStyle(el).touchAction), 'pan-y');
  });
  await check('Dez larguras e texto a 200%, sem overflow', async () => {
    await choose('Anne Beatriz');
    for (const width of [320, 360, 375, 390, 430, 768, 1024, 1280, 1440, 1920]) {
      await page.setViewportSize({ width, height: 1000 });
      await carousel.scrollIntoViewIfNeeded();
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      report.widths.push(width);
      if ([320, 390, 768, 1440].includes(width)) await carousel.screenshot({ path: new URL('depoimentos-' + width + '.png', output).pathname.replace(/^\/(?=[A-Za-z]:)/, ''), animations: 'disabled', style: '.site-header, .skip-link, .floating-whatsapp { visibility: hidden !important; }' });
    }
    await page.addStyleTag({ content: 'html { font-size: 200%; }' });
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    }
  });
  await check('Movimento reduzido sem rotação nem animação', async () => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await carousel.scrollIntoViewIfNeeded();
    const name = await active().innerText();
    await page.clock.runFor(18000);
    assert.equal(await active().innerText(), name);
    assert.equal(await carousel.locator('.testimonial-play').count(), 0);
    assert.equal(await active().evaluate(el => getComputedStyle(el).transitionDuration), '0s');
    await next().click();
    assert.notEqual(await active().innerText(), name);
  });
  assert.deepEqual(report.errors, []);
  report.passed = true;
} catch (error) {
  report.passed = false;
  report.failure = error.stack;
  process.exitCode = 1;
  console.error(error);
  console.error(await carousel.evaluate(el => ({ rect: el.getBoundingClientRect().toJSON(), stage: el.querySelector('.testimonial-stage').getAttribute('aria-live'), playback: el.querySelector('.testimonial-play')?.getAttribute('aria-label'), focused: document.activeElement?.className, hidden: document.hidden, height: innerHeight })));
} finally {
  await writeFile(new URL('results.json', output), JSON.stringify(report, null, 2));
  await browser.close();
}
