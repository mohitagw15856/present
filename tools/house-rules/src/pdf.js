import { colours, paper, ensureDoc, size, background, textColour, fillColour, dashed, credit } from '@present/shared/pdf';

export const RULES = [
  'No phones at the table.',
  'Phones sleep in the kitchen, not the bedroom.',
  'Ask before you photograph anyone.',
  'If you are looking something up, say so out loud.',
  'Guests get the wifi password and a place to put their phone.',
  'Television is a thing we watch together, not a thing that is on.',
  'One screen-free evening a week. This week it is ________.',
  'Calls are answered in another room.',
  'The first hour of the day is for people, not feeds.',
  'When someone is talking, the phone goes face down.',
];

export const PRESETS = {
  home: { title: 'House rules', house: 'Our house', rules: [0, 1, 2, 3, 6, 9] },
  grandparents: { title: 'House rules', house: 'Grandparents’ house', rules: [0, 2, 5, 9], wording: { 5: 'We came to see your face, not the top of your head.', 9: 'Stories are better than screens. Ask us for one.' } },
  classroom: { title: 'Room rules', house: 'Room 12', rules: [0, 2, 3, 9], wording: { 0: 'Phones rest in the box by the door.', 3: 'Look it up after the lesson, or ask.', 9: 'When someone is speaking, everyone is listening.' } },
  flatshare: { title: 'Flat rules', house: 'Flat 3', rules: [0, 4, 5, 7], wording: { 5: 'Films are watched together or not at all.' } },
};

export function drawRules(jsPDF, state, doc) {
  const c = colours[state.colour] || colours.sage;
  doc = ensureDoc(jsPDF, doc, { format: 'a4', orientation: 'portrait' });
  const { W, H } = size(doc);
  background(doc, paper.cream);
  // A5 card centred on A4
  const cw = 148, ch = 210, x0 = (W - cw) / 2, y0 = (H - ch) / 2;
  dashed(doc, x0, 6, x0, H - 6); dashed(doc, x0 + cw, 6, x0 + cw, H - 6);
  dashed(doc, 6, y0, W - 6, y0); dashed(doc, 6, y0 + ch, W - 6, y0 + ch);
  fillColour(doc, c.soft);
  doc.rect(x0, y0, cw, ch, 'F');
  fillColour(doc, c.fill);
  doc.rect(x0, y0, cw, 30, 'F');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  textColour(doc, c.deep);
  doc.text(state.title.toUpperCase(), x0 + 12, y0 + 12, { charSpace: 0.8 });
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  textColour(doc, paper.ink);
  doc.text(state.house, x0 + 12, y0 + 23);
  doc.setFont('helvetica', 'normal');
  let y = y0 + 46;
  const rules = state.rules.length ? state.rules : ['Tick at least one rule.'];
  const fontSize = rules.length > 7 ? 10.5 : 12;
  doc.setFontSize(fontSize);
  rules.forEach((r, i) => {
    textColour(doc, c.deep);
    doc.text(String(i + 1), x0 + 12, y);
    textColour(doc, paper.ink);
    const lines = doc.splitTextToSize(r, cw - 34);
    doc.text(lines, x0 + 20, y, { lineHeightFactor: 1.3 });
    y += lines.length * fontSize * 0.46 + 5;
  });
  doc.setFontSize(8.5);
  textColour(doc, paper.muted);
  doc.text('Thank you for being here. Actually here.', x0 + 12, y0 + ch - 10);
  credit(doc);
  return doc;
}
