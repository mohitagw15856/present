/**
 * Shared helpers for every printable. Pure: no DOM, no data imports, so the
 * same code runs in the browser (jsPDF loaded on demand) and in Node (print pack).
 */
export const paper = { cream: '#fbf8f2', ink: '#2b2823', muted: '#7a736a', line: '#b3aca1', white: '#ffffff' };

/* Light-mode palette values from tokens.css, fixed for print. */
export const colours = {
  sage: { name: 'Sage', fill: '#c9d8c8', soft: '#e3ebe2', deep: '#5b7460' },
  blush: { name: 'Dusty pink', fill: '#ebcaca', soft: '#f5e4e4', deep: '#8f5c5f' },
  mist: { name: 'Pale blue', fill: '#c9d8e4', soft: '#e4ecf2', deep: '#557084' },
  sand: { name: 'Sand', fill: '#efe0c8', soft: '#f5efe4', deep: '#8a6f45' },
};

export const PAPER = {
  a4: { format: 'a4', w: 210, h: 297 },
  a3: { format: 'a3', w: 297, h: 420 },
  a5: { format: 'a5', w: 148, h: 210 },
  letter: { format: 'letter', w: 215.9, h: 279.4 },
};

export function rgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/**
 * Start a page. With an existing doc, appends a page (used by the print pack);
 * without one, creates a new document.
 */
export function ensureDoc(jsPDF, doc, { format = 'a4', orientation = 'portrait' } = {}) {
  if (doc) {
    doc.addPage(format, orientation);
    return doc;
  }
  return new jsPDF({ unit: 'mm', format, orientation });
}

export function size(doc) {
  return { W: doc.internal.pageSize.getWidth(), H: doc.internal.pageSize.getHeight() };
}

export function background(doc, hex) {
  const { W, H } = size(doc);
  doc.setFillColor(...rgb(hex));
  doc.rect(0, 0, W, H, 'F');
}

export function fitSize(doc, text, maxWidth, max, min) {
  let s = max;
  doc.setFontSize(s);
  while (s > min && doc.getTextWidth(text) > maxWidth) {
    s -= 1;
    doc.setFontSize(s);
  }
  return s;
}

/** Centred wrapped text. Returns the y after the last line. */
export function centred(doc, text, cx, y, maxWidth, lineHeight = 1.3) {
  const lines = doc.splitTextToSize(text, maxWidth);
  const lh = (doc.getFontSize() / 72) * 25.4 * lineHeight;
  lines.forEach((ln, i) => doc.text(ln, cx, y + i * lh, { align: 'center' }));
  return y + lines.length * lh;
}

export function textColour(doc, hex) { doc.setTextColor(...rgb(hex)); }
export function fillColour(doc, hex) { doc.setFillColor(...rgb(hex)); }

export function dashed(doc, x1, y1, x2, y2, hex = paper.line) {
  doc.setDrawColor(...rgb(hex));
  doc.setLineWidth(0.15);
  doc.setLineDashPattern([1.5, 1.5], 0);
  doc.line(x1, y1, x2, y2);
  doc.setLineDashPattern([], 0);
}

export function rule(doc, x1, y1, x2, y2, hex = paper.line, width = 0.25) {
  doc.setDrawColor(...rgb(hex));
  doc.setLineWidth(width);
  doc.line(x1, y1, x2, y2);
}

/** The resting-phone mark used across printables. r = circle radius in mm. */
export function restingPhone(doc, cx, cy, r, colour) {
  fillColour(doc, colour.fill);
  doc.circle(cx, cy, r, 'F');
  fillColour(doc, colour.deep);
  doc.roundedRect(cx - r * 0.56, cy + r * 0.16, r * 1.12, r * 0.32, r * 0.08, r * 0.08, 'F');
  fillColour(doc, paper.cream);
  doc.roundedRect(cx - r * 0.46, cy + r * 0.22, r * 0.92, r * 0.2, r * 0.05, r * 0.05, 'F');
}

/** Small footer credit, bottom centre. */
export function credit(doc, text = 'present · mohitagw15856.github.io/present') {
  const { W, H } = size(doc);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  textColour(doc, paper.muted);
  doc.text(text, W / 2, H - 7, { align: 'center' });
}
