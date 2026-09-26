import { colours, paper, ensureDoc, size, background, textColour, fillColour, dashed, credit } from '@present/shared/pdf';

export const COUPONS = [
  'One uninterrupted hour',
  'A walk, phones left at home',
  'One evening without screens',
  'A meal cooked together, no recipes online',
  'A whole breakfast of eye contact',
  'One board game, start to finish',
  'A Sunday morning without the news',
  'A lift, a chat, and no podcast',
];

export function drawCoupons(jsPDF, state, doc) {
  const c = colours[state.colour] || colours.blush;
  doc = ensureDoc(jsPDF, doc, { format: 'a4', orientation: 'portrait' });
  const { W, H } = size(doc);
  background(doc, paper.cream);
  const cols = 2, rows = 4, m = 14, gap = 0;
  const cw = (W - 2 * m) / cols, ch = (H - 2 * m - 10) / rows;
  for (let i = 0; i <= cols; i++) dashed(doc, m + i * cw, 4, m + i * cw, H - 4);
  for (let i = 0; i <= rows; i++) dashed(doc, 4, m + i * ch, W - 4, m + i * ch);
  COUPONS.forEach((text, i) => {
    const x = m + (i % cols) * cw, y = m + Math.floor(i / cols) * ch;
    fillColour(doc, c.soft);
    doc.roundedRect(x + 5, y + 5, cw - 10, ch - 10, 4, 4, 'F');
    fillColour(doc, c.fill);
    doc.rect(x + 5, y + 5, 4, ch - 10, 'F');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    textColour(doc, c.deep);
    doc.text('SCREEN-FREE COUPON', x + 14, y + 13, { charSpace: 0.6 });
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(15);
    textColour(doc, paper.ink);
    doc.text(doc.splitTextToSize(text, cw - 26), x + 14, y + 25, { lineHeightFactor: 1.25 });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    textColour(doc, paper.muted);
    const from = state.from ? `From ${state.from}` : 'From ____________';
    const to = state.to ? `to ${state.to}` : 'to ____________';
    doc.text(`${from} ${to}`, x + 14, y + ch - 17);
    doc.text('Redeem in person. No expiry.', x + 14, y + ch - 11);
  });
  credit(doc);
  return doc;
}
