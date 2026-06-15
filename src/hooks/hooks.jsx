/* ============================================================
   Sanité Chay — Hooks & shared primitives
   ============================================================ */
const { useState, useEffect, useRef, useCallback } = React;

const prefersReduced = () =>
  window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const isTouch = () =>
  window.matchMedia && window.matchMedia('(hover: none), (pointer: coarse)').matches;

/* ---- Typewriter ---- */
function useTypewriter(text, { speed = 28, startDelay = 500 } = {}) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (prefersReduced()) {
      setDisplayed(text);
      setDone(true);
      return;
    }
    let i = 0;
    let timer;
    const start = setTimeout(() => {
      timer = setInterval(() => {
        i += 1;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(timer);
          setDone(true);
        }
      }, speed);
    }, startDelay);
    return () => { clearTimeout(start); clearInterval(timer); };
  }, [text, speed, startDelay]);

  return { displayed, done };
}

/* ---- Reveal-on-scroll: returns ref; toggles .is-visible ----
   PROMPT 02: hỗ trợ re-animate cả khi kéo xuống và kéo lên (once=false).
   Chống nhấp nháy: chỉ gỡ .is-visible khi phần tử ra khỏi viewport đủ xa
   (rootMargin âm ở cả 2 cạnh tạo "vùng đệm" — không reset khi đứng gần ranh giới). */
function useReveal({ threshold = 0.15, once = true } = {}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReduced()) { el.classList.add('is-visible'); return; }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            if (once) io.unobserve(e.target);
          } else if (!once) {
            e.target.classList.remove('is-visible');
          }
        });
      },
      // vùng đệm -12% trên/dưới: reveal khi vào hẳn, reset khi ra hẳn → mượt, không flicker
      { threshold, rootMargin: once ? '0px 0px -8% 0px' : '-12% 0px -12% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, once]);
  return ref;
}

/* ---- Reveal wrapper component ----
   PROMPT 02: mặc định once=false để section reveal lại nhẹ khi cuộn lên.
   PROMPT 03: thêm prop `variant` → thêm class `reveal-<variant>` cho motion riêng từng section
   (soft | arch | route | quote | dish | step | from-left | from-right). Không phá cách dùng cũ. */
