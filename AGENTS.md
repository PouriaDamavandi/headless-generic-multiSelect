# Repository Agent Guide

## Project

`headless-generic-multiselect` is a React + TypeScript component library with a demo application.

- Headless behavior: `src/components/headless/multi-select/`
- Default UI: `src/components/ui/molecules/multi-select/`
- Public entry point: `src/index.ts`
- Tests: `src/components/ui/molecules/multi-select/multi-select.test.tsx`
- Stories: `src/components/ui/molecules/multi-select/multiSelect.stories.tsx`

Read [AI_CONTEXT.md](./AI_CONTEXT.md) first. Then read only the document relevant to the task:

| Task | Read |
| --- | --- |
| Public API or behavior | [API.md](./API.md), [BUGS.md](./BUGS.md) |
| Test work | [TESTING.md](./TESTING.md) |
| Default UI or keyboard semantics | [ACCESSIBILITY.md](./ACCESSIBILITY.md) |
| Contributor workflow | [CONTRIBUTING.md](./CONTRIBUTING.md), [GIT_CONVENTIONS.md](./GIT_CONVENTIONS.md) |
| Package or release work | [RELEASE.md](./RELEASE.md), `package.json` |

## Non-negotiable behavior

- `value` and `onChange` are the controlled source of truth.
- Preserve generic `T` support.
- Prefer `identifier` equality when it is supplied; otherwise use reference equality.
- Keep behavior/state in the headless layer and markup in the default UI layer.
- Distinguish `undefined` from `0` for `min` and `max`.
- Async requests must safely handle rejection, stale responses, and loading cleanup.

## Change expectations

- Add or update focused tests for behavior changes.
- Update public API, accessibility, testing, bug, or release docs only when their facts change.
- Preserve unrelated changes in a dirty worktree.
- Do not hand-edit generated lockfiles.
- Do not publish, create releases, push branches, or alter npm/GitHub state without explicit approval.

## Verification

| Change | Required checks |
| --- | --- |
| Code | `pnpm test`, `pnpm build` |
| UI, stories, or Storybook docs | Above plus `pnpm build-storybook` |
| Lint setup/source lint | `pnpm lint` after dependencies are installed |
| Package/release | Above plus `npm --cache /tmp/multiselect-npm-cache pack --dry-run` |

Report checks that were not run or were blocked; never report them as passing.
