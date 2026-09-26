import en from '../../../data/questions.json';

/* One file per language: data/questions.<code>.json. Add a file and it appears in the switch. */
const files = import.meta.glob('../../../data/questions.*.json', { eager: true });

export const NAMES = { en: 'English', es: 'Español', fr: 'Français', de: 'Deutsch', it: 'Italiano', pt: 'Português', nl: 'Nederlands', sv: 'Svenska', da: 'Dansk', no: 'Norsk', pl: 'Polski', tr: 'Türkçe', hi: 'हिन्दी', zh: '中文', ja: '日本語', ar: 'العربية' };

export const banks = { en };
for (const [path, mod] of Object.entries(files)) {
  const code = path.match(/questions\.([a-z-]+)\.json$/i)?.[1];
  if (code) banks[code] = mod.default;
}
export const languages = Object.keys(banks).sort((a, b) => (a === 'en' ? -1 : b === 'en' ? 1 : a.localeCompare(b)));

const KEY = 'present:lang';
export function getLang() {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved && banks[saved]) return saved;
  } catch {}
  const nav = (typeof navigator !== 'undefined' && navigator.language ? navigator.language : 'en').slice(0, 2).toLowerCase();
  return banks[nav] ? nav : 'en';
}
export function setLang(code) { try { localStorage.setItem(KEY, code); } catch {} }
export function bankFor(code) { return banks[code] || en; }

/** Populate a <select> with the available languages and wire it. Hidden when there is only one. */
export function mountLanguageSwitch(select, onChange) {
  if (!select) return;
  if (languages.length < 2) { select.closest('[data-lang-wrap]')?.setAttribute('hidden', ''); return; }
  select.replaceChildren(...languages.map((c) => { const o = document.createElement('option'); o.value = c; o.textContent = NAMES[c] || c; return o; }));
  select.value = getLang();
  select.addEventListener('change', () => { setLang(select.value); onChange(select.value); });
}
