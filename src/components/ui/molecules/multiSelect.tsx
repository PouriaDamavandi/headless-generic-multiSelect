import { MultiSelect } from "@/components/headless/multi-select/multi-select";
import { Input } from "../atoms/input";
import { Button } from "../atoms/button";

type User = {
  id: number;
  name: string;
  email: string;
};

type Props = {
  users: User[];
  value: User[];
  onChange: (v: User[]) => void;
};

export function UserMultiSelect({ users, value, onChange }: Props) {
  return (
    <MultiSelect<User>
      items={users}
      value={value}
      onChange={onChange}
      identifier="id"
      searchBy={["name", "email"]}
      min={0}
      max={3}
    >
      {({
        filteredItems,
        toggle,
        isSelected,
        searchQuery,
        setSearchQuery,
        handleKeyDown,
        focusedIndex,
        clear,
        canSelectMore,
        canUnselect,
        loading,
      }) => (
        <div className="w-72 border rounded-md p-3 space-y-2">
          {/* Search Input */}
          <Input
            className="w-full border px-2 py-1 rounded"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown} // Handle keyboard navigation
            placeholder="Search..."
          />

          {/* Clear Button */}
          {value.length > 0 && (
            <Button variant="destructive" onClick={clear}>
              Clear All
            </Button>
          )}

          {/* Options List */}
          <div tabIndex={0} className="space-y-1 max-h-60 overflow-auto">
            {loading ? (
              <div className="text-gray-400 px-2 py-1">Loading...</div>
            ) : filteredItems.length === 0 ? (
              <div className="text-gray-400 px-2 py-1">No results</div>
            ) : (
              filteredItems.map((user, index) => {
                const selected = isSelected(user);
                const isFocused = index === focusedIndex;
                return (
                  <div
                    key={user.id}
                    onClick={() => toggle(user)}
                    className={`cursor-pointer px-2 py-1 rounded flex items-center justify-between ${
                      isFocused ? "bg-gray-200" : ""
                    }`}
                    style={{
                      opacity: !selected && !canSelectMore ? 0.5 : 1,
                    }}
                  >
                    <span>
                      {selected ? "✅" : "⬜"} {user.name} ({user.email})
                    </span>
                    {selected && canUnselect && (
                      <span
                        className="text-sm text-red-500 cursor-pointer"
                        onClick={() => toggle(user)}
                      >
                        ✕
                      </span>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </MultiSelect>
  );
}
