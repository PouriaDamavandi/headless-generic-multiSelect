# Testing Guide

The project uses Vitest, jsdom, Testing Library, and user-event.

## Commands

```bash
pnpm lint
pnpm test
pnpm build
pnpm build-storybook
npm --cache /tmp/multiselect-npm-cache pack --dry-run
```

## Covered behavior

`multi-select.test.tsx` covers rendering, controlled selection, local filtering, async loading and rejection, `max={0}`, keyboard selection after filtering, and default accessibility roles.

## High-value follow-up coverage

- `max={1}` and `min={1}` boundaries.
- Ignoring stale async responses.
- Custom render-prop behavior.
- Type-level consumer usage.
- Accessible selected and disabled option state.

Async search is debounced; use `waitFor` after entering a query. The search input has role `combobox`, not `textbox`.
