import css from "styled-jsx/css";
import { makeStyles } from "@material-ui/core/styles";

import COLORS from "~/constants/colors";
import DIMS from "~/constants/dims";

export const useStyles = makeStyles({
  paperRoot: {
    backgroundColor: COLORS.WHITE,
    border: "none",
    boxShadow: `0 0 20px 1px ${COLORS.BOX_SHADOW}`,
    height: "100%",
    margin: "0 auto",
    maxWidth: 744,
    overflow: "hidden",
    padding: DIMS.SPACING.PADDING * 4,
    paddingRight: DIMS.SPACING.PADDING * 3,
    position: "relative",
  },
});

export default css`
  .page-container {
    background-image: linear-gradient(
      123deg,
      rgba(0, 156, 222, 0.08),
      rgba(0, 156, 222, 0)
    );
    height: 100vh;
    overflow: hidden;
  }
`;
