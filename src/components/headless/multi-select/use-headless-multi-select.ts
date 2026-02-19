import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  type KeyboardEvent,
} from "react";
import { useDebounce } from "@/hooks/use-debounce";
import type {
  HeadlessMultiSelectProps,
  HeadlessMultiSelectApi,
} from "./headless-multi-select.types";

export function useHeadlessMultiSelect<T>({
  items = [],
  value,
  onChange,
  identifier,
  searchBy,
  min = 0,
  max,
  loadOptions,
}: HeadlessMultiSelectProps<T>): HeadlessMultiSelectApi<T> {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, 300);

  const [internalItems, setInternalItems] = useState<T[]>(items);
  const [loading, setLoading] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);

  // Async mode
  useEffect(() => {
    if (!loadOptions) return;

    let active = true;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true); // immediately show loading

    loadOptions(debouncedQuery).then((res) => {
      if (!active) return;
      setInternalItems(res);
      setLoading(false);
    });

    return () => {
      active = false;
    };
  }, [debouncedQuery, loadOptions]);

  const sourceItems = loadOptions ? internalItems : items;

  // isSelected: use identifier if available, otherwise fallback to reference equality
  const isSelected = useCallback(
    (item: T) => {
      if (identifier) {
        return value.some((v) => v[identifier] === item[identifier]);
      }
      // No identifier – fallback to strict equality (object identity)
      return value.some((v) => v === item);
    },
    [value, identifier],
  );

  const canSelectMore = !max || value.length < max;
  const canUnselect = value.length > min;

  const toggle = useCallback(
    (item: T) => {
      const exists = isSelected(item);

      if (exists) {
        if (!canUnselect) return;
        if (identifier) {
          onChange(value.filter((v) => v[identifier] !== item[identifier]));
        } else {
          // No identifier – filter by reference equality
          onChange(value.filter((v) => v !== item));
        }
      } else {
        if (!canSelectMore) return;
        onChange([...value, item]);
      }
    },
    [value, isSelected, onChange, identifier, canSelectMore, canUnselect],
  );

  const filteredItems = useMemo(() => {
    // If using async loading, the server already filtered
    if (loadOptions) return sourceItems;

    // If no search criteria, return all items (no filtering)
    if (!searchBy || searchBy.length === 0) return sourceItems;

    const lower = debouncedQuery.toLowerCase();

    return sourceItems.filter((item) =>
      searchBy.some((key) => String(item[key]).toLowerCase().includes(lower)),
    );
  }, [sourceItems, searchBy, debouncedQuery, loadOptions]);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((prev) => Math.min(prev + 1, filteredItems.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((prev) => Math.max(prev - 1, 0));
    }
    if (e.key === "Enter") {
      e.preventDefault();
      const item = filteredItems[focusedIndex];
      if (item) toggle(item);
    }
  };

  const clear = () => {
    if (min === 0) onChange([]);
  };

  return {
    searchQuery,
    setSearchQuery,
    filteredItems,
    toggle,
    isSelected,
    clear,
    canSelectMore,
    canUnselect,
    focusedIndex,
    handleKeyDown,
    loading,
  };
}
