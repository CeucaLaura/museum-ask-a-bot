import * as React from "react";
import Head from "next/head";

import NAMES from "~/constants/names";

interface Props {
  description?: string;
  noIndex?: boolean;
  title?: string;
}

const RenderMetaTags: React.FC<Props> = ({
  description,
  noIndex,
  title = NAMES.APP,
}: Props): React.ReactElement<Props> => (
  <Head>
    {description && (
      <>
        <meta content={description} name="description" />
        <meta content={description} property="og:description" />
        <meta content={description} name="twitter:text:description" />
      </>
    )}

    {title && (
      <>
        <title itemProp="name" lang="en">
          {title}
        </title>
        <meta content={title} property="og:title" />
        <meta content={title} name="twitter:title" />
      </>
    )}

    {noIndex && <meta content="noindex,follow" name="robots" />}
  </Head>
);

// eslint-disable-next-line immutable/no-mutation
RenderMetaTags.defaultProps = {
  description: undefined,
  noIndex: undefined,
  title: undefined,
};

export default RenderMetaTags;
