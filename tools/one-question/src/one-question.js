import { localDateKey, questionFor } from '@present/shared/questions';
import { getLang, bankFor, mountLanguageSwitch } from '@present/shared/languages';
let bank = bankFor(getLang());

const LIMIT = 3;
const dateKey = localDateKey();
const storeKey = 'present:one-question';

const depthStyle = {
  light: 'bg-sky-soft text-sky-ink',
  real: 'bg-accent-soft text-accent-ink',
  deep: 'bg-rose-soft text-rose-ink',
};

const bind = (n) => document.querySelector(`[data-bind="${n}"]`);
const another = document.querySelector('[data-action="another"]');

function load() {
  try {
    const v = JSON.parse(localStorage.getItem(storeKey));
    if (v && v.date === dateKey) return v;
  } catch {}
  return { date: dateKey, step: 0 };
}
function save(state) {
  try {
    localStorage.setItem(storeKey, JSON.stringify(state));
  } catch {}
}

let state = load();

bind('date').textContent = new Date().toLocaleDateString(undefined, {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
});
bind('date').setAttribute('datetime', dateKey);

function render() {
  const q = questionFor(dateKey, state.step, bank);
  bind('question').textContent = q.text;
  const d = bind('depth');
  d.textContent = q.depth;
  d.className = `inline-flex items-center rounded-full px-3 py-1 text-sm font-medium capitalize ${depthStyle[q.depth]}`;

  const left = LIMIT - state.step;
  if (left <= 0) {
    another.disabled = true;
    another.classList.add('opacity-50');
    bind('remaining').textContent = 'That is enough for today. This is the one.';
  } else {
    bind('remaining').textContent = left === LIMIT ? `${LIMIT} more today, if you need them.` : `${left} more today.`;
  }
}

another.addEventListener('click', () => {
  if (state.step >= LIMIT) return;
  state = { date: dateKey, step: state.step + 1 };
  save(state);
  mountLanguageSwitch(document.querySelector('#lang'), (code) => { bank = bankFor(code); render(); });
render();
});

mountLanguageSwitch(document.querySelector('#lang'), (code) => { bank = bankFor(code); render(); });
render();
