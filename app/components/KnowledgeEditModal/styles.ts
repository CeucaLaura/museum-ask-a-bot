import { makeStyles } from "@material-ui/core/styles";

import COLORS from "~/constants/colors";
import DIMS from "~/constants/dims";
import FONT from "~/constants/font";

export default makeStyles({
  gridRootContent: {
    flex: 1,
  },
  gridRootFooter: {
    alignItems: "center",
    display: "flex",
    gap: DIMS.SPACING.PADDING,
    justifyContent: "flex-end",
  },
  gridRootQuestions: {
    flex: 1,
    height: 175,
  },
  inputAdornmentRoot: {
    padding: `0 ${DIMS.SPACING.PADDING}px`,
  },
  paperRoot: {
    height: 620,
  },
  removeButton: {
    cursor: "pointer",
  },
  typographyRootHeader: {
    fontSize: 22,
    fontWeight: FONT.WEIGHT.BOLD,
    marginBottom: DIMS.SPACING.PADDING * 3,
  },
  typographyRootSection: {
    alignItems: "center",
    display: "flex",
    fontSize: 18,
    fontWeight: FONT.WEIGHT.BOLD,
    justifyContent: "space-between",
    marginBottom: DIMS.SPACING.PADDING * 2,
  },
  typographyRootSectionError: {
    color: COLORS.RED_ERROR,
  },
});
