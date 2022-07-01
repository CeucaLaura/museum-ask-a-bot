import * as React from "react";
import { Cog } from "mdi-material-ui";
import { IconButton } from "@material-ui/core";

import RenderModal from "./RenderModal";
import useStyles from "./styles";

const Settings: React.FC = (): React.ReactElement<any> => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [displayModal, setDisplayModal] = React.useState(false);

  const classes = useStyles();
  return (
    <>
      <IconButton
        classes={{ root: classes.buttonRoot }}
        onClick={(): void => {
          setDisplayModal(true);
          setModalOpen(true);
        }}
      >
        <Cog fontSize="large" />
      </IconButton>

      {displayModal && (
        <RenderModal
          onClose={(): void => {
            setModalOpen(false);
            setTimeout((): void => {
              setDisplayModal(false);
            }, 250);
          }}
          open={modalOpen}
        />
      )}
    </>
  );
};

export default Settings;
