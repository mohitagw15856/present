import { pdfButton } from '@present/shared/download';
const $ = (s) => document.querySelector(s); const $$ = (s) => [...document.querySelectorAll(s)];
const render = () => {};
let colour = 'sage';
$$('#colours button').forEach((b) => b.addEventListener('click', () => { colour = b.dataset.colour; $$('#colours button').forEach((x) => x.setAttribute('aria-pressed', String(x === b))); render(); }));
const f = $('#f');
pdfButton($('[data-action="pdf"]'), async (jsPDF) => {
  const names = f.names.value.split('\n').map((s) => s.trim()).filter(Boolean).slice(0, 10);
  return (await import('./pdf.js')).drawLabels(jsPDF, { station: f.station.value.trim() || 'Kitchen', names, colour });
}, 'charger-station-labels.pdf');
