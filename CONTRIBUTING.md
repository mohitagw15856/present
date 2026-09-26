# Contributing

Thank you for wanting to help. This project is small on purpose, so the most useful contributions are usually small too.

## Before anything else

Read [`docs/principles.md`](docs/principles.md). Every change is judged against one question: **does this reduce time on screen?** If a proposal adds a feature, a screen, a notification or a reason to come back, the answer is probably no, however good the idea is.

## Ways to contribute

### Add a question

Edit [`data/questions.json`](data/questions.json). Each entry looks like:

```json
{ "text": "What is something you have changed your mind about this year?", "depth": "real" }
```

- `depth` is `light` (anyone, anywhere, thirty seconds), `real` (needs a little honesty) or `deep` (needs trust and time).
- Write it to be read aloud. Short sentences, no jargon, no “or”.
- It should be answerable by a child, a grandparent and a stranger at the same table.
- It must be your own wording. Do not paste from published card games or lists.

### Add a noticing card

Edit [`data/noticing-cards.json`](data/noticing-cards.json):

```json
{ "text": "Find the oldest object in this room.", "hint": "Ask, if you are not sure." }
```

Cards ask the reader to notice something in the physical room or the people in it. They never ask the reader to use a phone.

### Add a Table Quiz question

Edit [`data/table-quiz.json`](data/table-quiz.json):

```json
{ "text": "Who at this table has broken a bone?" }
```

Every answer must be a person at the table. Keep it safe to ask a mixed group of friends, family and colleagues; the fun is in the owning-up, not the exposure.

### Add a Grey Mode setup

Add a section to [`tools/grey-mode/README.md`](tools/grey-mode/README.md) following its own contributing note. Screenshots are welcome; put them in `tools/grey-mode/screenshots/`.

### Fix a bug or improve a tool

Open an issue first if the change is more than a few lines, so we can check it against the principles together.

### Propose a new tool

Open an issue titled `tool: <name>` and answer the four questions at the end of `docs/principles.md`. New tools live in `tools/<name>/` as an Astro integration (see any existing tool for the shape) and are registered in `packages/shared/src/tools.js` and `site/astro.config.mjs`.

## Development

```sh
pnpm install
pnpm dev
```

Check your change on a phone-sized viewport (about 390px wide) before opening a pull request. Large touch targets, readable at arm's length.

## Commits

We use [Conventional Commits](https://www.conventionalcommits.org):

```
feat(one-question): add twelve deep prompts
fix(table-pact): ignore orientation change during setup
docs: clarify deploy steps
```

Scopes are tool slugs (`table-pact`, `one-question`, …), `site`, `shared`, `data` or `docs`. Add a line to [`CHANGELOG.md`](CHANGELOG.md) under *Unreleased* for anything user-visible.

## Code of conduct

Be kind. See [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md).
