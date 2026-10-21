import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MapPin,
  Menu,
  Play,
  Waves,
  X,
} from "lucide-react";
import "../fresh.css";

const WHATSAPP_URL = "https://wa.me/qr/FYC2CISNIRTFL1";
const MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=Zuleica+Rodrigues+da+Silva+256+Na%C3%A7%C3%B5es+Sumar%C3%A9+SP";

const photos = [
  {
    src: "/images/pool-hero.webp",
    alt: "Piscina iluminada e área de convivência da Chácara NS",
    label: "Piscina & lazer",
  },
  {
    src: "/images/courtyard-day.webp",
    alt: "Área externa da Chácara NS durante o dia",
    label: "Área externa",
  },
  {
    src: "/images/courtyard-sunset.webp",
    alt: "Área da piscina ao entardecer na Chácara NS",
    label: "Fim de tarde",
  },
  {
    src: "/images/pool-and-bar.webp",
    alt: "Piscina e balcão da Chácara NS",
    label: "Espaço de convivência",
  },
  { src: "/images/kitchen.webp", alt: "Cozinha da Chácara NS", label: "Cozinha" },
  {
    src: "/images/pool-night.webp",
    alt: "Piscina da Chácara NS à noite",
    label: "Piscina à noite",
  },
  { src: "/images/dining.webp", alt: "Mesa e área interna da Chácara NS", label: "Mais detalhes" },
  {
    src: "/images/pool-lights.webp",
    alt: "Piscina iluminada de azul na Chácara NS",
    label: "Noite iluminada",
  },
];

