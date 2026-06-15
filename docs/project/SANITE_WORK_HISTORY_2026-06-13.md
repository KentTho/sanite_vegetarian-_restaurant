# SANITE_WORK_HISTORY_2026-06-13.md

> Nhật ký công việc dự án Sanité Vegetarian Landing Page.
> File ghi lại lịch sử ngày chuyển sang thư mục/giao diện mới và các bước nâng cấp.

---

## 1. Mục tiêu trong ngày
Trong ngày 2026-06-13, dự án **chính thức chuyển sang thư mục/giao diện mới**
"Sanité Vegetarian Landing Page" cho nhà hàng chay Sanité Chay.
**Không dùng giao diện cũ nữa** — toàn bộ thiết kế, asset và code được tổ chức lại trong thư mục mới này.

## 2. Tài nguyên đã dùng
- Ảnh nội thất Sanité (`assets/gallery/sanite-interior.png` — path mới sau Prompt 03)
- Logo ngang Sanité (`assets/brand/sanite-logo.png` — path mới sau Prompt 03)
- Logo vuông Sanité (`assets/brand/sanite-logo-square.png` — path mới sau Prompt 03)
- Ảnh màu xanh phú quý (`assets/references/xanh-phu-quy.png` — path mới sau Prompt 03) — dùng làm reference màu emerald
- `insight_sanite.md` — insight cảm xúc / định hướng câu chữ thương hiệu
- `tieu_chi_landingpage.md` — bộ tiêu chí landing page chuẩn

## 3. Công việc đã làm (timeline)
1. Chuẩn bị định hướng thiết kế Landing Page Sanité.
2. Dùng style **Warm Botanical Editorial Dining** (kem beige + nâu mocha + emerald xanh phú quý + gold accent + chi tiết lá).
3. Tổ chức asset vào thư mục `/assets`.
4. Tạo cấu trúc code: 1 file HTML entry + 4 file JSX (hooks + sections-a/b/c) + 2 file CSS (index.css + sections.css), chạy React UMD + Babel-in-browser.
5. Chạy **Prompt 01** để audit toàn bộ thư mục mới → tạo `report/PROMPT_01_FULL_AUDIT_SANITE_NEW_FOLDER.md`.
6. Prompt 01 xác nhận: code hiện tại **đẹp và chạy được**, nội dung chính xác (đủ 14 món, brand info, rating 4.7/331), nhưng **cần chuẩn hóa file entry (`index.html`), QA responsive thực tế, và cải thiện deploy readiness**.
7. Tiến hành **Prompt 02**: chuẩn hóa cấu trúc + tên file, đồng bộ typography, thêm Menu image system + lightbox/modal, nâng cấp animation sang trọng (cuộn lên/xuống), thêm điểm nhấn hoa sen, QA responsive toàn thiết bị.

## 4. Quyết định thiết kế
- Giữ tông **kem beige + nâu mocha + xanh phú quý emerald + gold accent**.
- KHÔNG làm kiểu SaaS / tech.
- KHÔNG tạo claim quá đà ("ngon nhất", "số 1", "tốt nhất").
- KHÔNG dùng ảnh giả (đặc biệt ảnh món ăn).
- KHÔNG thiết kế bừa / làm rối layout — nâng cấp có kiểm soát, scope hẹp, QA từng bước.
- Câu chữ bám theo `insight_sanite.md`: an yên, ấm áp, nhẹ nhàng, món chay sáng tạo từ nấm/rau củ.

## 5. Vấn đề phát hiện
- File HTML cũ `Sanité Chay.html` có **dấu tiếng Việt + khoảng trắng** → dễ lỗi URL-encode khi deploy.
- Chưa có `index.html` chuẩn để host serve làm root.
- Menu chưa có ảnh món ăn (mới chỉ có text).
- Gallery còn phụ thuộc **1 ảnh nội thất lặp 3 lần**.
- Cần test mobile thật (chưa có bằng chứng QA responsive).
- Cần cải thiện animation khi cuộn lên / cuộn xuống.

