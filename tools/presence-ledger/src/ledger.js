const KEY = 'present:presence-ledger';
const $ = (s) => document.querySelector(s);
const bind = (n) => $(`[data-bind="${n}"]`);

let entries = [];
try { entries = JSON.parse(localStorage.getItem(KEY)) || []; } catch {}
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(entries)); } catch {} };

const today = new Date();
const localDate = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
let view = { y: today.getFullYear(), m: today.getMonth() }; // month being shown

$('#entry').date.value = localDate(today);

/* "Ana and Ben, Chloé" -> ["Ana", "Ben", "Chloé"] */
export function splitNames(who) {
  return who
    .split(/,|;|&|\band\b|\+/i)
    .map((s) => s.trim())
    .filter(Boolean);
}

function monthKey(dateStr) {
  return dateStr.slice(0, 7);
}
function viewKey() {
  return `${view.y}-${String(view.m + 1).padStart(2, '0')}`;
}

function render() {
  const key = viewKey();
  const inMonth = entries.filter((e) => monthKey(e.date) === key).sort((a, b) => (a.date < b.date ? 1 : -1));
  bind('month').textContent = new Date(view.y, view.m, 1).toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
  bind('count').textContent = String(inMonth.length);
  bind('total').textContent = String(entries.length);

  const tally = new Map();
  for (const e of inMonth) for (const n of splitNames(e.who)) tally.set(n, (tally.get(n) || 0) + 1);
  const top = [...tally.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3);
  bind('people').textContent = top.length ? top.map(([n, c]) => (c > 1 ? `${n} ×${c}` : n)).join(', ') : '—';

  const ul = $('#entries');
  const tpl = $('#entry-tpl');
  ul.replaceChildren();
  for (const e of inMonth) {
    const li = tpl.content.firstElementChild.cloneNode(true);
    li.querySelector('[data-slot="who"]').textContent = e.who;
    li.querySelector('[data-slot="about"]').textContent = e.about;
    li.querySelector('[data-slot="noticed"]').textContent = e.noticed;
    const t = li.querySelector('[data-slot="date"]');
    t.textContent = new Date(e.date + 'T12:00:00').toLocaleDateString(undefined, { weekday: 'short', day: 'numeric' });
    t.dateTime = e.date;
    li.querySelector('[data-remove]').addEventListener('click', () => {
      entries = entries.filter((x) => x.id !== e.id);
      save();
      render();
    });
    ul.append(li);
  }
  bind('empty').hidden = inMonth.length > 0;
}

$('#entry').addEventListener('submit', (ev) => {
  ev.preventDefault();
  const f = ev.currentTarget;
  const entry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    date: f.date.value,
    who: f.who.value.trim(),
    about: f.about.value.trim(),
    noticed: f.noticed.value.trim(),
  };
  if (!entry.who || !entry.about || !entry.noticed || !entry.date) return;
  entries.push(entry);
  save();
  const d = new Date(entry.date + 'T12:00:00');
  view = { y: d.getFullYear(), m: d.getMonth() };
  f.reset();
  f.date.value = localDate(today);
  f.who.focus();
  render();
});

$('[data-action="prev"]').addEventListener('click', () => { view.m--; if (view.m < 0) { view.m = 11; view.y--; } render(); });
$('[data-action="next"]').addEventListener('click', () => { view.m++; if (view.m > 11) { view.m = 0; view.y++; } render(); });

export function toMarkdown(list) {
  const byMonth = new Map();
  for (const e of [...list].sort((a, b) => (a.date < b.date ? -1 : 1))) {
    const k = monthKey(e.date);
    if (!byMonth.has(k)) byMonth.set(k, []);
    byMonth.get(k).push(e);
  }
  let out = '# Presence Ledger\n\n';
  for (const [k, es] of byMonth) {
    const [y, m] = k.split('-');
    const title = new Date(Number(y), Number(m) - 1, 1).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
    out += `## ${title}\n\n${es.length} real conversation${es.length === 1 ? '' : 's'}\n\n`;
    for (const e of es) {
      out += `### ${e.date} — ${e.who}\n\n- **Talked about:** ${e.about}\n- **Noticed:** ${e.noticed}\n\n`;
    }
  }
  return out;
}

$('[data-action="export"]').addEventListener('click', () => {
  const blob = new Blob([toMarkdown(entries)], { type: 'text/markdown;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `presence-ledger-${localDate(today)}.md`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
});

render();
