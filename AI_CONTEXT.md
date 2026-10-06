# Current Project Context

## Purpose

This repository publishes `react-headless-multiselect`: a generic React multiselect with a headless hook/render-prop API and an optional styled UI.

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

## Current release status

The local release checks pass: lint, tests, demo/package builds, Storybook build,
and npm package dry run. Before publishing, confirm the release commit passes CI
and follow [RELEASE.md](./RELEASE.md).

## Fast task briefing

Use this format when assigning work:

```text
Goal:
Scope:
Acceptance criteria:
Do not change:
Verification:
```
