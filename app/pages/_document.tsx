/* eslint-disable filenames/match-regex, filenames/match-exported */

import * as React from "react";
import DocumentImport, { Head, Html, Main, NextScript } from "next/document";
import flush from "styled-jsx/server";
import htmlescape from "htmlescape";
import { NextPageContext } from "next";
import { ServerStyleSheets } from "@material-ui/core/styles";

import COLORS from "~/constants/colors";
import globalStyles from "~/styles/global";

const ENV = {
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  NODE_ENV: process.env.NODE_ENV,
};

const normalizeNextElements = `
  body,
  body > div:first-child,
  #__next {
    height: 100%;
  }
  body {
    background-color: ${COLORS.SCREEN_BACKGROUND} !important;
  }
  input, textarea {
    outline: none;
  }
`;

let index = 0;

type Props = any;
type Context = NextPageContext & any;

class Document extends DocumentImport<Props> {
  static async getInitialProps(ctx: Context): Promise<Props> {
    let url = "";
    if (ctx.req) {
      url = `https://${ctx.req.headers.host}${ctx.req.url}`;
    }

    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    // eslint-disable-next-line immutable/no-mutation
    ctx.renderPage = (): void =>
      originalRenderPage({
        enhanceApp: (App: any): any => (props: any): any =>
          sheets.collect(<App {...props} />),
      });

    const initialProps = await DocumentImport.getInitialProps(ctx);

    // eslint-disable-next-line no-return-assign
    return {
      ...initialProps,
      styles: (
        <>
          <style
            dangerouslySetInnerHTML={{ __html: normalizeNextElements }}
            key={(index += 1)}
          />

          {sheets.getStyleElement()}

          {initialProps.styles || flush() || null}
        </>
      ),
      url,
    };
  }

  render(): React.ReactElement<any> {
    return (
      <Html lang="en" style={{ height: "100%" }}>
        <Head>
          <meta charSet="utf-8" />
          <meta content="text/html; charset=utf-8" httpEquiv="content-type" />

          <link
            href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700&display=swap"
            rel="stylesheet"
          />

          <style global jsx>
            {globalStyles}
          </style>
        </Head>

        <body>
          <Main />

          {/* eslint-disable react/no-danger */}
          <script
            dangerouslySetInnerHTML={{
              __html: `__ENV__ = ${htmlescape(ENV)}`,
            }}
          />
          {/* eslint-enable react/no-danger */}

          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
