# One Question

One conversation prompt per day, in very large type, meant to be read aloud. The prompt is chosen deterministically from the local date, so everyone who opens the page on the same day sees the same one.

- “Another” is allowed three times a day. The sequence is deterministic too, so a table that presses it together stays together. The count is kept in `localStorage` and resets at midnight.
- Prompts live in [`data/questions.json`](../../data/questions.json) with a `depth` of `light`, `real` or `deep`. The bank ships with 150 original prompts.
- No history, no favourites, no sharing. Read it, put the phone down, talk.
