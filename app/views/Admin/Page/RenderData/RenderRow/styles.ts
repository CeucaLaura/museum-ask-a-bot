import { makeStyles } from "@material-ui/core/styles";

import DIMS from "~/constants/dims";
import FONT from "~/constants/font";

export default makeStyles({
  gridRootContainer: {
    alignItems: "flex-start",
    display: "flex",
    gap: DIMS.SPACING.PADDING,
  },
  gridRootValues: {
    display: "flex",
    flexDirection: "column",
  },
  paperRoot: {
    alignItems: "center",
    display: "flex",
    gap: DIMS.SPACING.PADDING * 3,
    padding: DIMS.SPACING.PADDING * 2,
  },
  typographyRootLabel: {
    fontSize: FONT.SIZES.P,
    fontWeight: FONT.WEIGHT.BOLD,
  },
  typographyRootValue: {
    fontSize: FONT.SIZES.P,
    fontStyle: "italic",
    fontWeight: FONT.WEIGHT.BOLDER,
    wordBreak: "break-word",
  },
});
