import { colours, paper, ensureDoc, size, background, textColour, fillColour, rule, credit } from '@present/shared/pdf';

export function drawLetter(jsPDF, state, doc) {
  const c = colours[state.colour] || colours.sage;
  doc = ensureDoc(jsPDF, doc, { format: 'a4', orientation: 'portrait' });
  const { W, H } = size(doc);
  background(doc, paper.cream);
  fillColour(doc, c.fill);
  doc.rect(0, 0, 6, H, 'F');
  // fold marks at thirds
  for (const y of [H / 3, (2 * H) / 3]) { rule(doc, 8, y, 14, y, paper.line, 0.2); rule(doc, W - 14, y, W - 8, y, paper.line, 0.2); }
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  textColour(doc, paper.muted);
  if (state.prompt) doc.text(state.prompt, 22, 18, { maxWidth: W - 44 });
  doc.setFontSize(11);
  textColour(doc, paper.ink);
  doc.text('Date', W - 22, 34, { align: 'right' });
  rule(doc, W - 70, 35.5, W - 22, 35.5, paper.line, 0.2);
  doc.setFontSize(14);
  doc.text('Dear', 22, 52);
  rule(doc, 36, 53.5, W - 22, 53.5, paper.line, 0.2);
  for (let y = 70; y < H - 40; y += 8) rule(doc, 22, y, W - 22, y, '#d6cdbd', 0.15);
  doc.setFontSize(12);
  textColour(doc, paper.muted);
  doc.text('With love,', 22, H - 26);
  credit(doc);
  return doc;
}
