const ACTIVE = 'present:bench:active';
const NOTES = 'present:bench:notes';
const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const show = (v) => { $$('[data-view]').forEach((el) => (el.hidden = el.dataset.view !== v)); document.body.classList.toggle('sitting', v === 'sitting'); };
const read = (k, f) => { try { return JSON.parse(localStorage.getItem(k)) ?? f; } catch { return f; } };
const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };
let minutes = 10, active = read(ACTIVE, null), timer = null, lock = null;
$$('#durations button').forEach((b) => b.addEventListener('click', () => { minutes = Number(b.dataset.min); $$('#durations button').forEach((x) => x.classList.toggle('btn-primary', x === b)); }));
function sit() {
  if (!active) { active = { start: Date.now(), minutes }; write(ACTIVE, active); }
  show('sitting');
  navigator.wakeLock?.request('screen').then((l) => (lock = l)).catch(() => {});
  const end = active.start + active.minutes * 60_000;
  timer = setInterval(() => { if (Date.now() >= end) finish(); }, 1000);
}
function finish() {
  clearInterval(timer); try { lock?.release(); } catch {}
  const m = Math.max(1, Math.round((Date.now() - active.start) / 60_000));
  active.sat = m;
  $('[data-bind="mins"]').textContent = `${m} minute${m === 1 ? '' : 's'} on a bench.`;
  try { localStorage.removeItem(ACTIVE); } catch {}
  show('done');
}
$('[data-action="begin"]').addEventListener('click', sit);
$('[data-action="end"]').addEventListener('click', finish);
$('#note').addEventListener('submit', (e) => {
  e.preventDefault();
  const note = e.currentTarget.note.value.trim();
  const notes = read(NOTES, []);
  if (note) notes.unshift({ date: new Date().toISOString(), minutes: active.sat, note });
  write(NOTES, notes.slice(0, 12));
  location.href = './';
});
function renderPast() {
  const notes = read(NOTES, []);
  $('#past').hidden = notes.length === 0;
  const ul = $('#past-list'); ul.replaceChildren();
  for (const n of notes) { const li = document.createElement('li'); li.textContent = `${new Date(n.date).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })} · ${n.minutes} min · “${n.note}”`; ul.append(li); }
}
if (active?.start) sit(); else { renderPast(); show('setup'); }
