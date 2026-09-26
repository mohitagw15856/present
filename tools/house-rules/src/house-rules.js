import { pdfButton } from '@present/shared/download';
import { RULES, PRESETS } from './pdf.js';
const $ = (s) => document.querySelector(s); const $$ = (s) => [...document.querySelectorAll(s)];
const render = () => {};
let colour = 'sage';
$$('#colours button').forEach((b) => b.addEventListener('click', () => { colour = b.dataset.colour; $$('#colours button').forEach((x) => x.setAttribute('aria-pressed', String(x === b))); render(); }));
const ul = $('#rules');
let preset = 'home';
function build() {
  ul.replaceChildren();
  RULES.forEach((r, i) => {
    const li = document.createElement('li');
    li.className = 'card px-4 py-3 flex items-center gap-3';
    li.innerHTML = `<input type="checkbox" class="h-6 w-6 shrink-0 accent-[var(--accent)]" data-i="${i}" ${PRESETS[preset].rules.includes(i) ? 'checked' : ''} aria-label="Include rule"><input type="text" class="bg-transparent flex-1 outline-none" maxlength="70" value="" data-t="${i}" aria-label="Rule wording">`;
    li.querySelector(`[data-t="${i}"]`).value = PRESETS[preset].wording?.[i] || r;
    ul.append(li);
  });
  if (!$('#f').house.value) $('#f').house.placeholder = PRESETS[preset].house;
}
$$('#presets button').forEach((b) => b.addEventListener('click', () => { preset = b.dataset.preset; $$('#presets button').forEach((x) => x.classList.toggle('btn-primary', x === b)); build(); }));
pdfButton($('[data-action="pdf"]'), async (jsPDF) => {
  const rules = [...ul.querySelectorAll('input[type=checkbox]:checked')].map((cb) => ul.querySelector(`[data-t="${cb.dataset.i}"]`).value.trim()).filter(Boolean);
  return (await import('./pdf.js')).drawRules(jsPDF, { house: $('#f').house.value.trim() || PRESETS[preset].house, title: PRESETS[preset].title, rules, colour });
}, () => `house-rules-${preset}.pdf`);
build();
