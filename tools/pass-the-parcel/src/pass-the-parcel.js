import { questions, shuffled } from '@present/shared/questions';
const style = { light: 'bg-sky-soft text-sky-ink', real: 'bg-accent-soft text-accent-ink', deep: 'bg-rose-soft text-rose-ink' };
const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const show = (v) => $$('[data-view]').forEach((el) => (el.hidden = el.dataset.view !== v));
let deck = shuffled(questions);
$('[data-action="go"]').addEventListener('click', () => {
  if (!deck.length) deck = shuffled(questions);
  const q = deck.pop();
  $('[data-bind="q"]').textContent = q.text;
  const pill = $('[data-bind="pill"]');
  pill.textContent = q.depth;
  pill.className = `inline-flex items-center rounded-full px-3 py-1 text-sm font-medium capitalize ${style[q.depth]}`;
  show('up');
});
$('[data-action="down"]').addEventListener('click', () => show('down'));
show('down');
