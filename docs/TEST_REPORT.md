# Relatório de testes — 20/11/2026

Atualização de **21/11/2026**: o carrossel com 14 itens tem relatório próprio em [TEST_REPORT_CARROSSEL.md](TEST_REPORT_CARROSSEL.md). Os resultados e tamanhos de bundle abaixo registram a entrega anterior.

A preparação local do GitHub/Netlify, sem publicação, e os testes de configuração estão em [MIGRACAO_GITHUB_NETLIFY.md](MIGRACAO_GITHUB_NETLIFY.md).

## Resultado da entrega

Refinamento implementado e validado localmente. **Nenhuma publicação foi realizada.** React 18 e Vite 6 preservados, logo completa oficial em uso e cinco fotos reais mantidas, sem modificação dos originais.

## Ambiente e comandos executados

- Windows, Node.js 24.15.0, npm 11.12.1, TypeScript 5.9.3 e Vite 6.3.5.
- Instalação online tentou executar, mas falhou com `ENOTFOUND registry.npmjs.org`. Instalação concluída com `npm install --offline --no-fund --no-audit`, usando cache local. Versões fixadas e lockfile gerado; Rollup 4.62.4 fixado por override. Lucide 0.474.0 permanece como biblioteca de ícones; Playwright 1.58.2 adicionado apenas para desenvolvimento.
- `npm run typecheck`: **aprovado** após as correções finais.
- `npm run build`: **aprovado**. Build final: JavaScript 191,89 kB (59,88 kB gzip), CSS 27,77 kB (6,42 kB gzip), HTML 1,65 kB (0,75 kB gzip).
- `npm run dev -- --host 127.0.0.1`: servidor de desenvolvimento iniciado e testado.
- `npm run preview -- --host 127.0.0.1`: build de produção servido em `http://127.0.0.1:4173/`.
- `npm run test:e2e`: **aprovado** no desenvolvimento e no build de produção. Chromium 149.0.7827.55 instalado no computador, em modo headless, com `PLAYWRIGHT_EXECUTABLE_PATH` apontando para o executável local.
- `npm run test:audit`: **aprovado** na produção local.
- `npm run preview -- --host 127.0.0.1 --port 4174 --base /anjos/` e `node tests/subpath.mjs`: **aprovados** para o mesmo build em subdiretório.

## Navegador, responsividade e inspeção visual

Todas as seções foram percorridas nas larguras **320, 360, 375, 390, 430, 768, 1024, 1280, 1440 e 1920 px**. Sem overflow horizontal, imagens quebradas ou sobreposição entre as colunas do hero. Capturas completas em 390, 768 e 1440 px; capturas da abertura nos demais tamanhos; tablet em paisagem em 1024×768.

Capturas revisadas para hierarquia tipográfica, proporções, enquadramentos, logo, contraste e espaçamento. Título ajustado para duas linhas no celular estreito; texto em duas colunas somente onde há espaço. Texto ampliado a **200%** verificado em 320, 390, 768 e 1440 px, sem overflow. Não equivale a teste de zoom pela interface do navegador nem a aparelhos físicos.

## Nove grupos da suíte funcional

1. **Conteúdo e destinos:** um H1, `pt-BR`, cinco fotos, logo completa, âncoras existentes, links externos protegidos, contatos oficiais, consulta exata do endereço no Maps e ausência de canonical inventado.
2. **Dez larguras:** varredura de todas as seções, ausência de overflow, imagens carregadas, layout das colunas do hero e alternância de navegação móvel/desktop.
3. **Menu móvel:** abrir, fechar com Escape, foco devolvido, clique externo, fechamento ao navegar, foco na seção e fechamento ao redimensionar para desktop.
4. **Planejador:** seleção pela categoria, rejeição de vazio, zero, negativos, frações e valores acima de 100.000; limites dos controles, singular/plural, resumo, foco e preenchimento da coleta. Reaplicar o mesmo resumo após edição manual também passou.
5. **Coleta:** campos obrigatórios, foco no primeiro erro, máscara de telefone, consentimento e mensagem com todos os campos. A abertura real de uma nova janela foi testada com o destino `wa.me` interceptado pelo Playwright; conteúdo e número conferidos e `window.opener` nulo. **Nenhuma mensagem foi enviada, nenhuma coleta foi agendada.**
6. **PIX:** cópia real via Clipboard API no Chromium, leitura do valor exato e anúncio de sucesso. Negação da permissão simulada para verificar seleção manual, foco e feedback. **Nenhum pagamento realizado ou simulado.**
7. **Galeria:** diálogo nativo, cinco imagens, navegação circular por setas e botões, manutenção e ciclo de foco, bloqueio do scroll, Escape, fechamento pelo controle e retorno ao disparador.
8. **FAQ e teclado:** abrir/fechar pergunta com Enter; skip-link como primeiro destino de Tab e transferência ao conteúdo.
9. **Movimento e reflow:** `prefers-reduced-motion` desativa transições e rolagem suave; tablet paisagem e fonte a 200% sem overflow.

