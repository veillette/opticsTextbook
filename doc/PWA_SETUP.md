# Progressive Web App (PWA) Setup

This document describes the PWA implementation for MyST Markdown projects.

## Overview

This MyST project is available as a Progressive Web App (PWA), which means:

- **Installable**: Users can install the site on their devices (desktop, mobile, tablet)
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

3. **App Icons**
   - Multiple sizes (72x72 to 512x512) for different devices
   - Maskable icons for adaptive icon support on Android
   - Apple Touch Icon for iOS devices
   - Favicon for browser tabs

### Installation

Users can install the site by:

1. **Desktop Browsers (Chrome, Edge, etc.)**:
   - Click the install icon in the address bar
   - Or use browser menu > "Install [Your Project Name]"

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

2. **`scripts/inject-scripts.js`**
   - Copies `js/custom-scripts.js` to the build directory
   - Injects `<script>` tags into all HTML files

3. **`scripts/setup-pwa.js`**
   - Copies PWA files to the build directory
   - Injects service worker registration into HTML files
   - Adds PWA meta tags to all pages

### File Structure

```
your-project/
├── js/
│   └── custom-scripts.js      # Custom JavaScript (keyboard nav, etc.)
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
│   ├── setup-pwa.js           # PWA setup script
│   └── inject-scripts.js      # Post-build script injection
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

The site should score highly on:
- Installability
- PWA optimized
- Content available offline
- Fast and reliable

## Deployment

The PWA is automatically set up during GitHub Actions deployment:

1. Icons are generated from the source logo
2. HTML is built with MyST
3. Custom scripts are injected into HTML files
4. PWA files are copied to `_build/html`
5. Service worker registration and PWA tags are injected into HTML
6. Everything is deployed to GitHub Pages

## Browser Support

The PWA works on:

- **Desktop**: Chrome, Edge, Opera, Safari 16.4+
- **Mobile**: Chrome, Samsung Internet, Safari (iOS 16.4+)
- **Progressive Enhancement**: Falls back gracefully on unsupported browsers

## Offline Functionality

### Cached Resources

The service worker caches:
- Main pages (content pages)
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

## Custom JavaScript Injection

MyST MD currently does not support adding custom client-side JavaScript to sites (tracked in: https://github.com/jupyter-book/myst-theme/issues/437). As a workaround, we use a post-build script injection approach.

### How It Works

The `scripts/inject-scripts.js` script runs after `myst build --html` and:

1. Copies `js/custom-scripts.js` to the build output directory
2. Injects a `<script>` tag into all HTML files before the closing `</body>` tag

### Adding Custom JavaScript

To add custom JavaScript functionality:

1. Edit `js/custom-scripts.js` with your code
2. The script will be automatically injected during the build process

### Current Features

- **Keyboard Navigation**: Arrow keys (←/→) navigate between chapters
  - Left Arrow: Previous page
  - Right Arrow: Next page
  - Disabled in input fields and when modifier keys are pressed

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

1. Replace source logo (path defined in `myst.yml` under `site.options.logo`)
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

- [x] Keyboard navigation for page navigation (implemented via post-build script injection)
- [ ] Background sync for offline form submissions
- [ ] Push notifications for content updates
- [ ] Advanced caching strategies (network-first for certain resources)
- [ ] Offline content downloads for specific chapters
- [ ] Analytics for PWA installations and usage
- [ ] App shortcuts for frequently accessed sections
- [ ] Share target API for sharing content to the app
- [ ] Native MyST script support (replace post-build injection when available)
