import * as React from "react";
import { Scrollbars } from "react-custom-scrollbars";

import Sidebar from "~/components/Sidebar";

import styles from "./styles";

interface Props {
  children: any;
}

const AdminLayout: React.FC<Props> = ({
  children,
}: Props): React.ReactElement<Props> => {
  return (
    <>
      <style jsx>{styles}</style>
      <div className="page-container">
        <Sidebar />

        <main className="main-container">
          <Scrollbars autoHide style={{ height: "100%", width: "100%" }}>
            {children}
          </Scrollbars>
        </main>
      </div>
    </>
  );
};

// TODO: Add AuthAccount

export default AdminLayout;
