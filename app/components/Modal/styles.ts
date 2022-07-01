import { makeStyles } from "@material-ui/core/styles";

import COLORS from "~/constants/colors";
import DIMS from "~/constants/dims";

export default makeStyles({
  modalRoot: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
  paperRoot: {
    "&:focus": { outline: "none" },
    border: "none",
    boxShadow: `0 0 2px 1px ${COLORS.BOX_SHADOW}`,
    display: "flex",
    flexDirection: "column",
    height: 480,
    padding: `${DIMS.SPACING.PADDING * 4}px ${DIMS.SPACING.PADDING * 3}px`,
    width: 520,
  },
});
