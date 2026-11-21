# Anjos Solidários Pró-Esperança

**Site institucional responsivo** com identidade verde e rosa antigo, fotos reais das ações, galeria, planejador de doações, contato e solicitação de coleta via WhatsApp.

Em 21/11/2026, o responsável confirmou as autorizações das imagens e os dados institucionais para publicação. Os indicadores são fornecidos pela instituição; o carrossel público reúne o relato autorizado de Roberto Costa (“Doador”) e 13 mensagens editoriais da instituição, sem atribuí-las a pessoas fictícias. A privacidade e o fluxo do formulário são explicados no rodapé. O endereço oficial é `https://anjossolidarios.netlify.app/`.

Refinamento implementado em **20/11/2026**: composição editorial, logo completa oficial, tipografia responsiva, contraste de texto revisado, formulário acessível, planejador com validação de inteiros e galeria com diálogo nativo. Nenhuma publicação foi realizada.

Em **21/11/2026**, a seção recebeu um carrossel com 14 itens, posteriormente revisado para separar depoimento real de mensagens da instituição. Troca automática a cada nove segundos, pausa, seleção compacta, teclado, deslize e movimento reduzido. Dados públicos em `testimonials`, no arquivo `src/data/site.ts`; componente em `src/components/Testimonials.tsx`. Os antigos exemplos pessoais ficam em `testimonialDrafts`, sem importação pela aplicação pública. Execute `npm run test:testimonials` para a seção publicada; `npm run test:carousel` verifica os controles com uma fixture interna em um servidor `npm run dev`.

> **Importante:** a pasta foi criada a partir das informações fornecidas pelo solicitante, sem receber o código do site anterior. Ela contém uma base React/TypeScript/Vite pronta para ser aberta no Codex e refinada. Não é uma versão migrada nem auditada do projeto antigo.

## Conteúdo do ZIP

```text
Anjos-Solidarios-Pro-Esperanca/
├── AGENTS.md                      ← Codex deve ler primeiro
├── PROMPT_PARA_CODEX.md          ← prompt detalhado para o Codex
├── README.md
├── package.json
├── index.html
├── vite.config.ts
├── tsconfig.json
├── src/
│   ├── App.tsx                   ← componentes e funcionalidades
│   ├── main.tsx
│   ├── data/site.ts              ← contatos, dados, fotos e links
│   └── styles/index.css          ← tema e responsividade
├── public/images/
│   ├── galeria/                  ← 5 fotos otimizadas em WebP
│   └── logo/                     ← logo webp completa e símbolo para espaços pequenos
├── material-original/           ← TODOS os originais PNG da logo e da galeria
└── docs/
    ├── IDENTIDADE_E_CONTEUDO.md
    ├── DESIGN_SYSTEM.md
    └── VALIDACAO_E_PUBLICACAO.md
```

## Executar no computador

Instale **Node.js 20.19+ ou 22.12+** (Node 22 recomendado). No Windows, extraia o ZIP, abra a pasta no VS Code e o terminal integrado:

```powershell
npm install
npm run dev
```

Abra o endereço exibido pelo terminal, normalmente `http://localhost:5173/`.

Para conferir os tipos e gerar uma versão de produção:

```powershell
npm run typecheck
npm run build
npm run preview
```

A pasta `dist/` será criada após um build bem-sucedido.

## Netlify e repositório existente

O site atual é `https://anjossolidarios.netlify.app/`, ligado ao repositório `juanlimadev-rgb/anjos-solidarios`, com produção na branch `main`. O arquivo `netlify.toml` preparado para a versão nova define `npm run build`, publicação de `dist` e Node 24. Ele deve ser enviado junto com o código React/Vite, sem mudar previamente a configuração do site HTML antigo.

O vínculo e a branch de produção `main` foram confirmados pelas capturas do painel. A referência `archive/site-antigo-2026-11-21` preserva a versão anterior. O código HTML antigo está arquivado em `legacy-site/` no repositório; não integra o conteúdo de `dist`. Inventário, sequência de prévia e validações estão em `docs/MIGRACAO_GITHUB_NETLIFY.md`. Capturas de QA e originais PNG são preservados no ambiente local, sem serem enviados por padrão ao repositório.

