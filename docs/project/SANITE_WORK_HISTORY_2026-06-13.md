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
