import { colours, paper, ensureDoc, size, background, textColour, fillColour, dashed, restingPhone, credit } from '@present/shared/pdf';

export function drawLabels(jsPDF, state, doc) {
  const c = colours[state.colour] || colours.mist;
  doc = ensureDoc(jsPDF, doc, { format: 'a4', orientation: 'portrait' });
  const { W, H } = size(doc);
  background(doc, paper.cream);
  // Station label: full width strip
  const m = 14;
  fillColour(doc, c.fill);
  doc.roundedRect(m, m, W - 2 * m, 70, 6, 6, 'F');
  restingPhone(doc, m + 32, m + 35, 20, { fill: paper.cream, deep: c.deep });
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(30);
  textColour(doc, paper.ink);
  doc.text('Phones sleep here', m + 62, m + 32);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(14);
  textColour(doc, c.deep);
  doc.text(`${state.station} · every night · cables stay here`, m + 62, m + 46);
  dashed(doc, 4, m + 78, W - 4, m + 78);
  // Personal labels: 2 columns
  const names = state.names.length ? state.names : ['', '', '', ''];
  const cols = 2, top = m + 86, lw = (W - 2 * m) / cols, lh = 30;
  names.forEach((n, i) => {
    const x = m + (i % cols) * lw, y = top + Math.floor(i / cols) * lh;
    fillColour(doc, c.soft);
    doc.roundedRect(x + 3, y + 3, lw - 6, lh - 6, 4, 4, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    textColour(doc, paper.ink);
    doc.text(n ? `${n}’s spot` : '____________’s spot', x + 12, y + 16);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    textColour(doc, paper.muted);
    doc.text('Plug in. Walk away.', x + 12, y + 23);
  });
  for (let i = 0; i <= cols; i++) dashed(doc, m + i * lw, top, m + i * lw, top + Math.ceil(names.length / cols) * lh);
  for (let r = 0; r <= Math.ceil(names.length / cols); r++) dashed(doc, 4, top + r * lh, W - 4, top + r * lh);
  credit(doc);
  return doc;
}
