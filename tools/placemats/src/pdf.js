import { colours, paper, ensureDoc, size, background, textColour, fillColour, credit } from '@present/shared/pdf';

/** state: { mats: string[][] (four questions each), colour } */
export function drawPlacemats(jsPDF, state, doc) {
  const c = colours[state.colour] || colours.sage;
  for (const qs of state.mats) {
    doc = ensureDoc(jsPDF, doc, { format: 'a4', orientation: 'landscape' });
    const { W, H } = size(doc);
    background(doc, paper.cream);
    fillColour(doc, c.soft);
    doc.circle(W / 2, H / 2, H * 0.27, 'F');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    textColour(doc, c.deep);
    doc.text('plate goes here', W / 2, H / 2 + 2, { align: 'center' });
    doc.setFontSize(15);
    textColour(doc, paper.ink);
    const m = 16, w = W * 0.36;
    const spots = [
      [m, 26, 'left'], [W - m, 26, 'right'],
      [m, H - 34, 'left'], [W - m, H - 34, 'right'],
    ];
    qs.slice(0, 4).forEach((q, i) => {
      const [x, y, align] = spots[i];
      const lines = doc.splitTextToSize(q, w);
      const yy = i >= 2 ? y - (lines.length - 1) * 7 : y;
      doc.text(lines, x, yy, { align, lineHeightFactor: 1.35 });
    });
    credit(doc);
  }
  return doc;
}
