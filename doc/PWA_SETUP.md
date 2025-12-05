# Progressive Web App (PWA) Setup

This document describes the PWA implementation for the Optics Textbook.

## Overview

The Optics Textbook is now available as a Progressive Web App (PWA), which means:

- **Installable**: Users can install the textbook on their devices (desktop, mobile, tablet)
- **Offline Access**: Content is cached for offline reading
- **App-like Experience**: Runs in standalone mode without browser UI
- **Fast Loading**: Cached resources load quickly
- **Responsive**: Works on all screen sizes and devices

## Features

### Core PWA Features

1. **Web App Manifest** (`pwa/manifest.json`)
   - Defines app name, icons, theme colors, and display settings
   - Enables installation prompts on compatible browsers
   - Provides shortcuts to key sections (Table of Contents, Search)

2. **Service Worker** (`pwa/service-worker.js`)
   - Caches core pages and assets for offline access
   - Implements cache-first strategy with network fallback
   - Automatically updates cached content in the background
   - Provides offline fallback pages
   - Injects keyboard navigation for arrow key page navigation (see below)

3. **App Icons**
   - Multiple sizes (72x72 to 512x512) for different devices
   - Maskable icons for adaptive icon support on Android
   - Apple Touch Icon for iOS devices
   - Favicon for browser tabs

### Installation

Users can install the textbook by:

1. **Desktop Browsers (Chrome, Edge, etc.)**:
   - Click the install icon in the address bar
   - Or use browser menu > "Install Optics Textbook"

2. **Mobile Browsers (Chrome, Safari, etc.)**:
   - Tap "Add to Home Screen" from browser menu
   - App icon appears on home screen

3. **iOS Safari**:
   - Tap Share button
   - Select "Add to Home Screen"

## Development

### Build Process

The PWA setup is integrated into the build process:

```bash
# Full build with PWA setup
npm run build

# Build HTML only (without PWA)
npm run build:no-pwa

# Generate PWA icons only
npm run generate-icons

# Setup PWA files only (requires existing build)
npm run setup-pwa
```

### Scripts

1. **`scripts/generate-pwa-icons.js`**
   - Generates all required icon sizes from the source logo
   - Creates standard and maskable icons
   - Generates Apple Touch Icon and favicons

2. **`scripts/setup-pwa.js`**
   - Copies PWA files to the build directory
   - Injects service worker registration into HTML files
   - Adds PWA meta tags to all pages

### File Structure

```
opticsTextbook/
├── pwa/
│   ├── manifest.json          # Web app manifest
│   ├── service-worker.js      # Service worker for caching
│   └── offline.html           # Offline fallback page
├── icons/                     # Generated PWA icons
│   ├── icon-72x72.png
│   ├── icon-192x192.png
│   ├── icon-512x512.png
│   ├── icon-*-maskable.png
│   ├── apple-touch-icon.png
│   └── favicon-*.png
├── scripts/
│   ├── generate-pwa-icons.js  # Icon generation script
│   └── setup-pwa.js           # PWA setup script
└── _build/html/               # Build output with PWA files
```

## Testing

### Local Testing

1. Build the project:
   ```bash
   npm run build
   ```

2. Serve locally:
   ```bash
   npm run serve
   ```

3. Open in browser: `http://localhost:3000`

4. Test PWA features:
   - Open Chrome DevTools > Application tab
   - Check Manifest section
   - Check Service Workers section
   - Use Lighthouse to audit PWA compliance

### Lighthouse Audit

Run a Lighthouse audit to verify PWA compliance:

1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Select "Progressive Web App" category
4. Run audit

The textbook should score highly on:
- Installability
- PWA optimized
- Content available offline
- Fast and reliable

## Deployment

The PWA is automatically set up during GitHub Actions deployment:

1. Icons are generated from the source logo
2. HTML is built with MyST
3. PWA files are copied to `_build/html`
4. Service worker registration and PWA tags are injected into HTML
5. Everything is deployed to GitHub Pages

## Browser Support

The PWA works on:

- **Desktop**: Chrome, Edge, Opera, Safari 16.4+
- **Mobile**: Chrome, Samsung Internet, Safari (iOS 16.4+)
- **Progressive Enhancement**: Falls back gracefully on unsupported browsers

## Offline Functionality

### Cached Resources

The service worker caches:
- Main pages (chapters, exercises, appendices)
- CSS and JavaScript assets
- Images and fonts
- Manifest and icons

### Cache Strategy

1. **Core Assets**: Cached immediately on installation
2. **Runtime Cache**: Pages cached as they're visited
3. **Stale-While-Revalidate**: Returns cached version immediately, updates in background
4. **Network Fallback**: Shows offline page if content not cached

