# Carrossel de depoimentos — 21/11/2026

## Alteração

Substituída a citação única por um carrossel editorial com 14 itens: o relato fornecido de Roberto Costa, ainda pendente de autorização, e 13 exemplos fictícios solicitados pelo responsável. Juan Lima, Anne Beatriz e Andressa foram os primeiros nomes sugeridos; outros dez personagens ilustrativos completam a prévia. Todos os exemplos estão identificados na interface como **“Exemplo ilustrativo”** e **“Personagem de demonstração”**, com um aviso na introdução. Não representam confirmação de doação, autoria real ou autorização de pessoas com esses nomes.

## Comportamento e acabamento

- Troca automática a cada nove segundos somente enquanto a seção está visível, a página está ativa e o mouse está fora da seção.
- Pausa ao receber foco ou navegar manualmente; botão para retomar ou pausar explicitamente.
- Anterior/próximo em ciclo; setas do teclado, Home/End e gesto horizontal. O gesto vertical preserva a rolagem.
- Seletor nativo compacto com os 14 nomes, acessível por teclado, em lugar de uma sequência longa de indicadores.
- Preferência por movimento reduzido desativa a rotação e as animações, mantendo navegação manual.
- Todos os textos ocupam a mesma célula de grid; o maior define a altura. A troca não faz o conteúdo abaixo saltar.
- Cartão off-white, fundo sálvia, filete rosa antigo, tipografia editorial e iniciais, sem fotos fictícias ou selos de verificação.
- Controles móveis afastados da área ocupada pelo botão flutuante do WhatsApp.
- Nenhuma nova dependência de produção e nenhuma publicação.

## Arquivos

- `src/components/Testimonials.tsx`: novo componente, controles, acessibilidade, gesto e temporizador.
- `src/App.tsx`: integração do componente no lugar da citação estática.
- `src/data/site.ts`: tipos, origem do conteúdo e 14 itens centralizados.
- `src/styles/index.css`: apresentação e layouts do carrossel.
- `tests/testimonials.mjs` e `package.json`: suíte e script `test:testimonials`.
- `tests/audit.mjs`: destino de saída opcional `AUDIT_OUTPUT`, preservando evidências anteriores.
- `README.md`, documentos de identidade, design, validação e testes; capturas e resultados em `docs/qa/carrossel/`.

Logo, cinco fotografias reais e demais informações institucionais preservadas.

## Testes executados

- `npm run typecheck`: aprovado.
- `npm run build`: aprovado. JavaScript final 200,54 kB (62,39 kB gzip); CSS 30,25 kB (6,89 kB gzip).
- `npm run test:testimonials`: sete grupos aprovados em desenvolvimento e no build de produção local, usando Chromium 149.0.7827.55 com Playwright.
- Todos os 14 itens selecionados e conferidos, incluindo os rótulos dos 13 exemplos; navegação circular, foco estável e altura constante durante um ciclo completo pelo teclado.
- Reprodução, pausa, retomada, hover, foco, saída da tela e página oculta verificados com relógio virtual. As esperas da suíte avançam esse relógio para permitir atualização do observador e dos efeitos React.
- Gestos horizontais e verticais simulados por eventos de ponteiro; não equivalem a teste em aparelho físico.
- Dez larguras: 320, 360, 375, 390, 430, 768, 1024, 1280, 1440 e 1920 px, sem overflow horizontal.
- Texto ampliado a 200% em 320, 390, 768 e 1440 px, sem overflow; preferência por movimento reduzido verificada.
- `npm run test:audit` no build de produção: nenhum erro de contraste nos textos medidos sobre fundos sólidos; sem overflow com texto ampliado.
- Console da suíte: nenhum erro de aplicação ou aviso React.

Os resultados estão em `docs/qa/carrossel/results.json`, `results-dev.json` e `audit.json`. Capturas em 320, 390, 768 e 1440 px foram revisadas; os elementos fixos de navegação e WhatsApp foram ocultados apenas durante a captura isolada da seção para não encobrir sua composição.

## Pendências e reprodução

Os exemplos devem ser substituídos por relatos verdadeiros autorizados para serem apresentados como depoimentos reais. A autorização do relato fornecido de Roberto Costa permanece pendente. Permanecem os limites institucionais e de publicação do relatório anterior, incluindo verificação em aparelhos físicos e com leitor de tela. Nenhum problema funcional conhecido nos cenários verificados.

Para visualizar: `npm run dev` e abrir `http://127.0.0.1:5173/#depoimentos`. Com o servidor aberto, executar `npm run test:testimonials`; usar `npx playwright install chromium` se necessário, ou definir `PLAYWRIGHT_EXECUTABLE_PATH` para reutilizar um Chromium instalado. Para testar o build, usar `npm run preview` e `$env:TEST_URL = 'http://127.0.0.1:4173/'` antes da suíte.
