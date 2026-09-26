import { paper, ensureDoc, size, background, textColour, dashed, rule, credit } from '@present/shared/pdf';

/** Four answer sheets on one A4 page, ten lines each. */
export function drawAnswerSheets(jsPDF, state, doc) {
  doc = ensureDoc(jsPDF, doc, { format: 'a4', orientation: 'portrait' });
  const { W, H } = size(doc);
  background(doc, paper.cream);
  dashed(doc, W / 2, 6, W / 2, H - 6); dashed(doc, 6, H / 2, W - 6, H / 2);
  for (let i = 0; i < 4; i++) {
    const x = (i % 2) * (W / 2) + 14, y = Math.floor(i / 2) * (H / 2) + 16;
    doc.setFont('helvetica', 'bold'); doc.setFontSize(13); textColour(doc, paper.ink);
    doc.text('Table Quiz · answer sheet', x, y);
    doc.setFont('helvetica', 'normal'); doc.setFontSize(8.5); textColour(doc, paper.muted);
    doc.text('Write a name for each question. Swap with a neighbour for the reveal.', x, y + 6);
    for (let n = 1; n <= 10; n++) {
      const yy = y + 14 + n * 10.5;
      textColour(doc, paper.muted); doc.setFontSize(9); doc.text(String(n), x, yy - 1);
      rule(doc, x + 6, yy, x + W / 2 - 28, yy, paper.line, 0.15);
    }
  }
  credit(doc);
  return doc;
}
