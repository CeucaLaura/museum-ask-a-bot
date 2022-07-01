import * as React from "react";
import {
  Backdrop,
  Modal as ImportModal,
  Paper,
  PaperProps,
  ModalProps,
  Zoom,
} from "@material-ui/core";
import clsx from "clsx";
import { get, omit } from "lodash";
import mergeClasses from "~/helpers/mergeClasses";

import useStyles from "./styles";

interface Props {
  children: any;
  modalProps: Omit<ModalProps, "children">;
  paperProps?: Omit<PaperProps, "children">;
}

const Modal: React.FC<Props> = ({
  children,
  modalProps: { className, ...modalProps },
  paperProps,
}: Props): React.ReactElement<Props> => {
  const classes = useStyles();

  return (
    <ImportModal
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 250,
      }}
      className={clsx(classes.modalRoot, className)}
      onClose={modalProps.onClose}
      {...modalProps}
    >
      <Zoom in={modalProps.open} timeout={250}>
        <Paper
          classes={mergeClasses(
            { root: classes.paperRoot },
            get(paperProps, "classes") || {}
          )}
          {...omit(paperProps, "classes")}
        >
          {children}
        </Paper>
      </Zoom>
    </ImportModal>
  );
};

// eslint-disable-next-line immutable/no-mutation
Modal.defaultProps = {
  paperProps: undefined,
};

export default Modal;
