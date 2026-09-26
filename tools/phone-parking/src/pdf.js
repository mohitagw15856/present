import { colours, paper, rgb, ensureDoc, size, background, fitSize, textColour, restingPhone } from '@present/shared/pdf';

/** Draws the sign or table card. Pure. Pass an existing doc to append a page (print pack). */
export function drawSign(jsPDF, state, doc) {
  const c = colours[state.colour] || colours.sand;
  doc = ensureDoc(jsPDF, doc, { format: 'a4', orientation: state.format === 'sign' ? 'portrait' : 'landscape' });
  const { W, H } = size(doc);

  if (state.format === 'sign') {
    background(doc, paper.cream);
    restingPhone(doc, W / 2, H * 0.34, W * 0.19, c);
    textColour(doc, paper.ink);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(fitSize(doc, state.heading, W * 0.82, 44, 24));
    doc.text(state.heading, W / 2, H * 0.6, { align: 'center', maxWidth: W * 0.82 });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(20);
    doc.text(doc.splitTextToSize(state.line, W * 0.74), W / 2, H * 0.68, { align: 'center', lineHeightFactor: 1.35 });
    doc.setFontSize(12);
    textColour(doc, paper.muted);
    doc.text(state.small, W / 2, H * 0.92, { align: 'center', maxWidth: W * 0.8 });
  } else {
    background(doc, c.fill);
    doc.setDrawColor(...rgb(paper.ink));
    doc.setLineDashPattern([2, 2], 0);
    doc.setLineWidth(0.2);
    doc.line(8, H / 2, W - 8, H / 2);
    doc.setLineDashPattern([], 0);
    face(doc, c, W, H, state, false);
    face(doc, c, W, H, state, true);
  }
  return doc;
}

function face(doc, c, W, H, state, flipped) {
  const cx = W / 2;
  const at = (frac) => (flipped ? H / 2 - (H / 2) * frac : H / 2 + (H / 2) * frac);
  // jsPDF ignores `align` for rotated text, so centre the upside-down face by hand.
  const centred = (str, y) =>
    flipped ? doc.text(str, cx + doc.getTextWidth(str) / 2, y, { angle: 180 }) : doc.text(str, cx, y, { align: 'center' });
  textColour(doc, paper.ink);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(fitSize(doc, state.heading, W * 0.8, 40, 22));
  centred(state.heading, at(0.42));
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(16);
  doc.splitTextToSize(state.line, W * 0.7).forEach((ln, i) => centred(ln, at(0.56 + i * 0.09)));
  doc.setFontSize(10);
  textColour(doc, c.deep);
  centred(state.small, at(0.86));
}
