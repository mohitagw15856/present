/* Sunrise/sunset from the NOAA solar equations. Accurate to a minute or two, which is plenty for a walk. */
const KEY = 'present:sky-check:pos';
const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const bind = (n) => $(`[data-bind="${n}"]`);
const show = (v) => $$('[data-view]').forEach((el) => (el.hidden = el.dataset.view !== v));
const rad = (d) => (d * Math.PI) / 180, deg = (r) => (r * 180) / Math.PI;

function solarEvent(date, lat, lng, zenith, rising) {
  // Returns a Date or null (polar day/night). zenith: 90.833 sun, 96 civil dusk, 84 golden hour.
  const n = Math.floor((Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 86400000);
  const lngHour = lng / 15;
  const t = n + ((rising ? 6 : 18) - lngHour) / 24;
  const M = 0.9856 * t - 3.289;
  let L = M + 1.916 * Math.sin(rad(M)) + 0.02 * Math.sin(rad(2 * M)) + 282.634;
  L = ((L % 360) + 360) % 360;
  let RA = deg(Math.atan(0.91764 * Math.tan(rad(L))));
  RA = ((RA % 360) + 360) % 360;
  RA += Math.floor(L / 90) * 90 - Math.floor(RA / 90) * 90;
  RA /= 15;
  const sinDec = 0.39782 * Math.sin(rad(L));
  const cosDec = Math.cos(Math.asin(sinDec));
  const cosH = (Math.cos(rad(zenith)) - sinDec * Math.sin(rad(lat))) / (cosDec * Math.cos(rad(lat)));
  if (cosH > 1 || cosH < -1) return null;
  let H = rising ? 360 - deg(Math.acos(cosH)) : deg(Math.acos(cosH));
  H /= 15;
  const T = H + RA - 0.06571 * t - 6.622;
  let UT = (((T - lngHour) % 24) + 24) % 24;
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  d.setUTCMinutes(Math.round(UT * 60));
  return d;
}
const fmt = (d) => (d ? d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' }) : '—');

function render(pos) {
  const today = new Date();
  const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);
  const sunset = solarEvent(today, pos.lat, pos.lng, 90.833, false);
  const golden = solarEvent(today, pos.lat, pos.lng, 84, false);
  const dusk = solarEvent(today, pos.lat, pos.lng, 96, false);
  const sunrise = solarEvent(tomorrow, pos.lat, pos.lng, 90.833, true);
  bind('sunset').textContent = fmt(sunset); bind('golden').textContent = fmt(golden); bind('dusk').textContent = fmt(dusk); bind('sunrise').textContent = fmt(sunrise);
  bind('where').textContent = `${pos.lat.toFixed(1)}°, ${pos.lng.toFixed(1)}°`;
  const now = Date.now();
  let v;
  if (!sunset) v = 'The sun is not setting where you are today. Go out anyway.';
  else if (now < golden) { const m = Math.round((golden - now) / 60000); v = m > 120 ? `Golden hour starts in about ${Math.round(m / 60)} hours. Plan to be outside for it.` : `Golden hour starts in ${m} minutes. Shoes on.`; }
  else if (now < sunset) v = 'It is golden hour right now. Whatever this is, it can wait.';
  else if (now < dusk) v = 'The sun is down but the sky is still going. There are a few minutes left.';
  else v = `Dark now. Tomorrow starts at ${fmt(sunrise)}.`;
  bind('verdict').textContent = v;
  show('sky');
}
function save(pos) { try { localStorage.setItem(KEY, JSON.stringify(pos)); } catch {} }
const round = (x) => Math.round(x * 10) / 10;

$('[data-action="locate"]').addEventListener('click', () => {
  bind('err').hidden = true;
  if (!navigator.geolocation) { bind('err').textContent = 'No location on this device. Type it in below.'; bind('err').hidden = false; return; }
  navigator.geolocation.getCurrentPosition(
    (p) => { const pos = { lat: round(p.coords.latitude), lng: round(p.coords.longitude) }; save(pos); render(pos); },
    () => { bind('err').textContent = 'Position not shared. Type it in below instead.'; bind('err').hidden = false; },
    { maximumAge: 3600_000, timeout: 10_000 }
  );
});
$('#manual').addEventListener('submit', (e) => { e.preventDefault(); const f = e.currentTarget; const pos = { lat: round(Number(f.lat.value)), lng: round(Number(f.lng.value)) }; save(pos); render(pos); });
$('[data-action="reset"]').addEventListener('click', () => { try { localStorage.removeItem(KEY); } catch {} show('ask'); });

let saved = null; try { saved = JSON.parse(localStorage.getItem(KEY)); } catch {}
if (saved && typeof saved.lat === 'number') render(saved); else show('ask');
export { solarEvent };