## 6. Bước tiếp theo
- Tạo `index.html`.
- Chuẩn bị thư mục `assets/menu` + quy tắc ảnh.
- Thêm menu lightbox/modal xem chi tiết món.
- Nâng cấp animation (sticky header shrink, reveal 2 chiều, stagger, hover sang trọng).
- Thêm hoa sen (decorative motif).
- QA toàn thiết bị + screenshot.
- Viết report Prompt 02.

---
*(Các bước 1–6 phần 6 ở trên đã được thực hiện trong Prompt 02 — xem `report/PROMPT_02_STRUCTURE_ANIMATION_MENU_UPGRADE.md`.)*

## 7. Prompt 03 — Tổ chức thư mục, preloader và motion nâng cao (2026-06-14)
- **Tổ chức lại folder:** chuyển JSX vào `src/hooks/` + `src/sections/`, CSS vào `src/styles/`; gom asset theo nhóm `assets/brand/`, `assets/gallery/`, `assets/references/`, `assets/menu/`; tài liệu vào `docs/project|criteria|references/`; bản gốc upload vào `archive/uploads-original/`. Đã backup & snapshot file tree trong `report/backups/prompt03/`.
- **Sửa path:** `index.html` + `sanite-chay.html` trỏ đúng `src/styles/*.css` và `src/hooks|sections/*.jsx`; toàn bộ `src` ảnh trỏ đúng `assets/brand|gallery/...`. Runtime không còn path cũ.
- **DishModal:** đã **bỏ button "Gọi đặt món"** (CTA `tel:` trong modal). Modal chỉ còn nút X góc, nút "Đóng", đóng bằng Escape và bằng backdrop. Các CTA gọi/đặt bàn ở Navbar/Hero/Visit/FinalCTA được giữ nguyên.
- **Preloader "Sanité Lotus Opening":** thêm component `Preloader` (nền emerald velvet + glow gold, hoa sen `LotusMark` nở, logo trong khung cream), tự fade-out (~1200ms + fade ~600ms), khóa scroll lúc preload và trả lại khi unmount, tôn trọng `prefers-reduced-motion`, không che click sau khi xong.
- **Motion riêng từng section:** `Reveal` thêm prop `variant` (`soft | arch | route | quote | step | from-left | from-right`); Header glass settle, Hero stagger, Story directional cards, Experience ritual steps + lotus/goldline, Menu dish reveal + lotus-bloom modal, Gallery arch reveal, Reviews quote tilt + count-up, Visit route steps, FinalCTA lotus medallion, Footer columns stagger. Chỉ animate transform/opacity/clip-path; reduced-motion reset hiện ngay.
- **QA:** đã static validation + browser QA cả `index.html` và `sanite-chay.html`, chụp screenshot evidence trong `report/screenshots/prompt03/`. Xem `report/PROMPT_03_PROJECT_ORGANIZATION_PRELOADER_MOTION.md`.
- **Ghi chú resume:** Prompt 03 từng bị dừng giữa chừng do lỗi *API Error: Overloaded*. Đã resume bằng **Prompt 03R** và hoàn tất phần còn dở (docs update + static validation + browser QA + screenshots + report).
- **Chưa làm (để Prompt 04):** Vite/production build, `.gitignore`/`.vercelignore`, favicon/OG/Twitter/canonical, nén ảnh, `git init`, deploy QA, gắn ảnh món thật vào `assets/menu/`.

