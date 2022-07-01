import clsx from "clsx";
import { mergeWith } from "lodash";

type Classes = Record<string, any>;

const mergeClasses = (classes1: Classes, classes2: Classes): Classes => {
  return mergeWith(
    classes1 || {},
    classes2 || {},
    (className1, className2): string => {
      return clsx(className1, className2);
    }
  );
};

export default mergeClasses;
