import { makeStyles } from "@material-ui/core/styles";

import COLORS from "~/constants/colors";
import FONT from "~/constants/font";

export default makeStyles({
  contained: {
    "&:hover": {
      backgroundColor: COLORS.PRIMARY_HOVER,
    },
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 45,
    color: COLORS.WHITE,
    fontWeight: FONT.WEIGHT.BOLDER,
    padding: "6px 28px",
    textTransform: "none",
  },
  outlined: {
    backgroundColor: COLORS.WHITE,
    border: `solid 2px ${COLORS.PRIMARY}`,
    borderRadius: 45,
    color: COLORS.PRIMARY,
    fontWeight: FONT.WEIGHT.BOLDER,
    textTransform: "none",
  },
  startIcon: {
    marginRight: 0,
    paddingLeft: 4,
  },
  text: {
    color: COLORS.LINK,
    padding: "2px 4px",
    textTransform: "none",
  },
});
