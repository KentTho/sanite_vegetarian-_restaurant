# FORM TIÊU CHÍ CHUẨN CHO MỌI DỰ ÁN LANDING PAGE

> Mục tiêu của tài liệu này là làm bộ tiêu chí chuẩn để xây dựng, chỉnh sửa, audit, QA, deploy và bảo trì Landing Page chất lượng cao.
> Áp dụng cho mọi dự án Landing Page, không phụ thuộc vào tên thương hiệu, lĩnh vực hay framework cụ thể.

---

## 1. Nguyên tắc tổng quát

Landing Page phải đạt 5 mục tiêu chính:

1. **Rõ thông điệp**
   Người xem phải hiểu ngay website nói về gì, dành cho ai, giải quyết vấn đề gì và hành động tiếp theo là gì.

2. **Đẹp nhưng không rối**
   Thiết kế cần hiện đại, có điểm nhấn, nhưng không được làm người xem mất tập trung khỏi nội dung chính.

3. **Responsive thật sự**
   Desktop, laptop, tablet, mobile đều phải hiển thị ổn. Không được chỉ đẹp ở một kích thước màn hình.

4. **Code sạch, dễ bảo trì**
   HTML, CSS, JS phải tổ chức rõ ràng, có scope, tránh chồng override quá nhiều, tránh sửa lan man.

5. **QA trước khi deploy**
   Không push/deploy nếu chưa kiểm tra visual, overflow, broken image, lỗi console, responsive và link CTA.

---

## 2. Quy trình làm việc chuẩn

### 2.1. Không code ngay khi chưa audit

Trước khi sửa Landing Page, phải kiểm tra:

* Cấu trúc thư mục.
* File HTML chính.
* File CSS chính.
* File JS chính.
* Các thư mục ảnh, logo, icon, font.
* Các section hiện có.
* Các class/id đang được JS hoặc animation sử dụng.
* Các report hoặc ghi chú cũ nếu dự án đã có lịch sử chỉnh sửa.

### 2.2. Luôn làm theo từng phase

Một prompt/code task tốt nên chia thành:

1. **Phase 0 — Safety Check**
   Kiểm tra file tồn tại, git status, branch, hash file quan trọng.

2. **Phase 1 — Read Minimal Context**
   Chỉ đọc đúng file/section cần sửa, không dump toàn bộ code.

3. **Phase 2 — Current State Audit**
   Ghi rõ hiện trạng, root cause, selector liên quan.

4. **Phase 3 — Design QA Gate**
   Đánh giá phương án có hợp lý không trước khi code.

5. **Phase 4 — Implementation**
   Chỉ sửa đúng scope.

6. **Phase 5 — Static Validation**
   Kiểm tra CSS braces, file path, broken src, hash file không được sửa.

7. **Phase 6 — Browser QA**
   Test nhiều breakpoint.

8. **Phase 7 — Screenshot Evidence**
   Chụp ảnh trước/sau hoặc ảnh QA.

9. **Phase 8 — Report**
   Viết report tiếng Việt rõ ràng.

10. **Phase 9 — Git/Deploy**
    Chỉ commit/push khi QA PASS.

---

## 3. Cách chọn model phù hợp

### 3.1. Dùng Claude Code CLI Sonnet khi

* Sửa HTML/CSS/JS có scope rõ.
* Cần audit code kỹ.
* Cần tiết kiệm credit/token.
* Cần chỉnh responsive, layout, button, section, animation vừa phải.
* Cần viết report kỹ sau khi sửa.

### 3.2. Dùng Claude Opus khi

* Task rất phức tạp.
* Cần refactor lớn.
* Cần phân tích kiến trúc nhiều file.
* Cần quyết định thiết kế khó, nhiều ràng buộc.
* Sonnet không đủ chắc chắn.

### 3.3. Dùng Codex khi

