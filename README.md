# React Headless MultiSelect

A generic React + TypeScript multiselect component built with a headless core and a default UI wrapper.

The project demonstrates a reusable selection hook, render-prop customization, debounced search, async option loading, Storybook examples, and Vitest coverage.

## Features

- Generic item support with TypeScript.
- Controlled selection through `value` and `onChange`.
- Optional item identity through `identifier`.
- Search across one or more item keys with `searchBy`.
- Debounced search input.
- Optional async option loading with `loadOptions`.
- Minimum and maximum selection constraints.
- Keyboard support for arrow navigation and Enter selection.
- Headless API for custom rendering.
- Default UI built with local `Button` and `Input` atoms.
- Storybook stories for default, custom render, and async loading flows.
- Unit tests with Vitest and Testing Library.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- Storybook 10
- Vitest
- Testing Library
- pnpm

## Documentation

- [API.md](./API.md): detailed component, hook, and headless API reference.
- [ACCESSIBILITY.md](./ACCESSIBILITY.md): current accessibility gaps and target behavior.
- [AI_CONTEXT.md](./AI_CONTEXT.md): compact working context for AI assistants.
- [AGENTS.md](./AGENTS.md): operating guide for AI coding assistants.
- [BUGS.md](./BUGS.md): known bugs, risks, and recommended fix order.
- [CHANGELOG.md](./CHANGELOG.md): readable history summarized from git commits.
- [CONTRIBUTING.md](./CONTRIBUTING.md): local workflow, contribution rules, and commit style.
- [GIT_CONVENTIONS.md](./GIT_CONVENTIONS.md): branch, commit, and changelog conventions.
- [RELEASE.md](./RELEASE.md): npm release checklist and publishing workflow.
- [TESTING.md](./TESTING.md): test strategy, commands, and missing coverage.

## Getting Started

Install from npm:

```bash
pnpm add react-headless-multiselect
```

Import the component and default styles:

```tsx
import { MultiSelect } from "react-headless-multiselect";
import "react-headless-multiselect/style.css";
```

For local development of this repository, install dependencies:

```bash
pnpm install
```

Run the demo app locally:

```bash
pnpm dev
```

Run Storybook:

```bash
pnpm storybook
```

Build the demo app and npm package:

```bash
pnpm build
```

Build only the demo app:

```bash
pnpm build:demo
```

Build only the npm package:

```bash
pnpm build:package
```

Run tests:

```bash
pnpm test
```

Run lint:

```bash
pnpm lint
```


## Project Structure

```text
src/
  components/
    headless/
      multi-select/
        headless-multi-select.tsx
        headless-multi-select.types.ts
        use-headless-multi-select.ts
    ui/
      atoms/
        button.tsx
        input.tsx
      molecules/
        multi-select/
          multi-select.tsx
          multi-select.type.ts
          multi-select.test.tsx
          multiSelect.stories.tsx
  hooks/
    use-debounce.ts
  lib/
    users.ts
    utils.ts
  App.tsx
```

## Basic Usage

```tsx
import { useState } from "react";
import { MultiSelect } from "@/components/ui/molecules/multi-select/multi-select";

type User = {
  id: number;
  name: string;
  email: string;
};

const users: User[] = [
  { id: 1, name: "User 1", email: "user1@test.com" },
  { id: 2, name: "User 2", email: "user2@test.com" },
];

export function Example() {
  const [selected, setSelected] = useState<User[]>([]);

  return (
    <MultiSelect<User>
      items={users}
      value={selected}
      onChange={setSelected}
      identifier="id"
      searchBy={["name", "email"]}
      min={0}
      max={3}
    />
  );
}
```

## Async Usage

```tsx
<MultiSelect<User>
  value={selected}
  onChange={setSelected}
  identifier="id"
  searchBy={["name", "email"]}
  loadOptions={async (query) => {
    const response = await fetch(`/api/users?q=${encodeURIComponent(query)}`);
    return response.json();
  }}
/>
```

When `loadOptions` is provided, the component treats loaded options as the source of truth and does not apply local filtering.

## Custom Rendering

`MultiSelect` accepts a render-prop child. This exposes the headless API so consumers can provide their own markup.

```tsx
<MultiSelect<User>
  items={users}
  value={selected}
  onChange={setSelected}
  identifier="id"
  searchBy={["name", "email"]}
>
  {({ filteredItems, toggle, isSelected, searchQuery, setSearchQuery }) => (
    <div>
      <input
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
      />

      {filteredItems.map((user) => (
        <button key={user.id} type="button" onClick={() => toggle(user)}>
          {isSelected(user) ? "Selected" : "Select"} {user.name}
        </button>
      ))}
    </div>
  )}
</MultiSelect>
```

## Props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `items` | `T[]` | No | Local options list. Defaults to an empty array. |
| `value` | `T[]` | Yes | Controlled selected items. |
| `onChange` | `(value: T[]) => void` | Yes | Called with the next selected items. |
| `identifier` | `keyof T` | No | Unique key used to compare items. Falls back to object reference equality. |
| `searchBy` | `(keyof T)[]` | No | Keys used for local search and default display label. |
| `min` | `number` | No | Non-negative minimum selected items. Defaults to `0`. |
| `max` | `number` | No | Non-negative maximum selected items; it must be at least `min`. |
| `loadOptions` | `(query: string) => Promise<T[]>` | No | Async loader for remote/server-filtered options. |
| `children` | `(api) => ReactNode` | No | Custom render function using the headless API. |

## Headless API

The render-prop child receives:

| API | Description |
| --- | --- |
| `searchQuery` | Current search text. |
| `setSearchQuery` | Updates search text. |
| `filteredItems` | Current visible options. |
| `toggle` | Selects or unselects an item. |
| `isSelected` | Returns whether an item is selected. |
| `clear` | Clears all selections when `min` is `0`. |
| `canSelectMore` | Whether another item can be selected. |
| `canUnselect` | Whether an item can be removed. |
| `focusedIndex` | Current keyboard-focused option index. |
| `handleKeyDown` | Arrow/Enter keyboard handler. |
| `loading` | Whether async options are loading. |

## Quality Status

Last verified during project audit:

- `pnpm test`: passing.
- `pnpm build`: passing.
- `pnpm build-storybook`: passing.
- `pnpm lint`: passing.

See [BUGS.md](./BUGS.md) for current bugs and recommended fixes.

## Changelog

See [CHANGELOG.md](./CHANGELOG.md).
