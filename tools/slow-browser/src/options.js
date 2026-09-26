const sitesEl = document.getElementById('sites');
const minutesEl = document.getElementById('minutes');
const saved = document.getElementById('saved');

async function load() {
  const { sites, minutes } = await SB.getSettings();
  sitesEl.value = sites.join('\n');
  minutesEl.value = String(minutes);
}

document.getElementById('save').addEventListener('click', async () => {
  const sites = [...new Set(sitesEl.value.split('\n').map(SB.normaliseSite).filter(Boolean))];
  const minutes = Math.min(240, Math.max(1, Number(minutesEl.value) || SB.DEFAULT_MINUTES));
  await chrome.storage.local.set({ sites, minutes });
  sitesEl.value = sites.join('\n');
  minutesEl.value = String(minutes);
  saved.textContent = 'Saved.';
  setTimeout(() => (saved.textContent = ''), 2000);
});

document.getElementById('reset').addEventListener('click', async () => {
  await chrome.storage.local.remove(['sites', 'minutes']);
  await load();
  saved.textContent = 'Defaults restored.';
  setTimeout(() => (saved.textContent = ''), 2000);
});

load();
