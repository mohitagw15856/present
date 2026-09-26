const KEY = 'present:bedtime-handover:words';
const $ = (s) => document.querySelector(s); const $$ = (s) => [...document.querySelectorAll(s)];
const show = (v) => $$('[data-view]').forEach((el) => (el.hidden = el.dataset.view !== v));
const f = $('#f');
let words = { a: 'The phone is in the kitchen.', b: 'The alarm is set on the clock.' };
try { words = { ...words, ...(JSON.parse(localStorage.getItem(KEY)) || {}) }; } catch {}
f.ta.value = words.a; f.tb.value = words.b;
const saveWords = () => { try { localStorage.setItem(KEY, JSON.stringify({ a: f.ta.value.trim() || words.a, b: f.tb.value.trim() || words.b })); } catch {} };
f.ta.addEventListener('change', saveWords); f.tb.addEventListener('change', saveWords);
const check = () => { if (f.a.checked && f.b.checked) setTimeout(() => show('night'), 350); };
f.a.addEventListener('change', check); f.b.addEventListener('change', check);
$('[data-action="reset"]').addEventListener('click', () => { f.a.checked = false; f.b.checked = false; show('check'); });
show('check');