**Console final: zero erros de JavaScript ou avisos React.** Nenhuma falha de requisição externa foi registrada na rodada final. O aviso inicial de `fetchPriority` incompatível com React 18 foi resolvido usando preload de imagem no HTML.

## Contraste e desempenho

Script local conferiu **170 textos visíveis sobre fundos sólidos**, com limiares de 4,5:1 para texto comum e 3:1 para texto grande. Nenhuma falha; menor razão medida de **4,75:1**. As legendas da galeria usam fundo verde sólido. A medição não audita todos os critérios WCAG, ícones, contornos, estados possíveis ou uso com leitor de tela.

Na navegação local sem limitação de rede, a Performance API registrou **LCP de 600 ms** e **CLS de 0,00053**. São medições locais de uma execução, com fontes/cache do ambiente; não representam desempenho garantido em celulares, rede móvel ou hospedagem pública. Não foi executado Lighthouse. Hero pré-carregado, demais fotos com lazy loading, dimensões e proporções reservadas; fontes com swap e fallback.

## Evidências

- `docs/qa/results.json`: nove grupos aprovados no build de produção, dez larguras, console e falhas de rede.
- `docs/qa/results-dev.json`: rodada aprovada no desenvolvimento.
- `docs/qa/audit.json`: contrastes medidos, reflow a 200% e métricas locais.
- `docs/qa/subpath.json`: carregamento bem-sucedido em `/anjos/`.
- `docs/qa/layout-*.png`: capturas nas dez larguras.
- `docs/qa/tablet-paisagem.png`: tablet 1024×768.

## Arquivos alterados ou adicionados

- `src/App.tsx`: refinamento das seções, logo, foco, navegação, planejador, formulário, PIX, diálogo e conteúdo oficial.
- `src/styles/index.css`: sistema visual reorganizado, tipografia, cores, layouts, estados, reflow e movimento reduzido.
- `src/data/site.ts`: hero e depoimento centralizados; unidades da categoria Infantil corrigidas.
- `index.html`: preload da fotografia principal e Fraunces com itálico real.
- `package.json`, `package-lock.json`, `.gitignore`: versões reproduzíveis, scripts de teste, Playwright de desenvolvimento e exclusão de arquivo de cache TypeScript.
- `tests/e2e.mjs`, `tests/audit.mjs`, `tests/subpath.mjs`: regressão executável.
- `README.md`, `docs/REDESIGN_PLAN.md`, `docs/DESIGN_SYSTEM.md`, `docs/IDENTIDADE_E_CONTEUDO.md`, `docs/VALIDACAO_E_PUBLICACAO.md`, este relatório e `docs/qa/`.

`AGENTS.md`, `PROMPT_PARA_CODEX.md`, imagens originais e versões WebP fornecidas foram preservados.

## Limites e pendências

Não foram testados aparelhos físicos, Safari/iOS, Firefox, leitor de tela, zoom pela interface do navegador ou hospedagem pública. Não houve auditoria jurídica ou certificação WCAG. Links externos tiveram destinos conferidos; recebimento real por WhatsApp, e-mail, Instagram e banco depende dos responsáveis. Lighthouse e verificações após implantação continuam pendentes. As fontes usam Google Fonts e exigem conectividade; há fallback para fontes de sistema.

Antes da publicação: validar permissões das fotos, especialmente de menores; indicadores e período de apuração; autenticidade e autorização do depoimento; endereço e horário; titular e identificação exibidos pelo banco para a chave PIX; política de privacidade apropriada. Domínio oficial ainda não fornecido; canonical, OG URL absoluto e sitemap permanecem pendentes. Não há erro funcional conhecido nos fluxos e no ambiente verificados.

## Como testar localmente

1. `npm ci` em uma máquina com rede (ou `npm install` no ambiente preparado).
2. `npm run dev` e abrir o endereço exibido.
3. `npm run typecheck` e `npm run build` para repetir a compilação.
4. `npx playwright install chromium`; com o servidor aberto, `npm run test:e2e` e `npm run test:audit`.
5. Para testar a produção: `npm run preview` em outro terminal e definir `$env:TEST_URL = 'http://127.0.0.1:4173/'` antes dos testes. `PLAYWRIGHT_EXECUTABLE_PATH` é opcional para reutilizar Chromium existente.