const videos = [
  {
    src: "/videos/tour-espaco.mp4",
    poster: "/images/tour-espaco-poster.jpg",
    title: "Um passeio pela chácara",
    duration: "2 min 05 s",
  },
  {
    src: "/videos/visita-noite.mp4",
    poster: "/images/visita-noite-poster.jpg",
    title: "O espaço à noite",
    duration: "36 s",
  },
  {
    src: "/videos/piscina-noite.mp4",
    poster: "/images/piscina-noite-poster.jpg",
    title: "Piscina iluminada",
    duration: "23 s",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePhoto, setActivePhoto] = useState<number | null>(null);
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [copyState, setCopyState] = useState<"idle" | "copied" | "manual">("idle");
  const [message, setMessage] = useState("");
  const today = new Date().toLocaleDateString("en-CA");

  useEffect(() => {
    if (activePhoto === null && activeVideo === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActivePhoto(null);
        setActiveVideo(null);
      }
      if (activePhoto !== null && event.key === "ArrowRight")
        setActivePhoto((activePhoto + 1) % photos.length);
      if (activePhoto !== null && event.key === "ArrowLeft")
        setActivePhoto((activePhoto - 1 + photos.length) % photos.length);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activePhoto, activeVideo]);

  function handleBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formattedDate = new Date(`${date}T12:00:00`).toLocaleDateString("pt-BR");
    const text = `Olá! Gostaria de consultar a disponibilidade da Chácara NS para o dia ${formattedDate}, a partir das ${time}. Poderia me passar mais informações sobre a diária?`;
    setMessage(text);
    try {
      const field = document.createElement("textarea");
      field.value = text;
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      const copied = document.execCommand("copy");
      document.body.removeChild(field);
      setCopyState(copied ? "copied" : "manual");
    } catch {
      setCopyState("manual");
    }
    window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="ns-site">
      <header className="ns-header">
        <div className="ns-container header-inner">
          <a className="ns-logo" href="#inicio" aria-label="Chácara NS — início">
            <span className="logo-badge">
              <Waves size={24} strokeWidth={2.3} />
            </span>
            <span>
              <strong>
                Chácara <b>NS</b>
              </strong>
              <small>SEU REFÚGIO EM SUMARÉ</small>
            </span>
          </a>
          <nav className={menuOpen ? "ns-nav open" : "ns-nav"} aria-label="Navegação principal">
            <a href="#inicio" onClick={() => setMenuOpen(false)}>
              Início
            </a>
            <a href="#espaco" onClick={() => setMenuOpen(false)}>
              O espaço
            </a>
            <a href="#galeria" onClick={() => setMenuOpen(false)}>
              Fotos e vídeos
            </a>
            <a href="#diarias" onClick={() => setMenuOpen(false)}>
              Diárias
            </a>
            <a href="#localizacao" onClick={() => setMenuOpen(false)}>
              Localização
            </a>
          </nav>
          <a className="pill header-action" href="#reservar">
            Agendar meu dia <ArrowUpRight size={17} />
          </a>
          <button
            className="mobile-menu"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main>
        <section className="ns-hero" id="inicio">
          <img
            className="hero-image"
            src="/images/pool-hero.webp"
            alt="Piscina aquecida e área de lazer da Chácara NS"
            fetchPriority="high"
          />
          <div className="hero-shade" />
          <div className="ns-container hero-content">
            <span className="hero-chip">
              <span className="chip-sun" /> UM LUGAR ESPECIAL EM SUMARÉ · SP
            </span>
            <h1>
              Seu melhor dia
              <br />
              começa <em>aqui.</em>
            </h1>
            <p>
              Piscina aquecida, bons encontros e um espaço todo especial para aproveitar o dia do
              seu jeito.
            </p>
            <div className="hero-buttons">
              <a className="pill pill-bright" href="#reservar">
                Quero agendar <ArrowUpRight size={19} />
              </a>
              <a className="hero-text-link" href="#galeria">
                Conhecer o espaço <ArrowDown size={17} />
              </a>
            </div>
          </div>
          <div className="hero-location">
            <MapPin size={16} /> NAÇÕES · SUMARÉ / SP
          </div>
        </section>

        <section className="quick-bar ns-container" aria-label="Acesso rápido à reserva">
          <div className="quick-item">
            <span className="quick-icon">
              <Waves size={22} />
            </span>
            <div>
              <small>PARA APROVEITAR</small>
              <strong>Piscina aquecida</strong>
            </div>
          </div>
          <div className="quick-item">
            <span className="quick-icon">
              <CalendarDays size={21} />
            </span>
            <div>
              <small>ESCOLHA O SEU DIA</small>
              <strong>Diárias disponíveis</strong>
            </div>
          </div>
          <div className="quick-item">
            <span className="quick-icon">
              <MapPin size={21} />
            </span>
            <div>
              <small>PERTINHO DE VOCÊ</small>
              <strong>Sumaré, São Paulo</strong>
            </div>
          </div>
          <a className="pill quick-button" href="#reservar">
            Consultar data <ArrowRight size={18} />
          </a>
        </section>

        <section className="welcome ns-container ns-section" id="espaco">
          <div className="welcome-photos">
            <div className="welcome-main-image">
              <img
                src="/images/courtyard-day.webp"
                alt="Área externa da Chácara NS durante o dia"
                loading="lazy"
              />
            </div>
            <div className="welcome-second-image">
              <img
                src="/images/pool-and-bar.webp"
                alt="Piscina e área de convivência da Chácara NS"
                loading="lazy"
              />
            </div>
            <span className="welcome-sticker">
              <Waves size={21} /> SEU DIA
              <br />
              MAIS LEVE
            </span>
          </div>
          <div className="welcome-copy">
            <span className="overline">
              BEM-VINDO À CHÁCARA NS <span className="leaf-dot">✳</span>
            </span>
            <h2>
              Um lugar para
              <br />
              <em>relaxar, reunir</em>
              <br />e aproveitar.
            </h2>
            <p>
              Uma pausa na rotina fica ainda melhor quando a gente divide com quem gosta. Conheça um
              espaço acolhedor para curtir, conversar e fazer boas memórias.
            </p>
            <div className="welcome-highlights">
              <span>
                <Check size={16} /> Piscina aquecida
              </span>
              <span>
                <Check size={16} /> Espaços para conviver
              </span>
              <span>
                <Check size={16} /> Em Sumaré, SP
              </span>
            </div>
            <a className="pill" href="#galeria">
              Veja as fotos reais <ArrowRight size={17} />
            </a>
          </div>
        </section>

        <section className="things-section ns-section">
          <div className="ns-container">
            <div className="section-top center">
              <span className="overline">UM POUCO DO NOSSO ESPAÇO</span>
              <h2>
                O cenário para um dia <em>bem vivido.</em>
              </h2>
              <p>
                Da piscina aos cantinhos para sentar e conversar: veja o que espera por você na
                Chácara NS.
              </p>
            </div>
            <div className="things-grid">
              <article className="thing-card">
                <img
                  src="/images/pool-hero.webp"
                  alt="Piscina aquecida da Chácara NS"
                  loading="lazy"
                />
                <div>
                  <span className="thing-icon">
                    <Waves size={19} />
                  </span>
                  <h3>Piscina aquecida</h3>
                  <p>Para aproveitar seu dia na água.</p>
                </div>
              </article>
              <article className="thing-card">
                <img
                  src="/images/courtyard-sunset.webp"
                  alt="Área externa da Chácara NS ao entardecer"
                  loading="lazy"
                />
                <div>
                  <span className="thing-icon">
                    <Clock3 size={19} />
                  </span>
                  <h3>Área de convivência</h3>
                  <p>Espaço para reunir e desacelerar.</p>
                </div>
              </article>
              <article className="thing-card">
                <img src="/images/kitchen.webp" alt="Cozinha da Chácara NS" loading="lazy" />
                <div>
                  <span className="thing-icon">
                    <Check size={19} />
                  </span>
                  <h3>Cozinha</h3>
                  <p>Um ambiente para completar o encontro.</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="gallery-section ns-section ns-container" id="galeria">
          <div className="section-top gallery-title">
            <div>
              <span className="overline">CONHEÇA CADA DETALHE</span>
              <h2>
                O espaço, <em>de verdade.</em>
              </h2>
            </div>
            <p>Todas as imagens abaixo são da Chácara NS. Toque para ver em tamanho maior.</p>
          </div>
          <div className="photo-grid">
            {photos.slice(0, 6).map((photo, index) => (
              <button
                className={`photo-tile photo-${index}`}
                key={photo.src}
                onClick={() => setActivePhoto(index)}
                aria-label={`Ampliar foto: ${photo.label}`}
              >
                <img src={photo.src} alt={photo.alt} loading="lazy" />
                <span className="photo-caption">
                  {photo.label}
                  <ArrowUpRight size={17} />
                </span>
              </button>
            ))}
          </div>
          <button className="gallery-more" onClick={() => setActivePhoto(6)}>
            Ver mais fotos <ArrowRight size={18} />
          </button>
        </section>

        <section className="videos-section ns-section" id="videos">
          <div className="ns-container">
            <div className="section-top center">
              <span className="overline">APERTE O PLAY</span>
              <h2>
                Um tour antes <em>de chegar.</em>
              </h2>
              <p>
                Veja vídeos reais da chácara e imagine como pode ser o seu próximo dia por aqui.
              </p>
            </div>
            <div className="videos-grid">
              {videos.map((video, index) => (
                <button
                  className="video-card"
                  key={video.src}
                  onClick={() => setActiveVideo(index)}
                  aria-label={`Reproduzir vídeo: ${video.title}`}
                >
                  <div className="video-thumb">
                    <img src={video.poster} alt="" loading="lazy" />
                    <span className="play-button">
                      <Play size={24} fill="currentColor" />
                    </span>
                    <span className="video-duration">{video.duration}</span>
                  </div>
                  <span className="video-title">
                    {video.title}
                    <ArrowUpRight size={18} />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="rates-section ns-section" id="diarias">
          <div className="ns-container rates-layout">
            <div className="rates-copy">
              <span className="overline">UM DIA ESPECIAL, UM VALOR CLARO</span>
              <h2>
                Escolha quando
                <br />a gente se <em>vê.</em>
              </h2>
              <p>
                Encontre a melhor data para aproveitar o espaço. Os valores abaixo são por diária.
              </p>
              <div className="rates-deco">
                <Waves size={80} strokeWidth={0.8} />
              </div>
            </div>
            <div className="price-stack">
              <article className="price-card">
                <div className="price-label">
                  <span>01 / DURANTE A SEMANA</span>
                  <h3>Segunda a sexta</h3>
                  <p>Diária</p>
                </div>
                <div className="price-value">
                  <small>R$</small> 299<span>,99</span>
                </div>
              </article>
              <article className="price-card featured">
                <div className="price-label">
                  <span>02 / DIAS DE FOLGA</span>
                  <h3>
                    Sábados, domingos
                    <br />e feriados
                  </h3>
                  <p>Diária</p>
                </div>
                <div className="price-value">
                  <small>R$</small> 379<span>,99</span>
                </div>
              </article>
              <p className="price-note">
                Consulte disponibilidade e condições diretamente pelo WhatsApp. O agendamento não é
                confirmado automaticamente pelo site.
              </p>
              <a className="pill" href="#reservar">
                Consultar disponibilidade <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </section>

        <section className="booking-section ns-section ns-container" id="reservar">
          <div className="booking-side">
            <span className="overline">VAMOS COMBINAR?</span>
            <h2>
              Seu próximo dia bom
              <br />
              está a um <em>oi.</em>
            </h2>
            <p>
              Escolha uma data e um horário para consultar. O pedido será copiado e o WhatsApp
              abrirá para você colar a mensagem na conversa.
            </p>
            <div className="booking-photo">
              <img
                src="/images/courtyard-sunset.webp"
                alt="Área externa da Chácara NS ao entardecer"
                loading="lazy"
              />
              <span>ESPERAMOS POR VOCÊ!</span>
            </div>
          </div>
          <div className="booking-form-card">
            <span className="form-chip">
              <CalendarDays size={16} /> CONSULTE SUA DATA
            </span>
            <h3>Quando você quer vir?</h3>
            <p>Conte para a gente e confirme a disponibilidade pelo WhatsApp.</p>
            <form onSubmit={handleBooking}>
              <label htmlFor="booking-date">Data desejada</label>
              <input
                id="booking-date"
                aria-label="Data desejada"
                type="date"
                min={today}
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  setCopyState("idle");
                }}
                required
              />
              <label htmlFor="booking-time">Horário desejado</label>
              <input
                id="booking-time"
                aria-label="Horário desejado"
                type="time"
                value={time}
                onChange={(e) => {
                  setTime(e.target.value);
                  setCopyState("idle");
                }}
                required
              />
              <button className="pill form-submit" type="submit">
                Copiar pedido e abrir WhatsApp <ArrowUpRight size={18} />
              </button>
            </form>
            <span className="form-hint">
              A reserva será combinada diretamente no WhatsApp; esta consulta não confirma a data.
            </span>
            {copyState !== "idle" && (
              <output className="booking-feedback">
                {copyState === "copied"
                  ? "Pedido copiado! Cole a mensagem na conversa do WhatsApp."
                  : "Não foi possível copiar automaticamente. Copie a mensagem abaixo e envie pelo WhatsApp."}
                {copyState === "manual" && (
                  <textarea
                    readOnly
                    aria-label="Mensagem para copiar"
                    value={message}
                    onFocus={(e) => e.target.select()}
                  />
                )}
              </output>
            )}
          </div>
        </section>

        <section className="location-section ns-section" id="localizacao">
          <div className="ns-container location-layout">
            <div>
              <span className="overline">VENHA NOS VISITAR</span>
              <h2>
                Fácil de encontrar.
                <br />
                <em>Difícil de esquecer.</em>
              </h2>
              <p>
                Estamos no bairro Nações, em Sumaré, São Paulo. Veja o caminho e venha aproveitar.
              </p>
              <div className="address-line">
                <MapPin size={23} />
                <address>
                  Zuleica Rodrigues da Silva, 256
                  <br />
                  Nações · Sumaré / SP
                </address>
              </div>
              <a className="pill" href={MAP_URL} target="_blank" rel="noopener noreferrer">
                Traçar rota no mapa <ArrowUpRight size={17} />
              </a>
            </div>
            <div className="location-photo">
              <img
                src="/images/pool-and-bar.webp"
                alt="Piscina e espaço de convivência da Chácara NS"
                loading="lazy"
              />
              <span className="location-pill">
                <MapPin size={16} /> SUMARÉ · SP
              </span>
            </div>
          </div>
        </section>

        <section className="final-cta">
          <div className="ns-container">
            <span className="overline">A CHÁCARA NS ESPERA POR VOCÊ</span>
            <h2>
              Vamos fazer desse dia
              <br />
              uma <em>boa lembrança?</em>
            </h2>
            <a
              className="pill pill-white"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Conversar no WhatsApp <ArrowUpRight size={18} />
            </a>
          </div>
        </section>
      </main>

      <footer className="ns-footer">
        <div className="ns-container">
          <div className="footer-main">
            <div>
              <a className="ns-logo footer-logo" href="#inicio">
                <span className="logo-badge">
                  <Waves size={23} />
                </span>
                <span>
                  <strong>
                    Chácara <b>NS</b>
                  </strong>
                  <small>SEU REFÚGIO EM SUMARÉ</small>
                </span>
              </a>
              <p>
                Um espaço para bons encontros
                <br />e dias que valem a pena.
              </p>
            </div>
            <div>
              <strong>Explore</strong>
              <a href="#espaco">O espaço</a>
              <a href="#galeria">Fotos e vídeos</a>
              <a href="#diarias">Diárias</a>
            </div>
            <div>
              <strong>Visite</strong>
              <span>Zuleica Rodrigues da Silva, 256</span>
              <span>Nações, Sumaré · SP</span>
              <a href={MAP_URL} target="_blank" rel="noopener noreferrer">
                Como chegar ↗
              </a>
            </div>
            <div>
              <strong>Fale com a gente</strong>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                Agendar pelo WhatsApp ↗
              </a>
            </div>
          </div>
          <div className="footer-end">
            <span>© {new Date().getFullYear()} Chácara NS · Sumaré, SP</span>
            <a href="#inicio">Voltar ao início ↑</a>
          </div>
        </div>
      </footer>
      <a className="mobile-whatsapp" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
        Agendar no WhatsApp <ArrowUpRight size={18} />
      </a>

      {activePhoto !== null && (
        <dialog open className="lightbox" aria-modal="true" aria-label="Galeria de fotos">
          <button
            className="lightbox-backdrop"
            aria-label="Fechar galeria"
            onClick={() => setActivePhoto(null)}
          />
          <button
            className="modal-close"
            aria-label="Fechar foto"
            onClick={() => setActivePhoto(null)}
          >
            <X />
          </button>
          <button
            className="lightbox-prev"
            aria-label="Foto anterior"
            onClick={(e) => {
              e.stopPropagation();
              setActivePhoto((activePhoto - 1 + photos.length) % photos.length);
            }}
          >
            <ChevronLeft />
          </button>
          <img src={photos[activePhoto].src} alt={photos[activePhoto].alt} />
          <button
            className="lightbox-next"
            aria-label="Próxima foto"
            onClick={(e) => {
              e.stopPropagation();
              setActivePhoto((activePhoto + 1) % photos.length);
            }}
          >
            <ChevronRight />
          </button>
          <span className="lightbox-caption">
            {photos[activePhoto].label} · {activePhoto + 1} / {photos.length}
          </span>
        </dialog>
      )}
      {activeVideo !== null && (
        <dialog
          open
          className="lightbox video-modal"
          aria-modal="true"
          aria-label={videos[activeVideo].title}
        >
          <button
            className="lightbox-backdrop"
            aria-label="Fechar vídeo"
            onClick={() => setActiveVideo(null)}
          />
          <button
            className="modal-close"
            aria-label="Fechar vídeo"
            onClick={() => setActiveVideo(null)}
          >
            <X />
          </button>
          <video
            src={videos[activeVideo].src}
            poster={videos[activeVideo].poster}
            aria-label={videos[activeVideo].title}
            autoPlay
            controls
            playsInline
          >
            <track kind="captions" src="/videos/descricao.vtt" srcLang="pt-BR" label="Português" />
          </video>
          <span className="lightbox-caption">{videos[activeVideo].title}</span>
        </dialog>
      )}
    </div>
  );
}