## 8. Prompt 04 — Hero slider, copy tightening, GitHub & Vercel deploy (2026-06-15)
- **Hero slider:** đã chuẩn bị hệ `HERO_SLIDES` trong `src/sections/sections-a.jsx`, hiện chỉ render ảnh thật `assets/gallery/sanite-interior.png`; khi có từ 2 ảnh thật sẽ auto-play, crossfade, dot click và pause khi hover/focus. Không trỏ tới file chưa tồn tại.
- **Overlay emerald:** đã thêm overlay radial-gradient xanh phú quý từ góc dưới trái hero frame, có gold glow nhẹ và breathing wave; mobile/reduced-motion giảm hoặc tắt animation.
- **Copy tightening:** đã rút gọn Hero, Story, Experience, Menu, Gallery, Reviews, Visit, FinalCTA và Footer theo `insight_sanite.md`; giữ tiếng Việt, thông tin Phú Nhuận, 46 Trương Quốc Dung, 10:00-22:00, +84 978 323 232, 4.7/5 - 331 đánh giá, 200.000đ-300.000đ/người và món nổi bật.
- **Preloader timing:** tăng thời gian hiển thị lên `2800ms` + fade `700ms` (tổng khoảng 3.5s); reduced-motion dùng `1000ms` + `250ms`.
- **Ignore files:** đã tạo `.gitignore` và `.vercelignore`; `report/`, backups, screenshots, `.vercel/`, env files, `node_modules/`, cache và artifact QA không bị commit/deploy.
- **Local QA:** PASS bằng Playwright headless trên `index.html` và `sanite-chay.html`, các breakpoint 1440, 1366, 768, 430, 390, 360; 0 console/page/request error, 0 broken image, không overflow/cắt chữ, modal menu không có "Gọi đặt món".
- **Screenshot evidence:** lưu tại `report/screenshots/prompt04/` (ignored khỏi git).
- **GitHub:** remote `https://github.com/KentTho/sanite_vegetarian-_restaurant.git`, branch `main`, commit đầu `fe2e7ca`, push PASS.
- **Vercel:** BLOCKED. `vercel` global chưa cài; `npx vercel` chạy được nhưng `deploy`, `whoami`, `login` đều treo không xuất auth prompt. Không có `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` trong env. Vì vậy chưa có preview URL/production URL và chưa thể production QA.
- **Trạng thái:** Prompt 04 code + local QA + GitHub push PASS; Vercel deploy cần đăng nhập Vercel CLI hoặc cung cấp token qua cơ chế an toàn ngoài chat.

## 9. Prompt 05 — Lotus branch, Buddha ornament và feedback accordion (2026-06-15)
- **Cành hoa sen Story:** thêm component `LotusBranch` (`src/hooks/hooks.jsx`), render `<LotusBranch className="story-lotus-branch" />` ở góc trên trái `StorySection`. Inline SVG line-art: 1 hoa sen nở chính + 1 nụ + lá pad + thân, màu gold/emerald/hồng sen trầm; gió đung đưa nhẹ (sway, tâm xoay ở gốc cành), hoa bloom + cánh vẽ dần (stroke-dashoffset) khi vào viewport. `aria-hidden` + `pointer-events:none`, `z-index:0`; `.story` thêm `overflow:hidden`. Không che heading/card, không overflow.
- **Đức Phật ornament Visit:** thêm component `BuddhaOrnament` (`src/hooks/hooks.jsx`), render `<BuddhaOrnament className="visit-buddha" />` bên phải `VisitSection`. Inline SVG line-art (mặt nghiêng hướng trái, mắt khép, ushnisha, tóc xoăn, tai dài, urna, hào quang + nếp áo cà sa) lấy cảm hứng từ `assets/adidaphat.jpg` — KHÔNG dùng ảnh thật/photorealistic. Mờ (`opacity ~0.2`) + sunset aura glow breathe; `z-index:0` thấp hơn `.wrap`, `.visit` thêm `overflow:hidden`; không che CTA "Xem đường đi"/Call/Maps.
- **Feedback accordion Reviews:** thêm mảng `FEEDBACK_IMAGES` + component `FeedbackAccordion` (`src/sections/sections-c.jsx`). Dùng **5 ảnh thật** `assets/feedback/fb_1.jpg`..`fb_5.jpg`. Desktop: accordion hover/focus mở rộng item active (transition flex-grow), overlay emerald + caption, bo góc 24px, `object-fit:cover` (không méo). Mobile: chuyển scroll cards snap (`overscroll-behavior-inline:contain`), card ~82vw. Rating 4.7/5 · 331 đánh giá giữ ở `.reviews-left`; review quote chuyển xuống `.reviews-quotes` dưới grid. `onError` ẩn ảnh lỗi (không ảnh giả); mảng rỗng → fallback review card chữ.
- **Asset:** tạo `assets/feedback/README.md` (quy tắc tên/nguồn/kích thước, cách cập nhật `FEEDBACK_IMAGES`). Ghi nhận reference `assets/adidaphat.jpg`.
- **QA responsive:** Playwright headless cả `index.html` và `sanite-chay.html` tại 6 breakpoint (1440, 1366, 768, 430, 390, 360). Tất cả PASS: 0 console/page error, 0 failed request, 0 broken image, `scrollWidth===clientWidth` (0 overflow); lotus/buddha/accordion đều hiện (5 ảnh feedback, 4 quote chips). Screenshot evidence trong `report/screenshots/prompt05/` (ignored khỏi git).
- **Static validation:** không có Unsplash/Pexels/placeholder; mọi `src` feedback trỏ file thật; CSS braces cân bằng (index 163/163, sections 324/324); không console.log thừa; `LotusBranch`/`BuddhaOrnament` đã export qua `window`.
- **Không làm:** không cài shadcn/Tailwind/TypeScript/lucide, không thêm dependency, không deploy Vercel, không force push, không commit report/screenshots/backups.

