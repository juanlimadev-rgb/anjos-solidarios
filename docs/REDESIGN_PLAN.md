# Refinamento institucional — 20/11/2026

## Inventário e diagnóstico

Base React 18, TypeScript estrito, Vite 6 e Lucide. Não há backend, analytics, código anterior ou domínio oficial. Sete imagens WebP, seis originais PNG preservados. Dados de contato, galeria e indicadores centralizados em `src/data/site.ts`.

Problemas observados no código inicial:

- Logo completa fornecida não aparecia na página; marca composta apenas pelo recorte auxiliar.
- H1 com `white-space: nowrap` em duas colunas permitia sobreposição entre texto e fotografia nos tamanhos intermediários.
- CSS minificado em linhas extensas, textos móveis de 8–13 px, diversos tons claros com contraste insuficiente, excesso de caixas e números decorativos.
- Conteúdo institucional reescrito diretamente no componente, separado da fonte de verdade.
- Planejador aceitava frações e impedia edição natural do campo; categorias não selecionavam a opção correspondente. Comunicação com formulário dependia de evento global.
- Formulário sem foco no primeiro erro, sem semântica de campos obrigatórios e consentimento sem associação ao erro.
- Lightbox manual recriava listeners e focava o botão fechar a cada imagem; Escape não devolvia o foco ao disparador e o fundo não ficava inerte.
- Clipboard negado abria `prompt` do navegador, com retorno de foco imprevisível.
- React 18 recebia atributo `inert` diretamente; conferir compatibilidade no typecheck.
- Sem suíte de regressão executável, lockfile ou evidências de QA real.

## Decisões de implementação

Preservar a arquitetura e as dependências de produção. Reorganizar CSS em blocos legíveis com tipografia em rem, texto de corpo a partir de 16 px, componentes focáveis e cores de contraste verificável. Hero editorial assimétrico com fotografia real e ramo botânico em SVG; logo completa sem filtros nem distorções no cabeçalho, apresentação e rodapé. Alternar fundos off-white, branco, sálvia e verde profundo. Reduzir caixas nas formas de doar e eliminar números decorativos.

Usar estado React compartilhado para seleção e preenchimento do planejador. Quantidades inteiras entre 1 e 100.000 com erro explícito. Validação acessível do formulário, telefone com máscara, foco no primeiro campo inválido e mensagem preparada para WhatsApp, sem registro ou agendamento. Lightbox com `dialog.showModal()`, foco nativo, Escape, setas e retorno ao disparador. PIX com feedback anunciado e seleção manual se cópia indisponível.

## Validação e limites

Executar instalação, typecheck e build; inspecionar as dez larguras solicitadas, tablet paisagem, zoom, preferência de movimento reduzido, navegação por teclado e fluxos. Registrar resultados efetivos e eventuais limitações em `docs/TEST_REPORT.md`. Não publicar. Fotos, indicadores, depoimento, endereço, horário, titular PIX e política de privacidade dependem da validação institucional descrita em `docs/VALIDACAO_E_PUBLICACAO.md`.
