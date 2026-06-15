/* ============================================================
   Sanité Chay — Space + Reviews + Visit + FinalCTA + Footer
   ============================================================ */

/* ---------- SECTION 5 — SPACE GALLERY ---------- */
function SpaceGallery() {
  return (
    <section id="space" className="section plaster space">
      <div className="wrap">
        <div className="space-head">
          <Reveal><p className="eyebrow" style={{ color: 'var(--sanite-gold)' }}>Không gian</p></Reveal>
          <Reveal delay={100} as="h2" className="space-h2">Một góc ăn chay thật ấm</Reveal>
        </div>

        <div className="space-grid">
          <Reveal variant="arch" className="space-img space-big img-zoom">
            <img src="assets/gallery/banner_facebook_3.jpg" alt="Không gian Sanité — bàn ăn gỗ, ghế mây và bình hoa tươi" style={{ objectPosition: 'center 55%' }} />
            <span className="space-tag">Không gian Sanité</span>
          </Reveal>
          <Reveal delay={160} variant="arch" className="space-img space-small img-zoom">
            <img src="assets/gallery/banner_facebook.jpg" alt="Không gian Sanité — vòm tường mềm và đèn mây thả trần" style={{ objectPosition: 'center 18%' }} />
            <span className="space-tag">Vòm tường &amp; ánh đèn</span>
          </Reveal>
          <Reveal delay={280} variant="arch" className="space-img space-small img-zoom">
            <img src="assets/gallery/banner_facebook_2.jpg" alt="Không gian Sanité — chi tiết bàn ăn được bày biện tinh tế" style={{ objectPosition: 'center 88%' }} />
            <span className="space-tag">Chi tiết bàn ăn</span>
          </Reveal>
        </div>

        <div className="space-foot">
          <Reveal as="p" className="space-caption">
            Vòm tường mềm, ánh đèn vàng, bàn gỗ và ghế mây tạo cảm giác ấm, nhẹ và riêng tư.
          </Reveal>
          <Reveal delay={120} as="blockquote" className="space-quote">
            “Không gian ấm áp, riêng tư giành cho bạn và người thương”
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- SECTION 6 — REVIEWS ---------- */
const REVIEWS = [
  { q: 'Decor xinh, hiện đại mà vẫn nhẹ nhàng.', l: 'Không gian' },
  { q: 'Bày trí đẹp, lịch sự, ấm áp và dễ chịu.', l: 'Vibe' },
  { q: 'Nhân viên vui vẻ, gợi ý món rất kiên nhẫn.', l: 'Dịch vụ' },
  { q: 'Món chay đậm đà, sáng tạo từ nấm và rau củ.', l: 'Ẩm thực' },
];

/* =========================================================
   PROMPT 05 — REVIEWS FEEDBACK IMAGE ACCORDION (data)
   Chỉ liệt kê ẢNH THẬT đang tồn tại trong assets/feedback/.
   (Đã kiểm bằng shell: fb_1..fb_5 đều có thật.)
   Mảng rỗng -> Reviews fallback về review card chữ, không broken image. */
const FEEDBACK_IMAGES = [
  { id: 1, title: 'Không gian ấm áp', src: 'assets/feedback/fb_1.jpg' },
  { id: 2, title: 'Món chay sáng tạo', src: 'assets/feedback/fb_2.jpg' },
  { id: 3, title: 'Phục vụ tận tâm', src: 'assets/feedback/fb_3.jpg' },
  { id: 4, title: 'Bữa ăn trọn vẹn', src: 'assets/feedback/fb_4.jpg' },
  { id: 5, title: 'Khách hàng yêu mến', src: 'assets/feedback/fb_5.jpg' },
];

/* Accordion ảnh feedback: desktop hover/focus mở rộng item active; mobile scroll cards (CSS).
   onError -> ẩn item lỗi (KHÔNG thay ảnh giả). 1 ảnh -> 1 card lớn; 2–5 ảnh -> accordion. */
function FeedbackAccordion({ images }) {
  const [active, setActive] = useState(0);
  const [errored, setErrored] = useState({});
  const shown = images.filter((img) => !errored[img.id]);
  if (shown.length === 0) return null;
  const safeActive = Math.min(active, shown.length - 1);
  return (
    <div className={`fb-accordion ${shown.length === 1 ? 'is-single' : ''}`}>
      {shown.map((img, i) => (
        <button
          key={img.id}
          type="button"
          className={`fb-item ${i === safeActive ? 'is-active' : ''}`}
          aria-label={`Đánh giá khách hàng: ${img.title}`}
          aria-pressed={i === safeActive}
          onMouseEnter={() => setActive(i)}
          onFocus={() => setActive(i)}
          onClick={() => setActive(i)}
        >
          <span className="fb-image-shell">
            <img
              src={img.src}
              alt={`Ảnh đánh giá khách hàng Sanité — ${img.title}`}
              loading="lazy"
              decoding="async"
              onError={() => setErrored((p) => ({ ...p, [img.id]: true }))}
            />
          </span>
          <span className="fb-caption-bar">
            <span className="fb-caption-dot" aria-hidden="true" />
            <span className="fb-caption-text">{img.title}</span>
          </span>
        </button>
      ))}
    </div>
  );
}

function ReviewsSection() {
  const [rating, ratingRef] = useCountUp(4.7, { decimals: 1, duration: 1500 });
  const feedback = FEEDBACK_IMAGES.slice(0, 5); // tối đa 5 ảnh để layout không rối
  const hasFeedback = feedback.length > 0;
  return (
    <section id="reviews" className="section reviews">
      <div className="wrap reviews-grid">
        <div className="reviews-left">
          <Reveal><p className="eyebrow" style={{ color: 'var(--sanite-gold)' }}>Đánh giá</p></Reveal>
          <Reveal delay={100} as="h2" className="reviews-h2">
            Những đánh giá và góp ý quý giá của thực khách sau khi trải nghiệm.
          </Reveal>
          <div className="rating-block" ref={ratingRef}>
            <div className="rating-num">{rating}<span className="rating-of">/5</span></div>
            <div className="rating-meta">
              <div className="stars" aria-hidden="true">★★★★★</div>
              <span>331 đánh giá</span>
            </div>
          </div>
          {hasFeedback && (
            <Reveal delay={160} as="p" className="reviews-hint">
              <Leaf size={14} color="var(--sanite-leaf)" />
              <span>Ảnh đánh giá thật từ khách hàng — di chuột / chạm để xem.</span>
            </Reveal>
          )}
        </div>

        <div className="reviews-right">
          {hasFeedback ? (
            <Reveal variant="soft"><FeedbackAccordion images={feedback} /></Reveal>
          ) : (
            <div className="reviews-cards">
              {REVIEWS.map((r, i) => (
                <Reveal key={r.l} delay={i * 110} variant="quote" className="review-card lift">
                  <span className="rc-quote-mark" aria-hidden="true">”</span>
                  <p className="rc-quote">{r.q}</p>
                  <span className="rc-label">{r.l}</span>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>

      {hasFeedback && (
        <div className="wrap reviews-quotes">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.l} delay={i * 90} variant="quote" className="review-chip lift">
              <span className="rc-quote-mark" aria-hidden="true">”</span>
              <p className="rc-quote">{r.q}</p>
              <span className="rc-label">{r.l}</span>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}

/* ---------- SECTION 7 — VISIT (2 chi nhánh) ---------- */
function VisitSection() {
  const buddhaRef = useReveal({ once: true, threshold: 0.12 });
  return (
    <section id="contact" className="section plaster visit">
      {/* PROMPT 06 — ảnh thật Đức Phật (assets/adidaphat.jpg) làm ambience bên phải Visit. */}
      <div ref={buddhaRef} className="visit-buddha-photo" aria-hidden="true">
        <img src="assets/adidaphat.jpg" alt="" loading="lazy" decoding="async" />
      </div>
      <div className="wrap">
        <Reveal><p className="eyebrow" style={{ color: 'var(--sanite-gold)' }}>Ghé thăm</p></Reveal>
        <Reveal delay={100} as="h2" className="visit-h2">Chọn một góc Sanité gần bạn</Reveal>
        <Reveal delay={160} as="p" className="visit-lead">
          Hai chi nhánh cùng mở 10:00 – 22:00, hợp cho bữa chay nhẹ, gặp gỡ bạn bè hay bữa ăn gia đình.
        </Reveal>

        <div className="branches-grid">
          {SANITE_BRANCHES.map((b, i) => (
            <Reveal
              key={b.id}
              delay={i * 120}
              variant="route"
              className={`branch-card lift ${i === 0 ? 'branch-card-featured' : ''}`}
            >
              <span className="branch-label">{b.label}</span>
              <h3 className="branch-name">{b.name}</h3>
              <p className="branch-address">{b.address}</p>
              <div className="branch-meta">
                <span className="branch-meta-item"><span className="branch-dot" aria-hidden="true" />{b.hours}</span>
                <span className="branch-meta-item"><span className="branch-star" aria-hidden="true">★</span>{b.rating} · {b.reviewText}</span>
                <a className="branch-meta-item branch-phone" href={b.phoneHref}>{b.phone}</a>
              </div>
              <p className="branch-desc">{b.description}</p>
              <div className="branch-actions">
                <a href={b.mapUrl} target="_blank" rel="noopener noreferrer" className="pill pill-primary">Xem địa điểm</a>
                <a href={b.phoneHref} className="pill pill-secondary">Gọi {b.shortName}</a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- SECTION 8 — FINAL CTA ---------- */
function FinalCTA() {
  const lineRef = useReveal({ threshold: 0.3 });
  return (
    <section id="reserve" className="section velvet final-cta">
      <div className="final-glow" aria-hidden="true" />
      <svg className="final-tree" viewBox="0 0 300 320" fill="none" aria-hidden="true">
        <path d="M150 320 L150 150" stroke="var(--sanite-gold)" strokeWidth="1.4" opacity="0.55" />
        <path d="M150 180 C110 160 90 140 80 100 M150 200 C190 180 210 160 220 116 M150 150 C150 120 150 95 150 70 M150 170 C120 150 105 130 100 96 M150 165 C180 148 198 128 205 92" stroke="var(--sanite-gold)" strokeWidth="1" opacity="0.45" />
        <circle cx="80" cy="98" r="3.5" fill="var(--sanite-gold)" opacity="0.6" />
        <circle cx="220" cy="114" r="3.5" fill="var(--sanite-gold)" opacity="0.6" />
        <circle cx="150" cy="68" r="3.5" fill="var(--sanite-gold)" opacity="0.6" />
        <circle cx="100" cy="94" r="2.5" fill="var(--sanite-gold)" opacity="0.5" />
        <circle cx="205" cy="90" r="2.5" fill="var(--sanite-gold)" opacity="0.5" />
      </svg>

      <div className="wrap final-inner">
        {/* PROMPT 02 — hoa sen như một medallion, cảm hứng thanh lành của ẩm thực chay */}
        <Reveal className="final-lotus-wrap" once>
          <LotusMark size={104} className="lotus-final" />
          <span className="final-lotus-cap">Hoa sen gợi sự thanh lành và tĩnh tại.</span>
        </Reveal>
        <Reveal><p className="eyebrow" style={{ color: 'var(--gold-bright)', justifyContent: 'center' }}>Đặt bàn</p></Reveal>
        <Reveal delay={100} as="h2" variant="soft" className="final-h2">Đặt một bữa chay ấm lành.</Reveal>
        <div ref={lineRef} className="goldline final-divider" aria-hidden="true" />
        <Reveal delay={200} as="p" className="final-body">
          Dù là bữa trưa nhẹ, buổi hẹn tối hay bữa ăn gia đình, Sanité sẵn sàng gợi ý món hợp khẩu vị.
        </Reveal>
        <Reveal delay={280} className="final-actions">
          <a href={SANITE.tel} className="pill pill-gold">Gọi đặt bàn</a>
          <a href="#contact" className="pill pill-cream-outline">Xem địa điểm</a>
          <a href="#menu" className="pill pill-cream-outline">Xem thực đơn</a>
        </Reveal>
        <Reveal delay={340} as="p" className="final-hours">Mở cửa mỗi ngày từ 10:00 đến 22:00.</Reveal>
      </div>
    </section>
  );
}

/* ---------- FOOTER ---------- */
function Footer() {
  return (
    <footer className="footer">
      <svg className="footer-leaves" viewBox="0 0 1200 200" fill="none" aria-hidden="true" preserveAspectRatio="none">
        <path d="M0 160 C300 120 500 180 700 150 C900 120 1050 160 1200 130" stroke="var(--sanite-gold)" strokeWidth="1" opacity="0.18" />
      </svg>
      <div className="footer-inner">
        <Reveal variant="soft" className="footer-brand">
          <div className="footer-logo-card">
            <img src="assets/brand/sanite-logo.png" alt="Sanité Chay" />
          </div>
          <p className="footer-blurb">
            Sanité Chay — không gian chay ấm áp tại Quận 3 và Phú Nhuận, phục vụ món chay
            sáng tạo trong nhịp ăn nhẹ nhàng.
          </p>
        </Reveal>

        <Reveal variant="soft" delay={90} className="footer-col">
          <h4 className="footer-h">Khám phá</h4>
          <a href="#story">Câu chuyện</a>
          <a href="#menu">Thực đơn</a>
          <a href="#space">Không gian</a>
          <a href="#reviews">Đánh giá</a>
          <a href="#contact">Chi nhánh</a>
        </Reveal>

        <Reveal variant="soft" delay={180} className="footer-col footer-branches">
          <h4 className="footer-h">Chi nhánh</h4>
          {SANITE_BRANCHES.map((b) => (
            <div key={b.id} className="footer-branch">
              <span className="footer-branch-name">{b.shortName}</span>
              <p>{b.address}</p>
              <a href={b.phoneHref}>{b.phone}</a>
              <a href={b.mapUrl} target="_blank" rel="noopener noreferrer">Xem địa điểm</a>
            </div>
          ))}
        </Reveal>

        <Reveal variant="soft" delay={270} className="footer-col">
          <h4 className="footer-h">Giờ mở cửa</h4>
          <p>10:00 – 22:00</p>
          <p>Tất cả các ngày</p>
          <p>Quận 3 · Phú Nhuận</p>
        </Reveal>
      </div>
      <Reveal variant="soft" delay={120} className="footer-bottom">
        <span>© 2026 Sanité Chay. All rights reserved.</span>
        <span className="footer-tag"><Leaf size={13} color="var(--sanite-leaf)" /> Vegetarian · Quận 3 &amp; Phú Nhuận</span>
      </Reveal>
    </footer>
  );
}

Object.assign(window, { SpaceGallery, ReviewsSection, VisitSection, FinalCTA, Footer });
