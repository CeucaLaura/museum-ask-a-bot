import { makeStyles } from "@material-ui/core/styles";

import COLORS from "~/constants/colors";
import DIMS from "~/constants/dims";
import FONT from "~/constants/font";

export default makeStyles({
  paperRoot: {
    backgroundColor: COLORS.PRIMARY_HOVER,
    marginBottom: DIMS.SPACING.PADDING * 2,
    marginLeft: "auto",
    marginRight: DIMS.SPACING.PADDING,
    maxWidth: "49%",
    padding: `${DIMS.SPACING.PADDING}px ${DIMS.SPACING.PADDING * 2}px`,
  },
  typographyRootBody: {
    color: COLORS.WHITE,
    fontSize: FONT.SIZES.P,
    fontWeight: FONT.WEIGHT.BOLD,
  },
  typographyRootHead: {
    color: COLORS.WHITE,
    fontSize: FONT.SIZES.SPAN,
    fontWeight: FONT.WEIGHT.BOLDER,
  },
});
