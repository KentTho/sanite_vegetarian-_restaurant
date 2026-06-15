/* ============================================================
   Sanité Chay — Story + Experience + Menu
   ============================================================ */

/* ---------- SECTION 2 — STORY ---------- */
const STORY_CARDS = [
  { t: 'Rau nấm tươi', d: 'Nguyên liệu quen thuộc, chế biến cân bằng.' },
  { t: 'Vị chay sáng tạo', d: 'Pate, hàu và bò chay được biến tấu từ nấm.' },
  { t: 'Không gian ấm', d: 'Lịch sự, dễ chịu cho bữa ăn chậm rãi.' },
];

function StorySection() {
  return (
    <section id="story" className="section plaster story">
      {/* PROMPT 05 — cành hoa sen nở góc trên trái, gió đung đưa nhẹ (decorative) */}
      <LotusBranch className="story-lotus-branch" />
      <div className="wrap story-grid">
        <div className="story-left">
          <Reveal><p className="eyebrow" style={{ color: 'var(--sanite-gold)' }}>Câu chuyện Sanité</p></Reveal>
          <Reveal delay={120} as="h2" className="story-h2">
            Chay nhẹ nhàng, vị vẫn tròn đầy.
          </Reveal>
          <Reveal delay={220} as="p" className="story-body">
            Sanité Chay giữ tinh thần hiện đại: nấm, rau củ tươi và hương vị Việt được biến tấu
            vừa đủ, gần gũi mà có chiều sâu.
          </Reveal>
          <Reveal delay={300} className="story-sign" aria-hidden="true">
            <span className="sign-line" /> <Leaf size={16} color="var(--sanite-leaf)" />
          </Reveal>
        </div>

        <div className="story-cards">
          {STORY_CARDS.map((c, i) => (
            <Reveal
              key={c.t}
              delay={i * 110}
              variant={i === 0 ? 'from-left' : i === 2 ? 'from-right' : 'soft'}
              className="story-card lift"
            >
              <span className="sc-index">0{i + 1}</span>
              <div>
                <h3 className="sc-title">{c.t}</h3>
                <p className="sc-desc">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- SECTION 3 — EXPERIENCE (emerald) ---------- */
const EXP_CARDS = [
  { t: 'Khai vị', d: 'Pate nấm, đậu hũ sốt tắc, rau củ kho quẹt.' },
  { t: 'Món chính', d: 'Pasta sò chay, Pad Thái chay, cơm chiên.' },
  { t: 'Món nấm', d: 'Hàu chay và bò chay chế biến từ nấm.' },
  { t: 'Thức uống', d: 'Trà đậu đen và nước ép trái cây tươi.' },
];

function ExperienceSection() {
  const lineRef = useReveal({ threshold: 0.3 });
  return (
    <section id="experience" className="section velvet experience">
      <div className="exp-glow" aria-hidden="true" />
      {/* botanical branch lines */}
      <svg className="exp-branch" viewBox="0 0 200 400" fill="none" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
        <path d="M100 400 C100 300 100 250 100 120" stroke="var(--sanite-gold)" strokeWidth="1.2" opacity="0.5" />
        <path d="M100 200 C70 180 55 160 50 130" stroke="var(--sanite-gold)" strokeWidth="1" opacity="0.4" />
        <path d="M100 240 C130 220 145 200 150 168" stroke="var(--sanite-gold)" strokeWidth="1" opacity="0.4" />
        <path d="M100 290 C78 275 66 258 62 232" stroke="var(--sanite-gold)" strokeWidth="0.9" opacity="0.35" />
        <circle cx="50" cy="128" r="3" fill="var(--sanite-gold)" opacity="0.6" />
        <circle cx="150" cy="166" r="3" fill="var(--sanite-gold)" opacity="0.6" />
        <circle cx="62" cy="230" r="2.5" fill="var(--sanite-gold)" opacity="0.5" />
      </svg>

      {/* PROMPT 02 — điểm nhấn hoa sen (decorative) trên nền emerald */}
      <LotusMark size={150} className="lotus-experience" />

      <div className="wrap exp-wrap">
        <div className="exp-head">
          <Reveal><p className="eyebrow" style={{ color: 'var(--gold-bright)' }}>Trải nghiệm ẩm thực</p></Reveal>
          <Reveal delay={120} as="h2" className="exp-h2">
            Đủ vị cho một bữa chay tinh tế.
          </Reveal>
          <div ref={lineRef} className="goldline exp-divider" aria-hidden="true" />
          <Reveal delay={220} as="p" className="exp-body">
            Từ khai vị đến lẩu sa tế chay, thực đơn cân bằng giữa vị thanh, vị đậm và cảm giác
            dễ chịu sau bữa ăn.
          </Reveal>
        </div>

        <div className="exp-cards">
          {EXP_CARDS.map((c, i) => (
            <Reveal key={c.t} delay={i * 130} variant="step" className="exp-card lift">
              <span className="exp-step-no" aria-hidden="true">{`0${i + 1}`}</span>
              <span className="exp-mark" aria-hidden="true"><Leaf size={15} color="var(--gold-bright)" /></span>
              <h3 className="exp-card-title">{c.t}</h3>
              <p className="exp-card-desc">{c.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   PROMPT 02 — MENU IMAGE SYSTEM & DISH LIGHTBOX
   Mục tiêu:
   - Chuẩn bị ảnh món ăn thật (field image, chưa có thì để rỗng)
   - Không tạo src giả: image rỗng -> KHÔNG render <img>, không broken image
   - Click card để xem chi tiết món (modal/lightbox, a11y, ESC/backdrop)
   ========================================================= */

/* Mỗi món: id, category, name, description, image, imageAlt, detail, note(optional).
   image: "" -> chưa có ảnh thật. Khi khách gửi ảnh vào assets/menu/ thì điền đường dẫn. */
const MENU_ITEMS = [
  // --- Khai vị ---
  {
    id: 'banh-mi-pate-nam', category: 'Khai vị', name: 'Bánh mì pate chay từ nấm',
    description: 'Pate nấm béo bùi, bánh mì giòn nhẹ.',
    image: 'assets/menu/banh-mi-pate-nam.jpg', imageAlt: 'Bánh mì pate chay từ nấm tại Sanité',
    detail: 'Pate làm từ nấm, vị béo bùi tự nhiên, gợi hương quen thuộc nhưng nhẹ hơn.',
    note: 'Món dễ làm khách không ăn chay trường thấy bất ngờ.'
  },
  {
    id: 'dau-hu-sot-tac', category: 'Khai vị', name: 'Đậu hũ sốt tắc',
    description: 'Chua ngọt hài hòa, mở vị nhẹ nhàng.',
    image: '', imageAlt: 'Đậu hũ sốt tắc tại Sanité',
    detail: 'Đậu hũ mềm phủ sốt tắc chua ngọt thanh, hợp để bắt đầu bữa ăn.'
  },
  {
    id: 'rau-cu-kho-quet-chay', category: 'Khai vị', name: 'Rau củ kho quẹt chay',
    description: 'Vị Việt thân quen, hợp để chia sẻ.',
    image: '', imageAlt: 'Rau củ kho quẹt chay tại Sanité',
    detail: 'Rau củ tươi chấm kho quẹt chay đậm đà, gợi cảm giác bữa cơm nhà.'
  },

  // --- Món chính ---
  {
    id: 'pasta-so-chay', category: 'Món chính', name: 'Pasta sò chay',
    description: 'Biến tấu món Ý theo tinh thần chay.',
    image: '', imageAlt: 'Pasta sò chay tại Sanité',
    detail: 'Pasta sốt nhẹ cùng "sò" chay, vừa lạ miệng vừa cân bằng.'
  },
  {
    id: 'mien-tron-chay', category: 'Món chính', name: 'Miến trộn chay',
    description: 'Nhẹ, cân bằng, hợp bữa trưa.',
    image: '', imageAlt: 'Miến trộn chay tại Sanité',
    detail: 'Miến dai trộn rau củ và nấm, vị thanh, dễ dùng khi muốn ăn nhẹ.'
  },
  {
    id: 'pad-thai-chay', category: 'Món chính', name: 'Pad Thái chay',
    description: 'Mì xào kiểu Thái, chua cay nhẹ.',
    image: '', imageAlt: 'Pad Thái chay tại Sanité',
    detail: 'Mì xào kiểu Thái đậm vị vừa phải, giữ tinh thần chay sáng tạo.'
  },
  {
    id: 'com-chien-sanite', category: 'Món chính', name: 'Cơm chiên Sanité',
    description: 'Món cơm thân thuộc cho nhóm khách.',
    image: '', imageAlt: 'Cơm chiên Sanité',
    detail: 'Cơm chiên thơm tơi cùng rau củ, dễ gọi khi đi cùng gia đình hoặc bạn bè.'
  },

  // --- Món nấm ---
  {
    id: 'hau-chay-tu-nam', category: 'Món nấm', name: 'Hàu chay từ nấm',
    description: 'Kết cấu thú vị, vị chay mới lạ.',
    image: '', imageAlt: 'Hàu chay từ nấm tại Sanité',
    detail: 'Món nấm sáng tạo, gợi kết cấu hàu theo cách chay nhẹ nhàng.'
  },
  {
    id: 'thit-bo-chay-tu-nam', category: 'Món nấm', name: 'Thịt bò chay từ nấm',
    description: 'Đậm vị, dễ mời người mới ăn chay.',
    image: '', imageAlt: 'Thịt bò chay từ nấm tại Sanité',
    detail: 'Vị đậm và kết cấu gần gũi, thường hợp khi dẫn người quen ăn mặn cùng đi.'
  },

  // --- Lẩu / Xúp ---
  {
    id: 'rau-rung-xao-toi', category: 'Lẩu / Xúp', name: 'Rau rừng xào tỏi',
    description: 'Rau rừng tươi, xào tỏi thơm.',
    image: '', imageAlt: 'Rau rừng xào tỏi tại Sanité',
    detail: 'Rau rừng xào nhanh lửa với tỏi, giữ độ giòn ngọt tự nhiên.'
  },
  {
    id: 'lau-sa-te-chay', category: 'Lẩu / Xúp', name: 'Lẩu sa tế chay',
    description: 'Nước lẩu sa tế ấm, hợp để chia sẻ.',
    image: '', imageAlt: 'Lẩu sa tế chay tại Sanité',
    detail: 'Nước lẩu cay ấm dùng cùng nấm và rau củ tươi, hợp cho nhóm bạn hoặc gia đình.'
  },
  {
    id: 'xup-chay', category: 'Lẩu / Xúp', name: 'Xúp chay',
    description: 'Sánh nhẹ, ấm bụng, khởi đầu cho bữa ăn.',
    image: '', imageAlt: 'Xúp chay tại Sanité',
    detail: 'Xúp sánh nhẹ, ấm bụng — một khởi đầu dịu dàng trước những món chính.'
  },

  // --- Thức uống ---
  {
    id: 'tra-dau-den', category: 'Thức uống', name: 'Trà đậu đen',
    description: 'Thanh mát, nhẹ nhàng.',
    image: '', imageAlt: 'Trà đậu đen tại Sanité',
    detail: 'Trà đậu đen rang thanh mát, hậu vị nhẹ, cân bằng bữa ăn.'
  },
  {
    id: 'nuoc-ep-trai-cay-tuoi', category: 'Thức uống', name: 'Nước ép trái cây tươi',
    description: 'Tươi, dễ uống, hợp với bữa chay.',
    image: '', imageAlt: 'Nước ép trái cây tươi tại Sanité',
    detail: 'Nước ép trái cây tươi theo mùa, dễ uống và hợp tinh thần bữa ăn lành.'
  },
];
const MENU_CATS = MENU_ITEMS.reduce((acc, m) => (acc.includes(m.category) ? acc : [...acc, m.category]), []);

/* ---- Một card món: click để mở modal. Không có ảnh thật -> khung ornament tinh tế, không img ---- */
function DishCard({ dish, index, onOpen }) {
  return (
    <button
      type="button"
      className="menu-card lift"
      style={{ animationDelay: `${index * 70}ms` }}
      onClick={() => onOpen(dish)}
      aria-label={`Xem chi tiết món ${dish.name}`}
    >
      <span className="mc-media" aria-hidden="true">
        {dish.image
          ? <img src={dish.image} alt="" loading="lazy" />
          : <span className="mc-media-frame"><Leaf size={20} color="var(--sanite-gold)" /></span>}
      </span>
      <span className="mc-body">
        <span className="mc-cat">{dish.category}</span>
        <span className="mc-name">{dish.name}</span>
        <span className="mc-line" aria-hidden="true" />
        <span className="mc-desc">{dish.description}</span>
        <span className="mc-more">
          Xem chi tiết
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </span>
    </button>
  );
}

/* ---- Lightbox/modal xem chi tiết món ---- */
function DishModal({ dish, onClose }) {
  const open = !!dish;
  useLockBodyScroll(open);
  const closeRef = useRef(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    if (closeRef.current) closeRef.current.focus();
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="dish-backdrop" onClick={onClose}>
      <div
        className="dish-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dish-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button ref={closeRef} className="dish-close" aria-label="Đóng chi tiết món" onClick={onClose}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
          </svg>
        </button>

        <div className="dm-media">
          {dish.image
            ? <img src={dish.image} alt={dish.imageAlt} />
            : (
              <div className="dm-media-ph">
                <LotusMark size={88} />
                <span>Hình ảnh món ăn đang được bổ sung</span>
              </div>
            )}
        </div>

        <div className="dm-body">
          <span className="mc-cat">{dish.category}</span>
          <h3 id="dish-modal-title" className="dm-title">{dish.name}</h3>
          <span className="mc-line" aria-hidden="true" />
          <p className="dm-desc">{dish.description}</p>
          {dish.detail && <p className="dm-detail">{dish.detail}</p>}
          {dish.note && (
            <p className="dm-note"><Leaf size={14} color="var(--sanite-leaf)" /><span>{dish.note}</span></p>
          )}
          {/* PROMPT 03 — modal chỉ còn nút Đóng + nút X góc modal + Escape + backdrop (đã bỏ CTA tel trong modal) */}
          <div className="dm-actions">
            <button type="button" className="pill pill-secondary" onClick={onClose}>Đóng</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- SECTION 4 — MENU ---------- */
function MenuSection() {
  const [cat, setCat] = useState(MENU_CATS[0]);
  const [activeDish, setActiveDish] = useState(null);
  const items = MENU_ITEMS.filter((m) => m.category === cat);

  return (
    <section id="menu" className="section plaster menu">
      <div className="wrap">
        <div className="menu-head">
          <Reveal><p className="eyebrow section-kicker" style={{ color: 'var(--sanite-gold)', justifyContent: 'center' }}>Thực đơn</p></Reveal>
          <Reveal delay={100} as="h2" className="menu-h2 section-title">Món chay nổi bật</Reveal>
          <Reveal delay={180} as="p" className="menu-sub section-lead">
            Những món được yêu thích từ nấm, rau củ và hương vị Việt. Chạm vào món để xem chi tiết.
          </Reveal>
        </div>

        <Reveal delay={120} variant="soft" className="menu-tabs no-scrollbar">
          {MENU_CATS.map((c) => (
            <button
              key={c}
              className={`menu-pill ${cat === c ? 'active' : ''}`}
              onClick={() => setCat(c)}
              aria-pressed={cat === c}
            >
              {c}
            </button>
          ))}
        </Reveal>

        <div className="menu-grid" key={cat}>
          {items.map((m, i) => (
            <DishCard key={m.id} dish={m} index={i} onOpen={setActiveDish} />
          ))}
        </div>

        <Reveal delay={120} className="menu-note">
          <Leaf size={15} color="var(--sanite-leaf)" />
          <span>Thích vị thanh hơn? Nhắn nhân viên để được gợi ý khẩu vị phù hợp.</span>
        </Reveal>
      </div>

      <DishModal dish={activeDish} onClose={() => setActiveDish(null)} />
    </section>
  );
}

Object.assign(window, { StorySection, ExperienceSection, MenuSection });
