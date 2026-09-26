import { cards as deck } from '@present/shared/cards';
import { shuffled } from '@present/shared/questions';

const KEY = 'present:noticing-cards:own';
const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

let own = [];
try { own = JSON.parse(localStorage.getItem(KEY)) || []; } catch {}
function saveOwn() { try { localStorage.setItem(KEY, JSON.stringify(own)); } catch {} }

let paper = 'a4';
const all = () => [...deck, ...own];

function renderPreview() {
  const ul = $('#preview');
  const tpl = $('#card-tpl');
  ul.replaceChildren();
  for (const c of shuffled(all()).slice(0, 6)) {
    const li = tpl.content.firstElementChild.cloneNode(true);
    li.querySelector('[data-slot="text"]').textContent = c.text;
    li.querySelector('[data-slot="hint"]').textContent = c.hint || '';
    ul.append(li);
  }
  $('[data-bind="count"]').textContent = String(all().length);
}

function renderOwn() {
  const ul = $('#own');
  const tpl = $('#own-tpl');
  ul.replaceChildren();
  own.forEach((c, i) => {
    const li = tpl.content.firstElementChild.cloneNode(true);
    li.querySelector('[data-slot="text"]').textContent = c.text;
    li.querySelector('[data-slot="hint"]').textContent = c.hint || '';
    li.querySelector('[data-remove]').addEventListener('click', () => {
      own.splice(i, 1);
      saveOwn();
      renderOwn();
      renderPreview();
    });
    ul.append(li);
  });
}

$('#add').addEventListener('submit', (e) => {
  e.preventDefault();
  const form = e.currentTarget;
  const text = form.text.value.trim();
  const hint = form.hint.value.trim();
  if (!text) return;
  own.push(hint ? { text, hint } : { text });
  saveOwn();
  form.reset();
  renderOwn();
  renderPreview();
});

$('[data-action="shuffle"]').addEventListener('click', renderPreview);
$$('#paper button').forEach((b) =>
  b.addEventListener('click', () => {
    paper = b.dataset.paper;
    $$('#paper button').forEach((x) => x.classList.toggle('btn-primary', x === b));
  })
);

$('[data-action="download"]').addEventListener('click', async (e) => {
  const btn = e.currentTarget;
  btn.disabled = true;
  btn.textContent = 'Drawing…';
  try {
    const [{ jsPDF }, { drawDeck }] = await Promise.all([import('jspdf'), import('./pdf.js')]);
    drawDeck(jsPDF, all(), paper).save(`noticing-cards-${paper}.pdf`);
  } finally {
    btn.disabled = false;
    btn.textContent = 'Download the deck (PDF)';
  }
});

renderOwn();
renderPreview();
