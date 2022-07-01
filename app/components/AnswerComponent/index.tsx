import * as React from "react";
import { Paper, Typography } from "@material-ui/core";

import AppContext from "~/context/AppContext";
import useTextToSpeech from "~/helpers/useTextToSpeech";

import useStyles from "./styles";

interface Props {
  message: string;
  picture?: string;
}

const AnswerComponent: React.FC<Props> = ({
  message,
  picture,
}: Props): React.ReactElement<Props> => {
  const { state } = React.useContext(AppContext);

  const { readText } = useTextToSpeech({
    language: "en-US",
  });

  const classes = useStyles();

  React.useEffect((): void => {
    if (state.settings.readOnReceive) {
      readText(message);
    }
  }, []);

  return (
    <Paper classes={{ root: classes.paperRoot }}>
      <Typography classes={{ root: classes.typographyRootHead }}>
        Virtual Tour
      </Typography>
      <Typography classes={{ root: classes.typographyRootBody }}>
        {picture ? (
          <img alt={message} src={picture} style={{ maxWidth: "100%" }} />
        ) : null}
        {message}
      </Typography>
    </Paper>
  );
};

// eslint-disable-next-line immutable/no-mutation
AnswerComponent.defaultProps = {
  picture: undefined,
};

export default AnswerComponent;
