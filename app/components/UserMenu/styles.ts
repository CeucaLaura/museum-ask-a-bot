import { makeStyles } from "@material-ui/core/styles";

import COLORS from "~/constants/colors";
import DIMS from "~/constants/dims";
import FONT from "~/constants/font";

export default makeStyles({
  avatarRoot: {
    border: `solid 2px ${COLORS.DARK}`,
    borderRadius: "50%",
    height: 65,
    width: 65,
  },
  gridRoot: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  typographyRoot: {
    color: COLORS.DARK,
    fontSize: FONT.SIZES.H2,
    fontWeight: FONT.WEIGHT.BOLD,
    paddingTop: DIMS.SPACING.PADDING,
  },
});
