/* Slow Browser — background (MV3). Intercepts top-level navigations to listed sites
   and sends them through pause.html first. Nothing is logged or sent anywhere. */
// Chrome runs this as a service worker (importScripts); Firefox lists shared.js in the manifest.
if (typeof importScripts === 'function') importScripts('shared.js');

const allowed = new Map(); // `${tabId}|${site}` -> expiry ms (memory fallback)

async function getAllowance(key) {
  try {
    if (chrome.storage.session) {
      const v = await chrome.storage.session.get(key);
      return v[key] || 0;
    }
  } catch {}
  return allowed.get(key) || 0;
}
async function setAllowance(key, expiry) {
  allowed.set(key, expiry);
  try { if (chrome.storage.session) await chrome.storage.session.set({ [key]: expiry }); } catch {}
}

chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
  if (details.frameId !== 0) return;
  let url;
  try { url = new URL(details.url); } catch { return; }
  if (!/^https?:$/.test(url.protocol)) return;

  const { sites } = await SB.getSettings();
  const site = SB.matchSite(url.hostname, sites);
  if (!site) return;

  const key = `${details.tabId}|${site}`;
  if ((await getAllowance(key)) > Date.now()) return;

  const pause = chrome.runtime.getURL('pause.html') + '?to=' + encodeURIComponent(details.url);
  try { await chrome.tabs.update(details.tabId, { url: pause }); } catch {}
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg?.type === 'allow' && sender.tab) {
    (async () => {
      const { sites, minutes } = await SB.getSettings();
      let site = null;
      try { site = SB.matchSite(new URL(msg.url).hostname, sites); } catch {}
      if (site) await setAllowance(`${sender.tab.id}|${site}`, Date.now() + minutes * 60_000);
      sendResponse({ ok: true });
    })();
    return true;
  }
  if (msg?.type === 'close' && sender.tab) {
    chrome.tabs.remove(sender.tab.id);
  }
});

chrome.action.onClicked.addListener(() => chrome.runtime.openOptionsPage());
chrome.tabs.onRemoved.addListener((tabId) => {
  for (const k of [...allowed.keys()]) if (k.startsWith(tabId + '|')) allowed.delete(k);
});