As versões estão fixadas em `package.json` e `package-lock.json`. Para uma instalação reproduzível, use `npm ci`. Nesta revisão, a rede apresentou falha de DNS; a instalação foi concluída com o cache local usando versões compatíveis de React 18 e Vite 6. O override de Rollup mantém a versão usada e verificada no build. Não há novas dependências de produção; Playwright é usado apenas no desenvolvimento.

## Testes reproduzíveis

Com `npm run dev` aberto em outro terminal:

```powershell
npx playwright install chromium
npm run test:e2e
npm run test:audit
```

Para testar o pacote de produção, execute `npm run build` e `npm run preview` em outro terminal; então:

```powershell
$env:TEST_URL = 'http://127.0.0.1:4173/'
npm run test:e2e
npm run test:audit
```

Opcionalmente, `PLAYWRIGHT_EXECUTABLE_PATH` pode apontar para um Chromium já instalado. A suíte percorre as dez larguras solicitadas e verifica navegação, formulários, quantidades, clipboard, FAQ e foco da galeria. A janela de WhatsApp é interceptada: nenhuma mensagem é enviada. Os dados do formulário usados pelos testes são fictícios.

Evidências em `docs/qa/`; escopo, resultados e limitações em `docs/TEST_REPORT.md`. A medição de contraste cobre textos sobre fundos sólidos, sem equivaler a uma auditoria WCAG completa. Métricas locais não substituem Lighthouse em produção.

## Como usar no Codex

1. Extraia o ZIP.
2. Abra **a pasta raiz** `Anjos-Solidarios-Pro-Esperanca` no editor/Codex.
3. Envie: **"Leia primeiro o AGENTS.md e depois execute integralmente o PROMPT_PARA_CODEX.md, realizando a auditoria, os ajustes visuais e os testes."**
4. Se preferir, abra `PROMPT_PARA_CODEX.md` e cole o conteúdo inteiro no Codex.
5. Peça para ele iniciar `npm install`, `npm run dev`, abrir no navegador e testar em celular/tablet/desktop.
6. Confirme os pontos de publicação descritos em `docs/VALIDACAO_E_PUBLICACAO.md`.

## Funcionalidades já previstas na base

- Navegação sticky com indicação da seção, menu móvel, Escape, fechamento ao navegar e foco no destino.
- Hero com fotografia real e chamadas de doação.
- Apresentação, categorias e formulário de intenção de doação.
- Planejador de 1 a 100.000 itens inteiros, com seleção pela categoria, resumo e preenchimento da coleta, **sem inventar métricas de impacto**.
- Solicitação de coleta: campos + validação + mensagem no WhatsApp.
- Cópia da chave PIX com anúncio e seleção manual caso o clipboard seja negado.
- Endereço e rota por busca no Google Maps.
- Indicadores institucionais fornecidos pelo responsável, identificados para validação.
- Galeria com as 5 fotos, diálogo nativo, fundo inerte, ciclo de foco, setas, Escape e retorno ao botão de origem.
- Carrossel de depoimentos e exemplos identificados, FAQ, contatos e rodapé.
- Estilo responsivo com foco, contraste e suporte a movimento reduzido.

## Editar sem procurar textos no HTML

- Nome, telefones, email/PIX, redes sociais, endereço, descrição, números e galeria: `src/data/site.ts`.
- Design, cores, espaçamentos e quebras de tela: `src/styles/index.css`.
- Seções e interações: `src/App.tsx`.
- Imagens: `public/images/galeria` e `public/images/logo`.

Leia `docs/IDENTIDADE_E_CONTEUDO.md` para detalhes.

## Limites do projeto

Esta base **não tem backend nem banco de dados**, não processa PIX e não agenda coletas diretamente. A coleta depende de o visitante enviar a mensagem pelo WhatsApp e da resposta da instituição. A calculadora é um planejador de quantidades, não faz alegações de impacto numérico. Não há garantias de conformidade jurídica/segurança sem revisão final. Os testes de build e visual devem ser realizados no ambiente com as dependências instaladas.

## Atenção antes de publicar

A galeria inclui fotografias com crianças e outras pessoas. Obtenha e registre autorizações de uso; confirme os dados de transparência, a autenticidade/consentimento do depoimento, o recebimento de doações na chave PIX, endereço e horário. Consulte `docs/VALIDACAO_E_PUBLICACAO.md`.
