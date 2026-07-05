# Changelog — OpenArch V2

## [2.0.0] — 2026-07-05

### Source Master
- Tách inline CSS → `/assets/css/style.css`
- Tách inline JS → `/assets/js/main.js`
- Logo paths → `/assets/images/` (local)
- Thêm `vercel.json` với cache headers + security headers

### Backend
- GAS Code.gs Phase 4: ghi vào Google Sheet (status "New", UTM, pageUrl)
- Server-side validation: name + phone required
- Email notification khi có lead mới

### CSS
- CSS variables: `--background`, `--foreground`, `--border`, `--muted`, `--accent`, `--primary`
- Dark mode: `.dark` class trên `<html>`
- Electric Blue brand: `#0000FE` (light), `#4f4fff` (dark)
- FAQ accordion, lang toggle, need pills, spinner, mobile menu

### JS
- Dark mode init IIFE (không đợi DOMContentLoaded)
- `applyLang()` init ngay khi load (không flash ngôn ngữ sai)
- `handleSubmit()`: show spinner, hide on success, reset pills

## [1.x] — 2026 (DEPLOY/V2)
- Version gốc: tất cả inline trong một file index.html
- Tailwind CDN, GAS submit, dark/lang toggle, FAQ, need pills