## 10. Prompt 06 — Fix lotus transition, Buddha photo, hero banner, feedback full image (2026-06-15)
- **Lotus lớn hơn, vùng chuyển Hero→Story:** `LotusBranch` thêm class `story-lotus-branch-featured`; phóng lớn `width clamp(220–340px)`, đặt ở vùng chuyển (`top` âm để vươn lên từ mép Hero/Story), opacity ~0.78, thêm glow kem/gold sau hoa, sway nhẹ hơn (rotate −1.1°→1.3°, 8s). `.story` đổi `overflow:hidden`→`visible`; chống tràn ngang nhờ `body{overflow-x:hidden}` + `left` dương. Không che heading Story/CTA Hero.
- **Buddha SVG → ảnh thật:** bỏ component `BuddhaOrnament` (và CSS `.buddha-ornament/.bo-*`, export window). Visit render ảnh thật `assets/adidaphat.jpg` qua `.visit-buddha-photo` (decorative: `alt=""`, `aria-hidden`, `pointer-events:none`). Hòa nền: `object-fit:contain` + `mask-image` radial mờ rìa + filter ấm (`sepia/saturate/brightness/contrast`), opacity ~0.3 desktop (mobile 0.16–0.2), breathing glow qua `brightness`, fade-in khi vào viewport (`useReveal`). Không che CTA.
- **Hero banner sáng hơn + ảnh thật banner:** `HERO_SLIDES` thêm `assets/banner/banner_1.jpg` + `banner_2.jpg` (audit tồn tại) → 3 slide, autoplay + crossfade + dots. Overlay đổi tông sáng (veil kem/gold + emerald nhẹ góc dưới trái thay cho emerald đậm), `.hero-frame` nền kem + border/shadow ấm, `.hero-slide` `brightness(1.05)`. Không còn tối.
- **Reviews xem trọn ảnh:** `.fb-item img` đổi `cover`→`contain`, thêm khung kem/emerald + padding, active card rộng hơn (`flex-grow 5.2`, accordion cao 520px), caption thành chip nhỏ (không che chữ review). Mobile scroll cards `aspect-ratio 3/4` + contain. Ảnh review (screenshot dọc) hiển thị đầy đủ, không crop chữ, không méo.
- **Icon size tuning:** token `--icon-sm/md/lg`; tăng nhẹ leaf/arrow/copy/dish-close/badge-dot qua CSS scope, không phá button/nav.
- **QA:** Playwright headless cả `index.html` và `sanite-chay.html` × 6 breakpoint (1440/1366/768/430/390/360) đều PASS: 0 console/page error, 0 failed request, 0 broken image, 0 overflow; hero 3 slide + 3 dots, lotus hiện ở transition, buddha là ẢNH (svg cũ đã gỡ), feedback `object-fit:contain`. Screenshot trong `report/screenshots/prompt06/` (ignored).
- **Static validation:** không còn `BuddhaOrnament`/`.buddha-ornament`/`.bo-*` trong src; `adidaphat.jpg` + `banner_*.jpg` trỏ file thật; feedback dùng contain; CSS braces cân bằng (index 169/169, sections 326/326); không console.log.
- **Không làm:** không cài shadcn/Tailwind/TS/lucide, không thêm dependency, không ảnh internet/placeholder, không deploy Vercel, không force push, không commit report/screenshots/backups.

