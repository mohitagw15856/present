import { colours, paper, ensureDoc, size, background, textColour, fillColour, rule, credit } from '@present/shared/pdf';

export function drawGuestBook(jsPDF, state, doc) {
  const c = colours[state.colour] || colours.sage;
  doc = ensureDoc(jsPDF, doc, { format: 'a4', orientation: 'portrait' });
  const { W, H } = size(doc);
  background(doc, paper.cream);
  fillColour(doc, c.fill);
  doc.rect(0, 0, W, 34, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  textColour(doc, paper.ink);
  doc.text('Who came round', 18, 21);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  textColour(doc, c.deep);
  doc.text(`${state.title}${state.house ? ' · ' + state.house : ''}`, W - 18, 21, { align: 'right' });
  const cols = [18, 48, 118];
  const top = 50;
  doc.setFontSize(8.5);
  textColour(doc, paper.muted);
  ['DATE', 'WHO', 'WHAT WE DID'].forEach((h, i) => doc.text(h, cols[i], top, { charSpace: 0.5 }));
  rule(doc, 18, top + 2.5, W - 18, top + 2.5, paper.ink, 0.3);
  const rowH = 13;
  for (let r = 1; r <= 16; r++) {
    const y = top + 2.5 + r * rowH;
    rule(doc, 18, y, W - 18, y, paper.line, 0.15);
  }
  doc.setFontSize(9);
  textColour(doc, paper.muted);
  doc.text('Fill it in with a pen. Keep the old pages in a drawer.', 18, H - 18);
  credit(doc);
  return doc;
}
