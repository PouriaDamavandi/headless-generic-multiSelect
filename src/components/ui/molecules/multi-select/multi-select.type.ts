import type {
  HeadlessMultiSelectProps,
  HeadlessMultiSelectApi,
} from "../../../headless/multi-select/headless-multi-select.types";
import type { ReactNode } from "react";

export type MultiSelectProps<T> = HeadlessMultiSelectProps<T> & {
  children?: (api: HeadlessMultiSelectApi<T>) => ReactNode;
  getOptionLabel?: (item: T) => string;
};

/** @deprecated Use MultiSelectProps. */
export type MultSelectProps<T> = MultiSelectProps<T>;
