const DIRS = [
  ['Left.', 6], ['Right.', 6], ['Straight on.', 5], ['Through the nearest open door.', 2], ['Back the way you came, slowly.', 1], ['Towards the tallest thing you can see.', 2], ['Follow the next person who passes, for one block.', 1], ['Towards the sound.', 2],
];
const HOW = [
  'Until the next corner.', 'For two minutes.', 'Until you see something red.', 'Until you pass a bench. Sit on it.', 'Until someone smiles at you.', 'Until the pavement changes.', 'Until you can smell food.', 'Until you have counted ten windows.', 'Until you hear a bird.', 'Until the road bends.',
];
const pick = (list) => { const total = list.reduce((a, [, w]) => a + w, 0); let r = Math.random() * total; for (const [v, w] of list) { r -= w; if (r <= 0) return v; } return list[0][0]; };
const dir = document.querySelector('[data-bind="dir"]'), how = document.querySelector('[data-bind="how"]');
document.querySelector('[data-action="roll"]').addEventListener('click', () => {
  dir.textContent = pick(DIRS);
  how.textContent = HOW[Math.floor(Math.random() * HOW.length)];
  try { navigator.vibrate?.(40); } catch {}
});