* Cần thao tác code nhanh.
* Cần refactor, fix lỗi kỹ thuật.
* Cần đọc diff, sửa file chính xác.
* Cần xử lý git/deploy.
* Cần code theo instruction rất chặt.

### 3.4. Dùng Gemini CLI khi

* Cần scan diện rộng.
* Cần đọc nhiều file/report.
* Cần tổng hợp trạng thái dự án.
* Cần tạo flow map hoặc architecture report.

### 3.5. Nguyên tắc tiết kiệm token

* Không đọc full file nếu không cần.
* Search selector trước, đọc quanh vùng cần sửa.
* Không dump toàn bộ CSS/HTML ra terminal.
* Không đọc toàn bộ report cũ, chỉ đọc report mới nhất và report liên quan.
* Với CSS dài, đọc theo marker prompt hoặc selector.
* Với ảnh, chỉ list file/path, không xử lý ảnh nếu không cần.

---

## 4. Tổ chức thư mục chuẩn

Một Landing Page nên có cấu trúc rõ ràng:

```txt
project-root/
├─ index.html hoặc home.html
├─ assets/
│  ├─ css/
│  │  ├─ style.css
│  │  └─ vendor/
│  ├─ js/
│  │  ├─ main.js
│  │  └─ custom-feature.js nếu cần
│  ├─ images/
│  │  ├─ logo/
│  │  ├─ banner/
│  │  ├─ gallery/
│  │  ├─ feature/
│  │  └─ section-name/
│  ├─ fonts/
│  └─ icons/
├─ report/
│  ├─ screenshots/
│  ├─ backups/
│  └─ PROMPT_xxx_REPORT.md
├─ .gitignore
├─ .vercelignore
└─ vercel.json nếu cần
```

### 4.1. Những thư mục không nên deploy/push

Không push/deploy:

* `report/`
* `report/screenshots/`
* `report/backups/`
* `.env`
* `.env.*`
* `.vercel/`
* logs
* cache
* file test tạm
* file screenshot QA

### 4.2. `.gitignore` nên có

```gitignore
report/
report/**
.vercel/
.env
.env.*
!.env.example
*.log
node_modules/
dist/
build/
.cache/
.DS_Store
Thumbs.db
.vscode/
.idea/
```

### 4.3. `.vercelignore` nên có

```gitignore
report/
report/**
.vercel/
.env
.env.*
*.log
node_modules/
.DS_Store
Thumbs.db
.vscode/
.idea/
```

---

## 5. Nguyên tắc tổ chức HTML

### 5.1. Mỗi section phải rõ ràng

Mỗi section nên có:

* Comment mở section.
* Class section chính.
* ID anchor nếu cần điều hướng.
* Container riêng.
* Nội dung rõ ràng.
* Ảnh/icon/CTA đúng scope.

Ví dụ:

```html
<!-- SECTION 03 — Service Detail -->
<section id="service-detail" class="service-detail-area">
  ...
</section>
```

### 5.2. Không đổi class/id quan trọng nếu JS đang dùng

Không tự ý đổi/xóa các class như:

* class animation
* class slider/gallery
* class mobile menu
* class GSAP/SplitText
* class WOW
* class button template
* class Swiper/MetisMenu/Bootstrap

Trước khi sửa class, phải search trong JS/CSS xem có phụ thuộc không.

### 5.3. Anchor navigation phải rõ

Header/Footer nên trỏ tới các section chính:

```txt
Trang chủ → #home
Vấn đề → #problem
Giải pháp → #solution
Tính năng → #features
Thư viện → #gallery
Liên hệ → #contact
```

Nếu section chưa có ID, thêm ID an toàn, không tạo duplicate.

---

## 6. Nguyên tắc tổ chức CSS

### 6.1. Không sửa global nếu không cần

Tránh sửa trực tiếp:

```css
.container {}
.row {}
.col-lg-6 {}
img {}
a {}
button {}
```

