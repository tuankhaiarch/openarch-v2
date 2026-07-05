# OpenArch V2 — Source Master

Static landing page cho openarch.vn. Tailwind CDN + custom CSS/JS + GAS backend.

## Cấu trúc

```
openarch-v2-master/
├── index.html              ← Entry point duy nhất
├── vercel.json             ← Cache headers + security headers
├── assets/
│   ├── css/style.css       ← CSS variables, FAQ, lang toggle, Electric Blue brand
│   ├── js/main.js          ← Dark mode, lang, FAQ, pills, GAS form submit
│   └── images/             ← Logo PNGs (copy thủ công từ production)
│       ├── openarch-logo.png
│       └── nexos-logomark.png
├── backend/
│   └── Code.gs             ← Google Apps Script (POST → Google Sheet + email)
└── docs/
    ├── DEPLOY_GUIDE.md
    ├── CHANGELOG.md
    └── QA_CHECKLIST.md
```

## Stack

- **HTML**: static, single file, no build step
- **CSS**: Tailwind CDN (`cdn.tailwindcss.com`) + `/assets/css/style.css`
- **Fonts**: Google Fonts CDN (Inter + JetBrains Mono)
- **JS**: `/assets/js/main.js` (vanilla JS, ES5-compatible)
- **Backend**: Google Apps Script Web App (`no-cors` POST)
- **Deploy**: Vercel (openarch.vn, www.openarch.vn)

## Setup nhanh

1. Copy logo PNGs vào `assets/images/`
2. Set `SHEET_ID` trong `backend/Code.gs`
3. Deploy GAS → copy URL vào `main.js` `APPS_SCRIPT_URL`
4. Push lên GitHub → Vercel auto-deploy

Xem chi tiết: `docs/DEPLOY_GUIDE.md`
