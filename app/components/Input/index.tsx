import * as React from "react";
import { Input as ImportInput, InputProps as Props } from "@material-ui/core";

import mergeClasses from "~/helpers/mergeClasses";

import useStyles from "./styles";

export type InputProps = Props;

const Input: React.FC<Props> = ({
  type: htmlType,
  ...props
}: Props): React.ReactElement<Props> => {
  const classes = useStyles();
  return (
    <ImportInput
      {...props}
      classes={mergeClasses(
        {
          input: classes.input,
          root: classes.root,
        },
        // eslint-disable-next-line react/destructuring-assignment
        props.classes || {}
      )}
      disableUnderline
      margin="dense"
      type={htmlType}
    />
  );
};

export default Input;