Ưu tiên selector scoped:

```css
body.landing-page .section-name .target-class {}
```

### 6.2. Mỗi lần sửa nên append block rõ ràng

```css
/* =========================================================
   LANDING PAGE SECTION XX FIX — Prompt XX
   Mục tiêu:
   - Sửa vấn đề gì
   - Không ảnh hưởng section nào
   ========================================================= */
```

### 6.3. Tránh chồng override vô tội vạ

Không nên dùng quá nhiều `!important`.
Chỉ dùng khi:

* Cần thắng template cũ.
* Rule cũ quá mạnh.
* Đã scope rất rõ.
* Có ghi lý do trong report.

### 6.4. Cleanup CSS phải cực kỳ cẩn thận

Không xóa code chỉ vì thấy dư. Phải xác định:

* Rule có còn selector trong HTML không.
* Rule có bị JS/animation dùng không.
* Rule có bị media query dùng không.
* Rule có bị block mới override hoàn toàn không.
* Xóa xong QA visual có giữ nguyên không.

Nếu không chắc, giữ lại.

### 6.5. Không minify CSS trong giai đoạn phát triển

Landing Page đang chỉnh nhiều thì không nên minify thủ công vì khó audit, khó rollback.

---

## 7. Design System chuẩn

### 7.1. Màu sắc

Mỗi Landing Page nên có token màu:

```css
:root {
  --brand-primary: #189e1e;
  --brand-secondary: #A3C644;
  --text-primary: #07110B;
  --text-secondary: #334155;
  --text-muted: #64748B;
  --bg-page: #ffffff;
  --bg-soft: #f6faf7;
  --border-soft: rgba(24, 158, 30, 0.18);
  --shadow-soft: 0 18px 55px rgba(15, 23, 42, 0.10);
}
```

### 7.2. Nguyên tắc màu

* Heading chính: đen/xanh đậm.
* Mô tả: xám xanh dễ đọc.
* CTA: màu brand nổi bật.
* Background: trắng/off-white/xanh rất nhẹ.
* Icon: brand green hoặc màu tương phản.
* Không dùng màu quá tối nếu brand theo hướng sáng.
* Không dùng text trắng trên nền sáng.

### 7.3. Font

* Chọn 1 font chính cho toàn site.
* Heading phải có weight rõ.
* Body text dễ đọc.
* Mobile heading không quá mỏng.
* Không để SplitText span làm mất font-weight.

### 7.4. Spacing

Khoảng cách phải nhất quán:

```txt
Hero → Section sau: rõ nhưng không quá xa
Section → Section: 72–120px desktop
Mobile section gap: 48–72px
Title → description: 16–24px
Title → image: 24–48px
Card gap: 20–32px
```

---

## 8. Tiêu chí Hero/Banner

Hero là phần quan trọng nhất.

### 8.1. Hero phải có

* Header rõ.
* Badge/subtitle ngắn.
* Heading mạnh, dễ hiểu.
* Mô tả ngắn.
* CTA nổi bật.
* Visual/banner rõ.
* Không bị section sau che/cắt.

### 8.2. Heading Hero

Heading cần:

* Rõ ý chính.
* Không quá dài.
* Không vỡ dòng xấu.
* Mobile phải đủ đậm.
* Desktop phải nổi bật.
* Nếu dùng GSAP SplitText, font-weight phải áp vào cả span con.

### 8.3. Banner images

Ảnh banner cần:

* Rõ nét.
* Không vỡ layout.
* Không bị crop xấu.
* Không bị che bởi section sau.
* Không horizontal overflow.
* Mobile phải thấy được nội dung chính.
* Nếu ảnh cuộn ngang/parallax, phải kiểm cả vị trí scroll.

### 8.4. Hero mobile

Mobile Hero cần đặc biệt kiểm:

