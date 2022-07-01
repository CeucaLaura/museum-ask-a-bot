import { isEqual } from "lodash";

const didChange = (
  initial: Record<string, any>,
  check: Record<string, any>
): boolean => {
  return !isEqual(initial, check);
};

export default didChange;
