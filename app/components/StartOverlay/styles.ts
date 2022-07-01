import css from "styled-jsx/css";
import { makeStyles } from "@material-ui/core/styles";

import DIMS from "~/constants/dims";

export const useStyles = makeStyles({
  buttonRoot: {
    fontSize: 22,
  },
});

export default css`
  .start-overlay-container {
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    padding-bottom: ${DIMS.SPACING.PADDING * 7}px;
    padding-top: ${DIMS.SPACING.PADDING * 7}px;
    width: 100%;
  }

  .welcome-image {
    width: 50%;
  }
`;
