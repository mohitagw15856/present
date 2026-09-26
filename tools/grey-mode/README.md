# Grey Mode Toolkit

A documented collection of settings, Shortcuts and scripts that make a phone or laptop less appealing to look at: **greyscale**, **scheduled focus**, and a **hidden app grid**. Nothing to install from this repository; it is a guide, plus a few small scripts for macOS.

The idea is old and well tested. Colour is a large part of what makes a screen pull at you. A grey screen shows the same information and asks much less of your attention. Do it, and within a day the phone becomes a tool again.

> Screenshots are placeholders for now. See [Contributing](#contributing) to add real ones.

---

## Contents

- [iOS](#ios) — greyscale toggle, triple-click shortcut, scheduled greyscale, Focus schedules, hiding the app grid
- [Android](#android) — greyscale (Bedtime mode and Developer options), Focus mode, hiding the app grid
- [macOS](#macos) — greyscale via Shortcuts, scheduled greyscale with `launchd`, Focus schedules, a distraction-free Dock
- [Going further](#going-further)
- [Contributing](#contributing)

---

## iOS

### Greyscale, on demand

1. **Settings → Accessibility → Display & Text Size → Colour Filters.**
2. Turn **Colour Filters** on and choose **Greyscale**.

![Placeholder: iOS Colour Filters screen](screenshots/ios-colour-filters.png)

### Triple-click the side button to toggle it

1. **Settings → Accessibility → Accessibility Shortcut.**
2. Tick **Colour Filters** (and nothing else, so the triple-click does not show a menu).
3. Triple-click the side button (or Home button) to switch grey on and off.

This is the single most useful setting in this guide. Grey by default; colour for the thirty seconds you need to see a photo.

![Placeholder: iOS Accessibility Shortcut screen](screenshots/ios-accessibility-shortcut.png)

### Greyscale on a schedule (Shortcuts)

Two automations in the **Shortcuts** app, under **Automation → +**:

| Automation | Trigger | Action |
|---|---|---|
| Evening grey | *Time of Day*, e.g. 21:00, daily | **Set Colour Filters → Turn On** |
| Morning colour | *Time of Day*, e.g. 08:00, daily | **Set Colour Filters → Turn Off** |

Turn **Run Immediately** on (older iOS: turn *Ask Before Running* off) so they run without a prompt.

A sharper variant: trigger **Evening grey** when a chosen app opens (*App → Instagram → Is Opened*). The feed goes grey the moment you reach for it.

![Placeholder: Shortcuts automation with Set Colour Filters](screenshots/ios-shortcuts-colour-filters.png)

### Focus schedules

**Settings → Focus → +** and create a Focus called *Analog* (or use *Do Not Disturb*).

- **Allowed People**: a short list. Everyone else waits.
- **Allowed Apps**: Phone, Messages, Maps, Camera. Nothing with a feed.
- **Set a Schedule**: match your [Analog Hour](../analog-hour) or your evenings.
- **Focus Filters** (iOS 16+): add a **Colour Filters** filter set to *Greyscale*, so the Focus turns the screen grey by itself.
- **Customise Screens**: pick a Home Screen page that has only the allowed apps.

![Placeholder: Focus configuration screen](screenshots/ios-focus.png)

### Hide the app grid

- Long-press an empty area of the Home Screen → tap the page dots → **untick** every page but one. The apps still exist; they are in the App Library and in search (swipe down), which is where you want them: one deliberate step away.
- Keep the one remaining page nearly empty. A clock and a camera is enough.
- **Settings → Home Screen & App Library → Show in App Library only** for new downloads.

![Placeholder: single sparse Home Screen](screenshots/ios-sparse-home.png)

---

## Android

Menus differ between makers; the paths below are for stock Android (Pixel) with notes for Samsung. If yours differs, [contribute](#contributing) the path.

### Greyscale, on demand

**Option A — Bedtime mode (Pixel):**
1. **Settings → Digital Wellbeing & parental controls → Bedtime mode → Customise.**
2. Turn on **Greyscale**. Bedtime mode can then run on a schedule or while charging at night.

**Option B — Developer options (any Android):**
1. **Settings → About phone** → tap **Build number** seven times.
2. **Settings → System → Developer options → Simulate colour space → Monochromacy.**
3. Add the **Colour correction** tile to Quick Settings for a one-tap toggle (**Settings → Accessibility → Colour correction → Colour correction shortcut**).

**Samsung:** **Settings → Accessibility → Visibility enhancements → Colour adjustment → Greyscale**, then add the **Colour adjustment** tile to Quick Settings.

![Placeholder: Android Bedtime mode greyscale](screenshots/android-bedtime-greyscale.png)

### Focus mode, on a schedule

1. **Settings → Digital Wellbeing → Focus mode.**
2. Pick the distracting apps. They are paused and greyed out while Focus is on.
3. **Set a schedule**: days and hours. *Take a break* gives five, fifteen or thirty minutes without turning it off.

Samsung has **Modes and Routines** (Settings → Modes and Routines) which can also set greyscale and silence when a mode starts.

![Placeholder: Android Focus mode](screenshots/android-focus-mode.png)

### Hide the app grid

- Remove every icon from the home screens; apps stay in the drawer. Long-press → **Remove** (not Uninstall).
- Turn off **Add app icons to Home Screen** (long-press the wallpaper → **Home settings**).
- Consider a minimal launcher that shows a short text list instead of a grid. Look for one that is open source, has no ads and needs no network permission.

![Placeholder: Android empty home screen](screenshots/android-sparse-home.png)

---

## macOS

### Greyscale via Shortcuts (recommended)

macOS 13 and later have a **Set Colour Filters** action. Build one Shortcut and drive everything else from it.

1. Open **Shortcuts**, make a new shortcut called **Toggle Greyscale**.
2. Add the action **Set Colour Filters** and set it to **Toggle** (or make two shortcuts, *Greyscale On* and *Greyscale Off*).
3. In the shortcut's details, add a **keyboard shortcut** (for example ⌃⌥⌘G) and tick **Pin in Menu Bar**.

You can now run it from the terminal too:

```sh
shortcuts run "Toggle Greyscale"
```

![Placeholder: Shortcuts Set Colour Filters action on macOS](screenshots/macos-shortcuts-colour-filters.png)

The script [`macos/greyscale.sh`](macos/greyscale.sh) wraps this (`greyscale.sh on|off|toggle`) and tells you what to create if the shortcut does not exist yet.

**Manual toggle:** **System Settings → Accessibility → Display → Colour Filters**, or press ⌥⌘F5 to open the Accessibility Shortcuts panel and tick *Colour Filters*.

### Greyscale on a schedule (`launchd`)

[`macos/com.present.greyscale-evening.plist`](macos/com.present.greyscale-evening.plist) runs *Greyscale On* at 21:00 and [`macos/com.present.greyscale-morning.plist`](macos/com.present.greyscale-morning.plist) runs *Greyscale Off* at 08:00. Install both with:

```sh
sh tools/grey-mode/macos/install-schedule.sh
```

Edit the `Hour` values first if you want different times. Uninstall with `sh tools/grey-mode/macos/install-schedule.sh --remove`.

### Focus schedules

**System Settings → Focus → +** works the same as iOS, and Focus syncs across devices signed in to the same Apple account, so the *Analog* Focus you built on the phone is already here. Add a **Focus Filter** for Colour Filters (greyscale) if your macOS version offers it.

### A distraction-free Dock and Desktop

[`macos/quiet-dock.sh`](macos/quiet-dock.sh) makes the Dock auto-hide with a delay, hides recent apps, and shrinks it; `quiet-dock.sh --restore` puts it back. Pair it with an empty Desktop (**Finder → Settings → General**: untick the items shown on the desktop) and turn **Stage Manager** off.

---

## Going further

- Turn off **all** badges (iOS: Settings → Notifications → each app → Badges; Android: Settings → Notifications → Notification dot on app icon).
- Put the charger somewhere other than the bedroom. The [Phone Parking Signs](../phone-parking) bedroom template is for exactly this.
- Pick a recurring hour with [Analog Hour](../analog-hour) and let the schedules above enforce it.

---

## Contributing

This guide gets better with real setups from real people. To add yours:

1. **Screenshots:** add PNGs to `screenshots/` at a sensible size (about 800px wide for phones, 1200px for desktops). Crop to the relevant part. Name them `platform-what-it-shows.png` and replace the matching placeholder link above. Blur or remove anything personal.
2. **A new path or device:** add a subsection under the right platform (for example *Android → Samsung One UI 7* or *iOS → Older devices*). Give the exact menu path in bold, one step per line.
3. **A new script:** put it in a folder named after the platform (`macos/`, `linux/`, `windows/`), make it idempotent, and give it a `--restore` or `--remove` path. Describe what it changes at the top of the file.
4. **Keep to the principles.** Anything here should make screens *less* appealing or *less* available. Nothing that adds notifications, tracking or a reason to check the phone. See [`docs/principles.md`](../../docs/principles.md).

Open a pull request with a short note on the OS version you tested on. Small additions are very welcome.
