# present

Small, no-account, no-tracking web tools that help people put their phones down and be with the people around them.

> **Working title.** Three better names to consider: **Tableside** (where the phone goes), **Eyes Up** (what the tools ask of you), **Hearth** (the thing we gather around). Open an issue if you have a fourth.

## What it is

A monorepo of ten tiny tools that share one principle: **every tool must reduce time on screen, not add to it.**

- No accounts, no backend, no analytics, no cookies.
- No feeds, no notifications, no streaks, no dark patterns.
- If a tool needs a phone at all, it needs it for seconds.
- Everything is static, works offline once loaded, and any memory lives in your own `localStorage`.

The full design principles are in [`docs/principles.md`](docs/principles.md). Read them before proposing a tool.

## The tools

| # | Tool | What it does | Where |
|---|------|--------------|-------|
| 1 | **Table Pact** | One large timer for the whole table. Join by QR code. Picking up your phone marks you as having broken the pact; the end screen suggests a forfeit. | [`tools/table-pact`](tools/table-pact) |
| 2 | **One Question** | One conversation prompt per day, chosen from the date so everyone sees the same one. Big type, read aloud. Three “another”s a day, no more. | [`tools/one-question`](tools/one-question) |
| 3 | **Conversation Roulette** | Pick a depth, tap for a question, answer aloud, tap for the next. Tracks nothing. | [`tools/conversation-roulette`](tools/conversation-roulette) |
| 4 | **Phone Parking Signs** | Printable “phones rest here” signs and table cards. Six templates, editable wording, palette colours, PDF download. | [`tools/phone-parking`](tools/phone-parking) |
| 5 | **Noticing Cards** | A printable deck of 60 attention prompts. Shuffle, add your own, export A4 or Letter with cut lines. | [`tools/noticing-cards`](tools/noticing-cards) |
| 6 | **Walk & Talk** | Set a duration and a partner, receive one prompt, then the screen goes dark. One vibration at halfway. | [`tools/walk-and-talk`](tools/walk-and-talk) |
| 7 | **Presence Ledger** | A journal with exactly three fields per entry. A monthly count, the people who appeared most, Markdown export. Local only. | [`tools/presence-ledger`](tools/presence-ledger) |
| 8 | **Analog Hour** | Commit to one recurring offline hour a week. Get an `.ics` file and a shareable image card. | [`tools/analog-hour`](tools/analog-hour) |
| 9 | **Slow Browser** | A Manifest V3 extension (Chrome and Firefox) that puts a ten-second breathing pause before infinite-scroll sites you choose. | [`tools/slow-browser`](tools/slow-browser) |
| 10 | **Grey Mode Toolkit** | A documented collection of iOS Shortcuts, Android settings and macOS scripts for greyscale, scheduled focus and a hidden app grid. | [`tools/grey-mode`](tools/grey-mode) |

The landing page and the philosophy page live in [`site/`](site). The shared design tokens, layout and tool registry live in [`packages/shared/`](packages/shared).

## Run locally

Requires Node 20+ and [pnpm](https://pnpm.io).

```sh
pnpm install
pnpm dev          # http://localhost:4321
pnpm build        # static output in site/dist, including the service worker
pnpm preview      # serve the built site
```

The browser extension builds separately:

```sh
pnpm build:extension     # tools/slow-browser/dist/{chrome,firefox}
```

## Deploy

**GitHub Pages (automatic).** The workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds and deploys on every push to `main`. In the repository settings, set Pages → Source to “GitHub Actions”. The site is built with `BASE_PATH=/<repo-name>/`; for a custom domain, set a repository variable `BASE_PATH` to `/` and `SITE_URL` to your domain.

**GitHub Pages (one command).**

```sh
pnpm deploy:github
```

**Cloudflare Pages (one command).**

```sh
pnpm deploy:cloudflare     # needs `wrangler login` once
```

Or connect the repository in the Cloudflare dashboard with build command `pnpm build` and output directory `site/dist`.

## Contribute a question or a card

Both banks are plain JSON at the repository root:

- [`data/questions.json`](data/questions.json): each entry has `text` and `depth` (`light`, `real` or `deep`). Used by One Question, Conversation Roulette and Walk & Talk.
- [`data/noticing-cards.json`](data/noticing-cards.json): each entry has `text` and an optional `hint`.

Open a pull request that adds entries. Keep them original, short enough to read aloud, and answerable by anyone at a table. Full guidance in [`CONTRIBUTING.md`](CONTRIBUTING.md).

## Layout

```
present/
├── site/               landing page, philosophy page, service-worker integration
├── packages/shared/    design tokens (tokens.css), Layout.astro, tool registry
├── tools/<name>/       one folder per tool; web tools are Astro integrations that inject a route
├── data/               question bank and card deck
├── docs/principles.md  what a tool must pass before it belongs here
└── .github/workflows/  build and deploy to GitHub Pages
```

## Licence

[MIT](LICENSE).
