# Principles

Read this before adding or changing a tool. It is short on purpose.

## The one test

> **Does this reduce time on screen?**

Every tool, feature and pull request has to pass it. Not “is it useful”, not “is it delightful”, not “would people like it”. If a change means someone looks at a phone for longer than they would have without it, it does not belong here, however good it is.

Some consequences of the test:

- A tool that needs the phone should need it for **seconds, not minutes**. Set something up, then put the phone down.
- A tool that can be **printed** or **spoken aloud** is better than one that stays on screen.
- A tool that **ends** is better than one that continues. Timers end. Decks run out. Walks finish.
- A tool that **forgets** is better than one that remembers. Where memory is genuinely useful (a journal), it is local, plain, and shown only when asked.

## The eight rules

1. **No accounts.** Nothing asks who you are.
2. **No backend, no analytics, no cookies.** The site is static files. Nothing is sent anywhere. The only persistence is `localStorage`, and only where the tool cannot work without it.
3. **No feeds.** Nothing scrolls forever. Lists are short and bounded.
4. **No notifications.** Nothing ever calls you back. The single exception is one vibration at the halfway point of a walk you started deliberately, and it never leaves the page.
5. **No streaks, scores or comparisons.** No “7 days in a row”. No leaderboards. A plain count, once, when you ask, is the limit.
6. **No dark patterns.** No countdown urgency, no guilt copy, no confirm-shaming, no “are you sure you want to leave?”.
7. **Works offline.** Once loaded, every tool works with the network off.
8. **Restraint over features.** When in doubt, leave it out. The product is what is *not* here.

## Design language

- Scandinavian and calm: muted pastels (sage, dusty pink, pale blue) on warm cream. Dark mode is candlelight, not a terminal.
- One typeface (Inter). Generous whitespace. Large touch targets (44px minimum, most much larger).
- Readable from across a table: prompts and timers use very large type.
- Nothing high-contrast, nothing animated for attention, nothing that looks like a dopamine app.
- All colours come from `packages/shared/src/tokens.css`. Do not introduce new ones in a tool.

## Proposing a new tool

Open an issue titled `tool: <name>` and answer these four questions:

1. **What does someone do with the phone, and for how long?** (Should be measured in seconds.)
2. **What happens off the screen because of it?** (A conversation, a walk, a printed sign, a shared silence.)
3. **What does it remember, and where?** (Ideally nothing. If something, `localStorage`, and why.)
4. **What did you leave out?** (Every good proposal has a list.)

A tool is accepted when a maintainer can answer “yes” to the one test without hesitating.
