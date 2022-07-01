import * as React from "react";
import {
  Switch as ImportSwitch,
  SwitchProps,
  Typography,
} from "@material-ui/core";

import mergeClasses from "~/helpers/mergeClasses";

import useStyles from "./styles";

interface Props extends SwitchProps {
  description: string | undefined;
  label: string | undefined;
  style?: React.CSSProperties;
}

const Switch: React.FC<Props> = ({
  description,
  label,
  style,
  ...props
}: Props): React.ReactElement<Props> => {
  const classes = useStyles();

  const children = (
    <ImportSwitch
      // eslint-disable-next-line react/destructuring-assignment
      classes={mergeClasses({ root: classes.root }, props.classes || {})}
      color="primary"
      {...props}
    />
  );

  if (!label) {
    return children;
  }

  return (
    <>
      <Typography classes={{ root: classes.typographyRoot }} style={style}>
        {children}
        {description ? (
          <>
            <span>
              {label}
              <span>{description}</span>
            </span>
          </>
        ) : (
          label
        )}
      </Typography>
    </>
  );
};

// eslint-disable-next-line immutable/no-mutation
Switch.defaultProps = {
  style: undefined,
};

export default Switch;
