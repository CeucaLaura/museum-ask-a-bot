import * as React from "react";
import { Grow } from "@material-ui/core";

import Button from "~/components/Button";

import styles, { useStyles } from "./styles";

interface Props {
  onChange: (val: any) => void;
  open: boolean;
}

const StartOverlay: React.FC<Props> = ({
  onChange,
  open,
}: Props): React.ReactElement<Props> => {
  const classes = useStyles();

  return (
    <>
      <style jsx>{styles}</style>
      <div className="start-overlay-container">
        <Grow in={open} timeout={300}>
          <img alt="Welcome" className="welcome-image" src="/img/welcome.svg" />
        </Grow>

        <Grow in={open} timeout={300}>
          <div>
            <Button
              classes={{ root: classes.buttonRoot }}
              onClick={onChange}
              variant="contained"
            >
              Start Tour
            </Button>
          </div>
        </Grow>
      </div>
    </>
  );
};

export default StartOverlay;
