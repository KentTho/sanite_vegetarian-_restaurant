/* ============================================================
   Sanité Chay — Preloader + Navbar + Hero
   ============================================================ */

/* ---------- PROMPT 03 — Sanité Lotus Opening (preloader) ----------
   Hoa sen nở (lấy cảm hứng từ lotus trong DishModal, làm sang hơn) + logo Sanité
   trên nền emerald. Tự fade-out, không kẹt scroll, tôn trọng reduced-motion. */
const PRELOADER_VISIBLE_MS = 2800;
const PRELOADER_FADE_MS = 700;
const PRELOADER_REDUCED_VISIBLE_MS = 1000;
const PRELOADER_REDUCED_FADE_MS = 250;

function Preloader() {
  const [done, setDone] = useState(false);  // bắt đầu fade-out
  const [gone, setGone] = useState(false);  // unmount khỏi DOM
  useLockBodyScroll(!gone);                  // khóa scroll trong lúc preload, trả lại khi gone

  useEffect(() => {
    const reduced = prefersReduced();
    const showMs = reduced ? PRELOADER_REDUCED_VISIBLE_MS : PRELOADER_VISIBLE_MS;
    const fadeMs = reduced ? PRELOADER_REDUCED_FADE_MS : PRELOADER_FADE_MS;
    const t1 = setTimeout(() => setDone(true), showMs);
    const t2 = setTimeout(() => setGone(true), showMs + fadeMs);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (gone) return null;
  return (
    <div className={`preloader ${done ? 'is-done' : ''}`} role="status" aria-live="polite" aria-hidden={done}>
      <div className="preloader-inner">
        <LotusMark size={132} className="preloader-lotus" />
        <div className="preloader-logo-card">
          <img src="assets/brand/sanite-logo.png" alt="Sanité Chay" />
        </div>
        <p className="preloader-name">Sanité Chay</p>
        <p className="preloader-tag">Một bữa chay ấm lành đang được chuẩn bị…</p>
      </div>
    </div>
  );
}

const NAV_LINKS = [
  { label: 'Câu chuyện', href: '#story' },
  { label: 'Thực đơn', href: '#menu' },
  { label: 'Không gian', href: '#space' },
  { label: 'Đánh giá', href: '#reviews' },
  { label: 'Liên hệ', href: '#contact' },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header
        className={`nav-root ${scrolled ? 'scrolled' : ''}`}
        style={{
          position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 50,
          background: scrolled ? 'rgba(245,241,230,0.82)' : 'rgba(245,241,230,0.55)',
          backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
          borderBottom: `1px solid ${scrolled ? 'rgba(90,75,68,0.12)' : 'rgba(90,75,68,0)'}`,
          transition: 'background .4s ease, border-color .4s ease',
        }}
      >
        <nav className="nav-inner">
          <a href="#top" aria-label="Sanité Chay — về đầu trang" className="nav-logo">
            <img src="assets/brand/sanite-logo.png" alt="Sanité Chay" />
          </a>

          <div className="nav-links">
            {NAV_LINKS.map((l, i) => (
              <React.Fragment key={l.href}>
                <a href={l.href} className="nav-link">{l.label}</a>
                {i < NAV_LINKS.length - 1 && <span className="nav-dot" aria-hidden="true">·</span>}
              </React.Fragment>
            ))}
          </div>

          <a href={SANITE.tel} className="pill pill-primary nav-cta">Đặt bàn / Gọi ngay</a>

          <button
            className="nav-burger"
            aria-label={open ? 'Đóng menu' : 'Mở menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`burger-bar ${open ? 'b1' : ''}`} />
            <span className={`burger-bar ${open ? 'b2' : ''}`} />
            <span className={`burger-bar ${open ? 'b3' : ''}`} />
          </button>
        </nav>
      </header>

      {/* Mobile overlay */}
      <div
        className="mobile-overlay"
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
        }}
        aria-hidden={!open}
      >
        <img src="assets/brand/sanite-logo.png" alt="Sanité Chay" className="overlay-logo" />
        <div className="overlay-links">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={close} className="overlay-link">{l.label}</a>
          ))}
        </div>
        <div className="overlay-cta">
          <a href={SANITE.tel} className="pill pill-primary" onClick={close}>Gọi {SANITE.phone}</a>
          <a href={SANITE.maps} target="_blank" rel="noopener noreferrer" className="pill pill-outline-green" onClick={close}>Mở Google Maps</a>
        </div>
      </div>
    </>
  );
}

/* ---------- Hero ---------- */
const HERO_SLIDES = [
  {
    id: 'interior-main',
    src: 'assets/gallery/sanite-interior.png',
    alt: 'Không gian ấm áp bên trong nhà hàng chay Sanité',
    label: 'Không gian ấm áp'
  }
];
const HERO_SLIDE_INTERVAL_MS = 5400;

