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
