import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { chromium } from 'playwright';
const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const browser = await chromium.launch({ headless: true, ...(process.env.PLAYWRIGHT_EXECUTABLE_PATH ? { executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH } : {}) });
try {
  const page = await browser.newPage();
  await page.route('**/*', route => route.fulfill({ contentType: 'text/html', body: route.request().url().startsWith('https://juanlimadev-rgb.github.io/') ? html : '<p>Destino oficial interceptado pelo teste.</p>' }));
  for (const [hash, expected] of [['', ''], ['#hero', '#inicio'], ['#home', '#inicio'], ['#impacto', '#calculadora'], ['#contato', '#contato']]) {
    await page.goto('https://juanlimadev-rgb.github.io/anjos-solidarios/' + hash);
    await page.waitForURL('https://anjossolidarios.netlify.app/' + expected);
    assert.equal(page.url(), 'https://anjossolidarios.netlify.app/' + expected);
  }
  console.log('OK: endereço legado e cinco variações de âncora encaminham ao Netlify');
} finally { await browser.close(); }