* Logo header cân.
* Hamburger không lệch.
* Heading đủ đậm.
* Heading không chạm header.
* Banner gần title vừa đủ.
* Banner không bị cắt.
* Section sau không phủ lên banner.
* Không dư khoảng trắng vô lý.

---

## 9. Tiêu chí Header

Header cần:

* Logo rõ.
* Nav dễ đọc.
* CTA nổi bật.
* Floating/pill/card nếu phù hợp.
* Không hòa vào nền.
* Không che heading.
* Sticky không gây jump layout.
* Mobile hamburger cân.

### 9.1. Header desktop

* Logo trái.
* Nav giữa.
* CTA phải.
* Font nav đủ lớn.
* Card header có border/radius/shadow nhẹ.
* Header không quá cao.

### 9.2. Header mobile

* Logo rõ và cân giữa theo chiều cao.
* Hamburger rõ, dễ bấm.
* Header không chiếm quá nhiều chiều cao.
* Logo không bị bóp méo.
* Không dùng ảnh logo quá lớn mà không ràng CSS.

---

## 10. Tiêu chí Mobile Sidebar / Offcanvas

Sidebar mobile phải:

* Logo đúng thương hiệu.
* Không dùng logo template cũ.
* Logo không broken.
* Logo không quá to làm tràn sidebar.
* Menu link rõ.
* Mở/đóng ổn.
* Overlay hoạt động.
* Không horizontal overflow.
* Không phá layout khi mở.

CSS logo sidebar nên có:

```css
.sidebar-logo img {
  max-width: 160px;
  height: auto;
  object-fit: contain;
  display: block;
}
```

---

## 11. Tiêu chí Section nội dung

Mỗi section cần trả lời:

* Section này nói về gì?
* Người xem nhận được lợi ích gì?
* Có visual hỗ trợ không?
* Có CTA hoặc bước tiếp theo không?
* Có bị trùng nội dung section khác không?

### 11.1. Nội dung section

Nội dung nên gồm:

* Subtitle ngắn.
* Heading rõ.
* Mô tả 1–3 câu.
* Bullet hoặc card tính năng.
* Hình ảnh phù hợp.
* CTA nếu cần.

### 11.2. Không viết quá dài

Mô tả nên ngắn gọn, tránh đoạn dài làm mất layout.

### 11.3. Không bịa nội dung

Chỉ dùng thông tin người dùng cung cấp hoặc thông tin đã được xác nhận. Không tự tạo claim quá đà như “tốt nhất thị trường”, “số 1”, “đảm bảo 100%” nếu không có căn cứ.

---

## 12. Tiêu chí hình ảnh

### 12.1. Ảnh phải có thật trong project

Trước khi dùng ảnh:

* Kiểm tra file tồn tại.
* Kiểm tra đúng extension.
* Không đoán `.png/.jpg/.webp`.
* Không tạo `src` giả.
* Không dùng file 0 byte.

### 12.2. Ảnh trong section

Ảnh cần:

* Không méo.
* Không crop phần quan trọng.
* Không quá to.
* Không quá nhỏ.
* Có border-radius phù hợp.
* Có shadow nếu cần.
* Responsive tốt.

### 12.3. `object-fit`

* `contain`: dùng khi cần thấy toàn bộ ảnh.
* `cover`: dùng khi cần card đều, chấp nhận crop nhẹ.
* Không dùng `fill` nếu làm méo ảnh.

### 12.4. Image QA

Phải kiểm:

* `brokenImages = []`
* ảnh có visible bounding rect.
* ảnh không nằm ngoài viewport do transform.
* ảnh không bị section khác che.
* ảnh không bị overflow ngang.

---

## 13. Tiêu chí Gallery

Gallery cần:

* Ảnh visible thật, không chỉ tồn tại trong DOM.
* Layout đều.
* Có khoảng cách hợp lý.
* Không khoảng trắng lớn.
* Hover mượt.
* Mobile responsive.
* Không phụ thuộc vào GSAP state khiến ảnh biến mất.

