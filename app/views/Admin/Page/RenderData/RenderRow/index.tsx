import * as React from "react";
import { isString } from "lodash";
import { Grid, Typography } from "@material-ui/core";

import useStyles from "./styles";

interface Props {
  label: string;
  value: string | string[];
}

const RenderRow: React.FC<Props> = ({
  label,
  value,
}: Props): React.ReactElement<Props> => {
  const classes = useStyles();

  return (
    <Grid classes={{ root: classes.gridRootContainer }}>
      <Typography classes={{ root: classes.typographyRootLabel }}>
        {`${label}:`}
      </Typography>
      {isString(value) ? (
        <Typography classes={{ root: classes.typographyRootValue }}>
          {value}
        </Typography>
      ) : (
        <Grid classes={{ root: classes.gridRootValues }}>
          {value.map(
            (val): React.ReactElement => (
              <Typography
                classes={{ root: classes.typographyRootValue }}
                key={val}
              >
                {val}
              </Typography>
            )
          )}
        </Grid>
      )}
    </Grid>
  );
};

export default RenderRow;
