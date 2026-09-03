# Git Conventions

This repository uses a small, readable Git workflow based on Conventional Commits.

The goal is simple: every commit should explain what changed, why it matters, and which part of the project it touched.

## Current History

The existing commits already follow a useful pattern:

```text
caf65ed feat: add multiselect matching task requirements
4e7b35d feat: add storybook and unit test
2a851a6 fix: build issue on vite config and radix-ui
```

Keep using this style.

## Commit Message Format

Use:

```text
type(scope): short summary
```

Scope is optional, but recommended when it makes the change easier to scan.

Examples:

```text
docs(readme): replace vite template with project guide
docs(changelog): summarize repository history
fix(headless): handle rejected async option loading
test(multiselect): cover min and max selection limits
refactor(ui): separate option label rendering
```

## Commit Types

| Type | Use for |
| --- | --- |
| `feat` | New user-facing behavior or capability. |
| `fix` | Bug fixes. |
| `docs` | Documentation-only changes. |
| `test` | Test-only changes. |
| `refactor` | Code cleanup with no intended behavior change. |
| `style` | Formatting-only changes. |
| `chore` | Tooling, dependencies, config, repo maintenance. |
| `build` | Build system or bundler changes. |
| `ci` | CI automation changes. |
| `perf` | Performance improvements. |
| `revert` | Reverting a previous commit. |

## Recommended Scopes

Use scopes that match the project shape:

| Scope | Area |
| --- | --- |
| `headless` | `src/components/headless/multi-select/` |
| `multiselect` | Overall multiselect behavior. |
| `ui` | Default UI wrapper and atoms. |
| `storybook` | Stories and Storybook config. |
| `test` | Test setup or test files. |
| `docs` | Documentation files. |
| `lint` | ESLint config/dependencies. |
| `build` | Vite, TypeScript, package/build config. |
| `deps` | Dependency changes. |

## Subject Line Rules

- Use lowercase after the type unless a proper noun is needed.
- Use imperative mood: `add`, `fix`, `update`, `document`.
- Keep it under about 72 characters when possible.
- Do not end with a period.
- Be specific enough to understand from `git log --oneline`.

Good:

```text
fix(headless): reset loading after async load failure
docs(api): document render-prop headless contract
test(multiselect): cover keyboard focus after filtering
```

Avoid:

```text
fix stuff
updates
final changes
documentation.
```

## Commit Body

Add a body when the change needs context.

Use the body to explain:

- Why the change was needed.
- What behavior changed.
- What tests or checks were run.
- Any known follow-up work.

Example:

```text
fix(headless): handle rejected async option loading

Rejected loadOptions calls previously left the component stuck in the
loading state. The hook now resets loading in a finally block and ignores
stale responses after cleanup.

Checks:
- pnpm test
- pnpm build
```

## Branch Naming

Use short branch names:

```text
docs/project-guides
fix/async-loading
fix/lint-config
test/min-max-selection
refactor/option-labels
```

Recommended prefixes:

- `docs/`
- `fix/`
- `feat/`
- `test/`
- `refactor/`
- `chore/`

## Changelog Rules

Update [CHANGELOG.md](./CHANGELOG.md) when a change is user-visible or project-significant.

Good changelog entries include:

- New features.
- Bug fixes.
- Public API changes.
- Tooling/setup changes that affect contributors.
- Documentation milestones.

Do not add noisy entries for tiny typo fixes unless they matter.

Suggested categories:

- `Added`
- `Changed`
- `Fixed`
- `Removed`
- `Deprecated`
- `Security`

## Documentation Commit Plan for Current Work

The current documentation changes can be committed as one docs commit:

```text
docs: add project documentation and agent guide
```

If you prefer smaller commits, split them like this:

```text
docs(readme): replace template with project guide
docs(changelog): summarize repository history
docs(bugs): document current known issues
docs(agent): add AI navigation and workflow guide
docs(project): add api testing accessibility and git guides
```

Both approaches are acceptable. For a small portfolio/task repo, one clear docs commit is usually enough.

## Before Committing

For documentation-only changes:

```bash
git diff --check
```

For code changes:

```bash
pnpm test
pnpm build
```

For Storybook changes:

```bash
pnpm build-storybook
```

For lint:

```bash
pnpm lint
```

Current note: `pnpm lint` is known to fail because of the missing `typescript-eslint` package. See [BUGS.md](./BUGS.md).

## Commit Hygiene

- Keep unrelated changes in separate commits.
- Do not mix docs, behavior fixes, and formatting churn unless they are part of one clear change.
- Do not commit generated build output such as `dist/` or `storybook-static/`.
- Do not rewrite lockfiles by hand.
- Review `git diff` before committing.
- If fixing a bug from [BUGS.md](./BUGS.md), update that document after the fix.
