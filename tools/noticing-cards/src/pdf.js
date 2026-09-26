import { ensureDoc } from '@present/shared/pdf';

/* Card geometry, in millimetres. Poker size, 3 × 3 per page. */
export const CARD_W = 63;
export const CARD_H = 88;
export const COLS = 3;
export const ROWS = 3;

const PAPER = {
  a4: { format: 'a4', w: 210, h: 297 },
  letter: { format: 'letter', w: 215.9, h: 279.4 },
};

const ink = [43, 40, 35];
const muted = [122, 115, 106];
const line = [179, 172, 161];
const sage = [134, 160, 135];

/**
 * Draw every card onto pages of nine with cut lines. Pure: takes the jsPDF
 * constructor, the card list and 'a4' | 'letter'; returns the document.
 */
export function drawDeck(jsPDF, cards, paperId = 'a4', doc) {
  const paper = PAPER[paperId] || PAPER.a4;
  doc = ensureDoc(jsPDF, doc, { format: paper.format, orientation: 'portrait' });
  const gridW = CARD_W * COLS;
  const gridH = CARD_H * ROWS;
  const x0 = (paper.w - gridW) / 2;
  const y0 = (paper.h - gridH) / 2;
  const perPage = COLS * ROWS;

  for (let p = 0; p < Math.ceil(cards.length / perPage); p++) {
    if (p > 0) doc.addPage(paper.format, 'portrait');
    cutLines(doc, paper, x0, y0, gridW, gridH);
    const slice = cards.slice(p * perPage, (p + 1) * perPage);
    slice.forEach((card, i) => {
      const cx = x0 + (i % COLS) * CARD_W;
      const cy = y0 + Math.floor(i / COLS) * CARD_H;
      drawCard(doc, card, cx, cy);
    });
  }
  return doc;
}

function cutLines(doc, paper, x0, y0, gridW, gridH) {
  doc.setDrawColor(...line);
  doc.setLineWidth(0.15);
  doc.setLineDashPattern([1.5, 1.5], 0);
  for (let c = 0; c <= COLS; c++) {
    const x = x0 + c * CARD_W;
    doc.line(x, 4, x, paper.h - 4);
  }
  for (let r = 0; r <= ROWS; r++) {
    const y = y0 + r * CARD_H;
    doc.line(4, y, paper.w - 4, y);
  }
  doc.setLineDashPattern([], 0);
  // Crop marks at the four outer corners, solid.
  doc.setLineWidth(0.25);
  const m = 3;
  for (const [x, y, dx, dy] of [
    [x0, y0, -1, -1],
    [x0 + gridW, y0, 1, -1],
    [x0, y0 + gridH, -1, 1],
    [x0 + gridW, y0 + gridH, 1, 1],
  ]) {
    doc.line(x, y + dy * 1.5, x, y + dy * (1.5 + m));
    doc.line(x + dx * 1.5, y, x + dx * (1.5 + m), y);
  }
}

function drawCard(doc, card, x, y) {
  const pad = 6;
  // Small mark in the corner: a soft dot, so the cards read as a set.
  doc.setFillColor(...sage);
  doc.circle(x + pad + 1.2, y + pad + 1.2, 1.2, 'F');
  doc.setTextColor(...muted);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.text('NOTICE', x + pad + 4.5, y + pad + 2.1, { charSpace: 0.4 });

  // Main text, vertically centred in the card.
  doc.setTextColor(...ink);
  doc.setFont('helvetica', 'normal');
  let size = 12;
  let lines;
  do {
    doc.setFontSize(size);
    lines = doc.splitTextToSize(card.text, CARD_W - pad * 2);
    if (lines.length * size * 0.42 <= CARD_H * 0.5) break;
    size -= 0.5;
  } while (size > 8);
  const lineH = size * 0.42; // mm per line at this size (approx. 1.2 leading)
  const blockH = lines.length * lineH;
  const startY = y + CARD_H / 2 - blockH / 2 + lineH * 0.35 - (card.hint ? 3 : 0);
  lines.forEach((ln, i) => doc.text(ln, x + pad, startY + i * lineH));

  if (card.hint) {
    doc.setTextColor(...muted);
    doc.setFontSize(8);
    const hintLines = doc.splitTextToSize(card.hint, CARD_W - pad * 2);
    hintLines.forEach((ln, i) => doc.text(ln, x + pad, y + CARD_H - pad - (hintLines.length - 1 - i) * 3.6));
  }
}
