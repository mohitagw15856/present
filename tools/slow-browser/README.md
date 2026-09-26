# Slow Browser

A Manifest V3 browser extension for Chrome and Firefox. Before any site on your list opens, you get a full-page ten-second breathing pause and a gentle prompt: *“Is there someone you could talk to instead?”* Then a “Continue” button, and a “Close this tab” button.

- Configurable site list (defaults to the usual infinite-scroll suspects). Matches the domain and its subdomains.
- After you continue, that site is not paused again in that tab for a configurable number of minutes (default 10).
- Permissions: `webNavigation` (to see where a tab is going) and `storage` (your list). No host permissions, no content scripts, no network requests. Nothing is logged. Nothing leaves your device.

## Build

```sh
pnpm install            # once, at the repo root
pnpm build:extension    # writes tools/slow-browser/dist/chrome and dist/firefox
```

The build has no dependencies: it copies `src/`, writes the right `manifest.json` per browser, and generates the icons as PNGs.

## Install

**Chrome, Edge, Brave, Arc (unpacked):**

1. Open `chrome://extensions`.
2. Turn on *Developer mode* (top right).
3. *Load unpacked* → choose `tools/slow-browser/dist/chrome`.

**Firefox (temporary, for testing):**

1. Open `about:debugging#/runtime/this-firefox`.
2. *Load Temporary Add-on…* → choose `tools/slow-browser/dist/firefox/manifest.json`.

Temporary add-ons are removed when Firefox restarts. For a permanent install, zip `dist/firefox` and [sign it through AMO](https://extensionworkshop.com/documentation/publish/) as an unlisted add-on, or use Firefox Developer Edition with `xpinstall.signatures.required` set to `false`.

**Settings:** click the toolbar icon, or open the extension's options page. Edit the site list (one domain per line) and the “do not ask again” window.

## Files

```
src/
├── manifest.chrome.json   service_worker background
├── manifest.firefox.json  event-page background + gecko id
├── background.js          intercepts navigations, tracks per-tab allowances
├── pause.html/css/js      the breathing pause
├── options.html/js        the site list
└── shared.js              defaults and matching helpers
build.mjs                  copies src/, writes manifests, generates icons
```

## Why an extension and not a website

Everything else in this repository is a static page. This one has to be an extension because a page cannot stand in front of another page. It follows the same rules: no accounts, no tracking, no data leaving the device, and it exists to make you spend *less* time in the browser.
