<p align="center">
  <img src="docs/assets/hero.svg" alt="Present: tools for putting the phone down" width="100%">
</p>

<p align="center">
  <img src="docs/assets/badge-tools.svg" alt="11 tools">
  <img src="docs/assets/badge-trackers.svg" alt="0 trackers">
  <img src="docs/assets/badge-accounts.svg" alt="0 accounts">
  <img src="docs/assets/badge-notifications.svg" alt="0 notifications">
  <img src="docs/assets/badge-phone-time.svg" alt="phone time: seconds">
  <img src="docs/assets/badge-licence.svg" alt="MIT licence">
</p>

<p align="center">
  <a href="https://mohitagw15856.github.io/present/"><strong>Try it</strong></a> ·
  <a href="#the-thirty-one">The tools</a> ·
  <a href="#a-quick-tour">Tour</a> ·
  <a href="#run-it-locally">Run it</a> ·
  <a href="#deploy-it">Deploy it</a> ·
  <a href="#add-a-question-a-card-or-a-quiz-line">Contribute</a>
</p>

# Present

**Small web tools for putting the phone down.** No accounts, no tracking, no feeds, no streaks, and absolutely nothing that buzzes.

> Working title. The three we like better: **Tableside** (where the phone goes), **Eyes Up** (what the tools ask of you), **Hearth** (the thing we gather around). Got a fourth? Open an issue. We will discuss it in person if at all possible.

---

## The problem, in one paragraph

You are at dinner. Someone tells a story. Halfway through, three people glance at a screen. Nobody remembers the ending. Multiply by every dinner. That is the problem. Most apps that promise to fix it want you to open them more often, which is a bit like a diet plan delivered as a cake.

## The fix, in one rule

**Every tool here must reduce time on screen.** Not "be useful". Not "be delightful". Reduce it. If using a tool means looking at a phone longer than not using it, the tool gets deleted, however clever it is. This has already killed some good ideas and we are at peace with that.

Here is the whole review process for a new idea:

```mermaid
flowchart LR
    A([An idea]) --> B{Does it reduce<br/>time on screen?}
    B -- No --> X([Bin, kindly])
    B -- Yes --> C{Accounts, feeds,<br/>streaks or pings?}
    C -- Any --> X
    C -- None --> D{Phone needed for<br/>seconds, not minutes?}
    D -- No --> E[Can it be printed<br/>or said aloud instead?]
    E -- No --> X
    E -- Yes --> F
    D -- Yes --> F([Build it. Then stop.])
    style A fill:#e3ebe2,stroke:#86a087,color:#2b2823
    style F fill:#e3ebe2,stroke:#86a087,color:#2b2823
    style X fill:#f5e4e4,stroke:#c98d8f,color:#2b2823
    style B fill:#fbf8f2,stroke:#ddd1bc,color:#2b2823
    style C fill:#fbf8f2,stroke:#ddd1bc,color:#2b2823
    style D fill:#fbf8f2,stroke:#ddd1bc,color:#2b2823
    style E fill:#fbf8f2,stroke:#ddd1bc,color:#2b2823
```

Everything else follows from that rule:

- 🔒 **No accounts, no backend, no analytics, no cookies.** It is a folder of static files. There is nothing to log in to and nowhere for your data to go.
- 🙅 **No feeds, no notifications, no streaks.** The three mechanics that turn a tool into a habit. We use none of them.
- ⏱️ **Seconds, not minutes.** If a tool needs a phone at all, it needs it briefly, then face down.
- 🖨️ **Paper beats pixels.** Where something can be printed or said out loud, it is.
- ✈️ **Works offline** once loaded, thanks to a small service worker. Your own device is the only place anything is remembered, in plain `localStorage` you can clear whenever you like.

The long version is in [`docs/principles.md`](docs/principles.md). Read it before proposing a tool. It is short and slightly stern.

<details>
<summary><strong>Things we said no to</strong> (a small graveyard)</summary>
<br>

| Idea | Why it died |
|------|-------------|
| A leaderboard for Table Pact | Turns dinner into a game you play on your phone. The forfeit is the whole scoreboard. |
| "Streak" of consecutive daily questions | A streak is a leash. Miss one and you feel bad; keep one and you check the app to protect it. |
| Sharing your One Question to social media | Puts the phone in your hand for a minute, and puts a feed in front of you on the way. |
| Push notification when Analog Hour starts | The calendar already does this, once, and it is your calendar. We are not going to buzz you about not buzzing you. |
| Cloud sync for the Presence Ledger | Needs an account. The Markdown export is the sync. |
| A trivia bank for Table Quiz | Facts need fact-checking and invite people to look things up. Questions about the people present need neither. |

