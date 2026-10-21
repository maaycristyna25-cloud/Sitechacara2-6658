import { useState, type FormEvent } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Menu,
  Play,
  Waves,
  X,
} from "lucide-react";
import "../site.css";

const WHATSAPP_URL = "https://wa.me/qr/FYC2CISNIRTFL1";
const MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=Zuleica+Rodrigues+da+Silva+256+Na%C3%A7%C3%B5es+Sumar%C3%A9+SP";

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [copyState, setCopyState] = useState<"idle" | "copied" | "manual">("idle");
  const [message, setMessage] = useState("");
  const today = new Date().toLocaleDateString("en-CA");

  function handleBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formattedDate = new Date(`${date}T12:00:00`).toLocaleDateString("pt-BR");
    const text = `Olá! Gostaria de consultar a disponibilidade da Chácara NS para o dia ${formattedDate}, a partir das ${time}. Poderia me passar mais informações sobre a diária?`;
    setMessage(text);

    // A URL de QR fornecida não aceita mensagem pré-preenchida. Copiamos antes de abrir a conversa.
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
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Chácara NS, voltar ao início">
          <span className="brand-mark">
            NS<span className="brand-dot">.</span>
          </span>
          <span className="brand-name">
            CHÁCARA
            <br />
            SUMARÉ · SP
          </span>
        </a>
        <nav
          className={menuOpen ? "nav-links is-open" : "nav-links"}
          aria-label="Navegação principal"
        >
          <a href="#sobre" onClick={() => setMenuOpen(false)}>
            A chácara
          </a>
          <a href="#galeria" onClick={() => setMenuOpen(false)}>
            Galeria
          </a>
          <a href="#diarias" onClick={() => setMenuOpen(false)}>
            Diárias
          </a>
          <a href="#localizacao" onClick={() => setMenuOpen(false)}>
            Localização
          </a>
        </nav>
        <a className="header-cta" href="#reservar">
          Consultar disponibilidade <ArrowUpRight size={16} strokeWidth={1.6} />
        </a>
        <button
          className="menu-toggle"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-noise" aria-hidden="true" />
          <div className="hero-inner wrap">
            <div className="hero-copy">
              <div className="eyebrow light">
                <span className="eyebrow-line" /> UM REFÚGIO EM SUMARÉ, SP
              </div>
              <h1>
                O seu dia merece
                <br />
                <em>um lugar à parte.</em>
              </h1>
              <p>
                Um convite para desacelerar, reunir quem importa e aproveitar cada momento.
                Bem-vindo à Chácara NS.
              </p>
              <a className="button button-cream" href="#reservar">
                Planeje seu dia <ArrowUpRight size={18} strokeWidth={1.5} />
              </a>
            </div>
            <div className="hero-art" aria-hidden="true">
              <div className="water-orb">
                <div className="water-inner" />
              </div>
              <span className="hero-art-caption">01 / PAUSA &amp; ENCONTRO</span>
            </div>
          </div>
          <div className="hero-bottom wrap">
            <span>UM DIA PARA CHAMAR DE SEU</span>
            <a href="#sobre" aria-label="Conhecer a chácara">
              <span>EXPLORE O ESPAÇO</span>
              <ArrowDown size={17} />
            </a>
          </div>
        </section>

        <div className="fact-strip">
          <div className="wrap fact-inner">
            <span>
              <Waves size={19} strokeWidth={1.4} /> Piscina aquecida
            </span>
            <i />
            <span>
              <MapPin size={18} strokeWidth={1.4} /> Sumaré, São Paulo
            </span>
            <i />
            <span>
              <CalendarDays size={18} strokeWidth={1.4} /> Diárias durante a semana e aos fins de
              semana
            </span>
          </div>
        </div>

        <section className="intro section-pad wrap" id="sobre">
          <div className="section-index">
            <span>01 / SOBRE</span>
            <div className="index-rule" />
          </div>
          <div className="intro-content">
            <p className="eyebrow">BEM-VINDO À CHÁCARA NS</p>
            <h2>
              Tempo de qualidade
              <br />
              tem outro <em>ritmo.</em>
            </h2>
            <div className="intro-bottom">
              <p>
                Há dias que pedem uma pausa na rotina. Na Chácara NS, você encontra um espaço para
                curtir a companhia das pessoas que fazem o seu dia especial — com piscina aquecida
                para aproveitar ainda mais.
              </p>
              <a className="text-link" href="#galeria">
                Conheça o espaço <ArrowUpRight size={18} strokeWidth={1.4} />
              </a>
            </div>
          </div>
        </section>

        <section className="feature-section" aria-labelledby="feature-title">
          <div className="feature-art">
            <div className="pool-lines" aria-hidden="true" />
            <div className="art-note">
              REPRESENTAÇÃO GRÁFICA DA ÁGUA
              <br />
              FOTOS DO LOCAL EM BREVE
            </div>
          </div>
          <div className="feature-copy">
            <div className="eyebrow">O DESTAQUE DO SEU DIA</div>
            <Waves className="feature-icon" size={42} strokeWidth={1} />
            <h2 id="feature-title">
              Aproveite a<br />
              <em>piscina aquecida.</em>
            </h2>
            <p>
              Um mergulho, uma conversa à beira da piscina, mais tempo para ficar. Faça do seu dia
              uma boa lembrança.
            </p>
            <a className="text-link" href="#reservar">
              Consultar uma data <ArrowUpRight size={18} strokeWidth={1.4} />
            </a>
          </div>
        </section>

        <section className="gallery section-pad wrap" id="galeria">
          <div className="gallery-heading">
            <div>
              <p className="eyebrow">02 / O ESPAÇO</p>
              <h2>
                Um lugar para
                <br />
                <em>viver o momento.</em>
              </h2>
            </div>
            <p>
              As fotos e os vídeos reais da Chácara NS serão adicionados aqui em breve. Enquanto
              isso, fale com a gente para conhecer mais detalhes do espaço.
            </p>
          </div>
          <div className="gallery-grid">
            <div className="media-slot media-slot-large">
              <div className="slot-art slot-water">
                <Waves size={48} strokeWidth={0.8} />
              </div>
              <div className="slot-meta">
                <span>01 / PISCINA</span>
                <span>Foto real em breve</span>
              </div>
            </div>
            <div className="media-slot media-slot-small">
              <div className="slot-art slot-olive">
                <span className="slot-monogram">NS</span>
              </div>
              <div className="slot-meta">
                <span>02 / O ESPAÇO</span>
                <span>Foto real em breve</span>
              </div>
            </div>
            <div className="media-slot media-slot-video">
              <div className="slot-art slot-sand">
                <Play size={34} strokeWidth={1} />
              </div>
              <div className="slot-meta">
                <span>03 / UM TOUR PELO LOCAL</span>
                <span>Vídeo real em breve</span>
              </div>
            </div>
          </div>
          <div className="gallery-note">
            Quer ver o local antes de reservar?{" "}
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              Peça fotos e vídeos pelo WhatsApp <ArrowUpRight size={16} />
            </a>
          </div>
        </section>

        <section className="rates" id="diarias">
          <div className="wrap rates-inner">
            <div className="rates-heading">
              <p className="eyebrow light">03 / DIÁRIAS</p>
              <h2>
                Seu próximo encontro
                <br />
                <em>começa aqui.</em>
              </h2>
              <p>
                Escolha o melhor dia para aproveitar a Chácara NS. Consulte a disponibilidade antes
                de fazer planos.
              </p>
            </div>
            <div className="rates-list">
              <div className="rate-row">
                <div>
                  <span className="rate-number">01</span>
                  <h3>Segunda a sexta</h3>
                  <p>Diária em dias de semana</p>
                </div>
                <div className="rate-price">
                  <small>R$</small> 299,99
                </div>
              </div>
              <div className="rate-row">
                <div>
                  <span className="rate-number">02</span>
                  <h3>
                    Sábados, domingos
                    <br />e feriados
                  </h3>
                  <p>Diária em fins de semana e feriados</p>
                </div>
                <div className="rate-price">
                  <small>R$</small> 379,99
                </div>
              </div>
              <p className="rates-disclaimer">
                Valores informados pela Chácara NS. Disponibilidade e condições devem ser
                confirmadas pelo WhatsApp.
              </p>
              <a className="button button-outline" href="#reservar">
                Consultar disponibilidade <ArrowUpRight size={18} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </section>

        <section className="booking section-pad wrap" id="reservar">
          <div className="booking-copy">
            <p className="eyebrow">04 / RESERVAS</p>
            <h2>
              Vamos combinar
              <br />
              <em>o seu dia?</em>
            </h2>
            <p>
              Escolha a data e o horário que você tem em mente. Vamos abrir o WhatsApp para você
              consultar a disponibilidade diretamente com a Chácara NS.
            </p>
            <div className="booking-aside">
              <span className="aside-line" />
              <span>A reserva só é confirmada após conversar com a equipe pelo WhatsApp.</span>
            </div>
          </div>
          <div className="booking-panel">
            <p className="panel-kicker">CONSULTE SUA DATA</p>
            <h3>
              Conte quando você
              <br />
              quer vir.
            </h3>
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
              <button className="button button-dark" type="submit">
                Copiar pedido e abrir WhatsApp <ArrowUpRight size={18} strokeWidth={1.5} />
              </button>
            </form>
            <p className="panel-caption">
              O link de WhatsApp não preenche a mensagem sozinho. Depois de abrir, cole o pedido na
              conversa.
            </p>
            {copyState !== "idle" && (
              <output className="booking-feedback">
                {copyState === "copied"
                  ? "Pedido copiado. Cole a mensagem na conversa do WhatsApp."
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

        <section className="location" id="localizacao">
          <div className="location-card">
            <p className="eyebrow">05 / ONDE ESTAMOS</p>
            <h2>
              Mais perto do que
              <br />
              você <em>imagina.</em>
            </h2>
            <div className="location-address">
              <MapPin size={25} strokeWidth={1.2} />
              <address>
                  Zuleica Rodrigues da Silva, 256
                <br />
                Nações, Sumaré — SP
              </address>
            </div>
            <a className="text-link" href={MAP_URL} target="_blank" rel="noopener noreferrer">
              Ver rota no mapa <ArrowUpRight size={18} strokeWidth={1.4} />
            </a>
          </div>
          <div className="location-art" aria-hidden="true">
            <div className="map-grid" />
            <div className="map-pin">
              <span>NS</span>
            </div>
            <span className="map-label">SUMARÉ · SP</span>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap">
          <div className="footer-top">
            <div>
              <span className="footer-logo">
                NS<span>.</span>
              </span>
              <p>
                Um dia diferente começa com um convite.
                <br />
                Te esperamos na Chácara NS.
              </p>
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-contact"
            >
              Fale com a gente <ArrowUpRight size={30} strokeWidth={1} />
            </a>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} CHÁCARA NS</span>
            <span>SUMARÉ · SÃO PAULO</span>
            <a href="#inicio">VOLTAR AO TOPO ↑</a>
          </div>
        </div>
      </footer>
      <a
        className="floating-contact"
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar com a Chácara NS no WhatsApp"
      >
        Agendar pelo WhatsApp <ArrowRight size={16} />
      </a>
    </div>
  );
}

export default Index;
