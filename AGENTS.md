# AGENTS.md — ANJOS SOLIDÁRIOS PRÓ-ESPERANÇA

> **Leia INTEGRALMENTE este arquivo ANTES de modificar o projeto.**
> Projeto institucional real, conteúdo em português brasileiro, missão social humanitária.

## 1. Missão, estágio e contexto

A pasta contém uma **base de site funcional em React + TypeScript + Vite**, criada a partir dos dados, logo e cinco fotos fornecidos pelo responsável. Foi construída para abrir no Codex e receber refinamento profissional. **Não é uma refatoração auditada do site antigo**, pois o código anterior não foi recebido. Se o usuário adicionar o código antigo posteriormente, primeiro faça um inventário e preserve funcionalidades e integrações comprovadamente úteis.

O objetivo final é um site institucional elegante, acolhedor, completamente responsivo, acessível e confiável. Melhore o código real, não apenas entregue análises textuais. Evite mudanças desnecessárias e efeitos exagerados.

## 2. Ordem obrigatória de leitura

1. `AGENTS.md` (este arquivo).
2. `README.md`.
3. `PROMPT_PARA_CODEX.md`.
4. `docs/IDENTIDADE_E_CONTEUDO.md`.
5. `docs/DESIGN_SYSTEM.md`.
6. `docs/VALIDACAO_E_PUBLICACAO.md`.
7. `src/data/site.ts`.
8. `src/App.tsx` e `src/styles/index.css`.
9. Imagens em `public/images/` e originais em `material-original/`.

## 3. Dados institucionais: fonte única de verdade

- Nome: **Anjos Solidários Pró-Esperança**.
- Marca: **Anjos Solidários**.
- Lema superior: **Unidos pelo laço da caridade**.
- Frase: **Quem não vive para servir, não serve para viver.**
- WhatsApp: **(79) 99807-8987** | API wa.me `5579998078987`.
- E-mail e PIX: **anjossolidarios.1010@gmail.com**.
- Instagram: **@anjos_solidarios10**.
- Endereço: **Travessa Pedro Amado, 09, Divinea, São Cristóvão – SE, Brasil**.
- Horário informado: **segunda a sexta, 08h às 17h**.
- Indicadores informados: **150+ famílias ajudadas; 3t de alimentos arrecadados; 500+ doações recebidas; 80+ voluntários**. **Validar antes da publicação**.
- Depoimento atribuído a Roberto Costa. **Validar autenticidade e autorização antes da publicação**.

**Não invente** CNPJ, ano de fundação, nome de dirigentes, parceiros, novas redes, resultados, depoimentos, fotos, campanhas, áreas de entrega, banco/recebedor PIX, QR de pagamento ou impacto por item.

## 4. Integridade visual e assets

Paleta derivada da logo oficial:
- `#254D39` verde profundo.
- `#397454` verde principal.
- `#8DAF89` verde sálvia.
- `#D9B6B9` rosa antigo.
- `#FCF9F5` off-white.

Use a logo enviada, sem distorção. O arquivo completo está em `material-original/Logo Anjos Solidários.png`; a versão WebP de site está em `public/images/logo/anjos-solidarios.webp`. `simbolo-anjos.webp` é um recorte derivado **para áreas pequenas**, não substitui a logo completa como arquivo oficial. Mantenha fidelidade às figuras dos dois anjos, corações e ramos delicados.

As 5 fotografias são **reais fornecidas pelo usuário**, em `material-original/` e em versões WebP em `public/images/galeria/`. Não substituir por stock por padrão. Verifique consentimento e direitos de imagem antes de publicar, sobretudo imagens que mostram menores. Não invente nomes nem histórias sobre pessoas fotografadas.

## 5. Linguagem visual

Direção: editorial humanitário + minimalismo contemporâneo + delicadeza botânica.

- Proporções, tipografia, contraste, navegação e alinhamento obsessivamente revisados.
- Fontes atuais: Fraunces (editorial) + DM Sans (interface); preservar ou refinar coerentemente.
- Animações discretas, 150–600 ms; respeitar `prefers-reduced-motion`.
- Sem gradientes berrantes, excesso de cards, sombras duras, glassmorphism, 3D decorativo, emojis como ícones, barras de habilidades ou linguagem de SaaS.
- Mobile-first e sem rolagem horizontal em 320, 360, 375, 390, 430, 768, 1024, 1280, 1440 e 1920 px.
- Evitar imagens ou filtros que prejudiquem a realidade documental das ações.

## 6. Arquitetura

- React, TypeScript estrito e Vite.
- `src/data/site.ts`: dados, imagens, links e textos estruturados.
- `src/App.tsx`: base inicial de seções e interações. Refatorar em componentes/arquivos menores quando houver justificativa de manutenção; não apenas para inflar número de arquivos.
- `src/styles/index.css`: design system atual. Melhorar reutilização e remover duplicidades quando couber.
- `public/images/`: imagens otimizadas para o site. Preserve originais separados.

Não adicione dependências sem necessidade real. Não troque de framework por preferência pessoal. Não exponha segredos no frontend. Não interrompa após diagnóstico: **implemente** as melhorias.

## 7. Fluxos obrigatórios

- Header desktop/móvel com âncoras funcionais, fechamento do menu, acessibilidade e CTA.
- Hero acolhedor com imagem real da instituição.
- Quem Somos, O Que Doar, Calculadora de intenção, Como Doar, Solicitar Coleta, PIX, Transparência, Galeria, Depoimento, FAQ, Contato e Footer.
- **Calculadora** deve somente resumir o número de itens planejados. Nunca estimar famílias beneficiadas sem dados reais.
- **Coleta**: validar campos + consentimento e preparar mensagem via `wa.me`. Não afirmar que coleta foi agendada nem que mensagem foi enviada; usuário precisa enviá-la.
- **PIX**: copiar apenas chave fornecida; não simular pagamento/QR ou confirmação de recebimento.
- **Galeria**: fotos fornecidas, lightbox acessível, navegação por teclado, otimização.
- **Contato**: canais oficiais, `mailto:`, Instagram e WhatsApp funcional.
- **Endereço**: abrir busca por endereço no Google Maps; não inventar latitude/longitude.

## 8. Qualidade mínima

- HTML semântico, WCAG 2.2 AA como meta e navegação por teclado.
- Verificar contraste, alvos de toque, formulários, aria, foco, leitor de tela, imagens, `prefers-reduced-motion`.
- Verificar build de produção, console sem erros, TypeScript, links, performance e responsividade visual real.
- SEO técnico, meta tags, `pt-BR`, favicon; configurar canonical/OG URL somente quando houver URL oficial.
- Testar `npm run build`, `npm run typecheck`, e2e ou inspeção visual com navegador se disponível.
- Nunca afirmar que testes foram executados sem executá-los.

## 9. Pendências de produção

Ver `docs/VALIDACAO_E_PUBLICACAO.md`. **O site não deve ser publicado como conteúdo institucional definitivo antes de validar**: permissões de uso das imagens (incluindo crianças), dados de impacto, depoimento, horário e endereço, titular PIX/CPF-CNPJ exibido no banco, política de privacidade apropriada.

## 10. Encerramento de cada tarefa Codex

Ao concluir, reporte: arquivos alterados; melhorias visuais; correções funcionais; testes realmente executados; problemas que persistem; dados ainda pendentes de aprovação; instruções para testar localmente. Trabalhe em português brasileiro. Preserve o código antigo útil caso seja anexado posteriormente.
