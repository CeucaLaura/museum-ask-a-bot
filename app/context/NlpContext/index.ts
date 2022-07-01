import * as React from "react";
import { noop } from "lodash";

export default React.createContext({
  actions: {
    /* eslint-disable @typescript-eslint/no-unused-vars, lodash/no-extra-args */
    process: ({
      language = "en",
      message,
    }: {
      language?: string;
      message: string;
    }): any => {
      noop(language, message);
      return {};
    },
    /* eslint-enable @typescript-eslint/no-unused-vars, lodash/no-extra-args */
  },
});
