# Direção de arte e Design System

## Conceito

**Solidariedade que inspira confiança.** Linguagem editorial, humana, contemporânea, calorosa e institucional. Um sistema elegante deve valorizar as fotografias reais sem aparentar uma landing page de vendas ou um dashboard de SaaS.

## Paleta

| Papel | Cor | Aplicação |
|---|---|---|
| Verde profundo | `#254D39` | Títulos, rodapé, fundos de destaque |
| Verde principal | `#397454` | Links, botões, ícones e foco contextual |
| Verde sálvia | `#8DAF89` | Elementos secundários e detalhes leves |
| Rosa antigo | `#D9B6B9` | Detalhes florais, pontos de afeto |
| Off-white | `#FCF9F5` | Fundo principal, áreas claras |

Tons auxiliares de bordas/fundos claros podem ser derivados da paleta. Não adicionar cores saturadas sem motivação.

## Tipografia

- **Fraunces:** títulos, chamadas emocionais e citações (editorial humanitário).
- **DM Sans:** interface, formulários, navegação, texto corrido.
- Usar fluid type (`clamp`) e legibilidade confortável; evitar muitos pesos e famílias.
- H1 com forte presença sem cortar em 320 px.

Na implementação refinada, corpo e campos de formulário usam 16 px ou mais; labels e ações, 14–15 px; metadados secundários, 12–13 px. Inscrições da marca e selo decorativo têm escala própria. Fraunces inclui itálico real e eixo óptico; DM Sans mantém a interface. Fontes carregadas pelo Google Fonts com `display=swap`, preconnect e fallback de sistema. A política de privacidade deve refletir essa requisição externa, ou as fontes devem ser hospedadas localmente antes da publicação, conforme decisão do responsável.

## Layout

- Container até 1200 px, paddings fluidos e grid responsivo.
- Áreas de respiro amplas, sem criar longas seções vazias.
- Alternar superfícies claras, off-white, verde suave e verde profundo para ritmo visual.
- Bordas leves, cantos sutilmente arredondados, sombras econômicas.
- Dar preferência a imagem editorial, não cartões repetidos em todas as seções.

## Composição implementada

- Hero assimétrico com headline dimensionada para duas linhas em 320 px, ramo botânico em SVG e fotografia documental em arco. A legenda fica fora da imagem para manter a leitura e a cena.
- A logo completa fornecida aparece sem filtros no cabeçalho, na apresentação e no rodapé. O símbolo auxiliar permanece somente no favicon.
- Apresentação preserva integralmente o texto oficial em três parágrafos; fotos sobrepostas sem esticar as proporções.
- Categorias em quatro colunas no desktop, duas em telas intermediárias e uma no celular estreito. Formas de doar em colunas editoriais com divisórias, sem caixas repetidas.
- Planejador em sálvia e PIX em verde profundo criam ritmo entre as áreas brancas e off-white. Depoimento em citação aberta com filete rosa antigo.
- Galeria com composição assimétrica e legendas sobre verde sólido, sem filtros nas fotos. Lightbox mostra o enquadramento integral de cada arquivo.
- Cantos de 5–8 px predominam; sombras restritas ao botão flutuante e à navegação. Animações de entrada de 450 ms e transições de 200–400 ms.

## Reflow e interação

Layouts móveis como base, com quebras em 480, 768 e 1101 px. Grades usam colunas que podem encolher; títulos, marca e links admitem quebra com texto ampliado. A altura real do header atualiza o afastamento das âncoras via `ResizeObserver`, inclusive quando a fonte cresce. Alvos interativos principais têm 44–54 px; o checkbox usa uma área de label clicável.

O planejador e a coleta compartilham estado React, inclusive ao reaplicar o mesmo resumo depois de uma edição manual. Campos inválidos recebem indicação e descrição associada; o primeiro erro recebe foco. A galeria usa `dialog.showModal()`, fundo inerte e ciclo de foco explícito. O conteúdo não depende das animações para permanecer visível; movimento reduzido desativa todas elas.

## Componentes

- Buttons: primary, outline, text-link; hover/focus/disabled.
- Header: logo, navegação desktop, menu mobile e CTA.
- Donation cards: ícones SVG consistentes, hover leve, categorias claras.
- Calculator: tipo, quantidade, resumo, ação de encaminhamento.
- PickupForm: campos, validação, consentimento, abertura de WhatsApp e aviso honesto.
- Pix: chave copiável, estado de sucesso e orientação de verificação no banco.
- Gallery: fotografias do responsável, visualização ampliada e teclado.
- Testimonials: citação editorial em off-white sobre sálvia, filete rosa antigo e iniciais sem fotografias fictícias. Carrossel com transição de 350 ms e altura reservada pelo maior texto, para evitar saltos. Até cinco itens usam indicadores; listas maiores usam um seletor nativo compacto com todos os nomes, contador e controles de 44 px.
- Transparency: valores informados, validação necessária.
- Footer: contato, endereço, navegação e identidade.

## Acessibilidade e movimento

- WCAG 2.2 AA como objetivo (não afirmar conformidade sem auditoria).
- Links e botões semânticos, foco visível, labels, contraste consistente.
- Preferência por movimentos discretos e `prefers-reduced-motion`.
- Navegação e lightbox por teclado, incluindo fechamento pelo Escape.
- Carrossel: troca a cada nove segundos somente quando visível, sem hover e com a página ativa. Foco ou interação manual pausam até retomada explícita. Movimento reduzido desativa a rotação e oculta o controle de reprodução. Setas, Home/End, seletor e gesto horizontal são suportados; o gesto vertical continua rolando a página. A área viva fica desligada durante a rotação para não interromper leitores de tela. No celular, há espaço lateral para o botão flutuante de WhatsApp não cobrir os controles.

## Fotografia e direitos

Não forçar saturação, filtros emotivos, manipulações em rostos ou recortes que alterem o sentido das cenas. Preservar originais para futuras edições. Validar direito de imagem e consentimento, especialmente de menores.
