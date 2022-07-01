import * as React from "react";
import dynamic from "next/dynamic";
import { NextPage } from "next";

import Meta from "./meta";

const AppContextProvider = dynamic(
  () => import("~/context/AppContext/provider")
);
const NlpContextProvider = dynamic(
  () => import("~/context/NlpContext/provider")
);

const Page = dynamic(() => import("./Page"), { ssr: false });

const Home: NextPage = (): React.ReactElement<any> => (
  <>
    <NlpContextProvider>
      <AppContextProvider>
        <Page />
      </AppContextProvider>
    </NlpContextProvider>
    <Meta />
  </>
);

export default Home;