### 13.1. QA gallery

Không được PASS nếu chỉ kiểm `img count`. Phải kiểm:

* ảnh có hiện trên screenshot không.
* bounding rect > 0.
* opacity > 0.
* visibility không hidden.
* transform không đẩy ảnh ra ngoài.
* không bị overlay trắng che.

---

## 14. Tiêu chí CTA / Button

Button cần:

* Text rõ.
* Link đúng.
* Hover mượt.
* Không dùng màu đen nếu brand yêu cầu xanh.
* Chữ đủ contrast.
* Icon/arrow không vỡ.
* External link có `target="_blank"` và `rel="noopener noreferrer"`.

### 14.1. Button hover

Hover nên có:

```txt
background đổi nhẹ
translateY(-2px)
box-shadow mềm
transition 0.25–0.35s
icon/arrow dịch nhẹ nếu có
```

### 14.2. Không phá Header CTA

Nếu chỉnh button toàn site, cần exclude header CTA/hamburger nếu chúng đã ổn.

---

## 15. Tiêu chí Animation / Motion

Animation tốt là animation hỗ trợ trải nghiệm, không làm rối.

### 15.1. Animation nên có

* Entrance nhẹ.
* Hover card.
* Image zoom nhẹ.
* Parallax vừa phải.
* Glow/line chạy tinh tế.
* Cursor effect nếu phù hợp.

### 15.2. Animation không nên

* Quá nhanh.
* Quá nhiều.
* Che chữ.
* Làm layout nhảy.
* Gây lag.
* Chạy nặng trên mobile.
* Không tôn trọng `prefers-reduced-motion`.

### 15.3. Motion safety

