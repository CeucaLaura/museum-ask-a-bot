import * as React from "react";
import { Button as ImportButton, ButtonProps } from "@material-ui/core";

import useStyles from "./styles";
import mergeClasses from "~/helpers/mergeClasses";

const Button: React.FC<ButtonProps> = (
  props: ButtonProps
): React.ReactElement<ButtonProps> => {
  const classes = useStyles();

  return (
    <ImportButton
      {...props}
      classes={mergeClasses(
        {
          contained: classes.contained,
          outlined: classes.outlined,
          startIcon: classes.startIcon,
          text: classes.text,
        },
        // eslint-disable-next-line react/destructuring-assignment
        props.classes || {}
      )}
      disableElevation
    />
  );
};

export default Button;
