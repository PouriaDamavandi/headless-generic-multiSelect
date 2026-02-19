import { HeadlessMultiSelect } from "@/components/headless/multi-select/headless-multi-select";
import { Input } from "../../atoms/input";
import { Button } from "../../atoms/button";
import type { MultSelectProps } from "./multi-select.type";

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
}: MultSelectProps<T>) {
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
              placeholder="Search..."
            />

            {value.length > 0 && (
              <Button variant="destructive" onClick={api.clear}>
                Clear All
              </Button>
            )}

            <div tabIndex={0} className="space-y-1 max-h-60 overflow-auto">
              {api.loading ? (
                <div className="text-gray-400 px-2 py-1">Loading...</div>
              ) : api.filteredItems.length === 0 ? (
                <div className="text-gray-400 px-2 py-1">No results</div>
              ) : (
                api.filteredItems.map((item, index) => {
                  const selected = api.isSelected(item);
                  const isFocused = index === api.focusedIndex;

                  // Safely generate a key – fallback to index if identifier is missing
                  const itemKey = identifier
                    ? String(item[identifier])
                    : `item-${index}`;

                  // Safely get display label – use first searchBy key or fallback to a stringified item
                  const displayLabel = searchBy?.[0]
                    ? String(item[searchBy[0]])
                    : JSON.stringify(item);

                  return (
                    <div
                      key={itemKey}
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
                      {selected && api.canUnselect && (
                        <span
                          className="text-sm text-red-500 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            api.toggle(item);
                          }}
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
        )
      }
    </HeadlessMultiSelect>
  );
}
