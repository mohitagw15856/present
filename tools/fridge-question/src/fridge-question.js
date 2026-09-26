import { questions, hashString } from '@present/shared/questions';
import { pdfButton } from '@present/shared/download';
const $ = (s) => document.querySelector(s); const $$ = (s) => [...document.querySelectorAll(s)];
const render = () => {};
let colour = 'sage';
$$('#colours button').forEach((b) => b.addEventListener('click', () => { colour = b.dataset.colour; $$('#colours button').forEach((x) => x.setAttribute('aria-pressed', String(x === b))); render(); }));
/* ISO week key, e.g. 2026-W39, so Monday-to-Sunday everywhere agrees. */
export function isoWeek(d = new Date()) {
  const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const day = t.getUTCDay() || 7;
  t.setUTCDate(t.getUTCDate() + 4 - day);
  const y = t.getUTCFullYear();
  const w = Math.ceil(((t - Date.UTC(y, 0, 1)) / 86400000 + 1) / 7);
  return { key: `${y}-W${String(w).padStart(2, '0')}`, week: w, year: y };
}
const wk = isoWeek();
const q = questions[hashString('fridge:' + wk.key) % questions.length];
const monday = new Date(); monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
const sunday = new Date(monday); sunday.setDate(monday.getDate() + 6);
const range = `${monday.toLocaleDateString(undefined, { day: 'numeric', month: 'short' })} – ${sunday.toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}`;
$('[data-bind="q"]').textContent = q.text;
$('[data-bind="week"]').textContent = `Week ${wk.week} · ${range}`;
pdfButton($('[data-action="pdf"]'), async (jsPDF) => (await import('./pdf.js')).drawPoster(jsPDF, { text: q.text, label: `Week ${wk.week} · ${range}`, colour }), `fridge-question-${wk.key}.pdf`);
