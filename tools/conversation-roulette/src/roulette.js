import { byDepth, shuffled } from '@present/shared/questions';

const depthStyle = {
  light: 'bg-sky-soft text-sky-ink',
  real: 'bg-accent-soft text-accent-ink',
  deep: 'bg-rose-soft text-rose-ink',
};
const depthLabel = { light: 'light', real: 'real', deep: 'deep', any: 'mix' };

const $ = (s) => document.querySelector(s);
const bind = (n) => $(`[data-bind="${n}"]`);
const views = [...document.querySelectorAll('[data-view]')];
const show = (v) => views.forEach((el) => (el.hidden = el.dataset.view !== v));

let deck = [];
let depth = 'any';

function start(d) {
  depth = d;
  deck = shuffled(byDepth(d));
  bind('depth-label').textContent = depthLabel[d];
  bind('question').textContent = 'Tap anywhere for the first question.';
  bind('pill').hidden = true;
  show('play');
}

function next() {
  if (deck.length === 0) deck = shuffled(byDepth(depth));
  const q = deck.pop();
  bind('question').textContent = q.text;
  const pill = bind('pill');
  pill.textContent = q.depth;
  pill.className = `mt-8 self-start inline-flex items-center rounded-full px-3 py-1 text-sm font-medium capitalize ${depthStyle[q.depth]}`;
  pill.hidden = false;
}

document.querySelectorAll('[data-depth]').forEach((b) => b.addEventListener('click', () => start(b.dataset.depth)));
$('[data-action="next"]').addEventListener('click', next);
$('[data-action="change"]').addEventListener('click', () => show('pick'));
