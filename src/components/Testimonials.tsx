import { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { testimonials, type Testimonial } from '../data/site';

const ROTATION_DELAY = 9000;

export default function Testimonials({ entries = testimonials }: { entries?: readonly Testimonial[] }) {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(() => !document.hidden);
  const section = useRef<HTMLElement>(null);
  const gesture = useRef<{ x: number; y: number } | null>(null);
  const playbackAtPointerDown = useRef<boolean | null>(null);
  const count = entries.length;
  const activeIndex = Math.min(current, Math.max(0, count - 1));
  const rotating = playing && !reducedMotion && !hovered && visible && pageVisible && count > 1;

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotion = () => {
      setReducedMotion(media.matches);
      if (media.matches) setPlaying(false);
    };
    const onVisibility = () => setPageVisible(!document.hidden);
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'mouse') setHovered(!!section.current?.contains(event.target as Node));
    };
    const onPointerOut = (event: PointerEvent) => { if (!event.relatedTarget) setHovered(false); };
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .25 });
    if (section.current) observer.observe(section.current);
    media.addEventListener('change', onMotion);
    document.addEventListener('visibilitychange', onVisibility);
    document.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerout', onPointerOut, { passive: true });
    return () => {
      observer.disconnect();
      media.removeEventListener('change', onMotion);
      document.removeEventListener('visibilitychange', onVisibility);
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerout', onPointerOut);
    };
  }, []);

  useEffect(() => {
    if (!rotating) return;
    const timer = window.setTimeout(() => setCurrent(index => (index + 1) % count), ROTATION_DELAY);
    return () => window.clearTimeout(timer);
  }, [rotating, current, count]);

  const select = (index: number) => {
    if (!count) return;
    setPlaying(false);
    setCurrent((index + count) % count);
  };
  if (!count) return null;

  return (
    <section ref={section} id="depoimentos" tabIndex={-1} className="testimonial-section section"
      aria-labelledby="testimonial-heading" aria-roledescription="carrossel"
      onFocusCapture={() => setPlaying(false)}
      onKeyDown={event => {
        if ((event.target as Element).closest('select')) return;
        if (event.altKey || event.ctrlKey || event.metaKey || count < 2) return;
        const targets: Record<string, number> = { ArrowLeft: activeIndex - 1, ArrowRight: activeIndex + 1, Home: 0, End: count - 1 };
        const target = targets[event.key];
        if (target !== undefined) { event.preventDefault(); select(target); }
      }}>
      <div className="container testimonial-grid">
        <div className="testimonial-left reveal">
          <span className="eyebrow"><span className="eyebrow-line" />UMA CORRENTE DE CUIDADO</span>
          <h2 id="testimonial-heading">Cada gesto deixa <em>uma marca.</em></h2>
          <p>{entries.some(entry => entry.kind === 'message') ? 'Um relato de quem doa e mensagens da instituição para inspirar novos gestos de solidariedade.' : 'A generosidade se multiplica quando as pessoas compartilham suas experiências.'}</p>
          {entries.some(entry => entry.kind === 'illustrative') && <p className="testimonial-demo-note">Os textos identificados como ilustrativos são exemplos, não relatos reais de doadores.</p>}
          <a className="text-link" href="#contato">Compartilhe sua experiência</a>
        </div>
        <div className="testimonial-carousel">
          <div id="testimonial-slides" className="testimonial-stage" aria-live={rotating ? 'off' : 'polite'} aria-atomic="true"
            onPointerDown={event => {
              if (event.pointerType === 'mouse' || (event.target as Element).closest('a, button')) return;
              gesture.current = { x: event.clientX, y: event.clientY };
            }}
            onPointerCancel={() => { gesture.current = null; }}
            onPointerUp={event => {
              const start = gesture.current;
              gesture.current = null;
              if (!start) return;
              const dx = event.clientX - start.x, dy = event.clientY - start.y;
              if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.3) select(activeIndex + (dx < 0 ? 1 : -1));
            }}>
            {entries.map((entry, index) => (
              <div key={entry.id} className={`testimonial-slide ${index === activeIndex ? 'is-active' : ''}`}
                role="group" aria-roledescription={entry.kind === 'message' ? 'mensagem' : 'depoimento'} aria-label={`${index + 1} de ${count}`} aria-hidden={index !== activeIndex}>
                <span className="testimonial-kind">{entry.kind === 'message' ? 'Mensagem da instituição' : entry.kind === 'illustrative' ? 'Exemplo ilustrativo' : entry.kind === 'provided' ? 'Relato fornecido · autorização pendente' : 'Depoimento'}</span>
                <blockquote className="testimonial-quote">
                  <span className="testimonial-quotes" aria-hidden="true">“</span>
                  <p>{entry.text}</p>
                  <footer>
                    <span className="testimonial-avatar" aria-hidden="true">{entry.name.split(' ').map(part => part[0]).slice(0, 2).join('')}</span>
                    <span><strong>{entry.name}</strong><small>{entry.role}</small></span>
                  </footer>
                </blockquote>
              </div>
            ))}
          </div>
          {count > 1 && <div className="testimonial-controls" role="group" aria-label="Controles dos depoimentos">
            {count > 5 ? <label className="testimonial-picker">
              <span aria-hidden="true">{String(activeIndex + 1).padStart(2, '0')} <span>/ {String(count).padStart(2, '0')}</span><ChevronDown size={15} /></span>
              <select aria-label="Escolher depoimento" aria-controls="testimonial-slides" value={activeIndex} onChange={event => select(Number(event.target.value))}>
                {entries.map((entry, index) => <option key={entry.id} value={index}>{index + 1}. {entry.kind === 'message' ? entry.role : entry.name}{entry.kind === 'illustrative' ? ' — ilustrativo' : ''}</option>)}
              </select>
            </label> : <><div className="testimonial-pagination" role="group" aria-label="Escolher depoimento">
              {entries.map((entry, index) => <button key={entry.id} type="button" className="testimonial-dot"
                aria-label={`Ver depoimento de ${entry.name}`} aria-current={index === activeIndex ? 'true' : undefined}
                aria-controls="testimonial-slides" onClick={() => select(index)}><span /></button>)}
            </div>
            <span className="testimonial-counter" aria-hidden="true">{String(activeIndex + 1).padStart(2, '0')} <span>/ {String(count).padStart(2, '0')}</span></span></>}
            <div className="testimonial-buttons">
              {!reducedMotion && <button type="button" className="testimonial-control testimonial-play" aria-controls="testimonial-slides"
                aria-label={playing ? 'Pausar troca automática' : 'Iniciar troca automática'}
                onPointerDown={() => { playbackAtPointerDown.current = playing; }}
                onClick={() => { setPlaying(!(playbackAtPointerDown.current ?? playing)); playbackAtPointerDown.current = null; }}>
                {playing ? <Pause size={17} aria-hidden="true" /> : <Play size={17} aria-hidden="true" />}
              </button>}
              <button type="button" className="testimonial-control" aria-label="Depoimento anterior" aria-controls="testimonial-slides" onClick={() => select(activeIndex - 1)}><ChevronLeft size={21} aria-hidden="true" /></button>
              <button type="button" className="testimonial-control" aria-label="Próximo depoimento" aria-controls="testimonial-slides" onClick={() => select(activeIndex + 1)}><ChevronRight size={21} aria-hidden="true" /></button>
            </div>
          </div>}
          <span className="sr-only">Use as setas do teclado ou deslize sobre o texto para mudar de depoimento.</span>
        </div>
      </div>
    </section>
  );
}
