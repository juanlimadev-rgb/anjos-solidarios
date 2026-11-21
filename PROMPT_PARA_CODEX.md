# PROMPT PRONTO PARA COLAR NO CODEX

Atue como diretor de arte sênior especializado em identidade visual humanitária, UI/UX designer, engenheiro frontend sênior, especialista em acessibilidade, performance, arquitetura React e QA.

**Leia PRIMEIRO e INTEGRALMENTE o `AGENTS.md` na raiz.** Depois leia `README.md`, os documentos de `docs/`, os dados em `src/data/site.ts`, os componentes e o CSS. Não comece editando antes de entender a base e as imagens fornecidas.

## Objetivo

Transforme a base do site **Anjos Solidários Pró-Esperança** em uma experiência institucional nível agência digital premium, extremamente bonita, intuitiva, acolhedora, responsiva e genuinamente funcional. **A pasta já inclui um site inicial implementado com React + TypeScript + Vite, a nova logo e cinco fotografias reais**. Sua missão é aperfeiçoar o que existe de modo substancial, não apenas trocar tons e arredondar cards. Não substitua a marca nem as imagens originais arbitrariamente. Se o código do site anterior for adicionado mais tarde, faça uma auditoria e incorpore integrações úteis sem destruir o resultado atual.

## Identidade

Use como identidade oficial `material-original/Logo Anjos Solidários.png`, respeitando os dois anjos, corações e ramos florais. Versões WebP estão em `public/images/logo/`. Paleta: verde profundo `#254D39`, verde principal `#397454`, verde sálvia `#8DAF89`, rosa antigo `#D9B6B9`, fundo off-white `#FCF9F5`. Estética: minimalismo editorial humanitário, fotografia documental, composições assimétricas harmônicas, tipografia elegante, boa hierarquia, microinterações sofisticadas e delicadeza botânica. Evite excesso de efeitos, neon, dashboards, estética genérica, animações que causem enjoo e imagens de banco quando existem fotos reais.

## Auditoria

Faça inventário do código, dependências, componentes, CSS repetido, layout e responsividade. Identifique problemas de contraste, semântica, links, acessibilidade, imagens, performance, estados vazios, formulários e animações. Documente em `docs/REDESIGN_PLAN.md` as descobertas e escolhas. **Continue imediatamente com a implementação; não pare no plano.**

## Seções obrigatórias

1. **Header** sticky elegante: logo, Quem Somos, O Que Doar, Como Doar, Transparência, Contato, botão Quero Doar, menu acessível no celular e estados de foco.
2. **Hero** marcante: lema "Unidos pelo laço da caridade", headline humanizada, texto "Sua doação pode transformar vidas. Ajude famílias da nossa comunidade com roupas, alimentos, brinquedos e itens de higiene.", botões Fazer Doação e Falar Conosco, fotografia real, animação leve e composição mobile própria.
3. **Quem Somos**: preservar conteúdo institucional em `src/data/site.ts`, usando redação oficial fornecida, imagem real e destaque editorial.
4. **O Que Doar**: Vestuário — roupas, calçados, cobertores; Alimentos — cestas básicas e não perecíveis; Infantil — brinquedos e fraldas; Higiene — produtos de higiene pessoal; cards ou composição melhor, ícones SVG e CTAs claros.
5. **Calculadora de Impacto**: transformar em planejador de intenção. Categoria, quantidade, validação, resumo e ligação para formulário. **Não criar conversões fictícias de doações em beneficiários.**
6. **Como Doar**: entrega presencial em Travessa Pedro Amado, 09, Divinea, São Cristóvão – SE; segunda a sexta 08h–17h; rota por endereço no Google Maps; solicitar coleta; doação via PIX.
7. **Solicitar Coleta**: campos Nome, Telefone, Endereço, Cidade, Itens; validar, consentimento, máscara de telefone, resposta de erro, botão funcional; criar mensagem formatada para `https://wa.me/5579998078987`. Não dizer que coleta foi confirmada.
8. **PIX**: `anjossolidarios.1010@gmail.com` com cópia, feedback e instrução para verificar destinatário no banco. Nunca simular pagamento ou QR não validado.
9. **Transparência**: 150+ famílias, 3t alimentos, 500+ doações, 80+ voluntários — números fornecidos pelo responsável e **pendentes de validação antes de publicar**. Layout elegante e dados centralizados.
10. **Galeria**: use as cinco fotos REAIS já presentes em `public/images/galeria`. Grid editorial, enquadramentos bons, lightbox navegável por teclado, otimização, alt text e atenção às autorizações de imagem de menores.
11. **Depoimento**: texto de Roberto Costa fornecido pelo responsável; não gerar depoimentos falsos, manter pendência de autorização registrada.
12. **FAQ**: respostas somente com dados já confirmados e redação acessível.
13. **Contato**: WhatsApp `(79) 99807-8987`, email `anjossolidarios.1010@gmail.com`, Instagram `@anjos_solidarios10` com links reais e ícones adequados.
14. **Footer**: marca, lema, navegação e contato; copyright `© 2026 Anjos Solidários Pró-Esperança`.

