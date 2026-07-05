/**
 * OpenArch V2 — main.js
 * Dark mode, language toggle, FAQ accordion, need pills, GAS form submit
 * Last updated: 2026-07-05
 */

var APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxF79i8oFKW9VYx-SjhNJLl4-YVdyBR9Tsc-GCQgfzHHel2a9zADFd4l8ox9goQxM8K/exec';

/* ── Dark mode ── */
(function initTheme() {
  var saved = localStorage.getItem('theme');
  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  }
})();

function toggleDark() {
  var html = document.documentElement;
  if (html.classList.contains('dark')) {
    html.classList.remove('dark'); html.classList.add('light');
    localStorage.setItem('theme', 'light');
  } else {
    html.classList.add('dark'); html.classList.remove('light');
    localStorage.setItem('theme', 'dark');
  }
}

/* ── Language toggle ── */
var currentLang = localStorage.getItem('lang') || 'vi';
applyLang(currentLang);

function applyLang(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  var label = document.getElementById('lang-label');
  if (label) label.textContent = lang.toUpperCase();
  localStorage.setItem('lang', lang);

  document.querySelectorAll('[data-vi]').forEach(function(el) {
    el.style.display = lang === 'vi' ? '' : 'none';
  });
  document.querySelectorAll('[data-en]').forEach(function(el) {
    el.style.display = lang === 'en' ? '' : 'none';
  });
}

function toggleLang() {
  applyLang(currentLang === 'vi' ? 'en' : 'vi');
}

/* ── FAQ accordion ── */
function toggleFaq(item) {
  var isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(function(i) { i.classList.remove('open'); });
  if (!isOpen) item.classList.add('open');
}

/* ── Need pills ── */
function togglePill(btn) {
  btn.classList.toggle('selected');
}

/* ── GAS form submit ── */
function handleSubmit(e) {
  e.preventDefault();

  var name = document.getElementById('f-name').value.trim();
  var phone = document.getElementById('f-phone').value.trim();
  if (!name || !phone) return;

  var selectedNeeds = Array.from(document.querySelectorAll('.need-pill.selected'))
    .map(function(p) { return p.dataset.value; }).join(', ');

  var data = {
    timestamp: new Date().toISOString(),
    name: name,
    company: document.getElementById('f-company').value.trim(),
    role: document.getElementById('f-role').value.trim(),
    phone: phone,
    email: document.getElementById('f-email').value.trim(),
    scale: document.getElementById('f-scale').value,
    needs: selectedNeeds,
    message: document.getElementById('f-message').value.trim(),
    source: 'V2-openarch.vn',
    lang: currentLang
  };

  var btn = document.getElementById('submit-btn');
  var btnText = document.getElementById('btn-text');
  var spinner = document.getElementById('btn-spinner');
  btn.disabled = true;
  if (btnText) btnText.style.display = 'none';
  if (spinner) spinner.classList.remove('hidden');

  fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  .then(function() {
    document.getElementById('contact-form').reset();
    document.querySelectorAll('.need-pill.selected').forEach(function(p) { p.classList.remove('selected'); });
    var msg = document.getElementById('success-msg');
    if (msg) msg.classList.remove('hidden');
    btn.style.display = 'none';
  })
  .catch(function() {
    var msg = document.getElementById('success-msg');
    if (msg) msg.classList.remove('hidden');
    btn.style.display = 'none';
  })
  .finally(function() {
    btn.disabled = false;
    if (btnText) btnText.style.display = '';
    if (spinner) spinner.classList.add('hidden');
  });
}