## 12. Prompt 08 — Story lotus backdrop & cập nhật 2 chi nhánh (2026-06-15)
- **Story lotus backdrop:** chuyển `assets/hoasen.jpg` từ medallion nhỏ thành **khối ảnh lớn bên trái Story** (class `story-lotus-backdrop`), vượt nhẹ lên Hero: `object-fit:cover`, `border-radius 0 46px 46px 0`, `mask` mờ dần sang phải, `box-shadow` mềm, opacity ~0.5; nằm sau chữ + scrim `.story-left::before` bảo vệ readability → không che chữ. Mobile thành watermark (opacity 0.36–0.42), không overflow.
- **2 chi nhánh:** thêm `SANITE_BRANCHES` (Quận 3 + Phú Nhuận) trong `hooks.jsx`, export `window`. Cập nhật toàn site không còn hiểu nhầm chỉ có Phú Nhuận (Hero, Visit, Footer, FinalCTA, blurb, tag).
- **Hero bỏ giá:** xoá badge/float-card giá (200k–300k, /người); badges mới "2 chi nhánh · Quận 3 · Phú Nhuận · 10:00–22:00"; H1 "…giữa Sài Gòn"; typewriter nhắc 2 không gian Quận 3 & Phú Nhuận.
- **CTA "Xem địa điểm":** bỏ mọi text "Google Maps"/"Mở Google Maps" trong UI (Hero, mobile nav, Visit, FinalCTA, Footer); link vẫn trỏ Google Maps đúng CID từng chi nhánh.
- **Visit 2 branch cards:** thay layout cũ (info + map-card + giá) bằng `.branches-grid` 2 `.branch-card` (Quận 3 featured + Phú Nhuận): label, tên, địa chỉ, giờ, rating, phone, mô tả ngắn, CTA "Xem địa điểm" + "Gọi {chi nhánh}". Title "Chọn một góc Sanité gần bạn". Mobile stack 1 cột.
- **Footer 2 chi nhánh:** cột "Chi nhánh" liệt kê cả hai (địa chỉ + phone + "Xem địa điểm"); blurb + tag nhắc Quận 3 & Phú Nhuận.
- **Menu best-seller:** `featured:true` + badge "Gợi ý nên thử" cho Bánh mì Pate nấm (đổi tên gọn), Nấm bào ngư chiên muối tiêu (mới), Lẩu Tomyum kem béo (mới), Bánh Crème Brûlée (mới, category "Tráng miệng"). Không xóa món cũ.
- **QA:** Playwright headless `index.html` + `sanite-chay.html` × 6 breakpoint đều PASS: overflow=0, broken=0, console/page err=0, failed req=0; lotus backdrop hiện, 2 branch card, footer 2 chi nhánh, KHÔNG còn text "Google Maps", Hero không còn giá, map href đúng CID Q3/PN, tel href đúng. Screenshot `report/screenshots/prompt08/` (ignored).
- **Static validation:** CSS braces cân bằng (index 151/151, sections 350/350); không console.log; không src lỗi.
- **Không làm:** không cài shadcn/Tailwind/TS/lucide, không thêm dependency, không ảnh internet/placeholder, không deploy Vercel, không force push, không commit report/screenshots/backups.

