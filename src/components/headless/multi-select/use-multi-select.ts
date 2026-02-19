import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  type KeyboardEvent,
} from "react";
import { useDebounce } from "@/hooks/use-debounce";

export type MultiSelectProps<T> = {
  items?: T[];
  value: T[];
  onChange: (value: T[]) => void;
  identifier: keyof T;
  searchBy: (keyof T)[];
  min?: number;
  max?: number;
  loadOptions?: (query: string) => Promise<T[]>;
};

export function useMultiSelect<T>({
  items = [],
  value,
  onChange,
  identifier,
  searchBy,
  min = 0,
  max,
  loadOptions,
}: MultiSelectProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedQuery = useDebounce(searchQuery, 300);

  const [internalItems, setInternalItems] = useState<T[]>(items);

  const [loading, setLoading] = useState(false);

  const [focusedIndex, setFocusedIndex] = useState(0);

  // async mode
  useEffect(() => {
    if (!loadOptions) return;
    let active = true;

    Promise.resolve().then(() => setLoading(true));

    loadOptions(debouncedQuery).then((res) => {
      if (active) {
        setInternalItems(res);
        setLoading(false);
      }
    });

    return () => {
      active = false;
    };
  }, [debouncedQuery, loadOptions]);

  const sourceItems = loadOptions ? internalItems : items;

  const isSelected = useCallback(
    (item: T) => value.some((v) => v[identifier] === item[identifier]),
    [value, identifier],
  );

  const canSelectMore = !max || value.length < max;

  const canUnselect = value.length > min;

  const toggle = useCallback(
    (item: T) => {
      const exists = isSelected(item);

      if (exists) {
        if (!canUnselect) return;
        onChange(value.filter((v) => v[identifier] !== item[identifier]));
      } else {
        if (!canSelectMore) return;
        onChange([...value, item]);
      }
    },
    [value, isSelected, onChange, identifier, canSelectMore, canUnselect],
  );

  const filteredItems = useMemo(() => {
    if (loadOptions) return sourceItems;

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
