/**
 * Opens one GitHub issue a week with a prompt from the bank and an invitation
 * to improve its wording. Deterministic from the ISO week, so re-runs are idempotent.
 * Needs: gh CLI authenticated (GITHUB_TOKEN in Actions), GITHUB_REPOSITORY.
 */
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const questions = JSON.parse(readFileSync(new URL('../data/questions.json', import.meta.url), 'utf8'));

function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
function isoWeek(d = new Date()) {
  const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const day = t.getUTCDay() || 7;
  t.setUTCDate(t.getUTCDate() + 4 - day);
  const y = t.getUTCFullYear();
  return `${y}-W${String(Math.ceil(((t - Date.UTC(y, 0, 1)) / 86400000 + 1) / 7)).padStart(2, '0')}`;
}

const week = isoWeek();
const q = questions[hash('qotw:' + week) % questions.length];
const title = `Question of the week ${week}: “${q.text}”`;
const label = 'question-of-the-week';
const repo = process.env.GITHUB_REPOSITORY || 'mohitagw15856/present';

const gh = (...args) => execFileSync('gh', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] }).trim();

// Idempotent: skip if this week's issue already exists.
const existing = JSON.parse(gh('issue', 'list', '--repo', repo, '--label', label, '--state', 'all', '--search', `"${week}" in:title`, '--json', 'number,title'));
if (existing.some((i) => i.title.includes(week))) {
  console.log(`Issue for ${week} already exists. Nothing to do.`);
  process.exit(0);
}

try { gh('label', 'create', label, '--repo', repo, '--color', 'c9d8c8', '--description', 'One prompt a week, open for better wording', '--force'); } catch {}

const body = `This week's prompt from \`data/questions.json\` (depth: **${q.depth}**):

> ${q.text}

**Can you make it better?** Shorter, warmer, easier to say out loud, more answerable by a child, a grandparent and a stranger at the same table. Reply with your version. If a suggestion gets a few 👍, someone will open a pull request with it.

No app was harmed in the making of this issue. It was opened by [a GitHub Action](.github/workflows/question-of-the-week.yml) that runs once a week and then goes quiet.`;

console.log(gh('issue', 'create', '--repo', repo, '--title', title, '--label', label, '--body', body));
