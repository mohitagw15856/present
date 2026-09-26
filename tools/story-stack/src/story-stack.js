import lines from '../../../data/story-lines.json';
import { shuffled } from '@present/shared/questions';

const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const bind = (n) => $(`[data-bind="${n}"]`);
const show = (v) => $$('[data-view]').forEach((el) => (el.hidden = el.dataset.view !== v));

let people = 4;
let deck = shuffled(lines);
let turn = 0;

$$('#people button').forEach((b) =>
  b.addEventListener('click', () => {
    people = Number(b.dataset.n);
    $$('#people button').forEach((x) => x.classList.toggle('btn-primary', x === b));
  })
);

function start() {
  if (!deck.length) deck = shuffled(lines);
  turn = 0;
  bind('line').textContent = deck.pop().text + '…';
  bind('total').textContent = String(people);
  render();
  show('play');
}
function render() {
  bind('n').textContent = String(turn + 1);
  bind('hint').textContent = turn === 0 ? 'Read the line aloud, then keep the story going for a minute or so.' : turn === people - 1 ? 'Last teller. Land it.' : 'Pick up where they left off. No planning.';
  if (turn > 0) bind('line').classList.add('opacity-60');
  else bind('line').classList.remove('opacity-60');
}

$('[data-action="start"]').addEventListener('click', start);
$('[data-action="again"]').addEventListener('click', start);
$('[data-action="pass"]').addEventListener('click', () => {
  turn++;
  if (turn >= people) show('done');
  else render();
});
show('setup');
