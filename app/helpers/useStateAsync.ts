import * as React from "react";

const useStateAsync = (initValue: any): any[] => {
  const [value, setValue] = React.useState<any>(initValue);

  const setter = (x: any): Promise<any> =>
    new Promise((resolve) => {
      setValue(x);
      resolve(x);
    });
  return [value, setter];
};

export default useStateAsync;
