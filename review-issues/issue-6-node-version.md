# Issue: Consider supporting Node.js 20 LTS alongside Node 22

**Labels:** `dependencies`, `enhancement`, `priority: low`

## Problem

The project currently requires Node.js >= 22.0.0, which is a very recent version (released October 2024, enters LTS in October 2025). This may create barriers for contributors and users who are using Node.js 20 LTS, the current long-term support version.

## Current Configuration

**package.json:**
```json
"engines": {
  "node": ">=22.0.0",
  "npm": ">=9.0.0"
}
```

**GitHub Actions:**
```yaml
env:
  NODE_VERSION: '22.x'
```

## Node.js Release Schedule Context

- **Node 20 LTS:** Active until April 2026 (maintenance until April 2026)
- **Node 22:** Enters LTS October 2025, active until April 2027
- **Node 18 LTS:** Maintenance mode until April 2025

## Impact

**Severity:** Low
**User Impact:** May prevent some contributors from easily working with the project

**Current situation:**
- Users must upgrade to Node 22 to contribute
- Node 20 LTS users blocked despite using supported version
- CI/CD locked to Node 22 only

**Benefits of supporting Node 20:**
1. **Broader compatibility** - More contributors can participate
2. **LTS alignment** - Node 20 is current LTS release
3. **Conservative approach** - Many organizations stay on LTS versions
4. **Easier onboarding** - Less friction for new contributors

## Investigation Needed

### Key Questions

1. **Why is Node 22 required?**
   - Check if using Node 22-specific features
   - Review mystmd version compatibility
   - Check other dependencies

2. **Does mystmd require Node 22?**
   - Current mystmd version: ^1.6.2
   - Check mystmd engine requirements
   - Test with Node 20

3. **Do any scripts use Node 22 features?**
   - Review `scripts/optimize-images.js`
   - Review `scripts/setup-pwa.js`
   - Review `scripts/generate-pwa-icons.js`

## Testing Approach

### Local Testing

```bash
# Use nvm to test with Node 20
nvm install 20
nvm use 20

# Test core workflows
npm ci
npm run build
npm run lint
npm run validate-enhanced

# Check for any compatibility issues
```

### CI Testing

Consider matrix testing in GitHub Actions:
```yaml
strategy:
  matrix:
    node-version: ['20.x', '22.x']
```

## Recommended Solution

**Option 1 (Recommended):** Support Node 20 and 22
```json
"engines": {
  "node": ">=20.0.0",
  "npm": ">=9.0.0"
}
```

Benefits:
- Maintains Node 22 support
- Adds Node 20 LTS compatibility
- Broader contributor base
- Aligns with LTS schedule

**Option 2:** Document Node 22 requirement rationale
If Node 22 is truly required:
- Document why in README
- List specific features needed
- Provide upgrade instructions

**Option 3:** Keep current requirement
If no strong reason to support Node 20:
- Document decision in comments
- Keep stricter requirement
- Revisit when Node 22 reaches LTS

## Files to Update (if changing)

- `package.json` - Update engines field
- `.github/workflows/deploy-book.yml` - Consider matrix testing
- `.github/workflows/validate.yml` - Consider matrix testing
- `README.md` - Update prerequisites
- `CLAUDE.md` - Update requirements section

## Additional Considerations

### NPM Version

Current requirement: `>=9.0.0`
- Node 20 ships with npm 10.x
- Node 22 ships with npm 10.x
- Current requirement is conservative and good

### Testing Burden

If supporting multiple Node versions:
- CI/CD runs longer (matrix testing)
- More compatibility surface to maintain
- Worth it for broader compatibility

## Related

- Node.js Release Schedule: https://github.com/nodejs/release
- mystmd compatibility documentation
- GitHub Actions Node.js setup

## Priority

**Low** - Current setup works fine; this is about expanding compatibility for contributors.

## Acceptance Criteria (if implementing)

- [ ] Identify if Node 22-specific features are used
- [ ] Test full workflow with Node 20 LTS
- [ ] Update package.json if compatible
- [ ] Consider matrix testing in CI/CD
- [ ] Update documentation
- [ ] Verify no regressions