</details>

## The thirty-one

Eleven became thirty-one after someone said "build all of them". Every one still passes the rule. They are grouped by where you use them.

### At the table

| Tool | What happens | Phone time | Folder |
|------|--------------|-----------|--------|
| ⏳ **Table Pact** | One big timer for the whole table. Scan to join. Pick up your phone and it notices. The loser gets a forfeit. | ~20 seconds to start | [`tools/table-pact`](tools/table-pact) |
| 💬 **One Question** | One conversation prompt a day, the same for everyone on Earth. Big type. Read it aloud. Three "another"s, then it politely refuses. Now in English and Spanish. | ~10 seconds | [`tools/one-question`](tools/one-question) |
| 🎲 **Conversation Roulette** | Pick a depth (light, real, deep). Tap. Answer out loud. Tap. Remembers nothing about you, on purpose. | a tap per question | [`tools/conversation-roulette`](tools/conversation-roulette) |
| 🍺 **Table Quiz** | A pub quiz where every answer is someone at the table. One phone reads, everyone writes, then the reveal and the stories. | the quizmaster's, briefly | [`tools/table-quiz`](tools/table-quiz) |
| 📖 **Story Stack** | One first line ("The last time I got properly lost was…"). Each person tells the next part and passes the phone left. | a pass per person | [`tools/story-stack`](tools/story-stack) |
| 🤥 **Two Truths** | A topic and the rule. Two truths and a lie each, out loud. The phone stays face down after the first tap. | one tap | [`tools/two-truths`](tools/two-truths) |
| 🥂 **Toast Generator** | A name, an occasion, one opening line. The rest of the toast is yours. Eight occasions, all deliberately unfinished. | ~10 seconds | [`tools/toast`](tools/toast) |
| 🤫 **Silent Minute** | Tap once. Sixty blank seconds together. Then one word: "Now." | one tap | [`tools/silent-minute`](tools/silent-minute) |
| 🎁 **Pass the Parcel** | A face-down prompt you may only read after handing the phone to the person on your left. The phone moves, not the thumbs. | seconds per person | [`tools/pass-the-parcel`](tools/pass-the-parcel) |

### Out and about

| Tool | What happens | Phone time | Folder |
|------|--------------|-----------|--------|
| 🚶 **Walk & Talk** | Name your walking partner, pick a duration, get one prompt. Then the screen goes dark. One buzz at halfway. | ~15 seconds, then pocket | [`tools/walk-and-talk`](tools/walk-and-talk) |
| 🪑 **Bench** | Sit somewhere. The screen goes dark. At the end it asks one thing: what did you see? | ~10 seconds, then pocket | [`tools/bench`](tools/bench) |
| 🎯 **Direction Dice** | Left, right, straight on, or through the nearest open door. A walk you did not plan. Maps stay closed. | a roll per corner | [`tools/direction-dice`](tools/direction-dice) |
| 🌇 **Sky Check** | Tonight's golden hour, sunset and dusk, computed on your device from the NOAA equations. No weather service, no reminders. | ~10 seconds | [`tools/sky-check`](tools/sky-check) |
| 📅 **Analog Hour** | Commit to one offline hour a week. Get a calendar file and a card that says "I'm offline Sundays 4 to 5pm". | ~30 seconds, once | [`tools/analog-hour`](tools/analog-hour) |

### Paper and print

| Tool | What happens | Phone time | Folder |
|------|--------------|-----------|--------|
| 🪧 **Phone Parking Signs** | Printable "phones rest here" signs and fold-in-half table cards. Six templates from café to grandparents' house. | ~1 minute, once | [`tools/phone-parking`](tools/phone-parking) |
| 🃏 **Noticing Cards** | A 60-card deck of attention prompts. Add your own, print with cut lines, get scissors. | ~1 minute, once | [`tools/noticing-cards`](tools/noticing-cards) |
| 🍽️ **Table Talk Placemats** | A4 placemats with a question in each corner and the plate in the middle. Print one per seat. | ~1 minute, once | [`tools/placemats`](tools/placemats) |
| 🧲 **Fridge Question** | This week's question in the biggest type that fits an A4 page. Print Sunday, argue all week. | ~30 seconds, weekly | [`tools/fridge-question`](tools/fridge-question) |
| ✉️ **Post It** | A letter-writing prompt and a one-page template with ruled lines and fold marks. Then a stamp. | ~30 seconds, then a pen | [`tools/post-it`](tools/post-it) |
| 🎟️ **Screen-Free Coupons** | Eight printable promises: "One uninterrupted hour", "A walk, phones left at home". Cut out, hand over, redeem in person. | ~30 seconds, once | [`tools/coupons`](tools/coupons) |
| 📒 **Guest Book** | A printable page for the fridge: who came round this month, one dated line per visit. The analogue Presence Ledger. | ~30 seconds, monthly | [`tools/guest-book`](tools/guest-book) |

