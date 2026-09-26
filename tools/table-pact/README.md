# Table Pact

One large timer for a group at a table. One person opens the page, picks a duration and gets a QR code. Others scan it and see the same countdown. If a phone is picked up (the tab loses focus, or the screen rotates), that person is marked as having broken the pact. At the end, a short summary and a playful forfeit.

## How it works without a server

The room is the URL. It carries a short code, the start time and the duration, so every phone that scans the code shows the same timer from its own clock. Each phone scores itself and keeps that score in its own `localStorage`, so a break survives the tab being backgrounded (which is exactly what a break is). Phones on the same device (or several tabs) also see each other through `BroadcastChannel`; across devices, the pact is on the honour system, and the page says so.

- The first sixty seconds are a grace period for scanning and settling in.
- The Screen Wake Lock API keeps the display on so a resting phone is not mistaken for a picked-up one.
- Nothing is sent anywhere. Rooms cannot be listed or rejoined from elsewhere.

## Files

- `index.mjs`: Astro integration that injects the route.
- `src/page.astro`: markup and styles.
- `src/pact.js`: the client logic (room, timer, detection, summary).
