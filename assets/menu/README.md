# assets/menu — Ảnh món ăn Sanité

Thư mục chứa **ảnh món ăn thật** của nhà hàng. Tạo trong Prompt 02 để chuẩn bị
sẵn kiến trúc — **chưa có ảnh thật**, nên hiện tại data menu để `image: ""`
và website KHÔNG render `<img>` (không có broken image, không dùng ảnh giả).

## Quy tắc đặt tên file
- KHÔNG dùng dấu tiếng Việt trong tên file.
- Dùng **chữ thường + dấu gạch ngang** (kebab-case).
- Ưu tiên **`.webp`** (hoặc `.jpg` đã nén).
- Tên file nên trùng với `id` của món trong `sections-b.jsx` (mảng `MENU_ITEMS`).

## Kích thước khuyến nghị
- Ảnh card (desktop): **800 × 600** (tỉ lệ ~4:3, hiển thị crop 16:10).
- Ảnh modal (lightbox): **1200 × 900**.
- Nén dưới ~200 KB/ảnh để tải nhanh.

## Danh sách 14 món & tên file đề xuất
| Món | Tên file |
|---|---|
| Bánh mì pate chay từ nấm | `banh-mi-pate-nam.webp` |
| Đậu hũ sốt tắc | `dau-hu-sot-tac.webp` |
| Rau củ kho quẹt chay | `rau-cu-kho-quet-chay.webp` |
| Pasta sò chay | `pasta-so-chay.webp` |
| Miến trộn chay | `mien-tron-chay.webp` |
| Pad Thái chay | `pad-thai-chay.webp` |
| Cơm chiên Sanité | `com-chien-sanite.webp` |
| Hàu chay từ nấm | `hau-chay-tu-nam.webp` |
| Thịt bò chay từ nấm | `thit-bo-chay-tu-nam.webp` |
| Rau rừng xào tỏi | `rau-rung-xao-toi.webp` |
| Lẩu sa tế chay | `lau-sa-te-chay.webp` |
| Xúp chay | `xup-chay.webp` |
| Trà đậu đen | `tra-dau-den.webp` |
| Nước ép trái cây tươi | `nuoc-ep-trai-cay-tuoi.webp` |

## Cách gắn ảnh vào website (khi đã có ảnh thật)
Mở `sections-b.jsx`, trong mảng `MENU_ITEMS`, điền đường dẫn vào field `image`
của đúng món (khớp theo `id`). Ví dụ:

```js
{ id: 'banh-mi-pate-nam', category: 'Khai vị', name: 'Bánh mì pate chay từ nấm',
  description: '...',
  image: 'assets/menu/banh-mi-pate-nam.webp',   // <-- điền vào đây
  imageAlt: 'Bánh mì pate chay từ nấm tại Sanité',
  detail: '...' },
```

Card và modal sẽ **tự động** hiển thị ảnh khi `image` khác rỗng. Nếu để rỗng,
card vẫn đẹp bằng typography + khung ornament, và modal hiện dòng
"Hình ảnh món ăn đang được bổ sung".
