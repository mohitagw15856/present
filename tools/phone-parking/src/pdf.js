import { colours, paper } from './templates.js';

/* ---------- PDF ---------- */
function hexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** Draws the sign or table card. Pure: give it the jsPDF constructor and the state, get a document back. */
export function drawSign(jsPDF, state) {
  const c = colours[state.colour];
  const doc =
    state.format === 'sign'
      ? new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' })
      : new jsPDF({ unit: 'mm', format: 'a4', orientation: 'landscape' });
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();

  if (state.format === 'sign') {
    doc.setFillColor(...hexToRgb(paper.cream));
    doc.rect(0, 0, W, H, 'F');
    // Illustration: a resting phone on a soft circle.
    const cx = W / 2,
      cy = H * 0.34,
      r = W * 0.19;
    doc.setFillColor(...hexToRgb(c.fill));
    doc.circle(cx, cy, r, 'F');
    doc.setFillColor(...hexToRgb(c.deep));
    doc.roundedRect(cx - r * 0.56, cy + r * 0.16, r * 1.12, r * 0.32, 3, 3, 'F');
    doc.setFillColor(...hexToRgb(paper.cream));
    doc.roundedRect(cx - r * 0.46, cy + r * 0.22, r * 0.92, r * 0.2, 2, 2, 'F');

    doc.setTextColor(...hexToRgb(paper.ink));
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(fitSize(doc, state.heading, W * 0.82, 44, 24));
    doc.text(state.heading, cx, H * 0.6, { align: 'center', maxWidth: W * 0.82 });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(20);
    doc.text(doc.splitTextToSize(state.line, W * 0.74), cx, H * 0.68, { align: 'center', lineHeightFactor: 1.35 });
    doc.setFontSize(12);
    doc.setTextColor(...hexToRgb(paper.muted));
    doc.text(state.small, cx, H * 0.92, { align: 'center', maxWidth: W * 0.8 });
  } else {
    doc.setFillColor(...hexToRgb(c.fill));
    doc.rect(0, 0, W, H, 'F');
    // Fold line
    doc.setDrawColor(...hexToRgb(paper.ink));
    doc.setLineDashPattern([2, 2], 0);
    doc.setLineWidth(0.2);
    doc.line(8, H / 2, W - 8, H / 2);
    doc.setLineDashPattern([], 0);
    // Bottom face (upright)
    face(doc, c, W, H, state, false);
    // Top face (rotated 180° so it reads when folded)
    face(doc, c, W, H, state, true);
  }
  return doc;
}

function face(doc, c, W, H, state, flipped) {
  const cx = W / 2;
  // Position as a fraction of this half's height, measured from the fold outward.
  const at = (frac) => (flipped ? H / 2 - (H / 2) * frac : H / 2 + (H / 2) * frac);
  // jsPDF ignores `align` for rotated text, so centre the upside-down face by hand:
  // at 180° the glyphs run leftwards from the anchor, so anchor at cx + width/2.
  const centred = (str, y) =>
    flipped
      ? doc.text(str, cx + doc.getTextWidth(str) / 2, y, { angle: 180 })
      : doc.text(str, cx, y, { align: 'center' });

  doc.setTextColor(...hexToRgb(paper.ink));
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(fitSize(doc, state.heading, W * 0.8, 40, 22));
  centred(state.heading, at(0.42));
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(16);
  const lines = doc.splitTextToSize(state.line, W * 0.7);
  lines.forEach((ln, i) => centred(ln, at(0.56 + i * 0.09)));
  doc.setFontSize(10);
  doc.setTextColor(...hexToRgb(c.deep));
  centred(state.small, at(0.86));
}

function fitSize(doc, text, maxWidth, max, min) {
  let size = max;
  doc.setFontSize(size);
  while (size > min && doc.getTextWidth(text) > maxWidth) {
    size -= 1;
    doc.setFontSize(size);
  }
  return size;
}
