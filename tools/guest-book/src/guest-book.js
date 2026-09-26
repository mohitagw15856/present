import { pdfButton } from '@present/shared/download';
const $ = (s) => document.querySelector(s); const $$ = (s) => [...document.querySelectorAll(s)];
const render = () => {};
let colour = 'sage';
$$('#colours button').forEach((b) => b.addEventListener('click', () => { colour = b.dataset.colour; $$('#colours button').forEach((x) => x.setAttribute('aria-pressed', String(x === b))); render(); }));
const f = $('#f');
const now = new Date();
f.month.value = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
pdfButton($('[data-action="pdf"]'), async (jsPDF) => {
  const [y, m] = f.month.value.split('-').map(Number);
  const title = new Date(y, m - 1, 1).toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
  return (await import('./pdf.js')).drawGuestBook(jsPDF, { title, house: f.house.value.trim(), colour });
}, () => `guest-book-${f.month.value}.pdf`);
