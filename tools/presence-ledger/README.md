# Presence Ledger

A journal with exactly three fields per entry: who I was with, what we talked about, one thing I noticed.

- No feed. The month view shows a plain count of real conversations, the people who appeared most, and that month's entries.
- Everything is stored in this browser's `localStorage` under `present:presence-ledger`. Nothing leaves the device.
- Export the whole ledger as Markdown (one heading per month, one bullet list per entry).
- Names are split on commas and “and”, so “Ana and Ben” counts both.
