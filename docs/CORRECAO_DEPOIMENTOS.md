# Revisão dos cartões públicos — 21/11/2026

O responsável solicitou retirar a identificação de personagens de demonstração da versão pública. Os cartões inventados não foram reclassificados como pessoas que efetivamente doaram.

## Conteúdo final

- Um relato confirmado: Roberto Costa, identificado como **Doador** e com selo textual **Depoimento**.
- Treze mensagens editoriais, identificadas como **Mensagem da instituição**, com autoria da marca Anjos Solidários e tema próprio.
- As mensagens convidam à solidariedade e orientam sobre as formas de doar; não simulam experiências pessoais nem atribuem falas a nomes fictícios.
- O carrossel mantém 14 cartões, seleção, teclado, deslize, pausa e troca automática. A introdução explica que reúne um relato e mensagens da instituição.
- Os textos pessoais fictícios anteriores ficam no array `testimonialDrafts` e em uma fixture de testes. Esse array não é importado pela aplicação pública e não aparece no bundle de produção.

## Correção funcional

A pausa por hover passou a acompanhar eventos de ponteiro do documento, evitando um estado de hover retido após movimentos e rolagem. Ponteiros de toque não ativam hover. Foco e preferência de movimento reduzido continuam controlando a reprodução.

## Verificações

- TypeScript e build de produção aprovados.
- `npm run test:testimonials`: três grupos da seção pública aprovados, com 14 cartões, ausência de personagens e dez larguras entre 320 e 1920 px; fonte a 200% sem overflow.
- `npm run test:carousel`: sete grupos da fixture interna aprovados, cobrindo seleção, ciclo, foco, temporizador, hover, página oculta, saída da tela, gesto horizontal e movimento reduzido.
- Conferência do bundle: ausência dos IDs `juan-lima-exemplo`, `anne-beatriz-exemplo` e do texto “Personagem de demonstração”.
- A fixture não integra `dist`; é servida apenas no ambiente de desenvolvimento.

Arquivos: dados, componente, scripts de teste, fixture, package.json, README e documentação de identidade e validação. Imagens, contatos, PIX e demais informações institucionais não foram alterados nesta revisão.