### Prompt 08b — Story lotus sát cạnh trái + sát đáy (2026-06-15)
- Theo yêu cầu: đổi vị trí ảnh `hoasen.jpg` ở Story sang **sát cạnh trái + sát đáy** section (`top:auto; bottom:0; left:0` cho cả desktop/tablet/mobile), `border-radius:0 46px 0 0` (vuông góc trái & đáy). Giữ nguyên treatment (mask/opacity/filter/scrim) và mọi phần khác.
- QA Playwright 6 breakpoint × 2 trang PASS: overflow=0, broken=0, console/req err=0, ảnh flush trái (left≈0) + sát đáy Story; chữ/card vẫn đọc rõ. Screenshot `report/screenshots/prompt08b/`.

## 11. Prompt 07 — Real lotus image, mobile ornament visibility & feedback full max (2026-06-15)
- **Lotus SVG → ảnh thật:** bỏ render `LotusBranch` trong `StorySection` (component vẫn còn trong `hooks.jsx`, không dùng — không ảnh hưởng runtime); thay bằng ảnh thật `assets/hoasen.jpg` qua `.story-lotus-photo` (decorative: `alt=""`, `aria-hidden`, `pointer-events:none`). Hòa nền giống Buddha photo: `object-fit:contain` + `mask-image` radial + filter ấm + `drop-shadow` gold glow; float + glow breathe; opacity ~0.7; đặt ở vùng chuyển Hero→Story (`top` âm). Gỡ CSS `.lotus-branch/.lb-*` cũ trong index.css.
- **Mobile ornament visibility:** tăng opacity + thêm `drop-shadow` glow cho lotus & buddha trên mobile; **Buddha photo chuyển lên góc phải TRÊN** Visit (trước đó bị map-card đậm che ở đáy nên không thấy). Lotus mobile width clamp(150–280px) opacity ~0.68. Không che text/CTA, không overflow.
- **Hero slider nhanh hơn:** `HERO_SLIDE_INTERVAL_MS` 5400 → **3600**; `.hero-slide` crossfade `opacity .95s` + Ken Burns `transform 4s`. Thêm `assets/banner/banner_3.jpg` (banner đã nâng 1080×1350) → **4 slide + 4 dots**. Reduced-motion tắt autoplay; pause hover/focus; dots click OK.
- **Reviews full max:** đổi cấu trúc `.fb-item` thành `.fb-image-shell` (ảnh contain, padding 8px) + `.fb-caption-bar` (caption nằm dưới, không che review). Accordion cao `clamp(560–680px)`, active `flex-grow 6.5` → ảnh review hiện lớn, xem trọn, không crop/méo. Mobile: full-width tall cards (`74–90vw` × `min(70–72vh,640–660px)`), scroll-snap, contain.
- **QA:** Playwright headless cả `index.html` + `sanite-chay.html` × 6 breakpoint: overflow=0, broken=0, console/page err=0, failed req=0; hero 4 slide + 4 dots, lotus là ẢNH (SVG đã gỡ render), buddha photo hiện cả desktop & mobile, feedback `object-fit:contain` + shell/caption-bar. Reveal-on-scroll opacity xác nhận desktop lotus 0.7/buddha 0.27, mobile lotus 0.68/buddha 0.20. Screenshot trong `report/screenshots/prompt07/` (ignored).
- **Static validation:** `hoasen.jpg`/`adidaphat.jpg`/`banner_*.jpg` trỏ file thật; feedback dùng contain (shell); `HERO_SLIDE_INTERVAL_MS=3600`; CSS braces cân bằng (index 151/151, sections 327/327); không console.log; `LotusBranch` còn định nghĩa nhưng không render.
- **Không làm:** không cài shadcn/Tailwind/TS/lucide, không thêm dependency, không ảnh internet/placeholder, không deploy Vercel, không force push, không commit report/screenshots/backups.
