#!/bin/sh
# Make the Dock quieter: auto-hide with a delay, no recent apps, smaller icons.
# --restore puts the defaults back. Only touches com.apple.dock preferences.
#
# usage: quiet-dock.sh [--restore]
set -eu

if [ "${1:-}" = "--restore" ]; then
  defaults delete com.apple.dock autohide 2>/dev/null || true
  defaults delete com.apple.dock autohide-delay 2>/dev/null || true
  defaults delete com.apple.dock show-recents 2>/dev/null || true
  defaults delete com.apple.dock tilesize 2>/dev/null || true
  defaults delete com.apple.dock show-process-indicators 2>/dev/null || true
  echo "Dock restored to defaults."
else
  defaults write com.apple.dock autohide -bool true
  defaults write com.apple.dock autohide-delay -float 1.5   # seconds before it slides in
  defaults write com.apple.dock show-recents -bool false
  defaults write com.apple.dock tilesize -int 36
  defaults write com.apple.dock show-process-indicators -bool false
  echo "Dock hidden with a 1.5s delay, recents off, small icons. Run with --restore to undo."
fi
killall Dock
