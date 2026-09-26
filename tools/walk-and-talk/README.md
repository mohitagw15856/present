# Walk & Talk

Set a duration and your walking partner's name, receive one prompt, then the screen goes dark with a single “End walk” button.

- One vibration at the halfway point (Vibration API, where the device supports it; iOS does not).
- The Screen Wake Lock API keeps the page alive so the halfway buzz can fire. If the page was in the background at halfway, it buzzes once when it returns.
- At the end, an optional one-line note is saved to `localStorage`. Past notes are listed, collapsed, on the start screen; the list is capped at twelve.
- The prompt comes from the `light` and `real` depths of the shared question bank.
