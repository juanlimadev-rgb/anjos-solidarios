# Identidade, conteúdo e fontes do site

## Identidade original enviada

Nome institucional: **Anjos Solidários Pró-Esperança**.

Marca: **Anjos Solidários**.

Inscrições da logo:
- **UNIDOS PELO LAÇO DA CARIDADE**
- **ANJOS SOLIDÁRIOS**
- **QUEM NÃO VIVE PARA SERVIR, NÃO SERVE PARA VIVER**

A logo original fornecida neste chat encontra-se em `material-original/Logo Anjos Solidários.png`. A cópia otimizada está em `public/images/logo/anjos-solidarios.webp`. O recorte de símbolo em `public/images/logo/simbolo-anjos.webp` é apenas uma versão auxiliar derivada para pequenos espaços.

## Texto institucional fornecido

> A Anjos Solidários Pró-Esperança é uma organização sem fins lucrativos fundada com um único propósito: levar dignidade e esperança a famílias em situação de vulnerabilidade. Atuamos na arrecadação e distribuição de doações de roupas, alimentos, brinquedos e itens de higiene, conectando a generosidade de quem doa ao sorriso de quem recebe. Acreditamos que pequenos gestos transformam grandes realidades — e que juntos, somos mais fortes.

O texto pode ser dividido em parágrafos para leitura, desde que o sentido não seja alterado e dados não sejam inventados.

A apresentação agora renderiza diretamente `site.about`, em três parágrafos, sem reescrita paralela no componente. O texto do hero e o depoimento também estão em `src/data/site.ts`.

## Tipos de doação

| Categoria | Conteúdo |
|---|---|
| Vestuário | Roupas, calçados e cobertores |
| Alimentos | Cestas básicas e alimentos não perecíveis |
| Infantil | Brinquedos e fraldas |
| Higiene | Produtos de higiene pessoal |

## Atendimento e contatos

- Endereço informado: **Travessa Pedro Amado, 09**, **Divinea**, **São Cristóvão – SE, Brasil**.
- Horário informado: **segunda a sexta, das 08h às 17h**.
- WhatsApp: **(79) 99807-8987**.
- E-mail: **anjossolidarios.1010@gmail.com**.
- Chave PIX: **anjossolidarios.1010@gmail.com**.
- Instagram: **@anjos_solidarios10**.

O site cria link de Google Maps por consulta textual, sem coordenadas inventadas. O campo PIX é chave copiada, não QR de pagamento validado.

## Indicadores de impacto informados

- 150+ famílias ajudadas.
- 3t alimentos arrecadados.
- 500+ doações recebidas.
- 80+ voluntários.

O responsável confirmou os indicadores e autorizou a publicação em 21/11/2026. A confirmação foi declarada nesta conversa, sem auditoria independente; não foi inventado período de apuração.

## Depoimento informado

> DoeI roupas que não usava mais e soube que foram para famílias que precisavam. Gratidão por esse trabalho!

Atribuição fornecida: **Roberto Costa — Doador**.

O texto foi reproduzido no site com capitalização original normalizada (`Doei`). O responsável confirmou autenticidade e autorização em 21/11/2026. Não criar novos depoimentos reais sem fonte.

O texto e a atribuição ficam em `site.testimonial`; a autorização foi registrada após a confirmação do responsável.

### Carrossel — atualização de 21/11/2026

O array `testimonials` usa esse relato como primeiro item (`kind: 'approved'`). A pedido do responsável, há também 13 textos fictícios com personagens ilustrativos: Juan Lima, Anne Beatriz, Andressa e outros dez exemplos. **Esses nomes e falas não comprovam doações nem correspondem a depoimentos reais.** Todos exibem “Exemplo ilustrativo” e “Personagem de demonstração”, além de um aviso na apresentação da seção.

Substituir os exemplos por relatos autênticos, confirmar autoria e autorização antes de marcar um item como `kind: 'approved'`. Não remover os rótulos para fazer um texto fictício parecer real. Não foram adicionadas fotografias de pessoas nem alegações de verificação.

## Fotografias recebidas

Os arquivos originais estão preservados em `material-original/`. As versões comprimidas, com nomes descritivos, estão em `public/images/galeria/`:

1. `acao-solidaria-comunidade.webp` — reunião de pessoas e distribuição de doações ao ar livre.
2. `voluntarios-evento-solidario.webp` — voluntários durante ação comunitária.
3. `voluntario-anjos-solidarios.webp` — voluntário com camisa da entidade, sorrindo.
4. `distribuicao-alimentos.webp` — atendimento e distribuição de comida a crianças.
5. `equipe-acao-comunitaria.webp` — equipe durante ação em praça.

As descrições correspondem a observações visíveis e não identificam as pessoas.

**IMPORTANTÍSSIMO:** há menores de idade nas imagens. Não presuma que a disponibilização ao designer equivale a uma autorização pública de uso de imagem. Confirmar consentimento e bases legais adequadas antes de disponibilizar o site ao público. Não atrelar fotos a depoimentos/nomes não confirmados.

## Edição dos dados

`src/data/site.ts` é a fonte de verdade, incluindo `site`, `donationTypes`, `impactStats`, `gallery`, `whatsappHref` e `mapHref`.

Para substituir foto, guarde novo original em `material-original/`, gere uma versão otimizada em `public/images/galeria/`, e atualize o item correspondente no array `gallery`.

O planejador usa unidades neutras para a categoria Infantil (`item infantil` / `itens infantis`), permitindo planejar brinquedos e fraldas sem converter uma categoria na outra. Nenhuma quantidade é convertida em famílias, refeições ou impacto financeiro.
