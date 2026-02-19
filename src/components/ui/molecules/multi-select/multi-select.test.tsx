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

    const input = screen.getByRole("textbox");
    await user.type(input, "User 5");

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

    await user.type(screen.getByRole("textbox"), "User 3");

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

  test("supports keyboard navigation", async () => {
    const user = userEvent.setup();
    render(<TestHarness />);

    const input = screen.getByRole("textbox");
    await user.click(input);

    await user.keyboard("{Enter}");

    // First item should be selected
    expect(await screen.findByText(/^✅ User 1$/)).toBeInTheDocument();
  });
});
