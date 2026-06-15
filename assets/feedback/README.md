# assets/feedback — Ảnh đánh giá khách hàng Sanité

Thư mục chứa **ảnh đánh giá / feedback thật** từ khách hàng, dùng cho
"Feedback Image Accordion" trong SECTION C — Reviews.

## Quy tắc đặt tên file
- Đặt tên dạng `fb_1.jpg`, `fb_2.jpg`, `fb_3.jpg`, … (số tăng dần).
- Cũng chấp nhận `fb_01.jpg`, `fb_02.jpg`.
- Định dạng chấp nhận: `.jpg`, `.jpeg`, `.png`, `.webp`.
- KHÔNG dùng dấu tiếng Việt / khoảng trắng trong tên file.

## Nguồn ảnh
- Ưu tiên **ảnh thật** từ Google Review / Facebook / Zalo **đã được phép sử dụng**.
- KHÔNG dùng ảnh khách hàng nếu **chưa được phép**.
- KHÔNG dùng ảnh internet (Unsplash/Pexels), KHÔNG dùng placeholder/ảnh giả.

## Kích thước & tỉ lệ khuyến nghị
- Chiều rộng tối thiểu: **900px**.
- Tỉ lệ tốt: **4:5**, **3:4** hoặc screenshot review dọc.
- Ảnh nên rõ chữ, không quá mờ (accordion sẽ hiển thị `object-fit: cover`).

## Cách thêm ảnh vào website
1. Bỏ file ảnh thật vào thư mục `assets/feedback/` theo quy tắc tên ở trên.
2. Mở `src/sections/sections-c.jsx`, cập nhật mảng **`FEEDBACK_IMAGES`** —
   chỉ thêm entry trỏ tới **file thật đang tồn tại** (không trỏ file chưa có).
   ```js
   const FEEDBACK_IMAGES = [
     { id: 1, title: 'Không gian ấm áp', src: 'assets/feedback/fb_1.jpg' },
     // ...
   ];
   ```
3. Accordion tự xử lý:
   - 1 ảnh → hiển thị 1 card lớn (không accordion).
   - 2–5 ảnh → accordion (desktop hover mở rộng, mobile scroll cards).
   - > 5 ảnh → chỉ lấy 5 ảnh đầu để layout không rối.
   - Ảnh lỗi (`onError`) sẽ tự bị ẩn, **không** thay bằng ảnh giả.
4. Nếu mảng rỗng → Reviews fallback về các review card chữ hiện tại, không broken image.

## Trạng thái hiện tại (Prompt 05)
Đã có 5 ảnh thật: `fb_1.jpg`, `fb_2.jpg`, `fb_3.jpg`, `fb_4.jpg`, `fb_5.jpg`.
