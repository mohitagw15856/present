const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const form = $('#pick');
const canvas = $('#card');
const ctx = canvas.getContext('2d');

const DAY_NAMES = ['Mondays', 'Tuesdays', 'Wednesdays', 'Thursdays', 'Fridays', 'Saturdays', 'Sundays'];
const ICS_DAYS = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];
const state = { day: 6, start: '16:00', hours: 1 };

/* ---------- formatting ---------- */
function parseTime(t) {
  const [h, m] = t.split(':').map(Number);
  return { h, m };
}
function endTime() {
  const { h, m } = parseTime(state.start);
  return { h: (h + state.hours) % 24, m };
}
function fmt12(h, m, withSuffix = true) {
  const suffix = h >= 12 ? 'pm' : 'am';
  const hh = h % 12 === 0 ? 12 : h % 12;
  return `${hh}${m ? ':' + String(m).padStart(2, '0') : ''}${withSuffix ? suffix : ''}`;
}
export function spanText(startStr, hours) {
  const s = parseTime(startStr);
  const e = { h: (s.h + hours) % 24, m: s.m };
  const sameHalf = (s.h >= 12) === (e.h >= 12) && e.h >= s.h;
  return `${fmt12(s.h, s.m, !sameHalf)} to ${fmt12(e.h, e.m)}`;
}
function line() {
  return `I'm offline ${DAY_NAMES[state.day]} ${spanText(state.start, state.hours)}`;
}

/* ---------- card ---------- */
const palette = { cream: '#fbf8f2', sage: '#c9d8c8', sageDeep: '#5b7460', ink: '#2b2823', muted: '#7a736a' };

function wrap(text, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let cur = '';
  for (const w of words) {
    const test = cur ? `${cur} ${w}` : w;
    if (ctx.measureText(test).width > maxWidth && cur) {
      lines.push(cur);
      cur = w;
    } else cur = test;
  }
  if (cur) lines.push(cur);
  return lines;
}

async function draw() {
  try { await document.fonts.load('500 80px "Inter Variable"'); } catch {}
  const W = canvas.width, H = canvas.height;
  ctx.fillStyle = palette.cream;
  ctx.fillRect(0, 0, W, H);

  // Soft circle with a resting phone, echoing the parking signs.
  ctx.fillStyle = palette.sage;
  ctx.beginPath(); ctx.arc(W / 2, 330, 190, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = palette.sageDeep;
  roundRect(W / 2 - 110, 360, 220, 62, 18); ctx.fill();
  ctx.fillStyle = palette.cream;
  roundRect(W / 2 - 90, 372, 180, 38, 12); ctx.fill();

  ctx.fillStyle = palette.ink;
  ctx.textAlign = 'center';
  ctx.font = '500 78px "Inter Variable", system-ui, sans-serif';
  const lines = wrap(line(), W - 160);
  const lh = 92;
  let y = 660 - ((lines.length - 1) * lh) / 2;
  for (const l of lines) { ctx.fillText(l, W / 2, y); y += lh; }

  ctx.fillStyle = palette.muted;
  ctx.font = '400 34px "Inter Variable", system-ui, sans-serif';
  ctx.fillText('Come and find me in person.', W / 2, y + 40);

  ctx.font = '500 28px "Inter Variable", system-ui, sans-serif';
  ctx.fillStyle = palette.sageDeep;
  ctx.fillText('present', W / 2, H - 70);

  $('[data-bind="line"]').textContent = line();
}
function roundRect(x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/* ---------- ics ---------- */
function pad(n) { return String(n).padStart(2, '0'); }
function nextOccurrence() {
  const { h, m } = parseTime(state.start);
  const now = new Date();
  const d = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m, 0, 0);
  const wantDow = (state.day + 1) % 7; // our Monday=0 -> JS Sunday=0
  let delta = (wantDow - d.getDay() + 7) % 7;
  if (delta === 0 && d <= now) delta = 7;
  d.setDate(d.getDate() + delta);
  return d;
}
function icsLocal(d) {
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
}
export function buildIcs() {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  const start = nextOccurrence();
  const end = new Date(start.getTime() + state.hours * 3_600_000);
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const uid = `analog-hour-${start.getTime()}@present.local`;
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//present//Analog Hour//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${stamp}`,
    `DTSTART;TZID=${tz}:${icsLocal(start)}`,
    `DTEND;TZID=${tz}:${icsLocal(end)}`,
    `RRULE:FREQ=WEEKLY;BYDAY=${ICS_DAYS[state.day]}`,
    'SUMMARY:Analog hour (offline)',
    'DESCRIPTION:Phone off\\, away from screens. Made with present.',
    'TRANSP:OPAQUE',
    'BEGIN:VALARM',
    'TRIGGER:-PT10M',
    'ACTION:DISPLAY',
    'DESCRIPTION:Analog hour starts in ten minutes. Put the phone somewhere else.',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n') + '\r\n';
}

function downloadBlob(blob, name) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
const slug = () => `analog-hour-${DAY_NAMES[state.day].toLowerCase()}-${state.start.replace(':', '')}`;

$('[data-action="ics"]').addEventListener('click', () => {
  downloadBlob(new Blob([buildIcs()], { type: 'text/calendar;charset=utf-8' }), `${slug()}.ics`);
});
$('[data-action="png"]').addEventListener('click', () => {
  canvas.toBlob((b) => b && downloadBlob(b, `${slug()}.png`), 'image/png');
});
const shareBtn = $('[data-action="share"]');
if (navigator.canShare) {
  canvas.toBlob((b) => {
    const file = new File([b], 'analog-hour.png', { type: 'image/png' });
    if (navigator.canShare({ files: [file] })) shareBtn.hidden = false;
  });
}
shareBtn.addEventListener('click', () => {
  canvas.toBlob(async (b) => {
    const file = new File([b], `${slug()}.png`, { type: 'image/png' });
    try { await navigator.share({ files: [file], text: line() }); } catch {}
  }, 'image/png');
});

/* ---------- controls ---------- */
$$('#days button').forEach((b) =>
  b.addEventListener('click', () => {
    state.day = Number(b.dataset.day);
    $$('#days button').forEach((x) => x.classList.toggle('btn-primary', x === b));
    draw();
  })
);
form.start.addEventListener('input', () => { if (form.start.value) { state.start = form.start.value; draw(); } });
form.hours.addEventListener('change', () => { state.hours = Number(form.hours.value); draw(); });

draw();
