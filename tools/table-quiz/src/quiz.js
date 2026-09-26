import { quizQuestions } from '@present/shared/quiz';
import { shuffled } from '@present/shared/questions';
import { pdfButton } from '@present/shared/download';

const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const bind = (n) => $(`[data-bind="${n}"]`);
const show = (v) => $$('[data-view]').forEach((el) => (el.hidden = el.dataset.view !== v));

let n = 8;
let deck = shuffled(quizQuestions);
let round = [];
let i = 0;

$$('#lengths button').forEach((b) =>
  b.addEventListener('click', () => {
    n = Number(b.dataset.n);
    $$('#lengths button').forEach((x) => x.classList.toggle('btn-primary', x === b));
  })
);

function deal() {
  if (deck.length < n) deck = shuffled(quizQuestions);
  round = deck.splice(0, n);
  i = 0;
  bind('ask-total').textContent = String(n);
  bind('rev-total').textContent = String(n);
  ask();
}
function ask() {
  bind('ask-n').textContent = String(i + 1);
  bind('ask-q').textContent = round[i].text;
  show('ask');
}
function reveal() {
  bind('rev-n').textContent = String(i + 1);
  bind('rev-q').textContent = round[i].text;
  show('reveal');
}

$('[data-action="deal"]').addEventListener('click', deal);
$('[data-action="ask-next"]').addEventListener('click', () => {
  i++;
  if (i < round.length) ask();
  else { i = 0; show('between'); }
});
$('[data-action="reveal"]').addEventListener('click', reveal);
$('[data-action="rev-next"]').addEventListener('click', () => {
  i++;
  if (i < round.length) reveal();
  else show('done');
});
$('[data-action="again"]').addEventListener('click', deal);
$$('[data-action="quit"]').forEach((b) => b.addEventListener('click', () => show('setup')));

$('[data-action="print"]').addEventListener('click', () => {
  const sheets = $('#sheets');
  sheets.replaceChildren();
  for (let s = 0; s < 4; s++) {
    const div = document.createElement('div');
    div.className = 'sheet';
    div.innerHTML = `<h2>Table Quiz · answer sheet</h2><p>Write a name for each question. Swap with a neighbour for the reveal.</p><ol>${'<li></li>'.repeat(10)}</ol>`;
    sheets.append(div);
  }
  window.print();
});

pdfButton($('[data-action="pdf"]'), async (jsPDF) => (await import('./pdf.js')).drawAnswerSheets(jsPDF, {}), 'table-quiz-answer-sheets.pdf');
show('setup');
