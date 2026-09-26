#!/bin/sh
# Turn macOS greyscale (Colour Filters) on, off, or toggle it.
# Relies on Shortcuts named "Greyscale On", "Greyscale Off" and "Toggle Greyscale",
# each containing a single "Set Colour Filters" action. See ../README.md#macos.
#
# usage: greyscale.sh on|off|toggle
set -eu

case "${1:-toggle}" in
  on)     name="Greyscale On" ;;
  off)    name="Greyscale Off" ;;
  toggle) name="Toggle Greyscale" ;;
  *) echo "usage: $0 on|off|toggle" >&2; exit 2 ;;
esac

if ! command -v shortcuts >/dev/null 2>&1; then
  echo "The 'shortcuts' command needs macOS 12 or later." >&2
  exit 1
fi

if ! shortcuts list | grep -Fxq "$name"; then
  cat >&2 <<MSG
No shortcut called "$name" yet. Create it once:
  1. Open Shortcuts and make a new shortcut named "$name".
  2. Add the action "Set Colour Filters" and set it to ${1:-toggle}.
Then run this script again.
MSG
  exit 1
fi

shortcuts run "$name"
