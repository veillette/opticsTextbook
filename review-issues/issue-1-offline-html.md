# Issue: Missing offline.html file referenced by service worker

**Labels:** `bug`, `pwa`, `enhancement`, `priority: low`

## Problem

The service worker (`service-worker.js:128`) references an offline fallback page at `/opticsTextbook/offline.html` that doesn't exist in the repository:

```javascript
return caches.match('/opticsTextbook/offline.html')
  .then(offlineResponse => {
    if (offlineResponse) {
      return offlineResponse;
    }
    // Falls back to basic HTML response
  });
```

## Impact

**Severity:** Low
**User Impact:** Minimal - service worker already has a fallback to a basic HTML response

When users are offline and request uncached content, the service worker attempts to serve `offline.html` but fails silently, then serves a basic inline HTML response instead.

## Solution

**Option 1 (Recommended):** Create a proper offline page
- Add `offline.html` to the repository root
- Include helpful content (table of contents, cached chapters list)
- Style it to match the textbook theme
- Add to CORE_ASSETS in service worker for immediate caching

**Option 2:** Remove the offline.html reference
- Update service worker to use only the inline fallback response
- Simplifies code but loses opportunity for better offline UX

## Files Affected

- `service-worker.js` (line 128)
- New file: `offline.html` (to be created)

## Related

- PWA_SETUP.md documents PWA implementation
- Part of PWA offline experience enhancement
