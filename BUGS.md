# Known Issues

## Release status

The local release checks currently pass: lint, tests, app/package builds, Storybook build, and npm package dry run.

## Remaining improvements

### Storybook package-metadata warning

`pnpm build-storybook` may warn that it cannot find `radix-ui` package metadata. The build succeeds; this is non-blocking and should be investigated during Storybook/dependency upgrades.

### Constraint validation

`min` and `max` are respected, including `max={0}`, but invalid combinations such as `min > max` are not validated. A future API version may add development warnings or documented normalization.

### Rich keyboard interaction

The default UI supports ArrowUp, ArrowDown, and Enter from its search combobox. Space, Escape, and popup/open-close behavior are intentionally not implemented because the list is always visible.
