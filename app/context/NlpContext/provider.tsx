/* eslint-disable react/sort-comp */

import * as React from "react";

import { loadKnowledgeAndTrain } from "~/helpers/knowledge";

import NlpContext from ".";

/* eslint-disable @typescript-eslint/no-var-requires */
const { containerBootstrap } = require("@nlpjs/core");
const { LangEn } = require("@nlpjs/lang-en-min");
const { Nlp } = require("@nlpjs/nlp");
/* eslint-enable @typescript-eslint/no-var-requires */

interface Props {
  children?: React.ReactNode;
}

class Provider extends React.Component<Props> {
  protected nlp!: any;

  constructor(props: Props) {
    super(props);

    /* eslint-disable immutable/no-mutation */
    this._process = this._process.bind(this);
    /* eslint-enable immutable/no-mutation */
  }

  async componentDidMount(): Promise<void> {
    const container = await containerBootstrap();
    container.use(Nlp);
    container.use(LangEn);

    /* eslint-disable immutable/no-mutation */
    this.nlp = container.get("nlp");
    this.nlp = await loadKnowledgeAndTrain(this.nlp);
    /* eslint-enable immutable/no-mutation */
  }

  async _process({
    language = "en",
    message,
  }: {
    language?: string;
    message: string;
  }): Promise<any> {
    const resp = await this.nlp.process(language, message);
    return resp;
  }

  render(): React.ReactNode {
    const { children } = this.props;

    return (
      <NlpContext.Provider
        value={{
          actions: {
            process: this._process,
          },
        }}
      >
        {children}
      </NlpContext.Provider>
    );
  }
}

export default Provider;