### Cache Management

- Old caches are automatically cleaned up on service worker updates
- Cache version is incremented when service worker changes
- Users can clear cache through browser settings

## Keyboard Navigation

The service worker injects keyboard navigation functionality into all pages, allowing users to navigate between chapters using arrow keys.

### Usage

- **Right Arrow (→)**: Navigate to the next page/chapter
- **Left Arrow (←)**: Navigate to the previous page/chapter

Navigation is automatically disabled when:
- Focus is in an input field or textarea
- Modifier keys are pressed (Ctrl, Alt, Cmd)

### Why This Workaround Exists

MyST MD currently does not support adding custom client-side JavaScript to sites. While custom CSS is supported via `site.options.style`, there is no equivalent `site.options.scripts` configuration for JavaScript.

This limitation is tracked in: https://github.com/jupyter-book/myst-theme/issues/437

As a workaround, the service worker intercepts HTML responses and injects the keyboard navigation script before the closing `</body>` tag. This approach:

1. Works transparently for all pages
2. Doesn't require modifications to the MyST build process
3. Can be easily removed when MyST adds native script support

### Implementation Details

The keyboard navigation script is defined in `pwa/service-worker.js` as `KEYBOARD_NAV_SCRIPT`. The `injectKeyboardNavigation()` function handles the injection:

1. Checks if the response is HTML (`content-type: text/html`)
2. Reads the HTML content
3. Replaces `</body>` with the script + `</body>`
4. Returns the modified response

### Removing This Workaround

When MyST MD adds native support for custom scripts (via `site.options.scripts` or similar), you should:

1. Remove the `KEYBOARD_NAV_SCRIPT` constant from `pwa/service-worker.js`
2. Remove the `injectKeyboardNavigation()` function
3. Remove the injection call in `networkFirstStrategy()`
4. Add the keyboard navigation script using the native MyST configuration
5. Increment the service worker cache version

## Customization

### Updating Colors

Edit `pwa/manifest.json` to change app colors:

```json
{
  "background_color": "#ffffff",
  "theme_color": "#1e40af"
}
```

### Updating Icons

1. Replace source logo: `img/advanced_optics_logo_white.png`
2. Run: `npm run generate-icons`
3. Rebuild: `npm run build`

### Updating Service Worker

Edit `pwa/service-worker.js` to:
- Change cache strategy
- Add/remove cached resources
- Modify offline behavior

**Important**: Increment `CACHE_NAME` version when making changes.

## Troubleshooting

### PWA Not Installing

1. Ensure HTTPS is enabled (required for service workers)
2. Check `pwa/manifest.json` is accessible
3. Verify icons are correct sizes
4. Use Chrome DevTools > Application > Manifest to debug

### Service Worker Not Registering

1. Check browser console for errors
2. Verify `pwa/service-worker.js` is accessible
3. Ensure HTTPS is enabled
4. Check service worker scope matches site base URL

### Offline Mode Not Working

1. Verify service worker is active (DevTools > Application > Service Workers)
2. Check cache contents (DevTools > Application > Cache Storage)
3. Test by disabling network (DevTools > Network > Offline)

### Update Not Showing

1. Service worker updates on page reload
2. Hard refresh may be needed (Ctrl+Shift+R / Cmd+Shift+R)
3. Unregister service worker in DevTools if stuck

## Resources

- [MDN: Progressive Web Apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [web.dev: PWA Documentation](https://web.dev/progressive-web-apps/)
- [Chrome DevTools: Debug PWAs](https://developer.chrome.com/docs/devtools/progressive-web-apps/)
- [PWA Builder](https://www.pwabuilder.com/)

## Maintenance

### Regular Tasks

1. Test PWA functionality after major updates
2. Run Lighthouse audits periodically
3. Update service worker cache version when content changes significantly
4. Monitor service worker errors in production

### When to Update Service Worker

Update the service worker (`CACHE_NAME` version) when:
- Major content changes
- New chapters added
- Asset structure changes
- Cache strategy needs modification

## Future Enhancements

Potential improvements:

- [x] Keyboard navigation for page navigation (implemented via service worker injection)
- [ ] Background sync for offline form submissions
- [ ] Push notifications for content updates
- [ ] Advanced caching strategies (network-first for certain resources)
- [ ] Offline content downloads for specific chapters
- [ ] Analytics for PWA installations and usage
- [ ] App shortcuts for frequently accessed sections
- [ ] Share target API for sharing content to the app
- [ ] Native MyST script support (replace service worker injection when available)
