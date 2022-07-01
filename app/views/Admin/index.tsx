import * as React from "react";
import dynamic from "next/dynamic";
import { NextPage } from "next";

import Meta from "./meta";

const Page = dynamic(() => import("./Page"), { ssr: false });

const Admin: NextPage = (): React.ReactElement<any> => (
  <>
    <Page />

    <Meta />
  </>
);

export default Admin;
