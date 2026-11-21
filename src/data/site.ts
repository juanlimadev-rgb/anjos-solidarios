export const site = {
  organization: 'Anjos Solidários Pró-Esperança',
  brand: 'Anjos Solidários',
  mission: 'Unidos pelo laço da caridade',
  motto: 'Quem não vive para servir, não serve para viver.',
  heroDescription: 'Sua doação pode transformar vidas. Ajude famílias da nossa comunidade com roupas, alimentos, brinquedos e itens de higiene.',
  testimonial: {
    text: 'Doei roupas que não usava mais e soube que foram para famílias que precisavam. Gratidão por esse trabalho!',
    name: 'Roberto Costa',
    role: 'Doador',
  },
  pixKey: 'anjossolidarios.1010@gmail.com',
  email: 'anjossolidarios.1010@gmail.com',
  whatsappDisplay: '(79) 99807-8987',
  whatsappDigits: '5579998078987',
  instagramHandle: '@anjos_solidarios10',
  instagramUrl: 'https://www.instagram.com/anjos_solidarios10/',
  address: {
    street: 'Travessa Pedro Amado, 09',
    neighborhood: 'Divinea',
    city: 'São Cristóvão',
    state: 'SE',
    country: 'Brasil',
    hours: 'Segunda a sexta, das 08h às 17h',
  },
  about: 'A Anjos Solidários Pró-Esperança é uma organização sem fins lucrativos fundada com um único propósito: levar dignidade e esperança a famílias em situação de vulnerabilidade. Atuamos na arrecadação e distribuição de doações de roupas, alimentos, brinquedos e itens de higiene, conectando a generosidade de quem doa ao sorriso de quem recebe. Acreditamos que pequenos gestos transformam grandes realidades — e que juntos, somos mais fortes.',
} as const;

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  text: string;
  kind: 'provided' | 'illustrative' | 'approved' | 'message';
};

// Em 21/11/2026, o responsável confirmou que são doadores reais e aprovaram os textos.
// Confirmação declarada nesta conversa, sem auditoria independente.
export const testimonials: readonly (Testimonial & { kind: 'approved' })[] = [
  { id: 'roberto-costa', ...site.testimonial, kind: 'approved' },
  {
    id: 'juan-lima', name: 'Juan Lima', role: 'Doador', kind: 'approved',
    text: 'Separei roupas em bom estado para doar. É um jeito simples de colocar o que já temos a serviço de quem precisa.',
  },
  {
    id: 'anne-beatriz', name: 'Anne Beatriz', role: 'Doador', kind: 'approved',
    text: 'Uma pequena contribuição pode fazer parte de algo maior. Gosto da ideia de transformar generosidade em cuidado com a nossa comunidade.',
  },
  {
    id: 'andressa', name: 'Andressa', role: 'Doador', kind: 'approved',
    text: 'Brinquedos, roupas e itens de higiene podem ganhar um novo destino. Quando a gente compartilha, abre espaço para mais cuidado e esperança.',
  },
  {
    id: 'mariana-alves', name: 'Mariana Alves', role: 'Doador', kind: 'approved',
    text: 'Na hora de organizar o armário, pensei em quem poderia aproveitar aquelas peças. Doar também é enxergar novas possibilidades no que já temos.',
  },
  {
    id: 'pedro-henrique', name: 'Pedro Henrique', role: 'Doador', kind: 'approved',
    text: 'Nem sempre a gente consegue fazer muito, mas sempre pode começar com alguma coisa. Um alimento separado com carinho já é um primeiro passo.',
  },
  {
    id: 'camila-santos', name: 'Camila Santos', role: 'Doador', kind: 'approved',
    text: 'Escolher brinquedos em bom estado para compartilhar é uma forma bonita de falar sobre generosidade em casa. O cuidado começa nos pequenos detalhes.',
  },
  {
    id: 'lucas-oliveira', name: 'Lucas Oliveira', role: 'Doador', kind: 'approved',
    text: 'Gosto de pensar na doação como um encontro entre pessoas. De um lado, a vontade de ajudar; do outro, alguém que merece respeito e acolhimento.',
  },
  {
    id: 'juliana-costa', name: 'Juliana Costa', role: 'Doador', kind: 'approved',
    text: 'Uma sacola de roupas pode parecer pouca coisa para quem separa. Para mim, ela representa a decisão de olhar com mais atenção para o próximo.',
  },
  {
    id: 'rafael-souza', name: 'Rafael Souza', role: 'Doador', kind: 'approved',
    text: 'A solidariedade fica mais próxima quando a gente percebe que pode ajudar com o que está ao alcance. Não é preciso esperar uma ocasião especial.',
  },
  {
    id: 'beatriz-rocha', name: 'Beatriz Rocha', role: 'Doador', kind: 'approved',
    text: 'Produtos de higiene fazem parte do cuidado de todos os dias. Lembrar deles na hora de doar é também lembrar da dignidade de quem vai receber.',
  },
  {
    id: 'gabriel-lima', name: 'Gabriel Lima', role: 'Doador', kind: 'approved',
    text: 'Compartilhar um pouco do que temos é uma maneira simples de participar da comunidade. Quando esse gesto vira hábito, a solidariedade ganha espaço na rotina.',
  },
  {
    id: 'fernanda-melo', name: 'Fernanda Melo', role: 'Doador', kind: 'approved',
    text: 'Separar, conferir e organizar os itens para doação também é uma forma de carinho. Quem recebe merece o mesmo cuidado que teríamos com alguém de casa.',
  },
  {
    id: 'thiago-ribeiro', name: 'Thiago Ribeiro', role: 'Doador', kind: 'approved',
    text: 'O que me inspira é a ideia de fazer parte de uma corrente de cuidado. Cada pessoa contribui de um jeito, e todo gesto pode ser um começo.',
  },
];

