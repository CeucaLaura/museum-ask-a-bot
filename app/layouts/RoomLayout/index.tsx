import * as React from "react";
import { Paper } from "@material-ui/core";

import Settings from "~/components/Settings";

import styles, { useStyles } from "./styles";

interface Props {
  children: any;
}

const RoomLayout: React.FC<Props> = ({
  children,
}: Props): React.ReactElement<Props> => {
  const classes = useStyles();

  return (
    <>
      <style jsx>{styles}</style>

      <div className="page-container">
        <Paper classes={{ root: classes.paperRoot }} component="main" square>
          {children}
        </Paper>
      </div>
      <Settings />
    </>
  );
};

export default RoomLayout;
