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

`multi-select.test.tsx` covers rendering, controlled selection, local filtering,
async loading, rejection, and stale-response handling; `min`/`max` boundaries
and invalid constraints; custom render-prop behavior; keyboard selection after
filtering; and selected, disabled, and default accessibility roles.

## Potential future coverage

- Type-level consumer usage.

Async search is debounced; use `waitFor` after entering a query. The search input has role `combobox`, not `textbox`.
