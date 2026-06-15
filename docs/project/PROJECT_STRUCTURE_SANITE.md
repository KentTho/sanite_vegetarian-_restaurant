# PROJECT_STRUCTURE_SANITE.md

> Tài liệu cấu trúc dự án — cập nhật ở **Prompt 03** (2026-06-14): tổ chức lại folder,
> thêm preloader hoa sen, motion riêng từng section. File này nằm tại `docs/project/`.

---

## 1. Tổng quan dự án
- **Tên dự án:** Sanité Vegetarian Landing Page
- **Mục tiêu:** Landing Page cho Nhà hàng chay **Sanité Chay** (46 Trương Quốc Dung, Phú Nhuận, HCM)
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
│  ├─ gallery/                ← sanite-interior.png
│  ├─ references/             ← xanh-phu-quy.png (reference màu emerald)
│  └─ menu/                   ← README.md + ảnh món ăn thật (thêm sau)
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
| Ảnh nội thất | `assets/gallery/sanite-interior.png` (hero + gallery) |
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

## 10. Không làm ở giai đoạn này (để Prompt 04)
Vite/build production · `.gitignore`/`.vercelignore` · favicon/OG/Twitter/canonical · nén ảnh ·
`git init` · deploy QA · gắn ảnh món thật vào `assets/menu/`.
