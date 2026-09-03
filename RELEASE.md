# Release Guide

This project is prepared to publish as an npm package.

## Package Shape

Public entry:

```text
src/index.ts
```

Build output:

```text
dist/index.js
dist/index.cjs
dist/index.d.ts
dist/index.css
```

Demo app output:

```text
demo-dist/
```

Package exports:

```tsx
import { MultiSelect } from "headless-generic-multiselect";
import "headless-generic-multiselect/style.css";
```

## Release Checklist

Before publishing:

1. Confirm the package name is available on npm.
2. Confirm CI is green on the release commit.
3. Update [CHANGELOG.md](./CHANGELOG.md).
4. Confirm [README.md](./README.md) describes the latest public API.
5. Run the frozen-install verification, lint, tests, and builds.
6. Inspect the packed npm tarball.
7. Create a GitHub release and publish with provenance.

## Commands

Run tests:

```bash
pnpm test
```

Verify a clean dependency install and lint:

```bash
pnpm install --frozen-lockfile
pnpm lint
```

Build the demo app and package:

```bash
pnpm build
```

Build only the package:

```bash
pnpm build:package
```

Inspect npm package contents without publishing:

```bash
npm --cache /tmp/multiselect-npm-cache pack --dry-run
```

Publish:

```bash
npm publish --provenance
```

## Versioning

Use semantic versioning:

- Patch: bug fixes with no API change.
- Minor: new backward-compatible features.
- Major: breaking API or behavior changes.

Recommended first public version:

```text
0.1.0
```

## Commit Before Release

Use the conventions in [GIT_CONVENTIONS.md](./GIT_CONVENTIONS.md).

Suggested commit for npm preparation:

```text
chore(release): prepare package for npm publishing
```

## npm Account and Security

Recommended:

- Enable two-factor authentication on the npm account.
- Use provenance/trusted publishing from CI for final releases.
- Avoid long-lived automation tokens when trusted publishing is available.

## Notes for Consumers

React and React DOM are peer dependencies. Consumers must already have them installed.

The package exports a stylesheet at:

```text
headless-generic-multiselect/style.css
```

Consumers should import it once in their app if they use the default UI.
