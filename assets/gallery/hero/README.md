# assets/gallery/hero — Hero/banner images

Thu muc nay danh cho anh hero/banner that cua Sanite.

## Quy tac them anh
- Ten file khong dau, lowercase, kebab-case.
- Uu tien `.webp` hoac `.jpg` da nen.
- Kich thuoc khuyen nghi: 1600x1200 hoac 1800x1200.
- Ti le phu hop: 4:5, 5:6, 16:10 tuy crop.
- Khong them source vao code neu file chua ton tai.

## Ten file goi y
- `hero-sanite-interior-01.webp`
- `hero-sanite-table-02.webp`
- `hero-sanite-food-03.webp`
- `hero-sanite-space-04.webp`

## Cach them vao website
Cap nhat mang `HERO_SLIDES` trong `src/sections/sections-a.jsx`.

Vi du:

```js
{
  id: 'interior-01',
  src: 'assets/gallery/hero/hero-sanite-interior-01.webp',
  alt: 'Khong gian am ap ben trong nha hang chay Sanite',
  label: 'Khong gian am ap'
}
```

Neu chi co mot anh that, slider se khong hien dot indicator.
