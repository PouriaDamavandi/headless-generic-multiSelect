# Accessibility

## Current behavior

The default UI uses a labelled search `combobox` connected to a multi-select `listbox`.

- Options expose `role="option"`, `aria-selected`, and disabled state when `max` prevents selection.
- The active option is exposed through `aria-activedescendant`.
- Loading and empty states use status roles; async failures use an alert.
- The clear control is a labelled button.
- ArrowUp, ArrowDown, and Enter work while the search input is focused.

## Remaining scope

The component does not currently implement a collapsible popup. If one is added, define Escape behavior, focus restoration, and expanded state before changing the interaction model.

## Testing

Prefer role-based assertions:

```tsx
screen.getByRole("combobox", { name: "Search options" });
screen.getByRole("listbox", { name: "Options" });
screen.getAllByRole("option");
```
