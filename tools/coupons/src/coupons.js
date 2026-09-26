import { pdfButton } from '@present/shared/download';
import { COUPONS } from './pdf.js';
const $ = (s) => document.querySelector(s); const $$ = (s) => [...document.querySelectorAll(s)];
const render = () => {};
let colour = 'sage';
$$('#colours button').forEach((b) => b.addEventListener('click', () => { colour = b.dataset.colour; $$('#colours button').forEach((x) => x.setAttribute('aria-pressed', String(x === b))); render(); }));
const ul = $('#list');
for (const c of COUPONS) { const li = document.createElement('li'); li.className = 'card px-4 py-3'; li.textContent = c; ul.append(li); }
const f = $('#f');
pdfButton($('[data-action="pdf"]'), async (jsPDF) => (await import('./pdf.js')).drawCoupons(jsPDF, { from: f.from.value.trim(), to: f.to.value.trim(), colour }), 'screen-free-coupons.pdf');
