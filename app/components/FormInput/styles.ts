import { makeStyles } from "@material-ui/core/styles";

import COLORS from "~/constants/colors";
import DIMS from "~/constants/dims";

export default makeStyles({
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    marginBottom: DIMS.SPACING.PADDING * 2,
  },
  inputRoot: {
    borderRadius: 8,
  },
  labelRoot: {
    color: COLORS.DARK,
    marginBottom: DIMS.SPACING.PADDING / 2,
  },
});