### For the home

| Tool | What happens | Phone time | Folder |
|------|--------------|-----------|--------|
| 📓 **Presence Ledger** | A journal with exactly three fields: who, what, one thing you noticed. A monthly count. Markdown export. No feed, ever. | ~30 seconds per entry | [`tools/presence-ledger`](tools/presence-ledger) |
| 📜 **House Rules Card** | Ten household phone rules to tick and reword, printed as an A5 card. Presets for grandparents, classrooms and flatshares. | ~2 minutes, once | [`tools/house-rules`](tools/house-rules) |
| 🔌 **Charger Station Kit** | Five steps to one charging spot outside the bedroom, plus a printable label sheet with a spot per person. | ~2 minutes, once | [`tools/charger-station`](tools/charger-station) |
| 🌙 **Bedtime Handover** | Two ticks a night: the phone is in the kitchen, the alarm is on the clock. Then "Good night." No history. | ~5 seconds | [`tools/bedtime-handover`](tools/bedtime-handover) |

### On the device

| Tool | What happens | Phone time | Folder |
|------|--------------|-----------|--------|
| 🫁 **Slow Browser** | A browser extension (Chrome and Firefox) that puts a ten-second breath in front of the infinite scroll. | ten seconds fewer than before | [`tools/slow-browser`](tools/slow-browser) |
| 🩶 **Grey Mode Toolkit** | Not code. A guide to greyscale, scheduled focus and a hidden app grid on iOS, Android and macOS. | less, forever | [`tools/grey-mode`](tools/grey-mode) |

### For venues and contributors

