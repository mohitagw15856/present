import topics from '../../../data/two-truths-topics.json';
import { shuffled } from '@present/shared/questions';
let deck = shuffled(topics);
const el = document.querySelector('[data-bind="topic"]');
const next = () => { if (!deck.length) deck = shuffled(topics); el.textContent = deck.pop().text; };
document.querySelector('[data-action="another"]').addEventListener('click', next);
next();
