import type {
  HeadlessMultiSelectProps,
  HeadlessMultiSelectApi,
} from "@/components/headless/multi-select/headless-multi-select.types";
import type { ReactNode } from "react";

export type MultSelectProps<T> = HeadlessMultiSelectProps<T> & {
  children?: (api: HeadlessMultiSelectApi<T>) => ReactNode;
};
