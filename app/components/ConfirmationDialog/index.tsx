import * as React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Zoom,
} from "@material-ui/core";

import Button from "~/components/Button";

import useStyles from "./styles";

interface Props {
  description: string;
  onClose: () => void;
  onConfirm: () => void;
  open: boolean;
  title: string;
}

const ConfirmationDialog: React.FC<Props> = ({
  description,
  onClose,
  onConfirm,
  open,
  title,
}: Props): React.ReactElement<Props> => {
  const classes = useStyles();

  return (
    <Dialog
      aria-describedby="confirmation-dialog-description"
      aria-labelledby="confirmation-dialog-title"
      classes={{ paper: classes.dialogPaper }}
      keepMounted
      onClose={onClose}
      open={open}
      TransitionComponent={Zoom}
    >
      <DialogTitle
        classes={{ root: classes.dialogRow }}
        id="confirmation-dialog-title"
      >
        {title}
      </DialogTitle>

      <DialogContent classes={{ root: classes.dialogRow }}>
        <DialogContentText id="confirmation-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>

      <DialogActions classes={{ root: classes.dialogRow }}>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={onConfirm} variant="contained">
          Proceed
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
