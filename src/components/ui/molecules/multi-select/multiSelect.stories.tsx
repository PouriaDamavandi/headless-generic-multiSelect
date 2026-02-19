import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { MultiSelect } from "./multi-select";
import { users, type User } from "@/lib/users";

const meta: Meta<typeof MultiSelect<User>> = {
  title: "UI/Molecules/MultiSelect",
  component: MultiSelect,
  parameters: {
    docs: {
      description: {
        component: `
A fully generic MultiSelect component with optional async loading.

**Features:**
- Supports generic type T for items.
- Optional async loading with \`loadOptions\`.
- Debounced search.
- Keyboard navigation (ArrowUp, ArrowDown, Enter).
- Optional custom render via \`children\`.
        `,
      },
    },
  },
  argTypes: {
    min: { control: "number", description: "Minimum number of selected items" },
    max: { control: "number", description: "Maximum number of selected items" },
    searchBy: {
      control: "object",
      description: "Keys to search by",
    },
    identifier: {
      control: "text",
      description: "Unique key of items",
    },
  },
};
export default meta;

type Story = StoryObj<typeof MultiSelect<User>>;

// Default story
export const Default: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<User[]>([]);
    return (
      <MultiSelect<User>
        {...args}
        items={users}
        value={selected}
        onChange={setSelected}
      />
    );
  },
  args: {
    identifier: "id",
    searchBy: ["name", "email"],
    min: 0,
    max: 3,
  },
  parameters: {
    docs: { description: { story: "Default MultiSelect with standard UI." } },
  },
};

// Custom render story
export const CustomRender: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<User[]>([]);
    return (
      <MultiSelect<User>
        {...args}
        items={users}
        value={selected}
        onChange={setSelected}
      >
        {({
          filteredItems,
          toggle,
          isSelected,
          searchQuery,
          setSearchQuery,
          handleKeyDown,
          focusedIndex,
        }) => (
          <div
            tabIndex={0}
            onKeyDown={handleKeyDown}
            className="border rounded-md w-96 p-3 space-y-2"
          >
            <input
              className="border px-2 py-1 rounded w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
            />
            <div className="max-h-60 overflow-auto mt-2 space-y-1">
              {filteredItems.map((user, index) => (
                <div
                  key={user.id}
                  onClick={() => toggle(user)}
                  className="cursor-pointer px-2 py-1 rounded flex justify-between"
                  style={{
                    background:
                      index === focusedIndex ? "#e2e8f0" : "transparent",
                  }}
                >
                  <span>
                    {isSelected(user) ? "✅" : "⬜"} {user.name} ({user.email})
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </MultiSelect>
    );
  },
  args: {
    identifier: "id",
    searchBy: ["name", "email"],
    min: 0,
    max: 5,
  },
  parameters: {
    docs: { description: { story: "Custom render using children prop." } },
  },
};

// Async story
export const AsyncLoad: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<User[]>([]);
    const loadOptions = async (query: string): Promise<User[]> => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return users.filter(
        (user) =>
          user.name.toLowerCase().includes(query.toLowerCase()) ||
          user.email.toLowerCase().includes(query.toLowerCase()),
      );
    };
    return (
      <MultiSelect<User>
        {...args}
        items={[]}
        value={selected}
        onChange={setSelected}
        loadOptions={loadOptions}
      />
    );
  },
  args: {
    identifier: "id",
    searchBy: ["name", "email"],
    min: 0,
    max: 3,
  },
  parameters: {
    docs: { description: { story: "Async loading MultiSelect." } },
  },
};
