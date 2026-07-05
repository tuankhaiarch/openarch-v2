/**
 * OpenArch V2 — Google Apps Script Backend
 * Phase 4: Write leads to Google Sheet + email notification
 *
 * SETUP:
 * 1. Open https://script.google.com and paste this file
 * 2. Replace SHEET_ID with your Google Sheet ID
 * 3. Replace NOTIFY_EMAIL with your notification email
 * 4. Deploy > New deployment > Web app > Execute as Me > Anyone
 * 5. Copy the Web App URL to main.js APPS_SCRIPT_URL
 *
 * SHEET COLUMNS (Row 1 = header):
 * A: Timestamp | B: Name | C: Company | D: Role | E: Phone | F: Email
 * G: Scale     | H: Needs | I: Message | J: Source | K: Lang
 * L: Status    | M: Page URL | N: UTM Source | O: UTM Medium | P: UTM Campaign
 */

var SHEET_ID     = 'YOUR_GOOGLE_SHEET_ID_HERE';  // ← Replace with actual Sheet ID
var NOTIFY_EMAIL = 'hello@openarch.vn';           // ← Replace or set '' to disable
var SHEET_NAME   = 'Leads';                       // Tab name in the spreadsheet

// ---------- MAIN HANDLER ----------

function doPost(e) {
  try {
    var raw = (e && e.postData && e.postData.contents) ? e.postData.contents : '{}';
    var data = JSON.parse(raw);

    // Server-side validation: require name + phone
    var name  = sanitize(data.name  || '');
    var phone = sanitize(data.phone || '');
    if (!name || !phone) {
      return jsonResponse({ ok: false, error: 'name and phone required' });
    }

    var sheet = getOrCreateSheet();
    var now   = new Date();

    sheet.appendRow([
      now,                               // A: Timestamp (real server time)
      name,                              // B: Name
      sanitize(data.company  || ''),     // C: Company
      sanitize(data.role     || ''),     // D: Role
      phone,                             // E: Phone
      sanitize(data.email    || ''),     // F: Email
      sanitize(data.scale    || ''),     // G: Scale
      sanitize(data.needs    || ''),     // H: Needs
      sanitize(data.message  || ''),     // I: Message
      sanitize(data.source   || ''),     // J: Source
      sanitize(data.lang     || 'vi'),   // K: Lang
      'New',                             // L: Status (always "New" on entry)
      sanitize(data.pageUrl  || ''),     // M: Page URL
      sanitize(data.utmSource   || ''),  // N: UTM Source
      sanitize(data.utmMedium   || ''),  // O: UTM Medium
      sanitize(data.utmCampaign || '')   // P: UTM Campaign
    ]);

    // Optional: email notification
    if (NOTIFY_EMAIL) {
      sendNotification(now, name, phone, data);
    }

    return jsonResponse({ ok: true });
  } catch (err) {
    Logger.log('doPost error: ' + err.toString());
    return jsonResponse({ ok: false, error: err.toString() });
  }
}

// ---------- HELPERS ----------

function getOrCreateSheet() {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    // Write header row
    sh.appendRow([
      'Timestamp', 'Name', 'Company', 'Role', 'Phone', 'Email',
      'Scale', 'Needs', 'Message', 'Source', 'Lang',
      'Status', 'PageURL', 'UTM_Source', 'UTM_Medium', 'UTM_Campaign'
    ]);
    // Freeze header row
    sh.setFrozenRows(1);
    // Auto-resize columns
    sh.autoResizeColumns(1, 16);
  }
  return sh;
}

function sanitize(str) {
  if (typeof str !== 'string') return '';
  // Strip HTML tags and limit length
  return str.replace(/<[^>]*>/g, '').substring(0, 1000).trim();
}

function sendNotification(now, name, phone, data) {
  try {
    var subject = '[OpenArch Lead] ' + name + ' — ' + phone;
    var body = [
      'Thời gian: ' + now.toLocaleString('vi-VN'),
      'Họ tên: '    + name,
      'Công ty: '   + (data.company  || '—'),
      'Vai trò: '   + (data.role     || '—'),
      'Điện thoại: '+ phone,
      'Email: '     + (data.email    || '—'),
      'Quy mô: '    + (data.scale    || '—'),
      'Nhu cầu: '   + (data.needs    || '—'),
      'Ngôn ngữ: '  + (data.lang     || 'vi'),
      'Ghi chú: '   + (data.message  || '—'),
      '',
      'Nguồn: '     + (data.source   || '—'),
      'UTM: '       + [data.utmSource, data.utmMedium, data.utmCampaign].filter(Boolean).join(' / ') || '—'
    ].join('\n');

    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: subject,
      body: body
    });
  } catch (mailErr) {
    Logger.log('Email error: ' + mailErr.toString());
    // Don't throw — email failure should not fail the main response
  }
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// ---------- GET handler (health check / CORS preflight) ----------
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, service: 'OpenArch GAS v2' }))
    .setMimeType(ContentService.MimeType.JSON);
}
