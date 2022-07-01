import { makeStyles } from "@material-ui/core/styles";

import COLORS from "~/constants/colors";
import DIMS from "~/constants/dims";

export default makeStyles({
  dialogPaper: {
    "&:focus": { outline: "none" },
    border: "none",
    boxShadow: `0 0 2px 1px ${COLORS.BOX_SHADOW}`,
    display: "flex",
    flexDirection: "column",
    padding: `${DIMS.SPACING.PADDING * 3}px ${DIMS.SPACING.PADDING * 2}px`,
  },
  dialogRow: {
    padding: 0,
  },
});
