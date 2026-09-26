import { byDepth, shuffled } from '@present/shared/questions';

const ACTIVE = 'present:walk-and-talk:active';
const NOTES = 'present:walk-and-talk:notes';
const MAX_NOTES = 12;

const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const bind = (n) => $(`[data-bind="${n}"]`);
const show = (v) => {
  $$('[data-view]').forEach((el) => (el.hidden = el.dataset.view !== v));
  document.body.classList.toggle('walking', v === 'walking');
};
const read = (k, fallback) => { try { return JSON.parse(localStorage.getItem(k)) ?? fallback; } catch { return fallback; } };
const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };

let minutes = 30;
let walk = read(ACTIVE, null);
let wakeLock = null;
let timer = null;

/* ---------- setup ---------- */
$$('#durations button').forEach((b) =>
  b.addEventListener('click', () => {
    minutes = Number(b.dataset.min);
    $$('#durations button').forEach((x) => x.classList.toggle('btn-primary', x === b));
  })
);

$('#setup').addEventListener('submit', (e) => {
  e.preventDefault();
  const partner = e.currentTarget.partner.value.trim() || 'a friend';
  const prompt = shuffled([...byDepth('light'), ...byDepth('real')])[0].text;
  walk = { partner, minutes, prompt, start: null, buzzed: false };
  bind('partner').textContent = partner;
  bind('prompt').textContent = prompt;
  show('prompt');
});

function renderPast() {
  const notes = read(NOTES, []);
  const details = $('#past');
  details.hidden = notes.length === 0;
  const ul = $('#past-list');
  ul.replaceChildren();
  for (const n of notes) {
    const li = document.createElement('li');
    const when = new Date(n.date).toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
    li.textContent = `${when} · with ${n.partner}, ${n.minutes} min${n.note ? ` · “${n.note}”` : ''}`;
    ul.append(li);
  }
}

/* ---------- walking ---------- */
async function lock() {
  try { if ('wakeLock' in navigator && document.visibilityState === 'visible') wakeLock = await navigator.wakeLock.request('screen'); } catch {}
}

function buzz() {
  if (walk.buzzed) return;
  walk.buzzed = true;
  write(ACTIVE, walk);
  try { navigator.vibrate?.(300); } catch {}
}

function startWalking() {
  if (!walk.start) {
    walk.start = Date.now();
    write(ACTIVE, walk);
  }
  bind('walking-line').textContent = `Walking with ${walk.partner}`;
  show('walking');
  lock();
  const half = walk.start + (walk.minutes * 60_000) / 2;
  const end = walk.start + walk.minutes * 60_000;
  const check = () => {
    const now = Date.now();
    if (now >= half) buzz();
    if (now >= end) finish();
  };
  check();
  timer = setInterval(check, 1000);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') { lock(); check(); }
  });
}

$('[data-action="begin"]').addEventListener('click', startWalking);
$('[data-action="end"]').addEventListener('click', finish);

/* ---------- done ---------- */
function finish() {
  clearInterval(timer);
  try { wakeLock?.release(); } catch {}
  const walked = Math.max(1, Math.round((Date.now() - walk.start) / 60_000));
  walk.walked = walked;
  bind('done-title').textContent = `${walked} minute${walked === 1 ? '' : 's'} with ${walk.partner}.`;
  bind('done-prompt').textContent = `You talked about: ${walk.prompt}`;
  try { localStorage.removeItem(ACTIVE); } catch {}
  show('done');
}

$('#note').addEventListener('submit', (e) => {
  e.preventDefault();
  const note = e.currentTarget.note.value.trim();
  const notes = read(NOTES, []);
  notes.unshift({ date: new Date().toISOString(), partner: walk.partner, minutes: walk.walked, prompt: walk.prompt, note });
  write(NOTES, notes.slice(0, MAX_NOTES));
  location.href = './';
});

/* ---------- boot ---------- */
if (walk && walk.start) {
  // A walk in progress survives a reload or a locked screen.
  startWalking();
} else {
  walk = null;
  renderPast();
  show('setup');
}