Luôn thêm:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms;
    animation-iteration-count: 1;
    scroll-behavior: auto;
  }
}
```

Hoặc tắt riêng animation mới.

---

## 16. Tiêu chí Cursor Effect

Nếu thêm hiệu ứng chuột:

* Desktop only.
* Không chạy trên touch/mobile.
* Không che click.
* `pointer-events: none`.
* Particle tự xóa.
* Giới hạn số lượng particle.
* Không log console.
* Không tạo memory leak.
* Tôn trọng `prefers-reduced-motion`.

---

## 17. Tiêu chí Footer

Footer cần:

* Logo đúng.
* Mô tả ngắn.
* Link điều hướng.
* Contact rõ.
* Social icons rõ.
* Không dùng nội dung template cũ.
* Không bị chìm màu.
* Mobile dễ đọc.

### 17.1. Footer decorative layer

Nếu thêm layer trang trí:

* Không che content.
* `aria-hidden="true"`.
* `pointer-events: none`.
* Content có z-index cao hơn.
* Không làm overflow.
* Mobile giảm animation hoặc giảm opacity.

### 17.2. Footer animation

Có thể dùng:

* Bamboo/leaf ambience.
* Glow nhẹ.
* Wind/leaf sway.
* Mist background.

Nhưng phải:

* Nhẹ.
* Hợp brand.
* Không làm rối chữ.
* Không làm footer nặng.

---

## 18. Tiêu chí Responsive

### 18.1. Breakpoint bắt buộc test

```txt
1440x1100
1366x1000
768x1000
430x932 nếu có
390x900
360x860
```

### 18.2. Mobile cần kiểm kỹ

* Header.
* Logo.
* Hamburger.
* Hero.
* Banner.
* Thứ tự section.
* Ảnh có bị cắt không.
* Text có quá nhỏ không.
* Button có dễ bấm không.
* Footer có dễ đọc không.
* Sidebar mở/đóng.

### 18.3. Không được horizontal overflow

Mọi breakpoint phải có:

```txt
scrollWidth == clientWidth
```

---

## 19. Tiêu chí Accessibility

Landing Page nên có:

* `alt` cho ảnh.
* Decorative element dùng `aria-hidden="true"`.
* Button/link có text rõ.
* Không dùng div thay button nếu có hành động.
* Link external có rel an toàn.
* Keyboard focus không bị mất.
* Color contrast đủ.
* Không animation mạnh gây khó chịu.

---

## 20. Tiêu chí Performance

### 20.1. Ảnh

* Không dùng ảnh quá nặng nếu không cần.
* Đúng kích thước.
* Ưu tiên WebP nếu có.
* Không load ảnh không dùng.
* Không để broken image.

### 20.2. CSS

* Không quá nhiều override trùng.
* Không animation layout property nặng.
* Ưu tiên transform/opacity.
* Không lạm dụng filter/blur lớn.

### 20.3. JS

* Không sửa main.js nếu không cần.
* Feature mới nên tạo JS riêng.
* Không tạo global conflict.
* Không memory leak.
* Không console error.

---

## 21. Tiêu chí SEO cơ bản

Landing Page nên có:

* Title rõ.
* Meta description.
* Heading hierarchy hợp lý.
* Chỉ một H1 chính.
* Alt ảnh.
* Link nội bộ anchor.
* URL root hoạt động.
* Nếu deploy Vercel mà file chính là `home.html`, cần rewrite `/` về `/home.html`.

Ví dụ `vercel.json`:

```json
{
  "rewrites": [
    {
      "source": "/",
      "destination": "/home.html"
    }
  ]
}
```

---

## 22. Tiêu chí Git

### 22.1. Trước khi sửa

Luôn chạy:

```bash
git status --short
git branch --show-current
git remote -v
```

### 22.2. Khi task rủi ro

Tạo branch mới:

```bash
git branch backup/stable-before-change
git switch -c feature/new-upgrade
```

### 22.3. Không force push

Không dùng:

```bash
git push --force
```

trừ khi có yêu cầu cực kỳ rõ.

### 22.4. Không commit nhầm

Không commit:

* `report/`
* screenshots
* backups
* `.env`
* `.vercel/`
* logs

### 22.5. Commit message

Commit message nên rõ:

```txt
fix: correct mobile header logo
feat: add footer bamboo ambience
chore: configure vercel deploy
```

---

## 23. Tiêu chí Deploy

### 23.1. Trước deploy

Phải QA local:

* Desktop.
* Mobile.
* No overflow.
* No broken image.
* No runtime error.
* CTA link đúng.
* Header/Footer đúng.

### 23.2. Vercel

Nếu repo đã link Vercel:

* Push GitHub → Vercel auto deploy.

Nếu chưa link:

* Vercel Dashboard.
* Add New Project.
* Import GitHub repo.
* Deploy.

### 23.3. Không deploy report

Dùng `.vercelignore` để loại:

```txt
report/
.env
.vercel/
logs
```

---

## 24. Tiêu chí Report sau mỗi task

Mỗi task cần report `.md` gồm:

```txt
1. File đã kiểm tra
2. File đã sửa
3. Current State Audit
4. Root Cause
5. Fix đã áp dụng
6. Browser QA
7. Screenshot Evidence
8. Safety Check
9. Git/Push nếu có
10. Kết luận
11. Bước tiếp theo
```

Report phải viết tiếng Việt rõ ràng.

---

## 25. Tiêu chí Browser QA

QA phải kiểm bằng mắt và bằng số.

### 25.1. Kiểm bằng mắt

* Screenshot từng section.
* So sánh trước/sau.
* Xem mobile thật nếu có.
* Không tin hoàn toàn report PASS nếu screenshot không đúng.

### 25.2. Kiểm bằng số

Nên đo:

```txt
scrollWidth/clientWidth
brokenImages
pageErrors
computed color
bounding rect
visible image count
button href
logo size
section gap
animation state
```

### 25.3. Không PASS nếu

* Ảnh không thấy trên desktop/mobile.
* Text quá nhỏ.
* Section bị che.
* Button sai link.
* Logo broken.
* Mobile overflow.
* Runtime error.
* Report nói PASS nhưng screenshot sai.

---

## 26. Tiêu chí xử lý lỗi

### 26.1. Khi lỗi visual lớn

Không vá nhỏ ngay. Cần:

1. Tìm commit/report trước khi lỗi.
2. Kiểm tra backup.
3. Rollback nếu cần.
4. QA lại.
5. Không tiếp tục cleanup.

### 26.2. Khi cleanup làm vỡ layout

Cách xử lý ưu tiên:

* Rollback CSS từ backup.
* Không cố sửa từng rule.
* Dừng cleanup.
* Deploy bản ổn trước.
* Cleanup sau bằng branch riêng.

### 26.3. Khi ảnh không hiện

Kiểm tra:

* file tồn tại không.
* extension đúng không.
* src đúng không.
* CSS display/opacity/visibility.
* transform có đẩy ra ngoài không.
* parent height/overflow.
* z-index/overlay.
* screenshot thật.

---

## 27. Tiêu chí viết prompt cho AI coding

Một prompt tốt phải có:

1. Vai trò cụ thể.
2. Tên prompt.
3. Bối cảnh project.
4. File được phép sửa.
5. File cấm sửa.
6. Report cần đọc.
7. Yêu cầu mới.
8. Mục tiêu.
9. Token optimization.
10. Phase workflow.
11. Browser QA.
12. Screenshot evidence.
13. Git rules.
14. Final quality gate.

### 27.1. Prompt phải cấm rõ

```txt
KHÔNG sửa main.js nếu không cần.
KHÔNG sửa section khác.
KHÔNG cleanup CSS.
KHÔNG tạo ảnh giả.
KHÔNG tạo src không tồn tại.
KHÔNG commit report/screenshots.
KHÔNG force push.
```

### 27.2. Prompt phải có quality gate

Không được PASS nếu chưa đạt tất cả tiêu chí.

---

## 28. Checklist trước khi merge/deploy

```txt
[ ] Header desktop OK
[ ] Header mobile OK
[ ] Sidebar mobile OK
[ ] Hero desktop OK
[ ] Hero mobile OK
[ ] Banner images visible
[ ] SECTION 03 OK
[ ] SECTION 04 OK
[ ] SECTION 05 OK
[ ] SECTION 06 OK
[ ] SECTION 07 gallery visible
[ ] SECTION 09 CTA OK
[ ] Footer OK
[ ] CTA links đúng
[ ] Logo đúng
[ ] No broken image
[ ] No 404
[ ] No runtime exception
[ ] No horizontal overflow
[ ] Mobile 390 OK
[ ] Mobile 360 OK
[ ] Tablet 768 OK
[ ] Desktop 1440 OK
[ ] report/ không commit
[ ] .env không commit
[ ] git push đúng branch
[ ] Vercel deploy OK
```

---

## 29. Công thức section chuẩn cho Landing Page

Một Landing Page chất lượng thường có:

1. Header
2. Hero/Banner
3. Problem/Pain Point
4. Solution
5. Main Services
6. Features
7. Process/How it works
8. Gallery/Use cases
9. CTA
10. FAQ nếu cần
11. Footer

Không bắt buộc có tất cả, nhưng nếu có thì mỗi phần phải có mục tiêu rõ.

---

## 30. Nguyên tắc cuối cùng

1. Làm đẹp nhưng phải rõ.
2. Sáng tạo nhưng không phá layout.
3. Animation phải nhẹ và có lý do.
4. Mobile là tiêu chí bắt buộc, không phải phụ.
5. Code phải có scope.
6. QA bằng screenshot, không chỉ tin console.
7. Git branch khi task rủi ro.
8. Không cleanup khi chưa có backup.
9. Không deploy khi QA fail.
10. Không sửa lan man ngoài yêu cầu.
