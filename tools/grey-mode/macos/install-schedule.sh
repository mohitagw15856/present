#!/bin/sh
# Install (or remove) the two launchd agents that turn greyscale on in the
# evening and off in the morning. Edits the plists to point at greyscale.sh.
#
# usage: install-schedule.sh [--remove]
set -eu
here="$(cd "$(dirname "$0")" && pwd)"
agents="$HOME/Library/LaunchAgents"
mkdir -p "$agents"

for when in evening morning; do
  label="com.present.greyscale-$when"
  target="$agents/$label.plist"
  if [ "${1:-}" = "--remove" ]; then
    launchctl bootout "gui/$(id -u)" "$target" 2>/dev/null || true
    rm -f "$target"
    echo "removed $label"
  else
    sed "s|__SCRIPT__|$here/greyscale.sh|" "$here/$label.plist" > "$target"
    launchctl bootout "gui/$(id -u)" "$target" 2>/dev/null || true
    launchctl bootstrap "gui/$(id -u)" "$target"
    echo "installed $label"
  fi
done

[ "${1:-}" = "--remove" ] || echo "Greyscale turns on at 21:00 and off at 08:00. Edit the Hour values in the plists to change that."
