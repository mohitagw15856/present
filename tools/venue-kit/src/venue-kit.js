import { pdfButton } from '@present/shared/download';
const $ = (s) => document.querySelector(s); const $$ = (s) => [...document.querySelectorAll(s)];
let colour = 'blush';
const render = () => {};
$$('#colours button').forEach((b) => b.addEventListener('click', () => { colour = b.dataset.colour; $$('#colours button').forEach((x) => x.setAttribute('aria-pressed', String(x === b))); render(); }));
const f = $('#f');
const state = (format) => ({ venue: f.venue.value.trim() || 'This place', when: f.when.value.trim() || 'Every week', colour, format });
pdfButton($('[data-action="pdf"]'), async (jsPDF) => (await import('./pdf.js')).drawPoster(jsPDF, state('a3')), 'phone-free-hour-poster-a3.pdf');
pdfButton($('[data-action="pdf-a4"]'), async (jsPDF) => (await import('./pdf.js')).drawPoster(jsPDF, state('a4')), 'phone-free-hour-poster-a4.pdf');
