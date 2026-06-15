# PROJECT_STRUCTURE_SANITE.md

> Tài liệu cấu trúc dự án — cập nhật ở **Prompt 03** (2026-06-14): tổ chức lại folder,
> thêm preloader hoa sen, motion riêng từng section. File này nằm tại `docs/project/`.

---

## 1. Tổng quan dự án
- **Tên dự án:** Sanité Vegetarian Landing Page
- **Mục tiêu:** Landing Page cho Nhà hàng chay **Sanité Chay** — **2 chi nhánh** (Prompt 08):
  - **Quận 3** (trụ sở chính): 2B Hồ Xuân Hương, Xuân Hòa, Quận 3 · `+84 962 106 679` · 4.8/5 · CID `8179673700776799321`.
  - **Phú Nhuận**: 46 Trương Quốc Dung, P.10, Phú Nhuận · `+84 978 323 232` · 4.7/5 · CID `9992186594375056901`.
  - Data ở `SANITE_BRANCHES` (`src/hooks/hooks.jsx`, export qua `window`). Link trỏ Google Maps nhưng text UI luôn là **"Xem địa điểm"** (KHÔNG dùng chữ "Google Maps").
- **Style:** Warm Botanical Editorial Dining
- **Tông màu:** kem beige, nâu mocha, gỗ/rattan, ánh đèn vàng, xanh phú quý emerald, gold accent
- **Kỹ thuật:** React 18.3.1 UMD + `@babel/standalone` (Babel-in-browser) + các file `.jsx` `type="text/babel"` chạy trực tiếp trong trình duyệt — **KHÔNG có build step** (chưa chuyển Vite).
- **Entry:** `index.html` (root) + alias `sanite-chay.html` (root).

---

## 2. Cấu trúc folder (sau Prompt 03)
```
project-root/
├─ index.html                 ← entry chính (root)
├─ sanite-chay.html           ← alias không dấu (root, nội dung giống index.html)
├─ insight_sanite.md          ← nguồn insight thương hiệu (root)
├─ src/
│  ├─ hooks/hooks.jsx         ← hooks + components dùng chung (Reveal, Leaf, LotusMark)
│  ├─ sections/
│  │  ├─ sections-a.jsx       ← Preloader + Navbar + Hero
│  │  ├─ sections-b.jsx       ← Story + Experience + Menu (DishCard/DishModal)
│  │  └─ sections-c.jsx       ← Gallery + Reviews + Visit + FinalCTA + Footer
│  └─ styles/
│     ├─ index.css            ← tokens, base, primitives, motion system, preloader, lotus, reduced-motion
│     └─ sections.css         ← layout từng section + menu/modal + motion map + responsive
├─ assets/
│  ├─ brand/                  ← sanite-logo.png, sanite-logo-square.png
│  ├─ gallery/                ← sanite-interior.png + ảnh không gian
│  │  └─ hero/README.md       ← quy tắc thêm ảnh hero/banner thật
│  ├─ references/             ← xanh-phu-quy.png (reference màu emerald)
│  ├─ menu/                   ← README.md + ảnh món ăn thật (thêm sau)
│  ├─ feedback/               ← README.md + fb_1..fb_5.jpg (ảnh đánh giá thật — accordion Reviews)
│  ├─ banner/                 ← banner_1.jpg, banner_2.jpg, banner_3.jpg (ảnh hero thật, 4 slide)
│  ├─ adidaphat.jpg           ← ảnh thật Đức Phật, ambience bên phải Visit
│  └─ hoasen.jpg              ← ảnh thật hoa sen, ambience vùng chuyển Hero → Story (Prompt 07)
├─ docs/
│  ├─ project/                ← PROJECT_STRUCTURE_SANITE.md, SANITE_WORK_HISTORY_2026-06-13.md
│  ├─ criteria/               ← tieu_chi_landingpage.md, tieu_chi_landing_page.docx
│  └─ references/             ← claude/, microsoft/, toiuutokenclaude.docx
├─ archive/
│  └─ uploads-original/       ← bản gốc của /uploads (không runtime dùng)
└─ report/                    ← audit/report + backups/ + screenshots/
```

