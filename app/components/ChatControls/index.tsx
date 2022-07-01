import * as React from "react";
import { ChatProcessing, Microphone, PlayCircle } from "mdi-material-ui";
import { CircularProgress, IconButton, Paper } from "@material-ui/core";

import Input from "~/components/Input";

import useStyles from "./styles";

interface Props {
  inputValue: string;
  listening: boolean;
  onInputChange: (val: string) => void;
  onMicClick: () => void;
  onPlayClick: () => void;
  micHidden: boolean;
}

const ChatControls: React.FC<Props> = ({
  inputValue,
  listening,
  onInputChange,
  onMicClick,
  onPlayClick,
  micHidden,
}: Props): React.ReactElement<Props> => {
  const classes = useStyles();

  return (
    <form
      onSubmit={(e: React.FormEvent): void => {
        e.preventDefault();
        if (inputValue && inputValue.trim()) {
          onPlayClick();
        }
      }}
    >
      <Paper classes={{ root: classes.paperRoot }}>
        <Input
          classes={{ root: classes.inputRoot }}
          onChange={({ target }: any): void => onInputChange(target.value)}
          startAdornment={<ChatProcessing fontSize="small" />}
          value={inputValue}
        />

        {!micHidden && (
          <IconButton
            classes={{ root: classes.iconButtonRoot }}
            color="primary"
            onClick={!listening ? onMicClick : undefined}
          >
            {!listening && <Microphone />}
            {listening && <CircularProgress size="1rem" />}
          </IconButton>
        )}

        <IconButton
          classes={{ root: classes.iconButtonRoot }}
          color="primary"
          disabled={!inputValue}
          type="submit"
        >
          <PlayCircle fontSize="large" />
        </IconButton>
      </Paper>
    </form>
  );
};

export default ChatControls;
