import { makeStyles } from "@material-ui/core/styles";

import COLORS from "~/constants/colors";
import DIMS from "~/constants/dims";
import FONT from "~/constants/font";

export default makeStyles({
  input: {
    "&.Mui-disabled": {
      cursor: "not-allowed",
    },
    fontSize: FONT.SIZES.P,
    fontWeight: FONT.WEIGHT.BOLDER,
    height: DIMS.HEIGHTS.INPUT,
    minHeight: DIMS.HEIGHTS.INPUT,
    padding: `0 ${DIMS.SPACING.PADDING * 2}px`,
  },
  root: {
    "& .MuiSvgIcon-root": {
      color: COLORS.PRIMARY_HOVER,
      marginLeft: DIMS.SPACING.PADDING * 2,
    },
    backgroundColor: COLORS.INPUT_BG,
    borderRadius: 45,
  },
});
