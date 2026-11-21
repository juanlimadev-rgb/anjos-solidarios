import { useEffect, useRef, useState, type FormEvent, type ReactNode, type CSSProperties } from 'react';
import {
  Check, ChevronDown, ChevronLeft,
  ChevronRight, Copy, Droplets, ExternalLink, Gift, HandHeart,
  Heart, HeartHandshake, Instagram, Mail, MapPin, Menu, Minus, Package,
  Phone, Plus, Send, ShieldCheck, Shirt, ToyBrick, Truck,
  Wheat, X, Maximize2, type LucideIcon,
} from 'lucide-react';
import { donationTypes, gallery, impactStats, mapHref, site, whatsappHref } from './data/site';
import Testimonials from './components/Testimonials';

const logo = `${import.meta.env.BASE_URL}images/logo/anjos-solidarios.webp`;
type Category = (typeof donationTypes)[number]['id'];
const nav = [
  { label: 'Quem somos', href: '#quem-somos' },
  { label: 'O que doar', href: '#o-que-doar' },
  { label: 'Como doar', href: '#como-doar' },
  { label: 'Transparência', href: '#transparencia' },
  { label: 'Contato', href: '#contato' },
];

function useScrollReveal() {
  useEffect(() => {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const elements = document.querySelectorAll<HTMLElement>('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.07, rootMargin: '0px 0px -36px 0px' });
    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function Brand({ light = false }: { light?: boolean }) {
  return (
    <a href="#inicio" className={`brand ${light ? 'brand-light' : ''}`} aria-label="Anjos Solidários — voltar ao início">
      <span className="brand-symbol"><img src={logo} width="80" height="80" alt="" /></span>
      <span className="brand-text"><strong>Anjos Solidários</strong><small>PRÓ-ESPERANÇA</small></span>
    </a>
  );
}

function SectionHeading({ eyebrow, title, subtitle, centered = false, light = false }: {
  eyebrow: string; title: ReactNode; subtitle?: string; centered?: boolean; light?: boolean;
}) {
  return <div className={`section-heading reveal ${centered ? 'section-heading-centered' : ''} ${light ? 'section-heading-light' : ''}`}>
    <span className="eyebrow"><span className="eyebrow-line" />{eyebrow}</span>
    <h2>{title}</h2>
    {subtitle && <p>{subtitle}</p>}
  </div>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeButton = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState('');
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const observer = new ResizeObserver(() => document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`));
    observer.observe(header);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(`#${entry.target.id}`); });
    }, { rootMargin: '-15% 0px -55% 0px' });
    nav.forEach(item => { const section = document.querySelector(item.href); if (section) observer.observe(section); });
    const resize = () => { if (window.innerWidth > 1100) setOpen(false); };
    const outside = (event: PointerEvent) => { if (!headerRef.current?.contains(event.target as Node)) setOpen(false); };
    window.addEventListener('resize', resize);
    document.addEventListener('pointerdown', outside);
    return () => { observer.disconnect(); window.removeEventListener('resize', resize); document.removeEventListener('pointerdown', outside); };
  }, []);
  useEffect(() => {
    const onScroll = () => { setScrolled(window.scrollY > 25); if (window.scrollY < 200) setActive(''); };
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) { setOpen(false); closeButton.current?.focus(); }
    };
    document.addEventListener('keydown', onEscape);
    return () => document.removeEventListener('keydown', onEscape);
  }, [open]);
  const navigate = (href: string) => {
    setOpen(false);
    document.querySelector<HTMLElement>(href)?.focus({ preventScroll: true });
  };
  return <header ref={headerRef} className={`site-header ${scrolled ? 'header-scrolled' : ''}`}>
    <div className="header-inner container">
      <Brand />
      <nav aria-label="Navegação principal" className="desktop-nav">
        {nav.map(item => <a href={item.href} key={item.href} aria-current={active === item.href ? 'location' : undefined}>{item.label}</a>)}
      </nav>
      <div className="header-actions">
        <a className="btn btn-primary header-cta" href="#como-doar">Quero doar</a>
        <button ref={closeButton} className="mobile-toggle" type="button" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(x => !x)}>{open ? <X size={23} /> : <Menu size={23} />}</button>
      </div>
    </div>
    <nav id="mobile-nav" aria-label="Navegação móvel" className="mobile-nav" hidden={!open}>
      {nav.map(item => <a href={item.href} key={item.href} aria-current={active === item.href ? 'location' : undefined} onClick={() => navigate(item.href)}>{item.label}</a>)}
      <a className="btn btn-primary mobile-nav-cta" href="#como-doar" onClick={() => navigate('#como-doar')}>Quero fazer uma doação</a>
    </nav>
  </header>;
}