## 3. Thứ tự nạp runtime (quan trọng — không đảo)
HTML (`index.html` / `sanite-chay.html`) nạp theo thứ tự:
1. `src/styles/index.css`
2. `src/styles/sections.css`
3. React UMD + ReactDOM UMD + Babel standalone (CDN unpkg, có SRI)
4. `src/hooks/hooks.jsx` (**nạp đầu nhóm JSX** — định nghĩa hooks/components/constants, export ra `window`)
5. `src/sections/sections-a.jsx`
6. `src/sections/sections-b.jsx`
7. `src/sections/sections-c.jsx`
8. Khối `App()` inline → render `<Preloader/> + <Navbar/> + <main>…</main> + <Footer/>` vào `#root`.

Mọi component/hook export qua `Object.assign(window, {...})` ở cuối mỗi file `.jsx`.

## 4. Path mới (CSS/JS/assets)
| Loại | Đường dẫn |
|---|---|
| CSS | `src/styles/index.css`, `src/styles/sections.css` |
| JS | `src/hooks/hooks.jsx`, `src/sections/sections-a.jsx`, `-b.jsx`, `-c.jsx` |
| Logo | `assets/brand/sanite-logo.png` (navbar/overlay/footer/preloader), `assets/brand/sanite-logo-square.png` (để favicon/OG — Prompt 04) |
| Ảnh nội thất | `assets/gallery/sanite-interior.png` (hero slide đầu tiên) |
| Ảnh hero thêm sau | `assets/gallery/hero/` (chỉ thêm vào `HERO_SLIDES` khi file thật tồn tại) |
| Reference màu | `assets/references/xanh-phu-quy.png` (không nhúng trực tiếp) |
| Ảnh món | `assets/menu/` (chưa có ảnh thật) |

## 5. Quy tắc move file sau này
- Mỗi lần move file phải **search + update toàn bộ đường dẫn** trong HTML/CSS/JSX/MD liên quan.
- Backup trước khi move (`report/backups/promptXX/` + snapshot file tree).
- Move xong → static validation (grep path cũ) → browser QA (CSS/JS load 200, không broken image).
- Không xóa file gốc khi chưa backup.

## 6. Quy tắc ảnh
- KHÔNG tạo `src` giả / KHÔNG ảnh internet cho món ăn.
- Menu image chỉ hiện khi field `image` có đường dẫn thật. Rỗng → KHÔNG render `<img>`, không broken image.
- Thêm ảnh món: bỏ file vào `assets/menu/` theo `assets/menu/README.md`, điền field `image` trong `MENU_ITEMS` (`src/sections/sections-b.jsx`).
- Hero slider dùng mảng `HERO_SLIDES` trong `src/sections/sections-a.jsx`. Chỉ thêm ảnh từ `assets/gallery/hero/` hoặc `assets/banner/` nếu file thật đã tồn tại. **Prompt 07:** 4 slide (interior + banner_1/2/3, banner đã nâng lên 1080×1350 = đúng tỉ lệ 4/5), autoplay + crossfade + 4 dots. `HERO_SLIDE_INTERVAL_MS = 3600` (nhanh hơn, từ 5400), crossfade `.hero-slide` ~0.95s + Ken Burns ~4s. Overlay tông **sáng** (veil kem/gold + emerald nhẹ góc dưới trái), ảnh `brightness(1.05)`. Reduced-motion tắt autoplay; pause khi hover/focus; dots click chuyển.
- **Feedback accordion (Prompt 05):** ảnh đánh giá thật ở `assets/feedback/fb_(số).jpg`; chỉ liệt kê file thật trong mảng `FEEDBACK_IMAGES` (`src/sections/sections-c.jsx`). 1 ảnh → 1 card lớn; 2–5 ảnh → accordion; >5 → lấy 5 ảnh đầu. Ảnh lỗi `onError` tự ẩn (KHÔNG ảnh giả). Mảng rỗng → fallback review card chữ, không broken image. Quy tắc tên/nguồn/kích thước trong `assets/feedback/README.md`. Tuyệt đối không dùng ảnh internet/Unsplash/placeholder.

