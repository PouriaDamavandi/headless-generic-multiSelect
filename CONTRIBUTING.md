# Contributing

This project is a small React component library/demo, so contributions should stay focused, tested, and easy to review.

## Local Setup

Install dependencies:

```bash
pnpm install
```

Run the development app:

```bash
pnpm dev
```

Run Storybook:

```bash
pnpm storybook
```

## Useful Commands

| Command | Purpose | Current status |
| --- | --- | --- |
| `pnpm test` | Run unit tests. | Passing. |
| `pnpm build` | Type-check and build the Vite app. | Passing. |
| `pnpm build-storybook` | Build Storybook docs/examples. | Passing. |
| `pnpm lint` | Run ESLint. | Passing. |

## Development Workflow

1. Read [README.md](./README.md) for component purpose and public API.
2. Check [BUGS.md](./BUGS.md) for known issues and fix priorities.
3. Keep headless logic in `src/components/headless/multi-select/`.
4. Keep default visual behavior in `src/components/ui/molecules/multi-select/`.
5. Add or update tests in `multi-select.test.tsx` when behavior changes.
6. Add or update stories in `multiSelect.stories.tsx` when public usage changes.
7. Run `pnpm test` and `pnpm build` before finishing.

## Commit Style

Existing history uses Conventional Commit-style messages:

- `feat: add storybook and unit test`
- `fix: build issue on vite config and radix-ui`

Prefer:

- `feat:` for new user-facing behavior.
- `fix:` for bug fixes.
- `docs:` for documentation-only changes.
- `test:` for test-only changes.
- `refactor:` for behavior-preserving code cleanup.

## Code Guidelines

- Preserve the generic `T` API unless there is a strong reason to narrow it.
- Do not mix headless state logic with visual UI code.
- Prefer controlled component behavior: `value` and `onChange` should remain the source of truth.
- Use `identifier` when comparing object items across async/local reloads.
- Add tests for boundary behavior such as `min`, `max`, async failure, empty results, and keyboard navigation.
- Keep changes scoped to the requested issue.

## Documentation Guidelines

Update docs when:

- A prop is added, removed, or renamed.
- The headless API changes.
- Setup commands change.
- Known bugs are fixed or new bugs are discovered.
- Storybook or test behavior changes.

Relevant docs:

- [README.md](./README.md): overview and basic usage.
- [API.md](./API.md): deeper API reference.
- [TESTING.md](./TESTING.md): testing strategy.
- [ACCESSIBILITY.md](./ACCESSIBILITY.md): accessibility expectations.
- [BUGS.md](./BUGS.md): known issues and suggested fix order.
- [CHANGELOG.md](./CHANGELOG.md): readable history.
- [GIT_CONVENTIONS.md](./GIT_CONVENTIONS.md): branch, commit, and changelog conventions.
- [RELEASE.md](./RELEASE.md): npm release checklist and package publishing workflow.
