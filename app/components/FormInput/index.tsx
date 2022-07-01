import * as React from "react";
import { FormLabel } from "@material-ui/core";
import { get } from "lodash";

import Input, { InputProps } from "~/components/Input";
import mergeClasses from "~/helpers/mergeClasses";

import useStyles from "./styles";

interface Props {
  error?: boolean;
  label: string;
  inputProps: InputProps;
}

const FormInput: React.FC<Props> = ({
  error,
  label,
  inputProps,
}: Props): React.ReactElement<Props> => {
  const classes = useStyles();

  return (
    <div className={classes.inputContainer}>
      <FormLabel classes={{ root: classes.labelRoot }} error={error}>
        {label}
      </FormLabel>
      <Input
        {...inputProps}
        classes={mergeClasses(
          { root: classes.inputRoot },
          get(inputProps, "classes") || {}
        )}
      />
    </div>
  );
};

// eslint-disable-next-line immutable/no-mutation
FormInput.defaultProps = {
  error: undefined,
};

export default FormInput;