function CopyPhoneButton() {
  const [copied, setCopied] = useState(false);
  const onCopy = useCallback(() => {
    const done = () => { setCopied(true); setTimeout(() => setCopied(false), 2200); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(SANITE.phoneRaw).then(done).catch(done);
    } else { done(); }
  }, []);
  return (
    <button className="pill pill-ghost" onClick={onCopy} aria-live="polite">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="8" y="8" width="12" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.7"/>
        <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" stroke="currentColor" strokeWidth="1.7"/>
      </svg>
      {copied ? 'Đã copy số điện thoại' : `Copy số: ${SANITE.phone}`}
    </button>
  );
}

function HeroTypewriter() {
  const tw = useTypewriter(
    'Thưởng thức món chay sáng tạo từ nấm, rau củ tươi và hương vị Việt được biến tấu nhẹ nhàng.',
    { speed: 26, startDelay: 650 }
  );
  return (
    <p className="hero-tw">
      {tw.displayed}
      {!tw.done && <span className="tw-cursor" aria-hidden="true" />}
    </p>
  );
}

function HeroSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const hasMultipleSlides = HERO_SLIDES.length > 1;

  useEffect(() => {
    if (!hasMultipleSlides || paused || prefersReduced()) return;
    const timer = setInterval(() => {
      setActive((current) => (current + 1) % HERO_SLIDES.length);
    }, HERO_SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [hasMultipleSlides, paused]);

  return (
    <div
      className="hero-frame hero-frame-slider"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-label="Ảnh không gian Sanité"
    >
      {HERO_SLIDES.map((slide, index) => (
        <img
          key={slide.id}
          className={`hero-slide ${index === active ? 'is-active' : ''}`}
          src={slide.src}
          alt={slide.alt}
          loading={index === 0 ? 'eager' : 'lazy'}
          decoding="async"
        />
      ))}
      <div className="hero-image-overlay" aria-hidden="true" />
      <div className="frame-sheen" aria-hidden="true" />

      {hasMultipleSlides && (
        <div className="hero-slider-dots" aria-label="Chọn ảnh hero">
          {HERO_SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              className={`hero-slider-dot ${index === active ? 'is-active' : ''}`}
              aria-label={`Xem ảnh: ${slide.label}`}
              aria-pressed={index === active}
              onClick={() => setActive(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function Hero() {
  const parallaxRef = useMouseParallax();

  return (
    <section id="top" className="hero plaster" ref={parallaxRef}>
      {/* decorative arch + glow layers */}
      <div className="hero-decor" aria-hidden="true">
        <div className="arch arch-1" />
        <div className="arch arch-2" />
        <div className="green-glow" />
      </div>

      <div className="hero-grid">
        {/* LEFT */}
        <div className="hero-content">
          <p className="hero-intro" aria-hidden="true">
            Sanité Chay tại Phú Nhuận,<br />
            ấm nhẹ giữa nhịp phố.
          </p>

          <h1 className="hero-h1">
            <span className="hero-brand-line">
              <span className="hero-accent">Sanité Chay</span>
              <span className="hero-dash"> — </span>
            </span>
            bữa chay ấm lành giữa <span className="no-break">Phú Nhuận</span>
          </h1>

          <HeroTypewriter />

          <div className="hero-badges">
            <span className="badge"><span className="badge-dot" />10:00 – 22:00</span>
            <span className="badge"><span className="badge-dot" />Phú Nhuận, HCM</span>
            <span className="badge"><span className="badge-dot" />4.7/5 từ 331 đánh giá</span>
          </div>

          <div className="hero-actions">
            <a href={SANITE.tel} className="pill pill-primary">Gọi đặt bàn</a>
            <a href="#menu" className="pill pill-secondary">Xem món nổi bật</a>
            <a href={SANITE.maps} target="_blank" rel="noopener noreferrer" className="pill pill-outline-green">Mở Google Maps</a>
            <CopyPhoneButton />
          </div>
        </div>

        {/* RIGHT */}
        <div className="hero-visual">
          <HeroSlider />

          <div className="float-card float-card-a">
            <span className="fc-eyebrow"><Leaf size={13} color="var(--sanite-leaf)" /> Không gian ấm áp</span>
            <p className="fc-text">Bàn gỗ, ghế mây và ánh đèn dịu.</p>
          </div>

          <div className="float-card float-card-b">
            <span className="fc-stat">200k–300k</span>
            <span className="fc-stat-label">/ người</span>
          </div>
        </div>
      </div>

      <div className="hero-scroll" aria-hidden="true">
        <span>Cuộn xuống</span>
        <span className="scroll-line" />
      </div>
    </section>
  );
}

Object.assign(window, { Preloader, Navbar, Hero });
