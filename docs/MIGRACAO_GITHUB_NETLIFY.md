# Preparação da substituição — 21/11/2026

## Destino confirmado

- Repositório: https://github.com/juanlimadev-rgb/anjos-solidarios.
- Site público: https://anjossolidarios.netlify.app/.
- A conexão GitHub permite leitura e escrita. Após a confirmação do responsável, foi criada a referência remota `archive/site-antigo-2026-11-21` para preservar a versão antiga.
- Captura fornecida pelo responsável confirma esse repositório vinculado no Netlify.
- Segunda captura confirma `main` como production branch, publicação de branches limitada à produção e Deploy Previews para pull requests contra branches de publicação.
- A política de deploys não confiáveis está como `Require approval`. Isso não significa, por si só, que todo pull request da própria conta precisará de autorização manual.
- O estado de auto-publishing não aparece nessas capturas; confirmar no painel antes de contar com a publicação imediata de um merge.

## Inventário do código antigo

Commit examinado: `2a59432821abcea1a18cb17f3bf9b3ce3c78cafc`, branch `main`.

- `index.html` (17.735 bytes), `css/style.css` (6.481 bytes) e `js/script.js` (8.181 bytes); README vazio.
- Dez imagens: sete fotografias JPEG, logo antiga e dois arquivos decorativos de anjos. Manter o commit e seus assets no histórico; não substituir a nova logo nem as cinco fotos fornecidas por padrão.
- Site estático sem package.json ou netlify.toml, usando Tailwind via CDN e Font Awesome. Não foi encontrado backend, banco de dados, integração de pagamento, analytics ou formulário Netlify nos arquivos examinados.
- Fluxos existentes: galeria, âncoras, categorias, solicitação de coleta por WhatsApp, cálculo de quantidades/impacto, PIX, indicadores, depoimentos e contato.
- Contatos e endereço correspondem aos dados já centralizados no novo projeto. O link encurtado de Maps antigo fica documentado como origem; o novo site mantém a busca textual pelo endereço exigida no AGENTS.md.
- A calculadora antiga continha conversões não comprovadas em famílias e refeições; não serão incorporadas. O novo planejador resume itens.
- O JS antigo contém `textOriginal` no retorno de feedback do PIX, embora declare `textoOriginal`; o fluxo novo já tem implementação própria e testada.
- A leitura pública do HTML, CSS e JS no Netlify correspondeu ao código do GitHub após normalização de quebras de linha.

Também existe uma execução bem-sucedida de **GitHub Pages** para esse commit, em `https://juanlimadev-rgb.github.io/anjos-solidarios/`. O Pages usa `main` e a raiz, com build legado. Como esse mecanismo não compila React/Vite, o HTML inclui um encaminhamento restrito a esse hostname para o endereço oficial do Netlify. Âncoras antigas `#home`, `#hero` e `#impacto` são traduzidas para as seções equivalentes. Nenhuma configuração da conta Pages precisou ser alterada; o código anterior está preservado integralmente na pasta e na branch de arquivo.

## Configuração preparada

`netlify.toml` define raiz do projeto como `.`, build `npm run build`, diretório publicado `dist`, Node 24 e instalação das dependências de desenvolvimento necessárias à compilação. A configuração em arquivo acompanha o código e prevalece sobre valores equivalentes do painel. Não envia tokens nem altera o vínculo com o repositório.

Referências oficiais: [configuração em arquivo](https://docs.netlify.com/build/configure-builds/file-based-configuration/) e [dependências de build](https://docs.netlify.com/build/configure-builds/manage-dependencies/).

## Sequência da futura migração

1. Concluir as validações institucionais de `VALIDACAO_E_PUBLICACAO.md`. Uma prévia de pull request pode tornar fotos e conteúdo acessíveis externamente; não presumir que seja privada.
2. Atualizar a leitura do HEAD remoto antes de qualquer escrita; o SHA acima é a referência examinada, não uma garantia de que ninguém alterou o repositório depois.
3. Criar uma branch a partir da `main` atual e preservar a referência anterior no histórico. Não reescrever o histórico nem forçar push.
4. Enviar o novo código e `netlify.toml` juntos para a raiz. Não enviar node_modules, dist, caches, credenciais ou capturas de QA sem necessidade. Preservar o código antigo útil no histórico; novos assets devem ser aqueles autorizados para divulgação.
5. Abrir um pull request para `main` e conferir o Deploy Preview, inclusive build Linux/Netlify, imagens, WhatsApp, PIX e navegação móvel. Uma configuração de prévia habilitada não garante que o primeiro build passará ou será liberado sem intervenção.
6. Após revisão e autorização para publicação, integrar à `main`, acompanhar o deploy até a conclusão e verificar o endereço público. Se auto-publishing estiver pausado, tratar essa configuração explicitamente.
7. Validar canonical e OG com o endereço oficial confirmado; tratar GitHub Pages separadamente conforme uso real. Reversão deve preservar histórico, usando revert ou publicação de um deploy anterior conforme o caso.

## Situação desta preparação

O responsável confirmou todas as autorizações e validações solicitadas em 21/11/2026, respondendo “autorizou tudo”. A publicação está autorizada com base nessa declaração, sem auditoria independente. O código HTML anterior é preservado na branch de arquivo e na pasta `legacy-site/` do repositório; a pasta publicada pelo Netlify continua sendo apenas `dist`. Os 13 textos fictícios do carrossel permanecem identificados como ilustrativos e não comprovam doações reais.

Branch de trabalho: `codex/site-institucional-2026-11-21`. O pull request, a prévia e a produção devem ser conferidos antes de registrar a publicação como concluída. Os originais PNG e capturas de QA ficam preservados localmente; somente os assets WebP utilizados pelo novo site são necessários na publicação.

## Verificações desta etapa

- `npm run typecheck`: aprovado.
- `npm run build`: aprovado; pasta `dist` produzida. JS 200,54 kB (62,39 kB gzip) e CSS 30,25 kB (6,89 kB gzip).
- `tomllib` do Python 3.13 leu o TOML sem erro; raiz, comando, pasta publicada e versão de Node conferidos por asserts.
- Não houve alteração visual nesta etapa. As interações e capturas da versão do site estão nos relatórios anteriores; não foram repetidas sem mudança de interface.
- O build de fato executado foi local em Windows com Node 24.15.0. O primeiro build Linux do Netlify e o comportamento da prévia ainda não foram executados.
- Arquivos desta etapa: `netlify.toml`, `README.md`, `docs/VALIDACAO_E_PUBLICACAO.md` e este documento. Nenhuma dependência adicionada.
- Para conferir localmente: `npm run typecheck`, `npm run build` e `npm run preview`.
