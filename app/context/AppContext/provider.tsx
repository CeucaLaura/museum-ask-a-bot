/* eslint-disable react/sort-comp */

import * as React from "react";

import { AppContextType, AppSettings } from "~/types";
import { setSettings } from "~/helpers/settings";

import AppContext, { getInitialState } from ".";

interface Props {
  children?: React.ReactNode;
}

class Provider extends React.Component<Props, AppContextType> {
  constructor(props: Props) {
    super(props);

    /* eslint-disable immutable/no-mutation */
    this._setSettings = this._setSettings.bind(this);

    this.state = getInitialState();
    /* eslint-enable immutable/no-mutation */
  }

  async _setSettings(values: AppSettings): Promise<void> {
    await this.setStateAsync({ settings: values });
    setSettings(values);
  }

  setStateAsync(state: Partial<AppContextType>): Promise<void> {
    // eslint-disable-next-line promise/avoid-new
    return new Promise((resolve): void => {
      this.setState(state as AppContextType, resolve);
    });
  }

  render(): React.ReactNode {
    const { children } = this.props;

    return (
      <AppContext.Provider
        value={{
          actions: {
            setSettings: this._setSettings,
          },
          state: { ...this.state },
        }}
      >
        {children}
      </AppContext.Provider>
    );
  }
}

export default Provider;
