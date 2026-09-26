const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const show = (v) => $$('[data-view]').forEach((el) => (el.hidden = el.dataset.view !== v));
let lock = null;
$('[data-action="begin"]').addEventListener('click', async () => {
  show('silent');
  try { if ('wakeLock' in navigator) lock = await navigator.wakeLock.request('screen'); } catch {}
  setTimeout(() => show('now'), 60_000);
});
$('[data-action="done"]').addEventListener('click', () => { try { lock?.release(); } catch {} show('start'); });
show('start');