## 6b. Quy tắc ornament & visual (cập nhật Prompt 08)
- **Lotus backdrop panel (Story):** ảnh thật `assets/hoasen.jpg` qua `<div className="story-lotus-photo story-lotus-backdrop"><img alt="" aria-hidden/></div>`. Prompt 08 biến thành **khối ảnh lớn bên trái Story**, vượt nhẹ lên Hero: `position:absolute; left:~0; top` âm; `width clamp(360–620px)`, `height clamp(620–900px)`; `object-fit:cover` (object-position center 42% để giữ hoa); `border-radius 0 46px 46px 0`; `mask-image: linear-gradient(to right, …)` mờ dần sang phải; `box-shadow` mềm; opacity ~0.5 (mobile watermark 0.36–0.42). Nằm sau chữ (`z-index:0`), có **scrim** `.story-left::before` (gradient kem) bảo vệ readability → KHÔNG che chữ. `.story` `overflow:visible`; `body{overflow-x:hidden}` chống tràn. `LotusBranch` SVG vẫn còn trong hooks nhưng không render.
- **Buddha photo (Visit):** Prompt 06 **bỏ SVG `BuddhaOrnament`**, dùng **ảnh thật** `assets/adidaphat.jpg` qua `<div className="visit-buddha-photo"><img alt="" aria-hidden/></div>` bên phải `VisitSection`. Hòa nền bằng `object-fit:contain` + `mask-image` radial (mờ rìa) + filter ấm (`sepia/brightness`), opacity ~0.3 (mobile thấp hơn), `z-index:0` < `.wrap`, `pointer-events:none`; breathing glow qua `brightness`. `.visit` giữ `overflow:hidden`. Không che CTA "Xem đường đi"/Call/Maps.
- **Feedback images = `object-fit: contain` (full max — Prompt 07):** cấu trúc `.fb-item` = `.fb-image-shell` (ảnh contain, padding 8px) + `.fb-caption-bar` (caption nằm DƯỚI ảnh, không che review). Accordion cao `clamp(560–680px)`, active `flex-grow 6.5` (ảnh review hiện lớn nhất có thể, xem trọn), inactive min-width 58px. Mobile: scroll cards `flex-basis 74–90vw`, cao `min(70–72vh, 640–660px)`, contain. KHÔNG dùng `cover`/overlay che ảnh.
- **Mobile ornament visibility (Prompt 07):** hoa sen + Đức Phật phải VẪN thấy trên mobile — tăng opacity + `drop-shadow` glow; Buddha ở **góc phải trên** Visit. Không che text/CTA, không overflow ngang.
- **Hero (Prompt 08):** KHÔNG hiển thị giá ở Hero/Banner. Badges = "2 chi nhánh" · "Quận 3 · Phú Nhuận" · "10:00 – 22:00"; float-card phải = "2 chi nhánh / Quận 3 · Phú Nhuận". CTA Hero: "Gọi đặt bàn", "Xem thực đơn", "Xem địa điểm" (→ `#contact`).
- **Visit 2 chi nhánh (Prompt 08):** render `.branches-grid` 2 `.branch-card` (Quận 3 featured + Phú Nhuận) từ `SANITE_BRANCHES`; mỗi card: label, tên, địa chỉ, giờ, rating, phone, mô tả ngắn, CTA "Xem địa điểm" + "Gọi {chi nhánh}". Mobile stack 1 cột. Đã bỏ map-card "Đi đến Sanité" + mục giá cũ.
- **Menu best-seller (Prompt 08):** thêm `featured: true` + badge "Gợi ý nên thử" cho: Bánh mì Pate nấm, Nấm bào ngư chiên muối tiêu, Lẩu Tomyum kem béo, Bánh Crème Brûlée (category mới "Tráng miệng"). Không xóa món cũ.
- **Icon sizing (Prompt 06):** token `--icon-sm:15px / --icon-md:18px / --icon-lg:24px` (index.css); leaf/arrow/copy icon tăng nhẹ qua CSS scope (`.fc-eyebrow svg`, `.story-sign svg`, `.mc-more svg`, `.info-link svg`, `.pill svg`, `.dish-close svg`…), không phá button/nav.
- Tất cả: mobile giảm kích thước/opacity; `prefers-reduced-motion` tắt sway/bloom/glow, hiện static. KHÔNG ảnh internet/placeholder; chỉ trỏ file thật tồn tại.

