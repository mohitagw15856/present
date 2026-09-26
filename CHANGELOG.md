# Changelog

All notable changes to this project are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses [Semantic Versioning](https://semver.org).

## [Unreleased]

### Changed

- README rewritten with a lighter voice; title capitalised.
- README gains an animated SVG banner and footer, hand-drawn badges, a mermaid review flowchart, five recorded GIFs and collapsible explainers (docs/assets).

### Added

- Twenty more tools, grouped on the landing page: Story Stack, Two Truths, Toast Generator, Silent Minute, Pass the Parcel, Bench, Direction Dice, Sky Check, Post It, Table Talk Placemats, Guest Book, Screen-Free Coupons, Fridge Question, Charger Station Kit, Bedtime Handover, House Rules Card, Presence Kit for Venues, Print Pack (build-time combined PDF), Question of the Week (GitHub Action), Translations (Spanish bank + language switch).
- Shared PDF helpers (`@present/shared/pdf`) and a lazy jsPDF download helper; every printable draws onto an existing document so the print pack can stitch them.
- Monorepo scaffold: pnpm workspaces, Astro site, shared design tokens, service worker, GitHub Pages workflow.
- Landing page with manifesto and tool cards; philosophy page.
- Table Pact: shared table timer with QR join, pick-up detection, forfeit summary.
- One Question: deterministic daily prompt with three “another”s; 150-prompt bank in data/questions.json.
- Conversation Roulette: depth picker, shuffled no-repeat deck, nothing stored.
- Phone Parking Signs: six templates, editable wording, palette colours, A4 sign or folded table card PDF.
- Noticing Cards: 60-card deck in data/noticing-cards.json, shuffle preview, own cards, A4/Letter PDF with cut lines.
- Walk & Talk: one prompt, dark screen, halfway vibration, optional one-line note.
- Presence Ledger: three-field journal, monthly count and most-seen people, Markdown export, local only.
- Analog Hour: weekly offline hour as .ics (TZID, weekly RRULE) and a shareable PNG card.
- Table Quiz: pub-quiz round about the people at the table; 80 questions in data/table-quiz.json; printable answer sheets.
- Slow Browser: MV3 extension (Chrome + Firefox) with a ten-second breathing pause before listed sites; dependency-free build.
- Grey Mode Toolkit: iOS, Android and macOS guide for greyscale, scheduled focus and a hidden app grid, with macOS scripts and launchd schedule.
