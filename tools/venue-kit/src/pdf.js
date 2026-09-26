import { colours, paper, ensureDoc, size, background, textColour, fillColour, fitSize, restingPhone, credit } from '@present/shared/pdf';

export function drawPoster(jsPDF, state, doc) {
  const c = colours[state.colour] || colours.blush;
  const format = state.format === 'a4' ? 'a4' : 'a3';
  doc = ensureDoc(jsPDF, doc, { format, orientation: 'portrait' });
  const { W, H } = size(doc);
  const k = W / 297; // scale relative to A3 width
  background(doc, c.soft);
  restingPhone(doc, W / 2, H * 0.26, 52 * k, { fill: c.fill, deep: c.deep });
  doc.setFont('helvetica', 'bold');
  textColour(doc, paper.ink);
  doc.setFontSize(64 * k);
  doc.text('Phone-free hour', W / 2, H * 0.47, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(fitSize(doc, state.when, W * 0.8, 40 * k, 20 * k));
  textColour(doc, c.deep);
  doc.text(state.when, W / 2, H * 0.56, { align: 'center' });
  doc.setFontSize(20 * k);
  textColour(doc, paper.ink);
  const lines = doc.splitTextToSize('Phones go in the middle of the table. Talk to the people at it. Ask us for a parking card, a deck of cards or a quiz sheet.', W * 0.7);
  doc.text(lines, W / 2, H * 0.67, { align: 'center', lineHeightFactor: 1.4 });
  doc.setFontSize(16 * k);
  textColour(doc, c.deep);
  doc.text(state.venue, W / 2, H * 0.88, { align: 'center' });
  fillColour(doc, c.fill);
  doc.rect(0, H - 14 * k, W, 14 * k, 'F');
  credit(doc, 'Nobody will be told off. present · mohitagw15856.github.io/present');
  return doc;
}