## 7. Quy tắc preloader ("Sanité Lotus Opening")
- Component `Preloader` ở `src/sections/sections-a.jsx`, render đầu tiên trong `App`.
- Nền emerald velvet + glow gold (CSS gradient, không ảnh nặng); hoa sen `LotusMark` nở; logo trong khung cream để đọc rõ trên nền tối; logo path `assets/brand/sanite-logo.png`.
- Tự fade-out: hiển thị ~1200ms rồi fade ~600ms (tối đa ~1800ms). reduced-motion: ~400ms + fade nhanh.
- Dùng `useLockBodyScroll` khi đang preload, **trả lại scroll** khi unmount (không kẹt); sau khi xong `pointer-events:none` + unmount (không che click).

## 8. Quy tắc animation từng section (motion map)
- Chỉ animate `transform` / `opacity` / `clip-path`; KHÔNG `top/left/width/height` (tránh layout shift).
- `Reveal` hỗ trợ prop `variant`: `soft | arch | route | quote | step | from-left | from-right` (class `reveal-<variant>` định nghĩa ở `index.css`).
- Motion riêng: Header cream-glass settle · Hero text stagger + image arch reveal · Story directional cards · Experience ritual steps (marker gold sáng) · Menu dish reveal + lotus-bloom modal · Gallery arch window reveal · Reviews quote tilt + count-up · Visit route steps (marker) · FinalCTA lotus medallion + stagger · Footer columns stagger.
- Reveal 2 chiều (`once=false`) với rootMargin đệm → không nhấp nháy.
- Mobile/touch: tắt parallax/floaty/blur nặng; `prefers-reduced-motion` reset về hiện ngay.

## 9. QA bắt buộc
- Breakpoint: 1440×1100, 1366×1000, 768×1000, 430×932, 390×900, 360×860.
- Test **cả** `index.html` và `sanite-chay.html`.
- Kiểm: preloader xuất hiện rồi biến mất, header/hero/menu/modal/lotus/CTA/gallery/footer, `scrollWidth===clientWidth`, broken image = 0, console error = 0, CSS/JS/asset load 200.
- Công cụ: local server (`python -m http.server`) + Playwright (Chromium headless) chụp screenshot.

## 10. Prompt 04 — Git, ignore và deploy readiness
- Repo branch chính: `main`.
- Remote GitHub: `https://github.com/KentTho/sanite_vegetarian-_restaurant.git`.
- `.gitignore` loại `report/`, backups/screenshots, `.vercel/`, env files, `node_modules/`, cache, cấu hình IDE/cục bộ và artifact QA.
- `.vercelignore` loại `report/`, `archive/`, `docs/references/`, `.env*`, cache, IDE/cục bộ và artifact QA; vẫn giữ `index.html`, `sanite-chay.html`, `src/`, `assets/`, `docs/project/`, `docs/criteria/`.
- Website hiện là static HTML + React/Babel CDN, **không có build command**. Khi deploy Vercel, dùng project root `./`, framework Other/static, build/output command để trống.
- Prompt 04 đã push GitHub PASS (`fe2e7ca`). Vercel deploy chưa hoàn tất do CLI chưa có phiên đăng nhập/token an toàn trên máy.

## 11. Việc còn lại
Vite/build production nếu cần tối ưu performance · favicon/OG/Twitter/canonical · nén ảnh ·
đăng nhập Vercel CLI và deploy · production QA · gắn thêm ảnh món/ảnh hero thật.
