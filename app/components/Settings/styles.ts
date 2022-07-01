import { makeStyles } from "@material-ui/core/styles";

import COLORS from "~/constants/colors";
import DIMS from "~/constants/dims";

export default makeStyles({
  buttonRoot: {
    bottom: DIMS.SPACING.PADDING * 5,
    color: COLORS.PRIMARY,
    position: "fixed",
    right: DIMS.SPACING.PADDING * 5,
  },
  modalRoot: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
});
