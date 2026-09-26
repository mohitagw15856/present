import QRCode from 'qrcode';

/* ---------- constants ---------- */
const GRACE_MS = 60_000; // settling-in period before pick-ups count
const BREAK_DEBOUNCE_MS = 5_000; // one pick-up, not three events
const CODE_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

const FORFEITS = [
  'Make the next round of drinks, and take orders properly.',
  'Give a thirty-second toast to the person on your left.',
  'Tell the table a story from before you owned a phone.',
  'Do the washing up tonight. All of it.',
  'Pick and read tomorrow’s One Question aloud, and go first.',
  'Describe your day using only questions.',
  'Say one thing you genuinely admire about each person here.',
  'Dessert is on you.',
  'Sing the first line of the last song you had stuck in your head.',
  'Teach the table something you know how to do with your hands.',
  'Choose the walk you’ll all take after this, and lead it.',
  'For the rest of the meal, you answer to a new name chosen by the table.',
];

/* ---------- tiny helpers ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const bind = (name) => $(`[data-bind="${name}"]`);
const app = $('#app');

function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function randomCode(len = 5) {
  const bytes = crypto.getRandomValues(new Uint8Array(len));
  return [...bytes].map((b) => CODE_ALPHABET[b % CODE_ALPHABET.length]).join('');
}
function pad(n) {
  return String(n).padStart(2, '0');
}
function fmtClock(ms) {
  const s = Math.max(0, Math.ceil(ms / 1000));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const r = s % 60;
  return h > 0 ? `${h}:${pad(m)}:${pad(r)}` : `${m}:${pad(r)}`;
}
function fmtDuration(min) {
  if (min < 60) return `${min} minute`;
  if (min === 60) return 'one hour';
  if (min % 60 === 0) return `${min / 60} hour`;
  return `${Math.floor(min / 60)}½ hour`;
}
function show(view) {
  $$('[data-view]').forEach((el) => (el.hidden = el.dataset.view !== view));
  app.dataset.state = view;
}

/* ---------- room from URL ---------- */
const params = new URLSearchParams(location.search);
const room = params.get('r')
  ? {
      code: params.get('r').toUpperCase(),
      start: Number(params.get('s')),
      minutes: Number(params.get('d')),
      host: params.get('h') || '',
    }
  : null;

const storeKey = room ? `present:table-pact:${room.code}` : null;
function loadMe() {
  try {
    return JSON.parse(localStorage.getItem(storeKey)) || null;
  } catch {
    return null;
  }
}
function saveMe(me) {
  try {
    localStorage.setItem(storeKey, JSON.stringify(me));
  } catch {}
}

/* ---------- setup ---------- */
let chosenMinutes = 30;
function initSetup() {
  const buttons = $$('#durations button');
  const select = (min) => {
    chosenMinutes = min;
    buttons.forEach((b) => {
      const on = Number(b.dataset.min) === min;
      b.classList.toggle('btn-primary', on);
      b.setAttribute('aria-pressed', String(on));
    });
  };
  buttons.forEach((b) => b.addEventListener('click', () => select(Number(b.dataset.min))));
  select(chosenMinutes);

  $('#setup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = $('#host-name').value.trim();
    const code = randomCode();
    const url = new URL(location.href);
    url.search = '';
    url.searchParams.set('r', code);
    url.searchParams.set('s', String(Date.now()));
    url.searchParams.set('d', String(chosenMinutes));
    if (name) url.searchParams.set('h', name);
    // Remember that this device is the host so we skip the join screen.
    try {
      localStorage.setItem(`present:table-pact:${code}`, JSON.stringify({ name: name || 'Host', breaks: [], joined: Date.now(), host: true }));
    } catch {}
    location.href = url.toString();
  });
  show('setup');
}

/* ---------- join ---------- */
function initJoin() {
  bind('host-line').textContent = room.host ? room.host : 'Someone';
  bind('join-duration').textContent = fmtDuration(room.minutes);
  $('#join-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = $('#join-name').value.trim() || 'Someone';
    saveMe({ name, breaks: [], joined: Date.now(), host: false });
    startRunning(loadMe());
  });
  show('join');
}

/* ---------- running ---------- */
let channel = null;
let wakeLock = null;
let tick = null;
const others = new Map(); // same-device participants via BroadcastChannel

async function requestWakeLock() {
  try {
    if ('wakeLock' in navigator && document.visibilityState === 'visible') {
      wakeLock = await navigator.wakeLock.request('screen');
    }
  } catch {}
}

