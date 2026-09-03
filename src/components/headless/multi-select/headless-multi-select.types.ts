import type {
  Dispatch,
  KeyboardEventHandler,
  ReactNode,
  SetStateAction,
} from "react";

export type HeadlessMultiSelectPropsType<T> = HeadlessMultiSelectProps<T> & {
  children: (api: HeadlessMultiSelectApi<T>) => ReactNode;
};


export type HeadlessMultiSelectProps<T> = {
  items?: T[];
  value: T[];
  onChange: (value: T[]) => void;
  identifier?: keyof T;
  searchBy?: (keyof T)[];
  min?: number;
  max?: number;
  loadOptions?: (query: string) => Promise<T[]>;
};

export type HeadlessMultiSelectApi<T> = {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  focusedIndex: number;
  filteredItems: T[];
  toggle: (item: T) => void;
  isSelected: (item: T) => boolean;
  clear: () => void;
  canSelectMore: boolean;
  canUnselect: boolean;
  handleKeyDown: KeyboardEventHandler<HTMLElement>;
  loading: boolean;
  error: Error | null;
};
