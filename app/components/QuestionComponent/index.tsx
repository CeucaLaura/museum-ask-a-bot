import * as React from "react";
import { Paper, Typography } from "@material-ui/core";

import useStyles from "./styles";

interface Props {
  message: string;
}

const QuestionComponent: React.FC<Props> = ({
  message,
}: Props): React.ReactElement<Props> => {
  const classes = useStyles();

  return (
    <Paper classes={{ root: classes.paperRoot }}>
      <Typography classes={{ root: classes.typographyRootHead }}>Me</Typography>
      <Typography classes={{ root: classes.typographyRootBody }}>
        {message}
      </Typography>
    </Paper>
  );
};

export default QuestionComponent;
