import * as React from "react";
import { noop } from "lodash";

import { AppContextType, AppSettings } from "~/types";
import { getSettings } from "~/helpers/settings";

export const initialState: AppContextType = {
  settings: {
    continuousListening: true,
    readOnReceive: true,
  },
};

export const getInitialState = (): AppContextType => {
  const settings = getSettings();

  return {
    settings: settings || {
      continuousListening: true,
      readOnReceive: true,
    },
  };
};

export default React.createContext({
  actions: {
    /* eslint-disable @typescript-eslint/no-unused-vars, lodash/no-extra-args */
    setSettings: (values: AppSettings): void => {
      noop(values);
    },
    /* eslint-enable @typescript-eslint/no-unused-vars, lodash/no-extra-args */
  },
  state: getInitialState(),
});
