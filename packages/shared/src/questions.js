import questions from '../../../data/questions.json';

export const DEPTHS = ['light', 'real', 'deep'];
export { questions };

export function byDepth(depth) {
  return depth && depth !== 'any' ? questions.filter((q) => q.depth === depth) : questions;
}

/** FNV-1a; small, fast, deterministic across devices. */
export function hashString(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Local calendar date as YYYY-MM-DD, so "today" matches what people at the table experience. */
export function localDateKey(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/**
 * The question for a given date and "another" step (0 = first of the day).
 * Deterministic: everyone who opens the page on the same day sees the same sequence.
 * Steps never repeat a question within the same day.
 */
export function questionFor(dateKey, step = 0) {
  const seen = new Set();
  let pick = null;
  for (let s = 0; s <= step; s++) {
    let i = hashString(`${dateKey}:${s}`) % questions.length;
    while (seen.has(i)) i = (i + 1) % questions.length;
    seen.add(i);
    pick = questions[i];
  }
  return pick;
}

/** Shuffle a copy (Fisher–Yates) using Math.random; fine for a table game. */
export function shuffled(list) {
  const a = list.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
