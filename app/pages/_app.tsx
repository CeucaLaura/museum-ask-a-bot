/* eslint-disable no-console, filenames/match-regex, filenames/match-exported, @typescript-eslint/no-explicit-any */

import * as React from "react";
import Application from "next/app";
import { Auth0Provider } from "@auth0/auth0-react";
import { CssBaseline } from "@material-ui/core";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";

import ENV from "~/constants/env";
import NEXT from "~/constants/next";
import { importKnowledge } from "~/helpers/knowledge";
import theme from "~/styles/theme";

interface Props {
  Component: any;
  pageProps: Record<string, any>;
}

class App extends Application<Props> {
  componentDidMount(): void {
    const jssStyles = document.querySelector("#jss-server-side");

    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }

    importKnowledge();
  }

  render(): React.ReactElement<any> {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <meta
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
            name="viewport"
          />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <Auth0Provider
            audience={`https://${ENV.AUTH0_DOMAIN}/api/v2/`}
            clientId={ENV.AUTH0_CLIENT_ID}
            domain={ENV.AUTH0_DOMAIN}
            redirectUri={
              NEXT.IS_CLIENT
                ? `${window.location.origin}/mgmt/admin`
                : undefined
            }
          >
            <Component {...pageProps} />
          </Auth0Provider>
        </ThemeProvider>
      </>
    );
  }
}

export default App;
