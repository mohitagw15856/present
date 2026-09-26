# Noticing Cards

A printable deck of attention prompts (“Find the oldest object in this room”, “Listen for the quietest sound”). Print it, cut it, leave it on the table.

- 60 original cards in [`data/noticing-cards.json`](../../data/noticing-cards.json); each has `text` and an optional `hint`.
- Shuffle a preview of nine, add your own cards (kept in this browser's `localStorage`), and export a print-ready PDF.
- A4 or US Letter, nine poker-sized cards (63 × 88 mm) per page, with dashed cut lines and crop marks.
- The PDF is drawn on the device with jsPDF; drawing lives in `src/pdf.js` so it can be rendered headlessly.