function Hero() {
  return <section id="inicio" tabIndex={-1} className="hero" aria-labelledby="hero-title">
    <div className="container hero-grid">
      <div className="hero-copy">
        <div className="hero-eyebrow"><Heart size={14} fill="currentColor" aria-hidden="true" /> UNIDOS PELO LAÇO DA CARIDADE</div>
        <h1 id="hero-title">Pequenos gestos.<br /><em>Grandes histórias.</em></h1>
        <p className="hero-description">{site.heroDescription}</p>
        <div className="hero-actions">
          <a className="btn btn-primary btn-large" href="#como-doar">Fazer doação</a>
          <a className="btn btn-outline btn-large" href={whatsappHref('Olá! Gostaria de saber mais sobre o Anjos Solidários.')} target="_blank" rel="noopener noreferrer">Falar conosco</a>
        </div>
        <div className="hero-signature"><span className="signature-heart"><Heart size={18} strokeWidth={1.5} /></span><span>Quem não vive para servir,<br />não serve para viver.</span></div>
      </div>
      <div className="hero-visual">
        <div className="hero-picture"><img src={gallery[0].src} alt={gallery[0].alt} decoding="async" width="900" height="894" /></div>
        <div className="hero-photo-caption"><span className="caption-dot" /> Solidariedade que aproxima pessoas</div>
        <svg className="hero-botanical" viewBox="0 0 100 160" fill="none" aria-hidden="true"><path d="M23 152C32 115 74 77 68 10M39 113C12 107 9 88 13 76C35 77 47 93 39 113ZM56 82C78 84 93 67 92 51C70 51 57 64 56 82ZM65 49C42 48 35 29 39 17C58 20 68 33 65 49" stroke="currentColor" strokeWidth="1.5" /><path d="M28 136C51 143 65 135 72 120C52 112 36 121 28 136Z" stroke="currentColor" strokeWidth="1.5" /></svg>
        <div className="hero-stamp" aria-hidden="true"><Heart size={24} fill="currentColor" /><span>AMOR EM<br />MOVIMENTO</span></div>
      </div>
    </div>
    <div className="hero-bottom-line"><div className="container"><span>UM GESTO PODE FAZER A DIFERENÇA</span><a href="#quem-somos" aria-label="Conhecer a instituição">CONHEÇA NOSSA CAUSA</a></div></div>
  </section>;
}

function About() {
  return <section id="quem-somos" tabIndex={-1} className="section about-section">
    <div className="container about-grid">
      <div className="about-images reveal">
        <div className="about-image-main"><img src={gallery[2].src} alt={gallery[2].alt} loading="lazy" width="893" height="897" /></div>
        <div className="about-image-secondary"><img src={gallery[4].src} alt={gallery[4].alt} loading="lazy" width="892" height="893" /></div>
        <div className="about-image-tag"><HeartHandshake size={22} /><span>Juntos, somos<br /><strong>mais fortes.</strong></span></div>
      </div>
      <div className="about-copy">
        <SectionHeading eyebrow="NOSSA ESSÊNCIA" title={<>A esperança começa <em>com um gesto.</em></>} />
        {site.about.split(/(?<=\.) /).map((paragraph, i) => <p key={paragraph} className={i === 0 ? 'about-lead' : undefined}>{paragraph}</p>)}
        <div className="about-signature"><img src={logo} width="156" height="156" loading="lazy" alt="Logo oficial Anjos Solidários, com dois anjos, corações e ramos delicados" /><p>{site.motto}</p></div>
        <a className="text-link" href="#o-que-doar">Descubra como ajudar</a>
      </div>
    </div>
  </section>;
}