function startRunning(me) {
  const end = room.start + room.minutes * 60_000;
  const url = location.href;

  bind('code').textContent = room.code;
  bind('link').textContent = url;
  QRCode.toString(url, { type: 'svg', margin: 1, color: { dark: '#2b2823', light: '#ffffff' } })
    .then((svg) => (bind('qr').innerHTML = svg))
    .catch(() => (bind('qr').textContent = url));

  const qrPanel = bind('qr-panel');
  const qrToggle = $('[data-action="toggle-qr"]');
  // Host sees the code straight away so others can scan.
  if (me.host && Date.now() - room.start < GRACE_MS * 3) {
    qrPanel.hidden = false;
    qrToggle.textContent = 'Hide code';
    qrToggle.setAttribute('aria-expanded', 'true');
  }
  qrToggle.addEventListener('click', () => {
    qrPanel.hidden = !qrPanel.hidden;
    qrToggle.textContent = qrPanel.hidden ? 'Show code' : 'Hide code';
    qrToggle.setAttribute('aria-expanded', String(!qrPanel.hidden));
  });

  // Same-device sync (several tabs, or a laptop demo). Honest about its limits.
  try {
    channel = new BroadcastChannel(`present:table-pact:${room.code}`);
    channel.onmessage = (ev) => {
      const d = ev.data;
      if (!d || d.id === me.joined) return;
      others.set(d.id, d);
      renderTable();
      if (d.type === 'hello') announce('here');
    };
    const announce = (type) => channel.postMessage({ type, id: me.joined, name: me.name, breaks: me.breaks.length });
    announce('hello');
    me._announce = announce;
  } catch {}

  function renderTable() {
    const el = bind('table');
    const rows = [...others.values()].map((o) => `${o.name}${o.breaks ? ` · picked up ×${o.breaks}` : ''}`);
    el.textContent = rows.length ? `Also on this device: ${rows.join(', ')}` : '';
  }

  function renderMe() {
    const n = me.breaks.length;
    bind('me-line').textContent =
      n === 0 ? `${me.name}, you're keeping the pact.` : n === 1 ? `${me.name}, you picked up your phone once.` : `${me.name}, you picked up your phone ${n} times.`;
    bind('me-line').classList.toggle('text-rose-ink', n > 0);
  }

  function recordBreak(reason) {
    const now = Date.now();
    if (now - room.start < GRACE_MS) return; // settling in
    if (now >= end) return;
    const last = me.breaks[me.breaks.length - 1];
    if (last && now - last.t < BREAK_DEBOUNCE_MS) return;
    me.breaks.push({ t: now, reason });
    saveMe(me);
    renderMe();
    me._announce?.('break');
  }

  // Pick-up detection: tab hidden, window blurred, or screen rotated.
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') recordBreak('hidden');
    else requestWakeLock();
  });
  window.addEventListener('blur', () => recordBreak('blur'));
  if (screen.orientation?.addEventListener) {
    screen.orientation.addEventListener('change', () => recordBreak('rotate'));
  } else {
    window.addEventListener('orientationchange', () => recordBreak('rotate'));
  }
  window.addEventListener('pagehide', () => recordBreak('hidden'));
  requestWakeLock();

  $('[data-action="end-early"]').addEventListener('click', () => finish(me, true));

  const clock = bind('clock');
  const status = bind('status-line');
  function update() {
    const now = Date.now();
    const remaining = end - now;
    clock.textContent = fmtClock(remaining);
    if (now - room.start < GRACE_MS) {
      status.textContent = `Phones down in ${Math.ceil((GRACE_MS - (now - room.start)) / 1000)}s.`;
    } else {
      status.textContent = `${fmtDuration(room.minutes).replace(/^one/, 'One')}${room.minutes < 60 ? 's' : ''} together.`;
    }
    if (remaining <= 0) finish(me, false);
  }
  update();
  renderMe();
  tick = setInterval(update, 500);
  show('running');
}

/* ---------- summary ---------- */
function finish(me, early) {
  clearInterval(tick);
  try { wakeLock?.release(); } catch {}
  try { channel?.close(); } catch {}

  const n = me.breaks.length;
  const title = bind('summary-title');
  const detail = bind('summary-detail');
  const forfeit = bind('forfeit');
  const label = bind('forfeit-label');

  if (n === 0) {
    title.textContent = early ? 'Pact ended early, but you kept it.' : 'You kept the pact.';
    detail.textContent = `${me.name}, your phone stayed on the table for ${fmtDuration(room.minutes)}${room.minutes < 60 ? 's' : ''}. Nothing owed.`;
    label.textContent = 'No forfeit';
    forfeit.textContent = 'Put the phone back down and enjoy the rest of it.';
  } else {
    const first = me.breaks[0].t - room.start;
    title.textContent = n === 1 ? 'You broke the pact once.' : `You broke the pact ${n} times.`;
    detail.textContent = `First pick-up at ${fmtClock(first)} in. Own it gracefully.`;
    label.textContent = 'Your forfeit';
    forfeit.textContent = FORFEITS[(hash(room.code) + n) % FORFEITS.length];
  }
  show('summary');
}

/* ---------- boot ---------- */
if (!room || !room.start || !room.minutes) {
  initSetup();
} else {
  const me = loadMe();
  const end = room.start + room.minutes * 60_000;
  if (me && Date.now() >= end) finish(me, false);
  else if (me) startRunning(me);
  else if (Date.now() >= end) {
    // Arrived after the pact ended.
    show('summary');
    bind('summary-title').textContent = 'This pact has already ended.';
    bind('summary-detail').textContent = 'Start a fresh one for the table.';
    bind('forfeit-label').textContent = '';
    bind('forfeit').textContent = '';
  } else initJoin();
}