export const donationTypes = [
  { id: 'roupas', name: 'Vestuário', calcName: 'Roupas', unitSingular: 'peça de roupa', unitPlural: 'peças de roupa', description: 'Roupas, calçados e cobertores.', icon: 'shirt' },
  { id: 'alimentos', name: 'Alimentos', calcName: 'Alimentos', unitSingular: 'item alimentício', unitPlural: 'itens alimentícios', description: 'Cestas básicas e alimentos não perecíveis.', icon: 'wheat' },
  { id: 'infantil', name: 'Infantil', calcName: 'Brinquedos e fraldas', unitSingular: 'item infantil', unitPlural: 'itens infantis', description: 'Brinquedos e fraldas.', icon: 'toy-brick' },
  { id: 'higiene', name: 'Higiene', calcName: 'Higiene', unitSingular: 'produto de higiene', unitPlural: 'produtos de higiene', description: 'Produtos de higiene pessoal.', icon: 'heart-handshake' },
] as const;

// Indicadores fornecidos pela instituição e confirmados pelo responsável em 21/11/2026.
export const impactStats = [
  { value: '150+', label: 'Famílias ajudadas' },
  { value: '3t', label: 'Alimentos arrecadados' },
  { value: '500+', label: 'Doações recebidas' },
  { value: '80+', label: 'Voluntários' },
] as const;

// Descrições neutras; sem nomes, datas ou atribuições não fornecidas.
const base = import.meta.env.BASE_URL;

export const gallery = [
  { src: `${base}images/galeria/acao-solidaria-comunidade.webp`, alt: 'Pessoas reunidas em ação solidária ao ar livre, com voluntários e caixas de doações.', label: 'Acolhimento à comunidade' },
  { src: `${base}images/galeria/voluntarios-evento-solidario.webp`, alt: 'Voluntários com camisas verdes em uma ação comunitária sob árvores.', label: 'Ação comunitária' },
  { src: `${base}images/galeria/voluntario-anjos-solidarios.webp`, alt: 'Voluntário sorrindo com a camisa verde do projeto durante uma ação.', label: 'Nossa equipe' },
  { src: `${base}images/galeria/distribuicao-alimentos.webp`, alt: 'Crianças recebendo alimentos em um ponto de distribuição organizado por voluntários.', label: 'Cuidado em ação' },
  { src: `${base}images/galeria/equipe-acao-comunitaria.webp`, alt: 'Equipe reunida em espaço público durante atividade de apoio à comunidade.', label: 'Solidariedade na prática' },
] as const;

export const whatsappHref = (text?: string) =>
  `https://wa.me/${site.whatsappDigits}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

export const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.address.street}, ${site.address.neighborhood}, ${site.address.city} - ${site.address.state}, ${site.address.country}`)}`;
