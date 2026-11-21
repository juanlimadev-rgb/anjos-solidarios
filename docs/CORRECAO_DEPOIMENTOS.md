# Depoimentos autorizados — 21/11/2026

O responsável confirmou expressamente nesta conversa: **“Sim, são doadores reais e aprovaram os textos.”** A resposta foi dada à pergunta sobre autoria, doação e autorização para publicação dos nomes e textos apresentados. A publicação se baseia nessa declaração; não houve auditoria independente.

## Conteúdo publicado

- 14 relatos, incluindo Roberto Costa, Juan Lima, Anne Beatriz, Andressa e os outros dez nomes já apresentados.
- Todos identificados como **Doador**, com selo **Depoimento**.
- Os textos elaborados anteriormente como exemplos foram mantidos sem novas alegações, após a confirmação de que foram aprovados pelas pessoas citadas.
- As 13 mensagens editoriais temporárias foram substituídas pelos nomes e textos aprovados. O array separado de rascunhos foi removido.
- Logo, fotografias, identidade visual, contatos e PIX foram preservados.
- O carrossel mantém seleção, teclado, deslize, pausa, troca automática e suporte a movimento reduzido.

## Validação desta revisão

- `npm run typecheck`: aprovado.
- `npm run build`: aprovado.
- `npm run test:testimonials`: três grupos aprovados, com 14 nomes, identificação de doadores e ausência dos rótulos temporários; dez larguras de 320 a 1920 px e texto a 200% sem overflow.
- `npm run test:carousel`: sete grupos aprovados, cobrindo seleção, ciclo, foco, temporizador, hover, página oculta, saída da tela, gesto horizontal e movimento reduzido.
- Nenhum erro de console nas suítes executadas. Capturas em `docs/qa/` (evidência local).

Arquivos alterados: `src/data/site.ts`, os dois testes de depoimentos, a fixture interna, README e documentação de identidade, validação e esta revisão. O componente e o CSS não precisaram de alterações.

Para conferir localmente: `npm run dev`; abra `http://localhost:5173/#depoimentos`. Com o servidor aberto, execute `npm run test:testimonials` e `npm run test:carousel`.

Não há pendências de conteúdo para esta alteração após a confirmação expressa do responsável. As limitações gerais de auditoria e testes físicos continuam descritas em `VALIDACAO_E_PUBLICACAO.md`.