## Design extremamente detalhado

- Sistema de espaçamentos e tipografia consistente, titles serifados, interface legível, bastante respiro, visual claro e verde profundo apenas nos contrastes certos.
- Hero excelente em desktop, tablet e mobile; evite texto espremido e foto mal enquadrada.
- Alternância entre áreas claras, brancas, verde sálvia e verde profundo para ritmo visual.
- Cards somente quando ajudarem a organizar escolhas; não colocar toda informação em cartões iguais.
- Botões com estados hover/focus/active, feedback de sucesso e erro, áreas de toque confortáveis.
- Fotografias com aspect ratio coerente e `object-position` pensado por foto, nunca deformadas.
- Transições curtas (150–250 ms micro, 300–500 ms entrada), `prefers-reduced-motion` obrigatório.
- Contraste WCAG 2.2 AA como objetivo, semântica, heading structure, labels, alt, skip-link, foco modal e teclado.
- Otimização mobile-first: 320, 360, 375, 390, 430, 768, 1024, 1280, 1440 e 1920 px sem overflow ou textos cortados.
- Imagens otimizadas, lazy loading fora da dobra, evitar grandes shifts, web fonts bem geridas, dependências enxutas, renderização eficiente.
- SEO pt-BR, title/description, OG, favicon, sitemap/robots quando aplicável, canonical só com domínio real.

## Fluxos e segurança

Garanta que **nenhum botão seja decorativo**. Toda ação deve levar a um destino ou realizar a função anunciada. A coleta envia solicitação pelo WhatsApp sob ação do usuário; não registra pedido em servidor. O PIX apenas copia a chave. Informações institucionais em `src/data/site.ts`; imagens no diretório existente; não inventar outros dados ou fotos. Não adicionar analytics ou cookies sem necessidade e sem política adequada. Não expor segredos. Se houver backend pré-existente incorporado, mantenha validação também no servidor.

## Validação de qualidade

1. Rode `npm install`, `npm run typecheck` e `npm run build` (ou respeite os scripts do projeto se alterados).
2. Abra o site em navegador de verdade e inspecione todas as seções nos tamanhos citados.
3. Teste menu, botões, âncoras, formularios, estados de validação, clipboard, WhatsApp, Maps, Instagram, email, galeria e controles de teclado.
4. Corrija overflow horizontal, clipping, z-index, proporções, labels, erros de console e layout shifts.
5. Gere `docs/TEST_REPORT.md` com testes realmente executados e o que ficou pendente.
6. Atualize README e documentação do design system e dados.

## Entrega

Trabalhe diretamente nos arquivos existentes e execute todas as melhorias. Entregue código pronto para build, interface visual de alto padrão, interações funcionais, CSS organizado, dados editáveis e documentação. Não me responda apenas com uma lista de sugestões. Ao terminar, resuma as alterações, os testes efetivamente executados e as pendências institucionais. **Não publique o site sem minha instrução e sem validar fotos, estatísticas e depoimentos.**
