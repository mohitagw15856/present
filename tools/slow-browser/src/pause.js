const PROMPTS = [
  'Is there someone you could talk to instead?',
  'What were you hoping to find here?',
  'Who have you not heard from in a while?',
  'Would a glass of water do the same job?',
  'What would you do with these ten minutes outside?',
  'Is anyone in the room with you right now?',
];

const params = new URLSearchParams(location.search);
const to = params.get('to') || '';
let host = '';
try { host = new URL(to).hostname.replace(/^www\./, ''); } catch {}
if (!/^https?:/.test(to)) {
  document.getElementById('prompt').textContent = 'Nothing to open.';
}

document.getElementById('prompt').textContent = PROMPTS[Math.floor(Math.random() * PROMPTS.length)];
document.getElementById('site').textContent = host ? `On the way to ${host}` : '';

const btn = document.getElementById('continue');
const count = document.getElementById('count');
let left = SB.PAUSE_SECONDS;
count.textContent = String(left);
const tick = setInterval(() => {
  left -= 1;
  count.textContent = String(left);
  if (left <= 0) {
    clearInterval(tick);
    btn.disabled = false;
    btn.textContent = host ? `Continue to ${host}` : 'Continue';
    document.getElementById('hint').textContent = 'Or close the tab. Either is fine.';
  }
}, 1000);

btn.addEventListener('click', async () => {
  if (btn.disabled || !to) return;
  btn.disabled = true;
  try { await chrome.runtime.sendMessage({ type: 'allow', url: to }); } catch {}
  location.replace(to);
});
document.getElementById('close').addEventListener('click', () => {
  chrome.runtime.sendMessage({ type: 'close' });
});