const donationIcons: Record<(typeof donationTypes)[number]['id'], LucideIcon> = {
  roupas: Shirt, alimentos: Wheat, infantil: ToyBrick, higiene: Droplets,
};
function DonationCategories({ onSelect }: { onSelect: (id: Category) => void }) {
  return <section id="o-que-doar" tabIndex={-1} className="section donation-section">
    <div className="container">
      <SectionHeading eyebrow="CADA DOAÇÃO IMPORTA" title={<>O que você <em>pode doar?</em></>} subtitle="Existem muitas formas de transformar generosidade em cuidado. Escolha como você deseja contribuir." centered />
      <div className="donation-grid">
        {donationTypes.map((item, i) => {
          const Icon = donationIcons[item.id];
          return <a href="#calculadora" onClick={() => onSelect(item.id)} className="donation-card reveal" key={item.id} style={{ '--card-delay': `${i * 70}ms` } as CSSProperties}>
            <span className="donation-card-icon"><Icon size={32} strokeWidth={1.5} /></span>
            <h3>{item.name}</h3><p>{item.description}</p>
            <span className="donation-card-footer">Quero doar</span>
          </a>;
        })}
      </div>
    </div>
  </section>;
}

function ImpactCalculator({ category, onSelect, onRequest }: { category: Category; onSelect: (id: Category) => void; onRequest: (summary: string) => void }) {
  const [qty, setQty] = useState('5');
  const item = donationTypes.find(d => d.id === category)!;
  const quantity = Number(qty);
  const valid = qty.trim() !== '' && Number.isInteger(quantity) && quantity >= 1 && quantity <= 100000;
  const summary = `Você pretende doar ${quantity} ${quantity === 1 ? item.unitSingular : item.unitPlural}.`;
  const makeRequest = () => {
    if (!valid) return;
    onRequest(`${quantity} ${quantity === 1 ? item.unitSingular : item.unitPlural}`);
    document.getElementById('pickup-items')?.focus({ preventScroll: true });
    document.getElementById('solicitar-coleta')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };
  return <section id="calculadora" tabIndex={-1} className="section calculator-section">
    <div className="container calculator-grid">
      <div className="calculator-copy reveal">
        <div className="calculator-orbit"><HandHeart size={35} strokeWidth={1.4} /></div>
        <SectionHeading eyebrow="SEU GESTO CONTA" title={<>Toda contribuição <em>faz sentido.</em></>} />
        <p>Está pensando em doar? Selecione o tipo de item e a quantidade para organizar seu gesto de solidariedade.</p>
        <span className="calculator-note"><ShieldCheck size={17} /> Esta ferramenta resume sua intenção de doação; não estima beneficiários.</span>
      </div>
      <div className="calculator-panel reveal">
        <div className="calculator-panel-top"><span>PLANEJE SUA DOAÇÃO</span><Gift size={21} /></div>
        <label htmlFor="tipo-doacao">O que você gostaria de doar?</label>
        <div className="select-wrapper"><select id="tipo-doacao" value={category} onChange={e => onSelect(e.target.value as Category)}>{donationTypes.map(d => <option value={d.id} key={d.id}>{d.calcName}</option>)}</select><ChevronDown size={20} aria-hidden="true" /></div>
        <label htmlFor="quantidade-doacao">Quantidade aproximada</label>
        <div className="quantity-control">
          <button type="button" onClick={() => setQty(String(Math.max(1, Math.floor(quantity || 1) - 1)))} disabled={valid && quantity <= 1} aria-label="Diminuir quantidade"><Minus size={20} /></button>
          <input id="quantidade-doacao" type="number" inputMode="numeric" min="1" max="100000" step="1" value={qty} onChange={e => setQty(e.target.value)} aria-invalid={!valid} aria-describedby={!valid ? 'quantity-error' : undefined} />
          <button type="button" onClick={() => setQty(String(Math.min(100000, Math.floor(quantity || 0) + 1)))} disabled={valid && quantity >= 100000} aria-label="Aumentar quantidade"><Plus size={20} /></button>
        </div>
        {!valid && <p id="quantity-error" className="field-error" role="alert">Informe um número inteiro entre 1 e 100.000.</p>}
        <div className="calculator-result" role="status" aria-live="polite"><span>SEU RESUMO</span><p>{valid ? summary : 'Escolha a quantidade para continuar.'}</p><small>Um pequeno gesto. Uma nova possibilidade.</small></div>
        <button type="button" disabled={!valid} onClick={makeRequest} className="btn btn-primary btn-block">Prosseguir para coleta</button>
      </div>
    </div>
  </section>;
}

