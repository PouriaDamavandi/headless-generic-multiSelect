import { useId } from "react";
import { HeadlessMultiSelect } from "@/components/headless/multi-select/headless-multi-select";
import { Input } from "../../atoms/input";
import { Button } from "../../atoms/button";
import type { MultiSelectProps } from "./multi-select.type";

export function MultiSelect<T>({
  items,
  value,
  onChange,
  identifier,
  searchBy,
  min,
  max,
  loadOptions,
  children,
  getOptionLabel,
}: MultiSelectProps<T>) {
  const listboxId = useId();
  return (
    <HeadlessMultiSelect<T>
      items={items}
      value={value}
      onChange={onChange}
      identifier={identifier}
      searchBy={searchBy}
      min={min}
      max={max}
      loadOptions={loadOptions}
    >
      {(api) =>
        children ? (
          children(api)
        ) : (
          <div className="w-72 border rounded-md p-3 space-y-2">
            <Input
              className="w-full border px-2 py-1 rounded"
              value={api.searchQuery}
              onChange={(e) => api.setSearchQuery(e.target.value)}
              onKeyDown={api.handleKeyDown}
              role="combobox"
              aria-label="Search options"
              aria-controls={listboxId}
              aria-activedescendant={
                api.filteredItems.length > 0
                  ? `${listboxId}-option-${api.focusedIndex}`
                  : undefined
              }
              placeholder="Search..."
            />

            {value.length > 0 && (
              <Button
                type="button"
                variant="destructive"
                onClick={api.clear}
                aria-label="Clear selected items"
              >
                Clear All
              </Button>
            )}

            <div
              id={listboxId}
              role="listbox"
              aria-label="Options"
              aria-multiselectable="true"
              aria-busy={api.loading}
              className="space-y-1 max-h-60 overflow-auto"
            >
              {api.loading ? (
                <div role="status" className="text-gray-400 px-2 py-1">
                  Loading...
                </div>
              ) : api.error ? (
                <div role="alert" className="text-red-600 px-2 py-1">
                  {api.error.message}
                </div>
              ) : api.filteredItems.length === 0 ? (
                <div role="status" className="text-gray-400 px-2 py-1">
                  No results
                </div>
              ) : (
                api.filteredItems.map((item, index) => {
                  const selected = api.isSelected(item);
                  const isFocused = index === api.focusedIndex;

                  // Safely generate a key – fallback to index if identifier is missing
                  const itemKey = identifier
                    ? String(item[identifier])
                    : `item-${index}`;

                  // Safely get display label – use first searchBy key or fallback to a stringified item
                  const displayLabel = getOptionLabel
                    ? getOptionLabel(item)
                    : searchBy?.[0]
                      ? String(item[searchBy[0]])
                      : JSON.stringify(item);

                  return (
                    <div
                      key={itemKey}
                      id={`${listboxId}-option-${index}`}
                      role="option"
                      aria-selected={selected}
                      aria-disabled={!selected && !api.canSelectMore}
                      onClick={() => api.toggle(item)}
                      className={`cursor-pointer px-2 py-1 rounded flex items-center justify-between ${
                        isFocused ? "bg-gray-200" : ""
                      }`}
                      style={{
                        opacity: !selected && !api.canSelectMore ? 0.5 : 1,
                      }}
                    >
                      <span>
                        {selected ? "✅" : "⬜"} {displayLabel}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )
      }
    </HeadlessMultiSelect>
  );
}
