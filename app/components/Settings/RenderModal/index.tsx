import * as React from "react";
import { Grid, Typography } from "@material-ui/core";

import AppContext from "~/context/AppContext";
import Button from "~/components/Button";
import didChange from "~/helpers/didChange";
import DIMS from "~/constants/dims";
import Modal from "~/components/Modal";
import NAMES from "~/constants/names";
import Switch from "~/components/Switch";

import useStyles from "./styles";

interface Props {
  onClose: () => void;
  open: boolean;
}

const INITIAL_STATE = {
  continuousListening: true,
  readOnReceive: true,
};

const RenderModal: React.FC<Props> = ({
  open,
  onClose,
}: Props): React.ReactElement<Props> => {
  const { actions, state } = React.useContext(AppContext);
  const [values, setValues] = React.useState(
    { ...state.settings } || { ...INITIAL_STATE }
  );

  const classes = useStyles();

  const SETTING_OPTIONS = [
    {
      checked: values.continuousListening,
      description: `Toggle Speech-to-Text feature. When enabled, you can ask questions by saying '${NAMES.LISTEN_COMMAND}, <question>'`,
      key: "CONT_LIST",
      label: "Start listening on 'Start Tour'",
      onChange: (): void => {
        setValues({
          ...values,
          continuousListening: !values.continuousListening,
        });
      },
    },
    {
      checked: values.readOnReceive,
      description: "Toggle Text-to-Speech feature.",
      key: "READ_REC",
      label: "Read messages on receive.",
      onChange: (): void => {
        setValues({
          ...values,
          readOnReceive: !values.readOnReceive,
        });
      },
    },
  ];

  return (
    <Modal modalProps={{ onClose, open }}>
      <Grid classes={{ root: classes.gridRootContent }}>
        <Typography classes={{ root: classes.typographyRoot }}>
          Settings
        </Typography>

        {SETTING_OPTIONS.map(
          (opt): React.ReactElement => (
            <Switch
              checked={opt.checked}
              description={opt.description}
              key={opt.key}
              label={opt.label}
              onChange={opt.onChange}
              style={{ marginBottom: DIMS.SPACING.PADDING }}
            />
          )
        )}
      </Grid>

      <Grid classes={{ root: classes.gridRootFooter }}>
        <Button
          onClick={(): void => {
            onClose();
          }}
          variant="outlined"
        >
          Close
        </Button>
        <Button
          disabled={!didChange(state.settings, values)}
          onClick={async (): Promise<void> => {
            await actions.setSettings(values);
            // eslint-disable-next-line no-restricted-globals
            location.reload();
            onClose();
          }}
          variant="contained"
        >
          Save
        </Button>
      </Grid>
    </Modal>
  );
};

export default RenderModal;