function Reveal({ children, delay = 0, className = '', as = 'div', once = false, variant = '', style = {}, ...rest }) {
  const ref = useReveal({ once });
  const Tag = as;
  const variantClass = variant ? `reveal-${variant}` : '';
  return (
    <Tag
      ref={ref}
      className={`reveal ${variantClass} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ---- Lock body scroll (modal/overlay) — PROMPT 02 ----
   Giữ vị trí scroll, tránh layout shift, luôn trả lại khi đóng (không kẹt). */
function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [locked]);
}

/* ---- Count-up when visible ---- */
function useCountUp(target, { duration = 1400, decimals = 0 } = {}) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReduced()) { setValue(target); return; }
    let raf;
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const t0 = performance.now();
        const tick = (t) => {
          const p = Math.min(1, (t - t0) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setValue(target * eased);
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        io.disconnect();
      }
    }, { threshold: 0.5 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [target, duration]);
  return [value.toFixed(decimals), ref];
}

/* ---- Mouse parallax: sets --mx/--my on target element (desktop only) ---- */
function useMouseParallax() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || isTouch() || prefersReduced()) return;
    let raf;
    const onMove = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        el.style.setProperty('--mx', x.toFixed(3));
        el.style.setProperty('--my', y.toFixed(3));
      });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, []);
  return ref;
}

/* ---- Shared SVG: small leaf accent ---- */
function Leaf({ size = 14, color = 'currentColor', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" style={style}>
      <path d="M20 4C9 5 4 11 4 19c0 0 0-7 8-9 0 0-5 3-6 9 6 0 14-3 14-15z"
        fill={color} opacity="0.92"/>
    </svg>
  );
}

/* ---- Lotus ornament (decorative) — PROMPT 02 ----
   Hoa sen line-art lấy cảm hứng thanh lành/tĩnh tại trong ẩm thực chay.
   Inline SVG: stroke gold mềm, 7 cánh, không fill đậm. aria-hidden + pointer-events:none.
   Animation petal-draw bằng stroke-dashoffset xử lý ở CSS (class .lotus-mark). */
function LotusMark({ size = 120, className = '', style = {} }) {
  return (
    <svg
      className={`lotus-mark ${className}`}
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
      style={style}
    >
      {/* cánh giữa */}
      <path className="lotus-petal" d="M60 96 C50 72 50 46 60 24 C70 46 70 72 60 96 Z"
        stroke="var(--sanite-gold)" strokeWidth="1.3" strokeLinejoin="round" />
      {/* cặp cánh trong */}
      <path className="lotus-petal" d="M60 96 C42 78 34 56 40 34 C56 48 64 70 60 96 Z"
        stroke="var(--sanite-gold)" strokeWidth="1.2" strokeLinejoin="round" />
      <path className="lotus-petal" d="M60 96 C78 78 86 56 80 34 C64 48 56 70 60 96 Z"
        stroke="var(--sanite-gold)" strokeWidth="1.2" strokeLinejoin="round" />
      {/* cặp cánh ngoài */}
      <path className="lotus-petal" d="M60 96 C34 86 18 68 18 46 C40 52 56 72 60 96 Z"
        stroke="var(--sanite-gold)" strokeWidth="1.05" strokeLinejoin="round" opacity="0.85" />
      <path className="lotus-petal" d="M60 96 C86 86 102 68 102 46 C80 52 64 72 60 96 Z"
        stroke="var(--sanite-gold)" strokeWidth="1.05" strokeLinejoin="round" opacity="0.85" />
      {/* cặp cánh đáy */}
      <path className="lotus-petal" d="M60 96 C36 96 20 88 12 74 C34 70 54 80 60 96 Z"
        stroke="var(--sanite-gold)" strokeWidth="0.95" strokeLinejoin="round" opacity="0.7" />
      <path className="lotus-petal" d="M60 96 C84 96 100 88 108 74 C86 70 66 80 60 96 Z"
        stroke="var(--sanite-gold)" strokeWidth="0.95" strokeLinejoin="round" opacity="0.7" />
      {/* nhụy */}
      <circle cx="60" cy="92" r="2.6" fill="var(--sanite-gold)" opacity="0.8" />
    </svg>
  );
}

/* ---- Lotus branch ornament (decorative) — PROMPT 05 ----
   Cành sen line-art nở: 1 hoa chính + 1 nụ + lá pad, mọc từ gốc dưới-trái.
   - Gọi qua <LotusBranch className="story-lotus-branch" /> ở góc trên trái Story.
   - aria-hidden + pointer-events:none (CSS) → không che/đụng nội dung.
   - useReveal: khi vào viewport thêm .is-visible → cành hiện + hoa bloom (CSS).
   - Sway gió nhẹ + bloom + reduced-motion: xử lý ở index.css (.lotus-branch). */
function LotusBranch({ className = '' }) {
  const ref = useReveal({ once: true, threshold: 0.2 });
  return (
    <div ref={ref} className={`lotus-branch ${className}`.trim()} aria-hidden="true">
      <svg viewBox="0 0 220 280" fill="none" preserveAspectRatio="xMidYMax meet">
        <g className="lotus-branch-sway">
          {/* thân chính + nhánh phụ (emerald lá) */}
          <path className="lb-stem" d="M40 280 C32 214 50 158 96 112" stroke="var(--sanite-leaf)" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
          <path className="lb-stem" d="M58 198 C46 188 38 176 36 158" stroke="var(--sanite-leaf)" strokeWidth="1.4" strokeLinecap="round" opacity="0.42" />
          <path className="lb-stem" d="M70 154 C82 140 92 130 104 118" stroke="var(--sanite-leaf)" strokeWidth="1.4" strokeLinecap="round" opacity="0.4" />
          {/* lá sen / pad */}
          <path className="lb-leaf" d="M36 158 C16 150 12 134 24 122 C44 128 52 144 36 158 Z" stroke="var(--sanite-leaf)" strokeWidth="1.3" strokeLinejoin="round" opacity="0.42" />
          {/* nụ sen (hồng sen trầm) */}
          <path className="lb-petal" d="M104 116 C96 106 96 94 104 84 C112 94 112 106 104 116 Z" stroke="var(--sanite-lotus-pink-muted)" strokeWidth="1.3" strokeLinejoin="round" />
          {/* hoa sen nở chính quanh (120,86) */}
          <g className="lb-bloom">
            <path className="lb-petal" d="M120 86 C113 62 115 44 120 28 C125 44 127 62 120 86 Z" stroke="var(--sanite-gold)" strokeWidth="1.3" strokeLinejoin="round" />
            <path className="lb-petal" d="M120 86 C103 66 96 50 95 32 C112 46 121 64 120 86 Z" stroke="var(--sanite-gold)" strokeWidth="1.2" strokeLinejoin="round" />
            <path className="lb-petal" d="M120 86 C137 66 144 50 145 32 C128 46 119 64 120 86 Z" stroke="var(--sanite-gold)" strokeWidth="1.2" strokeLinejoin="round" />
            <path className="lb-petal" d="M120 86 C98 76 82 64 74 46 C97 54 114 68 120 86 Z" stroke="var(--sanite-lotus-pink-muted)" strokeWidth="1.1" strokeLinejoin="round" opacity="0.92" />
            <path className="lb-petal" d="M120 86 C142 76 158 64 166 46 C143 54 126 68 120 86 Z" stroke="var(--sanite-lotus-pink-muted)" strokeWidth="1.1" strokeLinejoin="round" opacity="0.92" />
            <circle cx="120" cy="84" r="2.4" fill="var(--sanite-gold)" opacity="0.85" />
          </g>
        </g>
      </svg>
    </div>
  );
}

/* ---- Constants ---- */
/* PROMPT 08 — Sanité có 2 chi nhánh (Quận 3 + Phú Nhuận).
   Link vẫn trỏ Google Maps nhưng text UI dùng "Xem địa điểm" (không ghi "Google Maps"). */
const SANITE_BRANCHES = [
  {
    id: 'quan-3',
    name: 'Sanité Chay Quận 3',
    shortName: 'Quận 3',
    label: 'Trụ sở chính',
    address: '2B Hồ Xuân Hương, Xuân Hòa, Quận 3, Hồ Chí Minh',
    phone: '+84 962 106 679',
    phoneHref: 'tel:+84962106679',
    hours: '10:00 – 22:00',
    rating: '4.8/5',
    reviewText: 'hơn 100 đánh giá',
    mapUrl: 'https://maps.google.com/?cid=8179673700776799321',
    description: 'Không gian ấm cúng, ánh sáng đẹp, hợp nhóm nhỏ hoặc buổi hẹn nhẹ nhàng.'
  },
  {
    id: 'phu-nhuan',
    name: 'Sanité Chay Phú Nhuận',
    shortName: 'Phú Nhuận',
    label: 'Không gian rộng hơn',
    address: '46 Trương Quốc Dung, Phường 10, Phú Nhuận, Hồ Chí Minh',
    phone: '+84 978 323 232',
    phoneHref: 'tel:+84978323232',
    hours: '10:00 – 22:00',
    rating: '4.7/5',
    reviewText: '331 đánh giá',
    mapUrl: 'https://maps.google.com/?cid=9992186594375056901',
    description: 'Trang nhã và thoáng hơn, hợp gia đình, họp mặt bạn bè hay tiếp khách.'
  }
];

const SANITE = {
  phone: '+84 978 323 232',
  phoneRaw: '+84978323232',
  tel: 'tel:+84978323232',
  maps: 'https://maps.google.com/?cid=9992186594375056901',
  address: '46 Trương Quốc Dung, Phú Nhuận, Hồ Chí Minh',
  branches: SANITE_BRANCHES,
};

Object.assign(window, {
  useState, useEffect, useRef, useCallback,
  useTypewriter, useReveal, Reveal, useCountUp, useMouseParallax, useLockBodyScroll,
  prefersReduced, isTouch, Leaf, LotusMark, LotusBranch, SANITE, SANITE_BRANCHES,
});
