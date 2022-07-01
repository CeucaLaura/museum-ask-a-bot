/* eslint-disable no-console, import/prefer-default-export */

import { AppSettings } from "~/types";
import NAMES from "~/constants/names";
import NEXT from "~/constants/next";

export const setSettings = (values: AppSettings): void => {
  if (NEXT.IS_CLIENT) {
    localStorage.setItem(NAMES.APP_SETTINGS, JSON.stringify(values));
  } else {
    console.warn("Cannot set localStorage on server!");
  }
};

export const getSettings = (): AppSettings | null => {
  if (NEXT.IS_CLIENT) {
    const str = localStorage.getItem(NAMES.APP_SETTINGS);
    if (str) {
      return JSON.parse(str);
    }
    return null;
  }

  console.warn("Cannot get from localStorage on server!");
  return null;
};
