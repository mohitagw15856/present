import { byDepth, shuffled } from '@present/shared/questions';
import { pdfButton } from '@present/shared/download';
import { colours } from '@present/shared/pdf';
const $ = (s) => document.querySelector(s); const $$ = (s) => [...document.querySelectorAll(s)];
let depth = 'any', count = 4, deck = [];
function render() {
  const mat = deck.slice(0, 4);
  mat.forEach((q, i) => ($(`[data-q="${i}"]`).textContent = q.text));
  $('[data-bind="plate"]').style.background = colours[colour].soft;
}
let colour = 'sage';
$$('#colours button').forEach((b) => b.addEventListener('click', () => { colour = b.dataset.colour; $$('#colours button').forEach((x) => x.setAttribute('aria-pressed', String(x === b))); render(); }));
function reshuffle() { deck = shuffled(byDepth(depth)); while (deck.length < count * 4) deck = deck.concat(shuffled(byDepth(depth))); render(); }
$$('#depths button').forEach((b) => b.addEventListener('click', () => { depth = b.dataset.depth; $$('#depths button').forEach((x) => x.classList.toggle('btn-primary', x === b)); reshuffle(); }));
$$('#counts button').forEach((b) => b.addEventListener('click', () => { count = Number(b.dataset.n); $$('#counts button').forEach((x) => x.classList.toggle('btn-primary', x === b)); reshuffle(); }));
$('[data-action="shuffle"]').addEventListener('click', reshuffle);
pdfButton($('[data-action="pdf"]'), async (jsPDF) => {
  const { drawPlacemats } = await import('./pdf.js');
  const mats = Array.from({ length: count }, (_, i) => deck.slice(i * 4, i * 4 + 4).map((q) => q.text));
  return drawPlacemats(jsPDF, { mats, colour });
}, () => `placemats-${depth}-x${count}.pdf`);
reshuffle();
