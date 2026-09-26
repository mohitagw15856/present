/**
 * The tool registry. The landing page renders these as cards, in this order.
 * `kind`: "web" tools are pages on this site; "external" tools link out (extension, guide).
 */
export const tools = [
  {
    slug: 'table-pact',
    name: 'Table Pact',
    description: 'One timer for the whole table. Phones down; the first to pick up owes a forfeit.',
    kind: 'web',
    accent: 'sage',
  },
  {
    slug: 'one-question',
    name: 'One Question',
    description: 'A single conversation prompt each day, the same one for everyone. Read it aloud.',
    kind: 'web',
    accent: 'blush',
  },
  {
    slug: 'conversation-roulette',
    name: 'Conversation Roulette',
    description: 'Pick a depth, tap for a question, answer out loud. Tracks nothing.',
    kind: 'web',
    accent: 'mist',
  },
  {
    slug: 'phone-parking',
    name: 'Phone Parking Signs',
    description: 'Printable “phones rest here” signs and table cards, as a PDF.',
    kind: 'web',
    accent: 'sand',
  },
  {
    slug: 'noticing-cards',
    name: 'Noticing Cards',
    description: 'A printable deck of attention prompts. Add your own, print with cut lines.',
    kind: 'web',
    accent: 'sage',
  },
  {
    slug: 'walk-and-talk',
    name: 'Walk & Talk',
    description: 'One prompt, then the screen goes dark until the walk is over.',
    kind: 'web',
    accent: 'mist',
  },
  {
    slug: 'presence-ledger',
    name: 'Presence Ledger',
    description: 'Three lines per real conversation. A quiet monthly count. Stays on your device.',
    kind: 'web',
    accent: 'blush',
  },
  {
    slug: 'analog-hour',
    name: 'Analog Hour',
    description: 'Commit to one offline hour a week. Get a calendar file and a card to share.',
    kind: 'web',
    accent: 'sand',
  },
  {
    slug: 'slow-browser',
    name: 'Slow Browser',
    description: 'A browser extension that puts a ten-second breath in front of infinite scroll.',
    kind: 'external',
    href: 'tools/slow-browser',
    accent: 'mist',
  },
  {
    slug: 'grey-mode',
    name: 'Grey Mode Toolkit',
    description: 'Greyscale, scheduled focus and a hidden app grid, for iOS, Android and macOS.',
    kind: 'external',
    href: 'tools/grey-mode',
    accent: 'sage',
  },
];

export const repoUrl = 'https://github.com/mohitagw15856/present';

export function toolHref(tool, base = '/') {
  if (tool.kind === 'external') return `${repoUrl}/tree/main/${tool.href}`;
  return `${base}${tool.slug}/`;
}
