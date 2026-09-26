import { templates, colours, paper } from './templates.js';

const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const preview = $('#preview');

const state = { template: 'cafe', format: 'sign', colour: 'sand', heading: '', line: '', small: '' };

function applyTemplate(id) {
  const t = templates.find((x) => x.id === id);
  state.template = id;
  state.heading = t.heading;
  state.line = t.line;
  state.small = t.small;
  state.colour = t.colour;
  $$('[data-in]').forEach((el) => (el.value = state[el.dataset.in]));
  render();
}

function render() {
  $$('#templates button').forEach((b) => b.classList.toggle('btn-primary', b.dataset.template === state.template));
  $$('#formats button').forEach((b) => b.classList.toggle('btn-primary', b.dataset.format === state.format));
  $$('#colours button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.colour === state.colour)));
  preview.dataset.format = state.format;
  $$('[data-out="heading"]').forEach((el) => (el.textContent = state.heading));
  $$('[data-out="line"]').forEach((el) => (el.textContent = state.line));
  $$('[data-out="small"]').forEach((el) => (el.textContent = state.small));
  const c = colours[state.colour];
  $$('[data-fill="fill"]').forEach((el) => el.setAttribute('fill', c.fill));
  $$('[data-fill="deep"]').forEach((el) => el.setAttribute('fill', c.deep));
  preview.style.background = state.format === 'card' ? c.fill : paper.cream;
  $('[data-out="format-note"]').textContent =
    state.format === 'sign' ? 'A4 portrait' : 'A4 landscape · fold along the dashed line to stand it on the table';
}

$$('#templates button').forEach((b) => b.addEventListener('click', () => applyTemplate(b.dataset.template)));
$$('#formats button').forEach((b) => b.addEventListener('click', () => { state.format = b.dataset.format; render(); }));
$$('#colours button').forEach((b) => b.addEventListener('click', () => { state.colour = b.dataset.colour; render(); }));
$$('[data-in]').forEach((el) => el.addEventListener('input', () => { state[el.dataset.in] = el.value; render(); }));

/* ---------- PDF ---------- */
async function download() {
  const btn = $('[data-action="download"]');
  btn.disabled = true;
  btn.textContent = 'Drawing…';
  try {
    const [{ jsPDF }, { drawSign }] = await Promise.all([import('jspdf'), import('./pdf.js')]);
    drawSign(jsPDF, state).save(`phones-rest-here-${state.template}-${state.format}.pdf`);
  } finally {
    btn.disabled = false;
    btn.textContent = 'Download PDF';
  }
}

$('[data-action="download"]').addEventListener('click', download);
applyTemplate('cafe');
