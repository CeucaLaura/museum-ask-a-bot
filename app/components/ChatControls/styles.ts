import { makeStyles } from "@material-ui/core/styles";

import COLORS from "~/constants/colors";
import DIMS from "~/constants/dims";

export default makeStyles({
  iconButtonRoot: {
    color: COLORS.PRIMARY,
  },
  inputRoot: {
    flex: 1,
  },
  paperRoot: {
    alignItems: "center",
    border: "none",
    borderRadius: `20px 20px 0 0`,
    bottom: 0,
    boxShadow: `0 0 20px 1px ${COLORS.BOX_SHADOW}`,
    display: "flex",
    gap: DIMS.SPACING.PADDING,
    height: DIMS.HEIGHTS.CHAT_CONTROLS,
    left: DIMS.SPACING.PADDING * 3,
    padding: `0 ${DIMS.SPACING.PADDING * 3}px`,
    position: "absolute",
    right: DIMS.SPACING.PADDING * 3,
  },
});
