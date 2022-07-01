import { makeStyles } from "@material-ui/core/styles";

import COLORS from "~/constants/colors";
import DIMS from "~/constants/dims";
import FONT from "~/constants/font";

export default makeStyles({
  paperRoot: {
    marginBottom: DIMS.SPACING.PADDING * 2,
    marginLeft: DIMS.SPACING.PADDING,
    marginRight: "auto",
    maxWidth: "49%",
    padding: `${DIMS.SPACING.PADDING}px ${DIMS.SPACING.PADDING * 2}px`,
  },
  typographyRootBody: {
    color: COLORS.DARK,
    fontSize: FONT.SIZES.P,
    fontWeight: FONT.WEIGHT.BOLD,
  },
  typographyRootHead: {
    color: COLORS.PRIMARY_HOVER,
    fontSize: FONT.SIZES.SPAN,
    fontWeight: FONT.WEIGHT.BOLDER,
  },
});