| Tool | What happens | Phone time | Folder |
|------|--------------|-----------|--------|
| ☕ **Presence Kit for Venues** | Six steps for running a phone-free hour in a café or pub, and an A3 poster generator with your name and time on it. | ~1 minute, once | [`tools/venue-kit`](tools/venue-kit) |
| 🖨️ **Print Pack** | Every printable in one PDF, generated at build time: signs, deck, placemats, letter page, guest book, coupons, labels, rules cards, poster, quiz sheets. | one download | [`print-pack.pdf`](https://mohitagw15856.github.io/present/print-pack.pdf) |
| 🗓️ **Question of the Week** | A GitHub Action opens one issue every Monday with a prompt from the bank and asks for better wording. No app involved. | none | [`.github/workflows`](.github/workflows/question-of-the-week.yml) |
| 🌍 **Translations** | One JSON file per language in `data/`, a switch on One Question and Roulette. English and Spanish so far. | none | [`data/`](data) |

The landing page and the philosophy page live in [`site/`](site). Design tokens, layout and the tool registry live in [`packages/shared/`](packages/shared).

## A quick tour

Recorded on a phone-sized viewport in dark mode, which we call candlelight and which is not a terminal.

<table>
  <tr>
    <td align="center"><img src="docs/assets/landing.gif" width="220" alt="The landing page: a short manifesto, then the tools"><br><sub><strong>Landing</strong> · manifesto, then cards</sub></td>
    <td align="center"><img src="docs/assets/table-pact.gif" width="220" alt="Table Pact: start, QR code, timer, a pick-up, the forfeit"><br><sub><strong>Table Pact</strong> · start, scan, slip, forfeit</sub></td>
    <td align="center"><img src="docs/assets/one-question.gif" width="220" alt="One Question: today's prompt and three anothers"><br><sub><strong>One Question</strong> · three "another"s, then no</sub></td>
  </tr>
  <tr>
    <td align="center"><img src="docs/assets/walk-and-talk.gif" width="220" alt="Walk and Talk: name a partner, get a prompt, screen goes dark, one line at the end"><br><sub><strong>Walk &amp; Talk</strong> · prompt, dark, one line</sub></td>
    <td align="center"><img src="docs/assets/table-quiz.gif" width="220" alt="Table Quiz: deal a round, read questions, reveal"><br><sub><strong>Table Quiz</strong> · ask, pens down, reveal</sub></td>
    <td align="center">
      <br><br>
      <sub>The others are for paper:<br>
      <a href="tools/phone-parking">signs</a>, <a href="tools/noticing-cards">cards</a>,<br>
      <a href="tools/analog-hour">a calendar file</a>, <a href="tools/presence-ledger">a Markdown export</a>.<br><br>
      That is rather the point.</sub>
    </td>
  </tr>
</table>

<details>
<summary><strong>How does Table Pact sync without a server?</strong></summary>
<br>

It mostly doesn't, and that is fine. The room *is* the URL: it carries a short code, the start time and the duration, so every phone that scans the QR code shows the same countdown from its own clock. Each phone scores itself and keeps that score in its own `localStorage`, which is exactly the thing that survives a tab being backgrounded (also known as "picking up your phone"). Tabs on the same device also find each other through `BroadcastChannel`. Across devices, the pact is on the honour system, and the page says so. If someone's phone says they kept it and the table disagrees, the table is right.

</details>

<details>
<summary><strong>How does One Question show everyone the same prompt?</strong></summary>
<br>

A tiny hash of today's date picks the index. Press "another" and it hashes the date plus a step number, so a table pressing it together stays together. Three steps a day, counted in `localStorage`, reset at midnight. No server needed to agree on what day it is.

</details>

## Looks

Scandinavian and calm. Muted sage, dusty pink and pale blue on warm cream. One typeface (Inter). Lots of air. Nothing flashes or bounces. Dark mode is candlelight, not a terminal. Every button is big enough to hit with a phone held at arm's length, because that is how far away we hope it stays.

The animations in this README are the most excitement you will get from this project. The site itself has one breathing circle and otherwise sits very still.

## Run it locally

You need Node 20+ and [pnpm](https://pnpm.io).

```sh
pnpm install
pnpm dev          # http://localhost:4321
pnpm build        # static site in site/dist, service worker included
pnpm preview      # serve what you just built
```

The browser extension is its own thing:

```sh
pnpm build:extension     # tools/slow-browser/dist/{chrome,firefox}
```

Then load `dist/chrome` unpacked at `chrome://extensions`, or `dist/firefox/manifest.json` as a temporary add-on at `about:debugging`. Details in [the extension's README](tools/slow-browser/README.md).

## Deploy it

**GitHub Pages, automatically.** Push to `main` and [the workflow](.github/workflows/deploy.yml) builds and deploys. In the repository settings, set Pages → Source to "GitHub Actions" once. The site builds with `BASE_PATH=/<repo-name>/`; for a custom domain, set repository variables `BASE_PATH` to `/` and `SITE_URL` to your domain.

**GitHub Pages, one command.**

```sh
pnpm deploy:github
```

**Cloudflare Pages, one command.**

```sh
pnpm deploy:cloudflare     # after `wrangler login`, once
```

Or connect the repo in the Cloudflare dashboard: build command `pnpm build`, output directory `site/dist`.

## Add a question, a card, a quiz line or a language

The easiest and best way to contribute. Three plain JSON files at the repo root:

- [`data/questions.json`](data/questions.json), 150 conversation prompts with a `depth` of `light`, `real` or `deep`. Used by One Question, Conversation Roulette and Walk & Talk.
- [`data/noticing-cards.json`](data/noticing-cards.json), 60 attention prompts with `text` and an optional `hint`.
- [`data/table-quiz.json`](data/table-quiz.json), 80 "who at this table…" questions.
- [`data/story-lines.json`](data/story-lines.json), [`data/two-truths-topics.json`](data/two-truths-topics.json) and [`data/letter-prompts.json`](data/letter-prompts.json), for Story Stack, Two Truths and Post It.
- **Translations:** copy `data/questions.json` to `data/questions.<code>.json` (`fr`, `de`, `pt`…), translate the 150 `text` fields and keep the order, and the language appears in the switch on the next build. Spanish is done; it was machine-assisted and native speakers are warmly invited to fix it.

House style: original wording, short enough to read aloud, answerable by a child, a grandparent and a stranger at the same table. Open a pull request. Full guidance, including how to propose a whole new tool, in [`CONTRIBUTING.md`](CONTRIBUTING.md).

## What is where

```
present/
├── site/               landing page, philosophy page, service-worker integration
├── packages/shared/    design tokens (tokens.css), Layout.astro, tool registry
├── tools/<name>/       one folder per tool; web tools are Astro integrations that inject a route
├── data/               question banks (en, es), card deck, quiz, story lines, topics, letter prompts
├── scripts/            question-of-the-week.mjs (runs in the weekly Action)
├── docs/               principles.md, and the GIFs and SVGs you just scrolled past
└── .github/workflows/  build and deploy to GitHub Pages
```

Astro 5, Tailwind 4, vanilla JS, pnpm workspaces. No React, because nothing here needed it. The badges above are hand-drawn SVGs in `docs/assets/`, because even the README does not phone home.

## Licence

[MIT](LICENSE). Take it, fork it, print it, put it on a fridge.

<p align="center">
  <img src="docs/assets/footer.svg" alt="Now put the phone down." width="100%">
</p>
