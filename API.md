# API Reference

This project exposes a generic multiselect through a default UI component and a headless implementation.

## Main Component

```tsx
import { MultiSelect } from "@/components/ui/molecules/multi-select/multi-select";
```

`MultiSelect<T>` is a controlled component. Consumers own selected state and pass it through `value` and `onChange`.

```tsx
<MultiSelect<User>
  items={users}
  value={selected}
  onChange={setSelected}
  identifier="id"
  searchBy={["name", "email"]}
/>
```

## Props

### `items?: T[]`

Local options used when `loadOptions` is not provided.

Default: `[]`

### `value: T[]`

Selected items. This is required and controlled by the parent.

### `onChange: (value: T[]) => void`

Called whenever the selected items should change.

The hook sends the full next selected array, not a patch.

### `identifier?: keyof T`

Unique property used to compare selected and candidate items.

When provided:

```ts
value.some((v) => v[identifier] === item[identifier])
```

When omitted, comparison falls back to reference equality:

```ts
value.some((v) => v === item)
```

Use `identifier` for object options, especially with async loading, because remote results usually create new object references.

### `searchBy?: (keyof T)[]`

Keys used for local filtering.

When no `loadOptions` is provided, each item is included if any configured key contains the debounced query.

### `getOptionLabel?: (item: T) => string`

Custom label for the default UI. When omitted, the UI uses the first `searchBy` key, then `JSON.stringify(item)` as a fallback.

### `min?: number`

Minimum number of selected items.

Default: `0`

When `value.length <= min`, selected items cannot be unselected through `toggle`.

### `max?: number`

Maximum number of selected items.

`max={0}` prevents all selection. `undefined` means no maximum.

`min` and `max` must be non-negative integers. When both are supplied,
`min` cannot exceed `max`; invalid constraints throw a `RangeError`.

### `loadOptions?: (query: string) => Promise<T[]>`

Async option loader.

When this prop is present:

- The hook calls `loadOptions(debouncedQuery)`.
- Returned items become the visible list.
- Local filtering is skipped because the async source is treated as already filtered.
- `loading` is exposed through the headless API.

Rejected requests stop loading and expose an error through the headless API.

### `children?: (api: HeadlessMultiSelectApi<T>) => ReactNode`

Render-prop override for custom UI.

When omitted, the default UI is rendered.

## Headless Component

```tsx
import { HeadlessMultiSelect } from "@/components/headless/multi-select/headless-multi-select";
```

Use this when you only want behavior/state and will provide all markup yourself.

```tsx
<HeadlessMultiSelect<User>
  items={users}
  value={selected}
  onChange={setSelected}
  identifier="id"
  searchBy={["name", "email"]}
>
  {(api) => (
    <YourCustomMultiSelect api={api} />
  )}
</HeadlessMultiSelect>
```

## Hook

```tsx
import { useHeadlessMultiSelect } from "@/components/headless/multi-select/use-headless-multi-select";
```

The hook accepts the same headless props and returns the same API used by render props.

## Headless API

### `searchQuery: string`

The raw search input value.

### `setSearchQuery: Dispatch<SetStateAction<string>>`

Updates the raw search input value.

Filtering and async loading use a debounced version internally.

### `filteredItems: T[]`

Visible options after local filtering or async loading.

### `toggle: (item: T) => void`

Selects the item if it is not selected, or unselects it if selected.

Respects `min` and `max`.

### `isSelected: (item: T) => boolean`

Checks whether an item is currently selected.

Uses `identifier` when available, otherwise reference equality.

### `clear: () => void`

Clears all selected items only when `min === 0`.

### `canSelectMore: boolean`

Whether selecting another item is allowed.

### `canUnselect: boolean`

Whether unselecting an item is allowed.

### `focusedIndex: number`

Index used by keyboard navigation.

This value is clamped to the visible item range when results change.

### `handleKeyDown: KeyboardEventHandler<HTMLElement>`

Handles:

- `ArrowDown`: move focus down.
- `ArrowUp`: move focus up.
- `Enter`: toggle the focused item.

### `loading: boolean`

Whether async loading is in progress.

Only meaningful when `loadOptions` is provided.

### `error: Error | null`

The most recent async loading error, or `null` before a request and after a new request begins.

## Recommended Usage Patterns

Use local mode when all options are already available:

```tsx
<MultiSelect<User>
  items={users}
  value={selected}
  onChange={setSelected}
  identifier="id"
  searchBy={["name", "email"]}
/>
```

Use async mode for remote search:

```tsx
<MultiSelect<User>
  value={selected}
  onChange={setSelected}
  identifier="id"
  loadOptions={loadUsers}
/>
```

Use custom rendering when the default UI is not enough:

```tsx
<MultiSelect<User> {...props}>
  {(api) => (
    <CustomUserPicker api={api} />
  )}
</MultiSelect>
```
