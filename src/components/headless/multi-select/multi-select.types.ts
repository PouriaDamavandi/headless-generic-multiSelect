import type { Dispatch, KeyboardEventHandler, SetStateAction } from "react";

export type MultiSelectProps<T> = {
  items: T[];
  value: T[];
  onChange: (value: T[]) => void;
  identifier: keyof T;
  searchBy: (keyof T)[];
  min?: number;
  max?: number;
};

export type MultiSelectApi<T> = {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  focusedIndex: number;
  filteredItems: T[];
  toggle: (item: T) => void;
  isSelected: (item: T) => boolean;
  clear: () => void;
  canSelectMore: boolean;
  canUnselect: boolean;
  handleKeyDown: KeyboardEventHandler<HTMLDivElement>;
  loading: boolean;
};
