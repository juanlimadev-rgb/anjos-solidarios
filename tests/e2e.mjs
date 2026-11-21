import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium, firefox, webkit } from 'playwright';

// Não envia mensagens nem pagamentos. Todos os dados pessoais são fictícios.
const url = process.env.TEST_URL || 'http://127.0.0.1:5173/';
const output = new URL('../docs/qa/', import.meta.url);
await mkdir(output, { recursive: true });
const engine = { chromium, firefox, webkit }[process.env.TEST_BROWSER || 'chromium'];
const browser = await engine.launch({
  headless: true,
  ...(process.env.PLAYWRIGHT_EXECUTABLE_PATH ? { executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH } : {}),
});
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, locale: 'pt-BR' });
const page = await context.newPage();
const report = { url, browser: browser.version(), checks: [], widths: [], errors: [], externalFailures: [] };
page.on('pageerror', error => report.errors.push(error.message));
page.on('console', msg => { if (msg.type() === 'error') report.errors.push(msg.text()); });
page.on('requestfailed', request => {
  if (!request.url().startsWith(url)) report.externalFailures.push(request.url());
});
async function check(name, fn) {
  await fn();
  report.checks.push(name);
  console.log('OK:', name);
}
try {
  const response = await page.goto(url, { waitUntil: 'networkidle' });
  assert.equal(response.status(), 200);
  await page.evaluate(() => document.fonts.ready);
  await check('Semântica, conteúdo e destinos locais', async () => {
    assert.equal(await page.locator('h1').count(), 1);
    assert.equal(await page.locator('html').getAttribute('lang'), 'pt-BR');
    assert.equal(await page.locator('.gallery-item').count(), 5);
    assert.ok((await page.locator('.brand img').first().getAttribute('src')).endsWith('images/logo/anjos-solidarios.webp'));
    const missing = await page.locator('a[href^="#"]').evaluateAll(nodes => nodes.map(a => a.hash).filter(hash => !document.getElementById(decodeURIComponent(hash.slice(1)))));
    assert.deepEqual(missing, []);
    assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), 'https://anjossolidarios.netlify.app/');
    for (const link of await page.locator('a[target="_blank"]').all()) assert.match(await link.getAttribute('rel'), /noopener/);
    const map = new URL(await page.getByRole('link', { name: 'Ver rotas no Maps' }).getAttribute('href'));
    assert.equal(map.searchParams.get('query'), 'Travessa Pedro Amado, 09, Divinea, São Cristóvão - SE, Brasil');
    for (const href of await page.locator('a[href^="mailto:"]').evaluateAll(nodes => nodes.map(a => a.href))) assert.equal(href, 'mailto:anjossolidarios.1010@gmail.com');
    assert.ok(await page.locator('a[href="https://www.instagram.com/anjos_solidarios10/"]').count());
    for (const href of await page.locator('a[href*="wa.me"]').evaluateAll(nodes => nodes.map(a => a.href))) assert.equal(new URL(href).pathname, '/5579998078987');
  });
  await check('Dez larguras: seções completas, imagens e ausência de overflow', async () => {
    for (const width of [320, 360, 375, 390, 430, 768, 1024, 1280, 1440, 1920]) {
      await page.setViewportSize({ width, height: width <= 430 ? 844 : 1000 });
      for (const section of await page.locator('main > section').all()) {
        await section.scrollIntoViewIfNeeded();
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
        assert.equal(overflow, false, 'Overflow em ' + width + 'px');
      }
      await page.locator('#inicio').scrollIntoViewIfNeeded();
      await page.evaluate(() => { document.activeElement?.blur(); scrollTo({ top: 0, behavior: 'instant' }); });
      await page.waitForFunction(() => scrollY === 0);
      const hero = await page.locator('.hero-copy').boundingBox();
      const photo = await page.locator('.hero-visual').boundingBox();
      if (width >= 768) assert.ok(hero.x + hero.width <= photo.x + 1, 'Hero sobreposto');
      assert.equal(await page.locator('.desktop-nav').isVisible(), width > 1100);
      const broken = await page.locator('img').evaluateAll(nodes => nodes.filter(i => !i.complete || !i.naturalWidth).map(i => i.src));
      assert.deepEqual(broken, []);
      const file = 'layout-' + width + '.png';
      await page.screenshot({ path: new URL(file, output).pathname.replace(/^\/(?=[A-Za-z]:)/, ''), fullPage: [390, 768, 1440].includes(width), animations: 'disabled' });
      report.widths.push({ width, overflow: false, images: 'loaded', screenshot: file });
    }
  });
  await check('Menu móvel: Escape, clique externo, navegação, foco e resize', async () => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.getByRole('button', { name: 'Abrir menu', exact: true }).click();
    assert.equal(await page.locator('#mobile-nav').isVisible(), true);
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('#mobile-nav').isVisible(), false);
    assert.equal(await page.locator('.mobile-toggle').evaluate(el => el === document.activeElement), true);
    await page.getByRole('button', { name: 'Abrir menu', exact: true }).click();
    await page.locator('#mobile-nav').getByRole('link', { name: 'O que doar', exact: true }).click();
    assert.equal(await page.locator('#mobile-nav').isVisible(), false);
    assert.equal(await page.evaluate(() => document.activeElement.id), 'o-que-doar');
    await page.getByRole('button', { name: 'Abrir menu', exact: true }).click();
    await page.mouse.click(8, 780);
    assert.equal(await page.locator('#mobile-nav').isVisible(), false);
    await page.getByRole('button', { name: 'Abrir menu', exact: true }).click();
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.setViewportSize({ width: 390, height: 844 });
    assert.equal(await page.locator('#mobile-nav').isVisible(), false);
  });
  await check('Planejador: categoria, inteiros, limites, resumo e preenchimento', async () => {
    await page.locator('.donation-card').filter({ hasText: 'Infantil' }).click();
    assert.equal(await page.locator('#tipo-doacao').inputValue(), 'infantil');
    const qty = page.locator('#quantidade-doacao');
    for (const value of ['', '0', '-1', '1.5', '100001']) {
      await qty.fill(value);
      assert.equal(await page.getByRole('button', { name: 'Prosseguir para coleta' }).isDisabled(), true);
      assert.equal(await page.locator('#quantity-error').isVisible(), true);
    }
    await qty.fill('100000');
    assert.equal(await page.getByRole('button', { name: 'Aumentar quantidade' }).isDisabled(), true);
    await qty.fill('1');
    assert.equal(await page.getByRole('button', { name: 'Diminuir quantidade' }).isDisabled(), true);
    assert.match(await page.locator('.calculator-result').innerText(), /1 item infantil/);
    await page.getByRole('button', { name: 'Aumentar quantidade' }).click();
    assert.match(await page.locator('.calculator-result').innerText(), /2 itens infantis/);
    await page.getByRole('button', { name: 'Prosseguir para coleta' }).click();
    await page.waitForFunction(() => document.querySelector('#pickup-items').value === '2 itens infantis');
    assert.equal(await page.locator('#pickup-items').inputValue(), '2 itens infantis');
    assert.equal(await page.evaluate(() => document.activeElement.id), 'pickup-items');
    await page.locator('#pickup-items').fill('Edição manual de teste');
    await page.getByRole('button', { name: 'Prosseguir para coleta' }).click();
    await page.waitForFunction(() => document.querySelector('#pickup-items').value === '2 itens infantis');
    assert.equal(await page.locator('#pickup-items').inputValue(), '2 itens infantis');
  });
  await check('Coleta: obrigatórios, máscara, consentimento e WhatsApp sem envio', async () => {
    const submit = page.getByRole('button', { name: 'Continuar para o WhatsApp' });
    await submit.click();
    assert.equal(await page.evaluate(() => document.activeElement.id), 'pickup-name');
    assert.ok(await page.locator('[aria-invalid="true"]').count() >= 5);
    await page.locator('#pickup-name').fill('Pessoa de teste');
    await page.locator('#pickup-phone').fill('79999999999');
    assert.equal(await page.locator('#pickup-phone').inputValue(), '(79) 99999-9999');
    await page.locator('#pickup-address').fill('Rua de teste, 10, Bairro');
    await page.locator('#pickup-city').fill('São Cristóvão');
    await submit.click();
    assert.equal(await page.evaluate(() => document.activeElement.id), 'pickup-consent');
    await page.locator('#pickup-consent').check();
    await context.route('https://wa.me/**', route => route.fulfill({ contentType: 'text/html', body: '<p>Destino interceptado pelo teste. Nenhuma mensagem foi enviada.</p>' }));
    const popupPromise = page.waitForEvent('popup');
    await submit.click();
    const popup = await popupPromise;
    await popup.waitForLoadState();
    const target = new URL(popup.url());
    assert.equal(target.hostname, 'wa.me');
    assert.equal(target.pathname, '/5579998078987');
    assert.equal(await popup.evaluate(() => window.opener), null);
    for (const text of ['Pessoa de teste', '(79) 99999-9999', 'Rua de teste, 10, Bairro', 'São Cristóvão', '2 itens infantis', 'verificar a disponibilidade']) assert.ok(target.searchParams.get('text').includes(text));
    assert.match(await page.locator('.form-message').innerText(), /Envie a mensagem/);
    assert.doesNotMatch(await page.locator('.form-message').innerText(), /agendada|enviada|confirmada/);
    await popup.close();
  });
  await check('PIX: cópia exata, feedback e fallback com seleção manual', async () => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: new URL(url).origin });
    await page.bringToFront();
    await page.getByRole('button', { name: 'Copiar chave PIX', exact: true }).click();
    assert.equal(await page.evaluate(() => navigator.clipboard.readText()), 'anjossolidarios.1010@gmail.com');
    assert.equal(await page.getByRole('button', { name: 'Chave copiada!' }).isVisible(), true);
    await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async () => { throw new Error('Negado para teste'); } } }));
    await page.getByRole('button', { name: 'Chave copiada!' }).click();
    assert.match(await page.locator('.pix-card [role="status"]').innerText(), /selecionada/);
    assert.equal(await page.locator('#pix-key').evaluate(el => el.selectionEnd - el.selectionStart), 'anjossolidarios.1010@gmail.com'.length);
  });
  await check('Galeria: modal, cinco fotos, setas, foco, Escape e botões', async () => {
    const first = page.locator('.gallery-item').first();
    await first.click();
    assert.equal(await page.locator('dialog').evaluate(el => el.open), true);
    assert.equal(await page.getByRole('button', { name: 'Fechar galeria' }).evaluate(el => el === document.activeElement), true);
    await page.getByRole('button', { name: 'Próxima imagem' }).focus();
    for (let i = 0; i < 5; i++) await page.keyboard.press('ArrowRight');
    assert.match(await page.locator('figcaption').innerText(), /1 de 5/);
    assert.equal(await page.getByRole('button', { name: 'Próxima imagem' }).evaluate(el => el === document.activeElement), true);
    await page.keyboard.press('ArrowLeft');
    assert.match(await page.locator('figcaption').innerText(), /5 de 5/);
    for (let i = 0; i < 8; i++) { await page.keyboard.press('Tab'); assert.equal(await page.evaluate(() => !!document.activeElement.closest('dialog')), true); }
    assert.equal(await page.evaluate(() => document.body.style.overflow), 'hidden');
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('dialog').evaluate(el => el.open), false);
    assert.equal(await first.evaluate(el => el === document.activeElement), true);
    await first.click();
    await page.getByRole('button', { name: 'Imagem anterior' }).click();
    assert.match(await page.locator('figcaption').innerText(), /5 de 5/);
    await page.getByRole('button', { name: 'Fechar galeria' }).click();
    assert.equal(await first.evaluate(el => el === document.activeElement), true);
  });
  await check('FAQ e navegação inicial por teclado', async () => {
    const question = page.getByText('Posso fazer uma contribuição via PIX?', { exact: true });
    await question.focus();
    await page.keyboard.press('Enter');
    assert.equal(await question.evaluate(el => el.closest('details').open), true);
    await page.keyboard.press('Enter');
    assert.equal(await question.evaluate(el => el.closest('details').open), false);
    await page.locator('.footer-privacy summary').focus();
    await page.keyboard.press('Enter');
    assert.equal(await page.locator('.footer-privacy').evaluate(el => el.open), true);
    assert.match(await page.locator('.footer-privacy').innerText(), /Google Fonts/);
    await page.keyboard.press('Enter');
    assert.equal(await page.locator('.footer-privacy').evaluate(el => el.open), false);
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(() => document.activeElement.className), 'skip-link');
    await page.keyboard.press('Enter');
    assert.equal(await page.evaluate(() => document.activeElement.id), 'main-content');
  });
  await check('Movimento reduzido, texto ampliado e tablet em paisagem', async () => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    assert.equal(await page.locator('html').evaluate(el => getComputedStyle(el).scrollBehavior), 'auto');
    assert.equal(await page.locator('.btn').first().evaluate(el => getComputedStyle(el).transitionDuration), '0s');
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.screenshot({ path: new URL('tablet-paisagem.png', output).pathname.replace(/^\/(?=[A-Za-z]:)/, ''), animations: 'disabled' });
    await page.addStyleTag({ content: 'html { font-size: 200%; }' });
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, 'Texto ampliado em ' + width);
    }
  });
  assert.deepEqual(report.errors, [], 'Erros no console ou aplicação');
  report.passed = true;
} catch (error) {
  report.passed = false;
  report.failure = error.stack;
  await page.screenshot({ path: new URL('failure.png', output).pathname.replace(/^\/(?=[A-Za-z]:)/, ''), fullPage: true });
  process.exitCode = 1;
  console.error(error);
} finally {
  await writeFile(new URL('results.json', output), JSON.stringify(report, null, 2));
  await browser.close();
}
