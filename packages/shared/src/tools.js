/**
 * The tool registry. The landing page renders these as cards, grouped, in this order.
 * `kind`: "web" tools are pages on this site; "external" tools link out (extension, guide, workflow).
 */
export const groups = [
  { id: 'table', name: 'At the table', blurb: 'One phone, in the middle, for a few seconds at a time.' },
  { id: 'out', name: 'Out and about', blurb: 'For walks, benches and evenings.' },
  { id: 'paper', name: 'Paper and print', blurb: 'Print it, cut it, leave the phone behind.' },
  { id: 'home', name: 'For the home', blurb: 'Small rituals that move the phone out of the way.' },
  { id: 'device', name: 'On the device', blurb: 'Make the screen itself less appealing.' },
  { id: 'community', name: 'For venues and contributors', blurb: 'Things that live on a wall or in the repo.' },
];

export const tools = [
  // At the table
  { slug: 'table-pact', name: 'Table Pact', group: 'table', description: 'One timer for the whole table. Phones down; the first to pick up owes a forfeit.', kind: 'web', accent: 'sage' },
  { slug: 'one-question', name: 'One Question', group: 'table', description: 'A single conversation prompt each day, the same one for everyone. Read it aloud.', kind: 'web', accent: 'blush' },
  { slug: 'conversation-roulette', name: 'Conversation Roulette', group: 'table', description: 'Pick a depth, tap for a question, answer out loud. Tracks nothing.', kind: 'web', accent: 'mist' },
  { slug: 'table-quiz', name: 'Table Quiz', group: 'table', description: 'A pub-quiz round about the people at the table. One phone reads, everyone writes.', kind: 'web', accent: 'blush' },
  { slug: 'story-stack', name: 'Story Stack', group: 'table', description: 'One first line. Each person tells the next part, then passes the phone on.', kind: 'web', accent: 'sand' },
  { slug: 'two-truths', name: 'Two Truths', group: 'table', description: 'A topic and the rule. Two truths and a lie each, out loud. Phone stays down.', kind: 'web', accent: 'mist' },
  { slug: 'toast', name: 'Toast Generator', group: 'table', description: 'A name, an occasion, one opening line. The rest of the toast is yours.', kind: 'web', accent: 'sage' },
  { slug: 'silent-minute', name: 'Silent Minute', group: 'table', description: 'Tap once. Sixty blank seconds together. Then one word.', kind: 'web', accent: 'sand' },
  { slug: 'pass-the-parcel', name: 'Pass the Parcel', group: 'table', description: 'A face-down prompt you may only read after handing the phone to your left.', kind: 'web', accent: 'blush' },

  // Out and about
  { slug: 'walk-and-talk', name: 'Walk & Talk', group: 'out', description: 'One prompt, then the screen goes dark until the walk is over.', kind: 'web', accent: 'mist' },
  { slug: 'bench', name: 'Bench', group: 'out', description: 'Sit somewhere. The screen goes dark. At the end: what did you see?', kind: 'web', accent: 'sage' },
  { slug: 'direction-dice', name: 'Direction Dice', group: 'out', description: 'Left, right, straight on, or through the nearest open door. A walk you did not plan.', kind: 'web', accent: 'sand' },
  { slug: 'sky-check', name: 'Sky Check', group: 'out', description: 'Tonight’s sunset and golden hour, worked out on your device. No weather, no alerts.', kind: 'web', accent: 'mist' },
  { slug: 'analog-hour', name: 'Analog Hour', group: 'out', description: 'Commit to one offline hour a week. Get a calendar file and a card to share.', kind: 'web', accent: 'sand' },

  // Paper and print
  { slug: 'phone-parking', name: 'Phone Parking Signs', group: 'paper', description: 'Printable “phones rest here” signs and table cards, as a PDF.', kind: 'web', accent: 'sand' },
  { slug: 'noticing-cards', name: 'Noticing Cards', group: 'paper', description: 'A printable deck of attention prompts. Add your own, print with cut lines.', kind: 'web', accent: 'sage' },
  { slug: 'placemats', name: 'Table Talk Placemats', group: 'paper', description: 'A4 placemats with a question in each corner and dinner in the middle.', kind: 'web', accent: 'blush' },
  { slug: 'fridge-question', name: 'Fridge Question', group: 'paper', description: 'This week’s question in 90-point type, sized for a fridge door.', kind: 'web', accent: 'mist' },
  { slug: 'post-it', name: 'Post It', group: 'paper', description: 'A letter-writing prompt and a one-page template with fold marks. Then a stamp.', kind: 'web', accent: 'sand' },
  { slug: 'coupons', name: 'Screen-Free Coupons', group: 'paper', description: 'Printable tokens for one uninterrupted hour. Cut out, hand over, redeem in person.', kind: 'web', accent: 'blush' },
  { slug: 'guest-book', name: 'Guest Book', group: 'paper', description: 'A printable page for the fridge: who came round this month.', kind: 'web', accent: 'sage' },

  // For the home
  { slug: 'presence-ledger', name: 'Presence Ledger', group: 'home', description: 'Three lines per real conversation. A quiet monthly count. Stays on your device.', kind: 'web', accent: 'blush' },
  { slug: 'house-rules', name: 'House Rules Card', group: 'home', description: 'Pick your household’s phone rules, edit the wording, print an A5 card.', kind: 'web', accent: 'sage' },
  { slug: 'charger-station', name: 'Charger Station Kit', group: 'home', description: 'Five steps to one charging spot outside the bedroom, plus printable labels.', kind: 'web', accent: 'mist' },
  { slug: 'bedtime-handover', name: 'Bedtime Handover', group: 'home', description: 'Two ticks each night: phone is in the kitchen, alarm is on the clock. No history.', kind: 'web', accent: 'sand' },

  // On the device
  { slug: 'slow-browser', name: 'Slow Browser', group: 'device', description: 'A browser extension that puts a ten-second breath in front of infinite scroll.', kind: 'external', href: 'tools/slow-browser', accent: 'mist' },
  { slug: 'grey-mode', name: 'Grey Mode Toolkit', group: 'device', description: 'Greyscale, scheduled focus and a hidden app grid, for iOS, Android and macOS.', kind: 'external', href: 'tools/grey-mode', accent: 'sage' },

  // For venues and contributors
  { slug: 'venue-kit', name: 'Presence Kit for Venues', group: 'community', description: 'How to run a phone-free hour in a café or pub, with an A3 poster to print.', kind: 'web', accent: 'blush' },
  { slug: 'print-pack', name: 'Print Pack', group: 'community', description: 'Every printable in one PDF: signs, cards, placemats, coupons, posters.', kind: 'file', href: 'print-pack.pdf', accent: 'sand' },
  { slug: 'question-of-the-week', name: 'Question of the Week', group: 'community', description: 'A GitHub Action opens one issue a week with a prompt to improve. No app involved.', kind: 'external', href: '.github/workflows/question-of-the-week.yml', accent: 'mist' },
  { slug: 'translations', name: 'Translations', group: 'community', description: 'Question banks in other languages. One JSON file per language, a switch on the page.', kind: 'external', href: 'data', accent: 'sage' },
];

export const repoUrl = 'https://github.com/mohitagw15856/present';

export function toolHref(tool, base = '/') {
  if (tool.kind === 'external') return `${repoUrl}/tree/main/${tool.href}`;
  if (tool.kind === 'file') return `${base}${tool.href}`;
  return `${base}${tool.slug}/`;
}
