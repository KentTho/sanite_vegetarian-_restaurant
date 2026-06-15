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
            “Không gian hiện đại mà vẫn rất dễ chịu.”
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

function ReviewsSection() {
  const [rating, ratingRef] = useCountUp(4.7, { decimals: 1, duration: 1500 });
  return (
    <section id="reviews" className="section reviews">
      <div className="wrap reviews-grid">
        <div className="reviews-left">
          <Reveal><p className="eyebrow" style={{ color: 'var(--sanite-gold)' }}>Đánh giá</p></Reveal>
          <Reveal delay={100} as="h2" className="reviews-h2">
            Được yêu bởi vị chay và không gian ấm.
          </Reveal>
          <div className="rating-block" ref={ratingRef}>
            <div className="rating-num">{rating}<span className="rating-of">/5</span></div>
            <div className="rating-meta">
              <div className="stars" aria-hidden="true">★★★★★</div>
              <span>331 đánh giá</span>
            </div>
          </div>
        </div>

        <div className="reviews-right">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.l} delay={i * 110} variant="quote" className="review-card lift">
              <span className="rc-quote-mark" aria-hidden="true">”</span>
              <p className="rc-quote">{r.q}</p>
              <span className="rc-label">{r.l}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- SECTION 7 — VISIT ---------- */
function VisitSection() {
  const INFO = [
    { t: 'Địa chỉ', v: '46 Trương Quốc Dung,\nPhú Nhuận, Hồ Chí Minh', cta: { label: 'Mở Google Maps', href: SANITE.maps, ext: true } },
    { t: 'Giờ mở cửa', v: '10:00 – 22:00', sub: 'Tất cả các ngày trong tuần' },
    { t: 'Liên hệ', v: SANITE.phone, cta: { label: 'Gọi ngay', href: SANITE.tel } },
    { t: 'Mức giá tham khảo', v: '200.000đ – 300.000đ', sub: '/ người' },
  ];
  return (
    <section id="contact" className="section plaster visit">
      <div className="wrap">
        <Reveal><p className="eyebrow" style={{ color: 'var(--sanite-gold)' }}>Ghé thăm</p></Reveal>
        <Reveal delay={100} as="h2" className="visit-h2">Ghé Sanité tại Phú Nhuận</Reveal>

        <div className="visit-grid">
          <div className="visit-info">
            {INFO.map((c, i) => (
              <Reveal key={c.t} delay={i * 110} variant="route" className="info-card lift route-step">
                <span className="route-dot" aria-hidden="true" />
                <span className="info-t">{c.t}</span>
                <p className="info-v">{c.v}</p>
                {c.sub && <span className="info-sub">{c.sub}</span>}
                {c.cta && (
                  <a
                    href={c.cta.href}
                    className="info-link"
                    {...(c.cta.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {c.cta.label}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M7 17 17 7M17 7H9M17 7v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                )}
              </Reveal>
            ))}
          </div>

          <Reveal delay={120} className="map-card velvet lift">
            <svg className="map-leaves" viewBox="0 0 240 240" fill="none" aria-hidden="true">
              <path d="M30 210 C30 150 30 120 30 70" stroke="var(--sanite-gold)" strokeWidth="1" opacity="0.4" />
              <path d="M30 120 C60 105 75 90 80 60" stroke="var(--sanite-gold)" strokeWidth="0.9" opacity="0.35" />
              <circle cx="80" cy="58" r="3" fill="var(--sanite-gold)" opacity="0.5" />
            </svg>
            <div className="map-card-inner">
              <span className="eyebrow" style={{ color: 'var(--gold-bright)' }}>Chỉ đường</span>
              <h3 className="map-title">Đi đến Sanité</h3>
              <p className="map-sub">Mở Google Maps để tới 46 Trương Quốc Dung, Phú Nhuận.</p>
              <a href={SANITE.maps} target="_blank" rel="noopener noreferrer" className="pill pill-gold">Xem đường đi</a>
            </div>
          </Reveal>
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
          <a href={SANITE.maps} target="_blank" rel="noopener noreferrer" className="pill pill-cream-outline">Mở Google Maps</a>
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
            Sanité Chay — không gian chay ấm áp tại Phú Nhuận, phục vụ món chay sáng tạo trong
            nhịp ăn nhẹ nhàng.
          </p>
        </Reveal>

        <Reveal variant="soft" delay={90} className="footer-col">
          <h4 className="footer-h">Khám phá</h4>
          <a href="#story">Câu chuyện</a>
          <a href="#menu">Thực đơn</a>
          <a href="#space">Không gian</a>
          <a href="#reviews">Đánh giá</a>
          <a href="#contact">Liên hệ</a>
        </Reveal>

        <Reveal variant="soft" delay={180} className="footer-col">
          <h4 className="footer-h">Liên hệ</h4>
          <p>46 Trương Quốc Dung,<br />Phú Nhuận, Hồ Chí Minh</p>
          <a href={SANITE.tel}>{SANITE.phone}</a>
          <a href={SANITE.maps} target="_blank" rel="noopener noreferrer">Google Maps</a>
        </Reveal>

        <Reveal variant="soft" delay={270} className="footer-col">
          <h4 className="footer-h">Giờ mở cửa</h4>
          <p>10:00 – 22:00</p>
          <p>Mỗi ngày</p>
        </Reveal>
      </div>
      <Reveal variant="soft" delay={120} className="footer-bottom">
        <span>© 2026 Sanité Chay. All rights reserved.</span>
        <span className="footer-tag"><Leaf size={13} color="var(--sanite-leaf)" /> Vegetarian · Phú Nhuận</span>
      </Reveal>
    </footer>
  );
}

Object.assign(window, { SpaceGallery, ReviewsSection, VisitSection, FinalCTA, Footer });
