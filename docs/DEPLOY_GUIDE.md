# Deploy Guide — OpenArch V2

## Phase A: Logo files

Logo PNG chưa có trong repo do không extract được từ production. Thực hiện thủ công:

1. Mở https://openarch-eight.vercel.app/openarch-logo.png → Save as `assets/images/openarch-logo.png`
2. Mở https://openarch-eight.vercel.app/nexos-logomark.png → Save as `assets/images/nexos-logomark.png`

Hoặc copy trực tiếp từ DEPLOY/V2/assets nếu đã có sẵn.

---

## Phase B: Google Apps Script (GAS)

### B1. Tạo Google Sheet

1. Tạo Google Sheet mới tại https://sheets.google.com
2. Đặt tên tab là `Leads` (tùy chọn — GAS sẽ tự tạo nếu chưa có)
3. Copy Sheet ID từ URL: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`

### B2. Deploy GAS

1. Mở https://script.google.com → New project
2. Paste nội dung `backend/Code.gs`
3. Thay `YOUR_GOOGLE_SHEET_ID_HERE` bằng Sheet ID thực
4. Thay `hello@openarch.vn` nếu muốn đổi email nhận thông báo
5. Deploy → New deployment → Web app
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Copy Web App URL

### B3. Cập nhật main.js

Trong `assets/js/main.js`, dòng 7:
```js
var APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx...';
```
Thay bằng URL vừa copy.

---

## Phase C: GitHub

```bash
cd "K:\My Drive\OPENARCH\LANDINGPAGE\SOURCE\openarch-v2-master"
git init
git add .
git commit -m "feat: OpenArch V2 source master"
git remote add origin https://github.com/nexos-mvp/openarch-v2.git
git push -u origin main
```

---

## Phase D: Vercel

### Option 1: Import GitHub repo (auto-deploy)

1. Mở https://vercel.com/nexos-mvp/openarch-v2
2. Settings → Git → Connect Repository → `nexos-mvp/openarch-v2`
3. Root Directory: `.` (project root)
4. Framework preset: **Other** (no build)
5. Build Command: (để trống)
6. Output Directory: `.`

Sau khi connect, mỗi push lên `main` sẽ auto-deploy.

### Option 2: Vercel CLI

```bash
cd "K:\My Drive\OPENARCH\LANDINGPAGE\SOURCE\openarch-v2-master"
vercel --prod --token YOUR_TOKEN
```

### Custom domains

Trong Vercel project Settings → Domains:
- `openarch.vn`
- `www.openarch.vn`

DNS cần trỏ về Vercel nameservers hoặc A/CNAME record theo hướng dẫn của Vercel.

---

## Kiểm tra sau deploy

1. Mở https://openarch.vn
2. Check logo hiển thị
3. Toggle dark mode (☾)
4. Toggle ngôn ngữ (VI/EN)
5. Mở FAQ item
6. Submit form test → kiểm tra Google Sheet tab `Leads`
7. Check email notification
8. Xem `docs/QA_CHECKLIST.md` để checklist đầy đủ
