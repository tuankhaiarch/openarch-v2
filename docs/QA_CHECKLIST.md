# QA Checklist — OpenArch V2

Checklist trước mỗi lần deploy lên production.

## Cấu trúc files

- [ ] `index.html` tồn tại và mở được trong browser
- [ ] `/assets/css/style.css` được load (DevTools → Network)
- [ ] `/assets/js/main.js` được load (DevTools → Network)
- [ ] `openarch-logo.png` hiển thị ở nav và footer
- [ ] `nexos-logomark.png` hiển thị ở footer
- [ ] `vercel.json` có cache headers đúng

## Visual / Layout

- [ ] Hero heading hiển thị đúng, không overflow
- [ ] 4 pricing cards hiển thị đúng hàng (desktop: 4 cột, mobile: 1 cột)
- [ ] Process 5 steps hiển thị đúng
- [ ] FAQ accordion đóng/mở đúng
- [ ] Contact form có đủ các trường
- [ ] Footer logo + links hiển thị đúng

## Dark mode

- [ ] Click nút ☾ → chuyển dark
- [ ] Click lại → chuyển light
- [ ] Background, text, border đổi màu đúng
- [ ] Buttons màu Electric Blue (#0000FE) ở light mode
- [ ] Buttons màu #4f4fff ở dark mode
- [ ] Refresh trang → giữ đúng theme đã chọn (localStorage)

## Language toggle

- [ ] Click VI/EN → toggle đúng
- [ ] Tất cả `[data-vi]` / `[data-en]` đổi đúng
- [ ] `<html lang="">` đổi sang "en" khi chọn EN
- [ ] Refresh → giữ đúng ngôn ngữ (localStorage)
- [ ] Lang label trong nav hiển thị "VI" hoặc "EN"

## FAQ

- [ ] Click câu hỏi → mở answer
- [ ] Click lại → đóng
- [ ] Click câu khác → câu trước đóng, câu mới mở
- [ ] Chevron rotate khi open
- [ ] FAQ hiển thị đúng cả VI và EN

## Need Pills (checkbox)

- [ ] Click pill → selected (màu Electric Blue)
- [ ] Click lại → deselected
- [ ] Nhiều pills có thể chọn cùng lúc

## Contact Form

- [ ] Submit không nhập name → không gửi
- [ ] Submit không nhập phone → không gửi
- [ ] Submit đúng → spinner hiện trong lúc gửi
- [ ] Sau gửi → success message hiện
- [ ] Sau gửi → form reset (các trường trống)
- [ ] Sau gửi → pills bỏ selected

## Google Sheet (sau form submit)

- [ ] Mở Google Sheet → tab `Leads` → có row mới
- [ ] Cột A: Timestamp (server time)
- [ ] Cột L: Status = "New"
- [ ] Các cột B–K đúng với dữ liệu đã nhập
- [ ] Email notification gửi về `hello@openarch.vn`

## Performance

- [ ] Lighthouse score ≥ 80 (Performance)
- [ ] Assets CSS/JS cached (Cache-Control: immutable trong response headers)
- [ ] Không có console error khi tải trang

## Mobile (375px)

- [ ] Mobile menu toggle hoạt động
- [ ] Hero text không overflow
- [ ] Pricing cards 1 cột
- [ ] Form fields đủ rộng để nhập
- [ ] Buttons đủ to để bấm (≥ 44px)

## Security headers (Vercel)

- [ ] `X-Content-Type-Options: nosniff`
- [ ] `X-Frame-Options: DENY`
- [ ] `X-XSS-Protection: 1; mode=block`