function HowToDonate() {
  return <section id="como-doar" tabIndex={-1} className="section how-section">
    <div className="container">
      <SectionHeading eyebrow="FAÇA PARTE DESSA CORRENTE" title={<>Como <em>ajudar?</em></>} subtitle="Escolha a forma mais simples para você. Cada contribuição ajuda a manter essa corrente de cuidado." centered />
      <div className="how-grid">
        <article className="how-card reveal"><div className="how-card-header"><MapPin size={28} strokeWidth={1.5} /></div><h3>Entrega presencial</h3><p>Leve suas doações diretamente ao nosso ponto de recebimento.</p><address><strong>{site.address.street}</strong><br />{site.address.neighborhood}<br />{site.address.city} – {site.address.state}<br /><span>{site.address.hours}</span></address><a className="how-link" href={mapHref} target="_blank" rel="noopener noreferrer">Ver rotas no Maps <ExternalLink size={17} /></a></article>
        <article className="how-card how-card-featured reveal"><div className="how-card-header"><Truck size={28} strokeWidth={1.5} /></div><h3>Solicitar coleta</h3><p>Quer doar, mas precisa de ajuda com a retirada? Envie sua solicitação pelo WhatsApp.</p><div className="how-small-illustration"><Package size={44} strokeWidth={1} /><span>A solidariedade chega mais longe quando a gente se une.</span></div><a className="how-link" href="#solicitar-coleta">Solicitar retirada</a></article>
        <article className="how-card reveal"><div className="how-card-header"><HandHeart size={28} strokeWidth={1.5} /></div><h3>Apoie via PIX</h3><p>Prefere contribuir financeiramente? Copie a chave PIX informada pela instituição.</p><div className="how-pix-logo"><Heart size={26} fill="currentColor" /><span>Um gesto de amor<br />também pode ser digital.</span></div><a className="how-link" href="#pix">Ver chave PIX</a></article>
      </div>
    </div>
  </section>;
}

