import { colours, paper, ensureDoc, size, background, textColour, fillColour, credit } from '@present/shared/pdf';

export function drawPoster(jsPDF, state, doc) {
  const c = colours[state.colour] || colours.mist;
  doc = ensureDoc(jsPDF, doc, { format: 'a4', orientation: 'portrait' });
  const { W, H } = size(doc);
  background(doc, paper.cream);
  fillColour(doc, c.fill);
  doc.rect(0, H - 28, W, 28, 'F');
  doc.setFont('helvetica', 'bold');
  textColour(doc, paper.ink);
  // Largest size (up to 90pt) whose wrapped block fits the page.
  let s = 90, lines;
  do {
    doc.setFontSize(s);
    lines = doc.splitTextToSize(state.text, W - 40);
    const blockH = lines.length * s * 0.42;
    if (blockH <= H - 110 && lines.every((l) => doc.getTextWidth(l) <= W - 40)) break;
    s -= 2;
  } while (s > 28);
  const lh = s * 0.42;
  const startY = (H - 28) / 2 - (lines.length * lh) / 2 + lh * 0.8;
  lines.forEach((l, i) => doc.text(l, 20, startY + i * lh));
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  textColour(doc, c.deep);
  doc.text('FRIDGE QUESTION', 20, H - 12, { charSpace: 0.8 });
  doc.text(state.label, W - 20, H - 12, { align: 'right' });
  credit(doc, 'present');
  return doc;
}
