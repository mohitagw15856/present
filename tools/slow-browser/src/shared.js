/* Shared between background, pause and options. Plain script (no modules) so it loads everywhere. */
const SB = {
  DEFAULT_SITES: [
    'x.com',
    'twitter.com',
    'instagram.com',
    'tiktok.com',
    'facebook.com',
    'reddit.com',
    'youtube.com',
    'threads.net',
    'linkedin.com',
    'pinterest.com',
  ],
  DEFAULT_MINUTES: 10,
  PAUSE_SECONDS: 10,

  async getSettings() {
    const s = await chrome.storage.local.get({ sites: null, minutes: null });
    return {
      sites: Array.isArray(s.sites) ? s.sites : SB.DEFAULT_SITES,
      minutes: typeof s.minutes === 'number' ? s.minutes : SB.DEFAULT_MINUTES,
    };
  },

  /** Normalise a user-typed line to a bare hostname, or null. */
  normaliseSite(line) {
    let s = line.trim().toLowerCase();
    if (!s || s.startsWith('#')) return null;
    s = s.replace(/^https?:\/\//, '').replace(/^www\./, '').split(/[/?#]/)[0];
    return /^[a-z0-9.-]+\.[a-z]{2,}$/.test(s) ? s : null;
  },

  /** Does this hostname match a listed site (exact or subdomain)? Returns the matched site or null. */
  matchSite(hostname, sites) {
    const h = hostname.toLowerCase().replace(/^www\./, '');
    for (const site of sites) if (h === site || h.endsWith('.' + site)) return site;
    return null;
  },
};