type FormFields = { name: string; phone: string; address: string; city: string; items: string; };
const emptyForm: FormFields = { name: '', phone: '', address: '', city: '', items: '' };
const formatPhone = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits ? `(${digits}` : '';
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  const localLength = digits.length > 10 ? 5 : 4;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 2 + localLength)}-${digits.slice(2 + localLength)}`;
};
function PickupForm({ plannedItems }: { plannedItems: { text: string } | null }) {
  const [form, setForm] = useState<FormFields>(emptyForm);
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormFields | 'consent', string>>>({});
  useEffect(() => {
    if (plannedItems) { setForm(prev => ({ ...prev, items: plannedItems.text })); setSubmitted(false); setErrors(prev => ({ ...prev, items: undefined })); }
  }, [plannedItems]);
  const change = (field: keyof FormFields, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
    setSubmitted(false);
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next: typeof errors = {};
    if (form.name.trim().length < 2) next.name = 'Informe seu nome.';
    if (!/^[1-9]{2}[2-9]\d{7,8}$/.test(form.phone.replace(/\D/g, ''))) next.phone = 'Informe um telefone com DDD (10 ou 11 dígitos).';
    if (form.address.trim().length < 5) next.address = 'Informe o endereço para a retirada.';
    if (form.city.trim().length < 2) next.city = 'Informe sua cidade.';
    if (form.items.trim().length < 3) next.items = 'Descreva os itens para doação.';
    if (!consent) next.consent = 'Confirme antes de continuar para o WhatsApp.';
    setErrors(next);
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0];
      document.getElementById(first === 'consent' ? 'pickup-consent' : `pickup-${first}`)?.focus();
      return;
    }
    const msg = `Olá! Gostaria de solicitar uma coleta de doações para a Anjos Solidários Pró-Esperança.\n\nNome: ${form.name.trim()}\nTelefone: ${form.phone}\nEndereço: ${form.address.trim()}\nCidade: ${form.city.trim()}\nItens para doação: ${form.items.trim()}\n\nGostaria de verificar a disponibilidade para retirada.`;
    const url = whatsappHref(msg);
    const popup = window.open(url, '_blank');
    if (popup) popup.opener = null;
    else window.location.href = url;
    setSubmitted(true);
  };
  return <section id="solicitar-coleta" tabIndex={-1} className="section pickup-section">
    <div className="container pickup-grid">
      <div className="pickup-intro reveal">
        <SectionHeading eyebrow="A GENTE SE CONECTA" title={<>Vamos combinar <em>sua doação?</em></>} />
        <p>Preencha os dados para preparar uma mensagem de solicitação de retirada. O atendimento e a disponibilidade serão confirmados pela equipe no WhatsApp.</p>
        <div className="pickup-callout"><Truck size={25} /><span>O envio abre uma conversa no WhatsApp. A coleta só estará combinada após confirmação da instituição.</span></div>
      </div>
      <form className="pickup-form reveal" onSubmit={handleSubmit} noValidate aria-describedby="pickup-privacy">
        <div className="form-heading"><h3>Solicitar retirada</h3><span>É simples e rápido</span></div>
        <div className="form-row">
          <div className="field"><label htmlFor="pickup-name">Seu nome <span>*</span></label><input id="pickup-name" name="name" required maxLength={100} autoComplete="name" value={form.name} onChange={e => change('name', e.target.value)} placeholder="Como podemos chamar você?" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'error-name' : undefined} />{errors.name && <small id="error-name" className="field-error">{errors.name}</small>}</div>
          <div className="field"><label htmlFor="pickup-phone">WhatsApp com DDD <span>*</span></label><input id="pickup-phone" name="phone" required maxLength={100} type="tel" autoComplete="tel" inputMode="tel" value={form.phone} onChange={e => change('phone', formatPhone(e.target.value))} placeholder="(79) 99999-9999" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'error-phone' : undefined} />{errors.phone && <small id="error-phone" className="field-error">{errors.phone}</small>}</div>
        </div>
        <div className="form-row">
          <div className="field"><label htmlFor="pickup-address">Endereço para retirada <span>*</span></label><input id="pickup-address" name="address" required maxLength={250} autoComplete="street-address" value={form.address} onChange={e => change('address', e.target.value)} placeholder="Rua, número e bairro" aria-invalid={!!errors.address} aria-describedby={errors.address ? 'error-address' : undefined} />{errors.address && <small id="error-address" className="field-error">{errors.address}</small>}</div>
          <div className="field"><label htmlFor="pickup-city">Cidade <span>*</span></label><input id="pickup-city" name="city" required maxLength={100} autoComplete="address-level2" value={form.city} onChange={e => change('city', e.target.value)} placeholder="Sua cidade" aria-invalid={!!errors.city} aria-describedby={errors.city ? 'error-city' : undefined} />{errors.city && <small id="error-city" className="field-error">{errors.city}</small>}</div>
        </div>
        <div className="field"><label htmlFor="pickup-items">Itens para doação <span>*</span></label><textarea id="pickup-items" name="items" required maxLength={1500} rows={3} value={form.items} onChange={e => change('items', e.target.value)} placeholder="Ex.: 5 peças de roupa, 2 pacotes de alimentos..." aria-invalid={!!errors.items} aria-describedby={errors.items ? 'error-items' : undefined} />{errors.items && <small id="error-items" className="field-error">{errors.items}</small>}</div>
        <label className="check-field"><input id="pickup-consent" type="checkbox" required aria-invalid={!!errors.consent} aria-describedby={errors.consent ? 'error-consent' : undefined} checked={consent} onChange={e => { setConsent(e.target.checked); setSubmitted(false); setErrors(prev => ({ ...prev, consent: undefined })); }} /><span>Entendo que meus dados serão incluídos na mensagem enviada pelo WhatsApp à instituição para tratar da solicitação.</span></label>
        {errors.consent && <small id="error-consent" className="field-error" role="alert">{errors.consent}</small>}
        <button className="btn btn-primary btn-block form-submit" type="submit">Continuar para o WhatsApp <Send size={17} /></button>
        {submitted && <p className="form-message" role="status"><Check size={17} /> Conversa preparada. Envie a mensagem no WhatsApp para solicitar a retirada.</p>}
        <p id="pickup-privacy" className="form-privacy"><ShieldCheck size={14} /> O site não salva os dados preenchidos em um servidor.</p>
      </form>
    </div>
  </section>;
}

function Pix() {
  const [copied, setCopied] = useState(false);
  const [manualCopy, setManualCopy] = useState(false);
  const keyInput = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), 6000);
    return () => window.clearTimeout(timeout);
  }, [copied]);
  const copyKey = async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard indisponível');
      await navigator.clipboard.writeText(site.pixKey);
      setCopied(true);
      setManualCopy(false);
    } catch {
      setCopied(false);
      setManualCopy(true);
      keyInput.current?.focus();
      keyInput.current?.select();
    }
  };
  return <section id="pix" tabIndex={-1} className="pix-section">
    <div className="container pix-grid">
      <div className="pix-content reveal"><span className="eyebrow eyebrow-light"><span className="eyebrow-line" />CONTRIBUA COM AMOR</span><h2>Seu gesto pode ir <em>ainda mais longe.</em></h2><p>Se preferir, você também pode apoiar nossa causa via PIX. Copie a chave abaixo e confira os dados do destinatário no aplicativo do seu banco antes de confirmar.</p></div>
      <div className="pix-card reveal"><span className="pix-card-symbol"><Heart size={30} fill="currentColor" /></span><label htmlFor="pix-key" className="pix-card-kicker">CHAVE PIX DA INSTITUIÇÃO</label><input ref={keyInput} id="pix-key" className="pix-key" readOnly value={site.pixKey} onClick={e => e.currentTarget.select()} /><button type="button" className={'btn btn-copy btn-block ' + (copied ? 'copy-success' : '')} onClick={copyKey}>{copied ? <Check size={19} /> : <Copy size={19} />}{copied ? 'Chave copiada!' : 'Copiar chave PIX'}</button><small role="status">{copied ? 'Chave copiada. Cole no aplicativo do seu banco.' : manualCopy ? 'Não foi possível copiar automaticamente. A chave está selecionada: use Copiar no seu dispositivo.' : 'Confira o destinatário no banco antes de doar.'}</small></div>
    </div>
  </section>;
}

function Transparency() {
  return <section id="transparencia" tabIndex={-1} className="section transparency-section">
    <div className="container">
      <SectionHeading eyebrow="SOLIDARIEDADE EM NÚMEROS" title={<>Uma corrente de <em>esperança.</em></>} subtitle="Indicadores informados pela instituição sobre suas ações de solidariedade e cuidado com a comunidade." centered />
      <div className="stats-grid">{impactStats.map((item) => <div className="stat-item reveal" key={item.label}><strong>{item.value}</strong><span className="stat-label">{item.label}</span></div>)}</div>
    </div>
  </section>;
}

function Gallery() {
  const [current, setCurrent] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const isOpen = current !== null;
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.current?.showModal();
    return () => { document.body.style.overflow = previous; };
  }, [isOpen]);
  const close = () => dialog.current?.close();
  const restoreFocus = () => {
    setCurrent(null);
    lastFocus.current?.focus({ preventScroll: true });
  };
  return <section id="galeria" tabIndex={-1} className="section gallery-section">
    <div className="container">
      <div className="gallery-heading"><SectionHeading eyebrow="MOMENTOS REAIS" title={<>Solidariedade <em>em imagens.</em></>} subtitle="Registros das ações e dos encontros que fazem parte dessa história." /><span className="gallery-count">5 registros de cuidado</span></div>
      <div className="gallery-grid">{gallery.map((photo, i) => <button key={photo.src} className={'gallery-item gallery-item-' + (i + 1) + ' reveal'} type="button" onClick={e => { lastFocus.current = e.currentTarget; setCurrent(i); }} aria-haspopup="dialog" aria-label={'Ampliar imagem: ' + photo.label}><img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" width="900" height="900" /><span className="gallery-overlay"><span>{photo.label}</span><span className="gallery-expand"><Maximize2 size={18} /></span></span></button>)}</div>
      <p className="gallery-disclaimer">Fotografias reais das ações, fornecidas e autorizadas pela instituição.</p>
    </div>
    <dialog ref={dialog} className="lightbox" aria-labelledby="gallery-dialog-title" aria-describedby="gallery-instructions" onClose={restoreFocus} onClick={e => { if (e.target === e.currentTarget) close(); }} onKeyDown={e => {
      if (e.key === 'Tab') {
        const buttons = e.currentTarget.querySelectorAll<HTMLButtonElement>('button');
        const first = buttons[0], last = buttons[buttons.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        setCurrent(i => i === null ? null : (i + (e.key === 'ArrowRight' ? 1 : -1) + gallery.length) % gallery.length);
      }
    }}>
      <h2 id="gallery-dialog-title" className="sr-only">Galeria de ações solidárias</h2>
      <p id="gallery-instructions" className="sr-only">Use as setas para navegar pelas cinco fotografias e Escape para fechar.</p>
      <button type="button" className="lightbox-close" aria-label="Fechar galeria" onClick={close} autoFocus><X size={26} /></button>
      <button type="button" className="lightbox-prev" aria-label="Imagem anterior" onClick={() => setCurrent(i => i === null ? null : (i - 1 + gallery.length) % gallery.length)}><ChevronLeft size={28} /></button>
      {current !== null && <figure className="lightbox-figure"><img src={gallery[current].src} alt={gallery[current].alt} width="900" height="900" /><figcaption aria-live="polite">{gallery[current].label}<span>{current + 1} de {gallery.length}</span></figcaption></figure>}
      <button type="button" className="lightbox-next" aria-label="Próxima imagem" onClick={() => setCurrent(i => i === null ? null : (i + 1) % gallery.length)}><ChevronRight size={28} /></button>
    </dialog>
  </section>;
}

const faq = [
  { q: 'O que posso doar?', a: 'Recebemos doações de roupas, calçados, cobertores, alimentos não perecíveis, brinquedos, fraldas e produtos de higiene pessoal. Confirme os detalhes pelo WhatsApp antes da entrega.' },
  { q: 'Onde posso entregar minhas doações?', a: `${site.address.street}, ${site.address.neighborhood}, ${site.address.city} – ${site.address.state}. Horário informado: ${site.address.hours}.` },
  { q: 'Como posso solicitar uma coleta?', a: 'Preencha o formulário de solicitação de retirada neste site. Ele prepara uma mensagem no WhatsApp; a equipe informará se há disponibilidade para a coleta.' },
  { q: 'Posso fazer uma contribuição via PIX?', a: `Sim. A chave PIX informada pela instituição é ${site.pixKey}. Confirme o destinatário no aplicativo do banco antes de pagar.` },
];
function FAQ() {
  return <section className="section faq-section"><div className="container faq-grid"><SectionHeading eyebrow="TIRE SUAS DÚVIDAS" title={<>Perguntas <em>frequentes.</em></>} subtitle="Encontre respostas rápidas para as dúvidas mais comuns sobre como ajudar." /><div className="faq-items reveal">{faq.map((item, i) => <details key={item.q} className="faq-item" open={i === 0}><summary>{item.q}<Plus size={21} aria-hidden="true" /></summary><p>{item.a}</p></details>)}</div></div></section>;
}

function Contact() {
  return <section id="contato" tabIndex={-1} className="section contact-section"><div className="container"><SectionHeading eyebrow="ESTAMOS AQUI" title={<>Vamos conversar <em>sobre o bem?</em></>} subtitle="Entre em contato para tirar dúvidas, saber mais sobre as ações ou descobrir outras formas de participar." centered /><div className="contact-grid">
    <a href={whatsappHref('Olá! Gostaria de falar com a equipe Anjos Solidários.')} target="_blank" rel="noopener noreferrer" className="contact-card reveal"><span className="contact-icon"><Phone size={25} /></span><span className="contact-information"><small>WHATSAPP</small><strong>{site.whatsappDisplay}</strong></span></a>
    <a href={`mailto:${site.email}`} className="contact-card reveal"><span className="contact-icon"><Mail size={25} /></span><span className="contact-information"><small>E-MAIL</small><strong>{site.email}</strong></span></a>
    <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" className="contact-card reveal"><span className="contact-icon"><Instagram size={25} /></span><span className="contact-information"><small>INSTAGRAM</small><strong>{site.instagramHandle}</strong></span></a>
  </div></div></section>;
}

function Footer() {
  return <footer className="footer"><div className="container"><div className="footer-main"><div className="footer-about"><Brand light /><p>Unidos pelo laço da caridade. Transformando pequenos gestos em esperança para nossa comunidade.</p><a className="footer-instagram" href={site.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram dos Anjos Solidários"><Instagram size={19} /></a></div><div className="footer-column"><h3>Explore</h3><a href="#quem-somos">Quem somos</a><a href="#o-que-doar">O que doar</a><a href="#como-doar">Como doar</a><a href="#galeria">Galeria</a></div><div className="footer-column"><h3>Participe</h3><a href="#solicitar-coleta">Solicitar coleta</a><a href="#pix">Apoiar via PIX</a><a href="#transparencia">Transparência</a><a href="#contato">Contato</a></div><div className="footer-column footer-address"><h3>Onde estamos</h3><p>{site.address.street}<br />{site.address.neighborhood}<br />{site.address.city} – {site.address.state}</p><a href={mapHref} target="_blank" rel="noopener noreferrer">Ver no mapa <ExternalLink size={14} /></a></div></div><details id="privacidade" className="footer-privacy"><summary>Privacidade e uso de dados</summary><div><p>Os campos de nome, telefone, endereço, cidade e itens para doação ficam nesta página enquanto você preenche o formulário. Ao selecionar “Continuar para o WhatsApp”, esses dados são incluídos no endereço da conversa aberta nesse serviço. Você ainda precisa enviar a mensagem; a instituição responde sobre a disponibilidade da coleta.</p><p>Este site não registra pedidos nem grava os campos do formulário em um banco de dados. A hospedagem é fornecida pelo Netlify e as fontes pelo Google Fonts. Esses serviços podem tratar dados técnicos da navegação de acordo com suas próprias políticas. Ao abrir WhatsApp, Instagram ou Google Maps, você passa a usar também os serviços dessas plataformas.</p><p>Para dúvidas sobre o uso dos dados e solicitações de privacidade, fale com a instituição pelo e-mail <a href={`mailto:${site.email}`}>{site.email}</a>.</p></div></details><div className="footer-bottom"><span>© 2026 Anjos Solidários Pró-Esperança. Todos os direitos reservados.</span><span>Feito com <Heart size={14} fill="currentColor" /> para transformar vidas.</span></div></div></footer>;
}

export default function App() {
  useScrollReveal();
  const [category, setCategory] = useState<Category>('roupas');
  const [plannedItems, setPlannedItems] = useState<{ text: string } | null>(null);
  return <>
    <a className="skip-link" href="#main-content">Pular para o conteúdo</a>
    <Header />
    <main id="main-content" tabIndex={-1}>
      <Hero /><About /><DonationCategories onSelect={setCategory} /><ImpactCalculator category={category} onSelect={setCategory} onRequest={text => setPlannedItems({ text })} /><HowToDonate /><PickupForm plannedItems={plannedItems} /><Pix /><Transparency /><Gallery /><Testimonials /><FAQ /><Contact />
    </main>
    <Footer />
    <a className="floating-whatsapp" href={whatsappHref('Olá! Gostaria de falar com a equipe Anjos Solidários.')} target="_blank" rel="noopener noreferrer" aria-label="Entrar em contato pelo WhatsApp"><Phone size={25} /><span className="floating-tooltip">Fale conosco</span></a>
  </>;
}
