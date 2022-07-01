import * as React from "react";
import { NextPage, NextPageContext } from "next";

import Meta from "./meta";
import Page from "./Page";

const SignIn: NextPage = (): React.ReactElement<any> => (
  <>
    <Page />

    <Meta />
  </>
);

// eslint-disable-next-line immutable/no-mutation
SignIn.getInitialProps = async (ctx: NextPageContext): Promise<any> => {
  const { query } = ctx;

  return query;
};

export default SignIn;
