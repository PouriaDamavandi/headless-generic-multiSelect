import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { useState } from "react";
import { MultiSelect } from "./multi-select";
import { users, type User } from "@/lib/users";

// Test harness to manage state
function TestHarness(
  props: Partial<React.ComponentProps<typeof MultiSelect<User>>>,
) {
  const [value, setValue] = useState<User[]>([]);

  return (
    <MultiSelect<User>
      items={users}
      value={value}
      onChange={setValue}
      identifier="id"
      searchBy={["name", "email"]}
      {...props}
    />
  );
}

describe("MultiSelect", () => {
  test("renders items", () => {
    render(<TestHarness />);

    expect(screen.getByText(/^⬜ User 1$/)).toBeInTheDocument();
    expect(screen.getByText(/^⬜ User 2$/)).toBeInTheDocument();
  });

  test("clicks to select and deselect", async () => {
    const user = userEvent.setup();
    render(<TestHarness />);

    // Find and click User 1 to select
    const user1 = screen.getByText(/^⬜ User 1$/);
    await user.click(user1);

    // After selection, the element should now show ✅
    const selectedUser1 = await screen.findByText(/^✅ User 1$/);
    expect(selectedUser1).toBeInTheDocument();

    // Click again to deselect
    await user.click(selectedUser1);
    const unselectedUser1 = await screen.findByText(/^⬜ User 1$/);
    expect(unselectedUser1).toBeInTheDocument();
  });

  test("filters items by search", async () => {
    const user = userEvent.setup();
    render(<TestHarness />);

    const input = screen.getByRole("combobox", { name: "Search options" });
    await user.type(input, "user5@test.com");

    // Wait for filtering to remove User 1
    await waitFor(() => {
      expect(screen.queryByText(/^⬜ User 1$/)).not.toBeInTheDocument();
    });

    // User 5 (and possibly User 50 if present) should remain
    expect(screen.getByText(/^⬜ User 5$/)).toBeInTheDocument();

    // User 2 should also be gone
    expect(screen.queryByText(/^⬜ User 2$/)).not.toBeInTheDocument();
  });

  test("handles async loadOptions", async () => {
    const user = userEvent.setup();

    const asyncLoad = vi.fn().mockImplementation(async (query: string) => {
      if (query === "") return users;
      return users.filter((u) => u.name.includes(query));
    });

    render(<TestHarness items={undefined} loadOptions={asyncLoad} />);

    // Wait for initial load (empty query)
    await waitFor(() => {
      expect(screen.getByText(/^⬜ User 1$/)).toBeInTheDocument();
    });
    expect(asyncLoad).toHaveBeenCalledWith("");

    await user.type(
      screen.getByRole("combobox", { name: "Search options" }),
      "User 3",
    );

    // Wait for the debounced loadOptions to be called with "User 3"
    await waitFor(() => {
      expect(asyncLoad).toHaveBeenCalledWith("User 3");
    });

    // After the second load, the list should only contain users matching "User 3"
    await waitFor(() => {
      expect(screen.getByText(/^⬜ User 3$/)).toBeInTheDocument();
      expect(screen.queryByText(/^⬜ User 1$/)).not.toBeInTheDocument();
    });
  });

  test("recovers from a rejected async load", async () => {
    const loadOptions = vi.fn().mockRejectedValue(new Error("Request failed"));
    render(<TestHarness items={undefined} loadOptions={loadOptions} />);

    expect(await screen.findByRole("alert")).toHaveTextContent("Request failed");
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });

  test("does not select when max is zero", async () => {
    const user = userEvent.setup();
    render(<TestHarness max={0} />);

    await user.click(screen.getByText(/^⬜ User 1$/));

    expect(screen.getByText(/^⬜ User 1$/)).toBeInTheDocument();
  });

  test("enforces minimum and maximum selection boundaries", async () => {
    const user = userEvent.setup();
    render(<TestHarness min={1} max={1} />);

    await user.click(screen.getByText(/^⬜ User 1$/));

    const selectedUser = screen.getByRole("option", { name: /^✅ User 1$/ });
    expect(selectedUser).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("option", { name: /^⬜ User 2$/ })).toHaveAttribute(
      "aria-disabled",
      "true",
    );

    await user.click(selectedUser);
    await user.click(screen.getByRole("option", { name: /^⬜ User 2$/ }));

    expect(screen.getByText(/^✅ User 1$/)).toBeInTheDocument();
    expect(screen.getByText(/^⬜ User 2$/)).toBeInTheDocument();
  });

  test("rejects invalid selection constraints", () => {
    expect(() => render(<TestHarness min={2} max={1} />)).toThrow(
      "min cannot be greater than max",
    );
    expect(() => render(<TestHarness min={-1} />)).toThrow(
      "min must be a non-negative integer",
    );
  });

  test("clamps keyboard focus after filtering", async () => {
    const user = userEvent.setup();
    render(<TestHarness />);

    const input = screen.getByRole("combobox", { name: "Search options" });
    await user.click(input);
    await user.keyboard("{ArrowDown}{ArrowDown}{ArrowDown}");
    await user.type(input, "user5@test.com");

    await waitFor(() => {
      expect(screen.queryByText(/^⬜ User 1$/)).not.toBeInTheDocument();
    });
    await user.keyboard("{Enter}");

    expect(await screen.findByText(/^✅ User 5$/)).toBeInTheDocument();
  });

  test("exposes accessible multiselect semantics", () => {
    render(<TestHarness />);

    expect(screen.getByRole("listbox", { name: "Options" })).toHaveAttribute(
      "aria-multiselectable",
      "true",
    );
    expect(screen.getAllByRole("option")).toHaveLength(users.length);
    expect(screen.getByRole("combobox", { name: "Search options" })).toBeInTheDocument();
  });

  test("supports a custom render prop", async () => {
    const user = userEvent.setup();
    render(
      <TestHarness>
        {({ filteredItems, isSelected, toggle }) => (
          <button type="button" onClick={() => toggle(filteredItems[0])}>
            {isSelected(filteredItems[0]) ? "Selected" : "Select"}
          </button>
        )}
      </TestHarness>,
    );

    await user.click(screen.getByRole("button", { name: "Select" }));

    expect(screen.getByRole("button", { name: "Selected" })).toBeInTheDocument();
  });

  test("ignores stale async responses", async () => {
    const user = userEvent.setup();
    let resolveInitial: (items: User[]) => void;
    let resolveSearch: (items: User[]) => void;
    const initial = new Promise<User[]>((resolve) => {
      resolveInitial = resolve;
    });
    const search = new Promise<User[]>((resolve) => {
      resolveSearch = resolve;
    });
    const loadOptions = vi.fn((query: string) =>
      query === "User 2" ? search : initial,
    );

    render(<TestHarness items={undefined} loadOptions={loadOptions} />);

    await waitFor(() => expect(loadOptions).toHaveBeenCalledWith(""));
    await user.type(
      screen.getByRole("combobox", { name: "Search options" }),
      "User 2",
    );
    await waitFor(() => expect(loadOptions).toHaveBeenCalledWith("User 2"));

    resolveSearch!([users[1]]);
    expect(await screen.findByText(/^⬜ User 2$/)).toBeInTheDocument();

    resolveInitial!([users[0]]);
    await waitFor(() => {
      expect(screen.getByText(/^⬜ User 2$/)).toBeInTheDocument();
      expect(screen.queryByText(/^⬜ User 1$/)).not.toBeInTheDocument();
    });
  });

  test("supports keyboard navigation", async () => {
    const user = userEvent.setup();
    render(<TestHarness />);

    const input = screen.getByRole("combobox", { name: "Search options" });
    await user.click(input);

    await user.keyboard("{Enter}");

    // First item should be selected
    expect(await screen.findByText(/^✅ User 1$/)).toBeInTheDocument();
  });
});
