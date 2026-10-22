# Family Mode & OriginOS Control Center

An end-to-end, high-fidelity clone of the **Family Mode** experience and **OriginOS Quick Settings Control Center** built with OLED pitch-black styling, custom controls, and interactive touch/gesture drawer navigation.

## 📱 Screens & Architecture

1. **Screen 1 • Family Mode - Intro** (`/screens/screen-1-family-mode-intro/`)
   - Onboarding introduction, hero line art, key benefits, and Get Started action.
2. **Screen 2 • Settings - OriginOS** (`/screens/screen-2-settings-family-mode/`)
   - Authentic OriginOS system settings with Hemchand user profile, grouped rounded cards, and electric blue icons.
3. **Screen 3 • Set a Duration** (`/screens/screen-3-family-mode-set-duration/`)
   - Routine hours picker (6:00 PM - 9:00 PM), weekday recurrence chips, and duration options.
4. **Screen 4 • Allow Selected Contacts** (`/screens/screen-4-family-mode-allow-contacts/`)
   - Selective contact groups (Family, Close Friends, Starred Contacts, Work) with square checkboxes.
5. **Screen 5 • Message Behaviour** (`/screens/screen-5-family-mode-message-behaviour/`)
   - Rules for incoming texts (Mark as undelivered, Auto-reply, Deliver silently) with interactive textarea.
6. **Screen 6 • Caller Status** (`/screens/screen-5b-family-mode-caller-status/`)
   - Interactive wireframe smartphone mockup previewing incoming caller status and voicemail fallback toggles.
7. **Screen 7 • Activating Family Mode** (`/screens/screen-6-family-mode-activating/`)
   - Animated SVG status ring, family house vector art, and dynamic configuration checklist.
8. **Screen 8 • Active Summary** (`/screens/screen-7-family-mode-active-summary/`)
   - Verified active state confirmation, comprehensive settings summary card, and edit actions.
9. **Screen 9 • Control Center - Quick Settings** (`/screens/screen-8-control-center-quick-settings/`)
   - OriginOS 4-column quick toggles grid, dual vertical interactive volume and brightness sliders, Wi-Fi widget, media player, and active Family Mode toggle.

## ⚡ Interactions & Gestures

- **Pull-Down Drawer**: Swipe down or drag from the top of any screen to open the Control Center drawer.
- **Cross-Screen Navigation**: Complete end-to-end forward and backward flow between all steps.
- **OLED Minimal Dark Design**: Unified pitch-black canvas (`#000000` / `#121316`) with electric blue accents (`#5390F5` / `#7CAEFF`).
- **Clean Scrollbar-Free UI**: Custom suppression of all native browser scrollbars for an authentic mobile look.

## 🚀 Running Locally

```bash
node server.js
```
Open [http://localhost:3000](http://localhost:3000) to view the project overview and all screens.
