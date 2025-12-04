# Issue: Missing screenshots directory for PWA manifest

**Labels:** `enhancement`, `pwa`, `documentation`, `priority: low`

## Problem

The PWA manifest (`manifest.json`) references screenshot images that don't exist:

```json
"screenshots": [
  {
    "src": "/opticsTextbook/screenshots/desktop-screenshot.png",
    "sizes": "1280x720",
    "type": "image/png",
    "form_factor": "wide"
  },
  {
    "src": "/opticsTextbook/screenshots/mobile-screenshot.png",
    "sizes": "750x1334",
    "type": "image/png",
    "form_factor": "narrow"
  }
]
```

## Impact

**Severity:** Low
**User Impact:** Affects PWA installation experience

Screenshots are optional but recommended for PWA manifests. They:
- Appear in PWA installation dialogs on some platforms
- Help users preview the app before installing
- Improve discoverability in app stores (if submitted)

## Current Status

- ✅ PWA installs and functions correctly without screenshots
- ❌ Installation dialogs may appear less polished
- ❌ Cannot submit to app stores without screenshots

## Solution

**Option 1 (Recommended):** Generate and add screenshots
1. Create `screenshots/` directory
2. Capture desktop screenshot (1280x720 or larger)
   - Show textbook homepage or table of contents
   - Use production site: https://veillette.github.io/opticsTextbook/
3. Capture mobile screenshot (750x1334 or larger)
   - Show responsive mobile view
4. Add to git repository
5. Update build process to copy screenshots to `_build/html/`

**Option 2:** Remove screenshots from manifest
- Remove entire `screenshots` array from manifest.json
- Simpler but loses installation preview benefit

## Recommended Screenshot Content

**Desktop (1280x720):**
- Homepage showing full table of contents
- Clear title and navigation visible
- Professional appearance

**Mobile (750x1334):**
- Single chapter view with readable text
- Mobile navigation visible
- Demonstrates responsive design

## Files Affected

- `manifest.json` (lines 102-115)
- New directory: `screenshots/` (to be created)
- `scripts/setup-pwa.js` (may need update to copy screenshots)

## Related

- PWA_SETUP.md
- Comprehensive review document
