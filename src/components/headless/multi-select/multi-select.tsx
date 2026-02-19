import type { ReactNode } from "react";
import { useMultiSelect } from "./use-multi-select";
import type { MultiSelectProps, MultiSelectApi } from "./multi-select.types";

type Props<T> = MultiSelectProps<T> & {
  children: (api: MultiSelectApi<T>) => ReactNode;
};

export function MultiSelect<T>(props: Props<T>) {
  const { children, ...rest } = props;

  const api = useMultiSelect<T>(rest);

  return <>{children(api)}</>;
}
