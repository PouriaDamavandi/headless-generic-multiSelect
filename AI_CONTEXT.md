# Current Project Context

## Purpose

This repository publishes `headless-generic-multiselect`: a generic React multiselect with a headless hook/render-prop API and an optional styled UI.

## Architecture

| Layer | Location | Responsibility |
| --- | --- | --- |
| Headless | `src/components/headless/multi-select/` | Search, async loading, selection constraints, keyboard state |
| Default UI | `src/components/ui/molecules/multi-select/` | Rendering, labels, semantics, visual state |
| Package | `src/index.ts`, `vite.lib.config.ts`, `tsconfig.lib.json` | Public exports and declaration/build output |

## Release target

- Public GitHub repository and npm package.
- Target version: stable `0.1.0`.
- Release only after CI, package contents, and clean-install checks succeed.

## Current release blockers

1. Install dependencies matching the edited manifest/lockfile, then repair and run ESLint.
2. Handle rejected `loadOptions` calls.
3. Correct `max={0}` behavior.
4. Reset or clamp keyboard focus when visible results change.
5. Implement accessible default UI semantics and tests.
6. Eliminate Storybook addon-resolution warnings.
7. Ensure every documentation link shipped in the npm package resolves.

See [BUGS.md](./BUGS.md) for behavior detail and [RELEASE.md](./RELEASE.md) for publishing checks.

## Fast task briefing

Use this format when assigning work:

```text
Goal:
Scope:
Acceptance criteria:
Do not change:
Verification:
```
