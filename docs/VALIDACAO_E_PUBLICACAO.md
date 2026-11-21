# Pendências de validação, testes e publicação

Este checklist é obrigatório antes de apresentar o site como instituição pública oficial.

## Confirmação do responsável — 21/11/2026

Após ser consultado expressamente sobre autorização das fotografias (incluindo menores), indicadores, depoimento de Roberto Costa, endereço/horário, destinatário PIX e política de privacidade, o responsável respondeu **“autorizou tudo”**. A publicação foi liberada com base nessa declaração; não houve auditoria independente nem recebimento de documentos comprobatórios. Os 13 exemplos fictícios continuam identificados como ilustrativos.

As pendências institucionais registradas abaixo correspondem à versão anterior a essa confirmação; a declaração acima registra sua resolução pelo responsável. Verificações técnicas pós-deploy e testes em aparelhos físicos permanecem separados.

Revisão posterior nesta data: os 13 exemplos pessoais foram retirados da aplicação pública e substituídos por mensagens editoriais da instituição, sem nomes fictícios ou alegação de que sejam depoimentos de doadores. Roberto Costa permanece como o relato confirmado. Os rascunhos são usados somente na fixture interna de testes.

## 1. Validação de informações

- [x] Responsável confirma nome oficial e uso da marca.
- [x] Responsável confirma endereço, bairro **Divinea** e horário **seg–sex 08h–17h**.
- [ ] WhatsApp e Instagram testados com responsáveis.
- [x] Responsável confirmou e-mail, chave PIX e destinatário informado pelo banco; sem transação de teste por este agente.
- [x] Responsável confirmou os indicadores fornecidos; nenhum período de referência foi inventado e não houve auditoria independente.
- [x] Depoimento de Roberto Costa confirmado pelo responsável e divulgação autorizada.
- [x] Os 13 exemplos ilustrativos do carrossel são mantidos claramente identificados como demonstração, sem serem apresentados como doadores reais.
- [ ] Revisão ortográfica final por responsável.

## 2. Fotografias e privacidade

- [x] Responsável declarou confirmadas as autorizações de divulgação dos participantes identificáveis.
- [x] **Responsável declarou confirmadas as autorizações para crianças e adolescentes retratados.**
- [x] Direitos de uso das imagens confirmados pelo responsável.
- [x] Legendas não atribuem nomes ou histórias inventadas às fotografias.
- [x] Informações sobre privacidade e fluxo real disponíveis no rodapé; confirmação do responsável registrada acima.
- [x] Formulário informa que o visitante envia dados pessoais pelo WhatsApp.
- [x] Serviços de hospedagem e fontes externas informados no rodapé; sem analytics adicionados.

## 3. Fluxo funcional

- [x] Menu desktop e mobile com navegação/teclado, Escape, foco e fechamento.
- [x] CTAs, âncoras e estrutura dos destinos oficiais verificados no navegador.
- [x] Solicitação de coleta valida nome, telefone, endereço, cidade e itens.
- [x] Janela com mensagem WhatsApp preparada testada com destino interceptado; **não** marca agendamento nem envia mensagem.
- [x] Cópia PIX real testada em origem local segura, além de fallback por seleção manual quando negada.
- [x] Consulta textual do Google Maps confere com o endereço fornecido; localização física ainda depende do responsável.
- [x] Galeria abre/fecha, navega por teclado, mantém o foco e não deixa fundo rolando.
- [x] Não há nenhuma ação de pagamento simulada.
- [ ] Revalidar clipboard em HTTPS e todos os destinos após a futura implantação.

## 4. Qualidade visual e técnica

- [x] Chromium com capturas em 320, 360, 375, 390, 430, 768, 1024, 1280, 1440 e 1920 px.
- [x] Sem overflow horizontal nos tamanhos verificados; imagens carregadas e proporções revisadas.
- [x] Tablet 1024×768, teclado e ampliação de texto a 200% verificados.
- [ ] Zoom da interface do navegador e leitor de tela em aparelho físico.
- [x] `npm install --offline --no-fund --no-audit` concluído no ambiente com cache local.
- [x] `npm run typecheck` aprovado.
- [x] `npm run build` aprovado.
- [ ] Auditoria Lighthouse no ambiente de produção, com correções prioritárias.
- [x] Contraste de 170 textos sobre fundos sólidos e interação com `prefers-reduced-motion` verificados.
- [ ] Revisar links externos e metadados antes de indexar.

## 5. Publicação

- Endereço atual confirmado pelo responsável em 21/11/2026: `https://anjossolidarios.netlify.app/`. Configurar URL canônica e compartilhamento absoluto na migração final e testar no domínio publicado.
- `netlify.toml` preparado localmente para `npm run build`, diretório `dist` e Node 24. Repositório e branch de produção confirmados; ver `MIGRACAO_GITHUB_NETLIFY.md`. Nenhuma publicação nova foi realizada.
- Projeto Vite usa `base: './'` e caminhos de imagens via `import.meta.env.BASE_URL`, permitindo hospedagem em raiz ou subdiretório. Confirmar no domínio de produção se a configuração precisa de uma base absoluta específica.
- Build de produção: `npm run build` → pasta `dist/`.
- Hospedar em serviço estático que tenha HTTPS; testar rota base e links após implantação.
- Quando o conteúdo oficial for aprovado, substituir avisos editoriais temporários por texto adequado e documentado, mantendo transparência.

## 6. Testes executados nesta entrega

Em 20/11/2026, dependências instaladas pelo cache local após falhas de DNS; TypeScript e build aprovados. Suíte Playwright passou em desenvolvimento e na versão de produção, com nove grupos de verificações, dez larguras, console limpo, clipboard real e abertura de janela interceptada para o WhatsApp. O mesmo build também foi carregado em `/anjos/`, com imagens e lightbox funcionais. As imagens originais foram preservadas. Consulte `TEST_REPORT.md` e os arquivos em `docs/qa/` para o escopo exato e as limitações. Os itens institucionais e jurídicos acima continuam pendentes.
