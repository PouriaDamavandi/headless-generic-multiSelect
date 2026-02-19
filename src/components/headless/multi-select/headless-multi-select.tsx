import { useHeadlessMultiSelect } from "./use-headless-multi-select";
import type { HeadlessMultiSelectPropsType } from "./headless-multi-select.types";

export function HeadlessMultiSelect<T>(props: HeadlessMultiSelectPropsType<T>) {
  const { children, ...rest } = props;
  const api = useHeadlessMultiSelect<T>(rest);
  return <>{children ? children(api) : null}</>;
}
