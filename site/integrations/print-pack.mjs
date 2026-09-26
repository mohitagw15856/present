/**
 * After the site builds, draws every printable into one PDF at /print-pack.pdf.
 * Runs before the service-worker integration so the file is precached.
 * Pure draw modules + jsPDF in Node; data read from disk.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const tool = (slug) => import(new URL(`../../tools/${slug}/src/pdf.js`, import.meta.url).href);
const data = async (name) => JSON.parse(await readFile(new URL(`../../data/${name}`, import.meta.url), 'utf8'));

export default function printPack() {
  return {
    name: 'present:print-pack',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const { jsPDF } = await import('jspdf');
        const shared = await import('@present/shared/pdf');
        const [signs, cards, mats, letter, guest, coupons, labels, rules, venue, quiz] = await Promise.all([
          tool('phone-parking'), tool('noticing-cards'), tool('placemats'), tool('post-it'), tool('guest-book'),
          tool('coupons'), tool('charger-station'), tool('house-rules'), tool('venue-kit'), tool('table-quiz'),
        ]);
        const { templates } = await import(new URL('../../tools/phone-parking/src/templates.js', import.meta.url).href);
        const questions = await data('questions.json');
        const deck = await data('noticing-cards.json');

        // Cover
        let doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
        const { W, H } = shared.size(doc);
        shared.background(doc, shared.paper.cream);
        shared.restingPhone(doc, W / 2, H * 0.3, 34, shared.colours.sage);
        doc.setFont('helvetica', 'bold'); doc.setFontSize(34); shared.textColour(doc, shared.paper.ink);
        doc.text('Present · Print Pack', W / 2, H * 0.5, { align: 'center' });
        doc.setFont('helvetica', 'normal'); doc.setFontSize(13); shared.textColour(doc, shared.paper.muted);
        shared.centred(doc, 'Every printable in one file: parking signs, noticing cards, placemats, a letter page, a guest book, coupons, charger labels, house rules, a venue poster and quiz answer sheets. Print what you need. Recycle the rest.', W / 2, H * 0.58, W - 60, 1.45);
        doc.setFontSize(10);
        doc.text('Made on a device, sent nowhere. mohitagw15856.github.io/present', W / 2, H - 20, { align: 'center' });

        for (const t of templates) doc = signs.drawSign(jsPDF, { ...t, format: 'sign' }, doc);
        doc = cards.drawDeck(jsPDF, deck, 'a4', doc);
        const pick = (n) => Array.from({ length: n }, () => questions[Math.floor(Math.random() * questions.length)].text);
        doc = mats.drawPlacemats(jsPDF, { mats: [pick(4), pick(4), pick(4), pick(4)], colour: 'blush' }, doc);
        doc = letter.drawLetter(jsPDF, { prompt: 'Write to someone who does not know how much they helped.', colour: 'sand' }, doc);
        doc = guest.drawGuestBook(jsPDF, { title: '____________________', house: '', colour: 'sage' }, doc);
        doc = coupons.drawCoupons(jsPDF, { from: '', to: '', colour: 'blush' }, doc);
        doc = labels.drawLabels(jsPDF, { station: 'Kitchen', names: ['', '', '', ''], colour: 'mist' }, doc);
        for (const p of Object.keys(rules.PRESETS)) {
          const pr = rules.PRESETS[p];
          doc = rules.drawRules(jsPDF, { house: pr.house, title: pr.title, rules: pr.rules.map((i) => pr.wording?.[i] || rules.RULES[i]), colour: 'sage' }, doc);
        }
        doc = venue.drawPoster(jsPDF, { venue: 'This café', when: 'Tuesdays, 6 to 7pm', colour: 'blush' }, doc);
        doc = quiz.drawAnswerSheets(jsPDF, {}, doc);

        const out = join(fileURLToPath(dir), 'print-pack.pdf');
        await writeFile(out, Buffer.from(doc.output('arraybuffer')));
        logger.info(`print pack written: ${doc.getNumberOfPages()} pages`);
      },
    },
  };
}
