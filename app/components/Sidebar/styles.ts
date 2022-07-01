import { makeStyles } from "@material-ui/core/styles";

import DIMS from "~/constants/dims";

export default makeStyles({
  paperRoot: {
    bottom: 0,
    left: 0,
    padding: DIMS.SPACING.PADDING * 3,
    paddingTop: DIMS.SPACING.PADDING * 4,
    position: "fixed",
    top: 0,
    width: DIMS.WIDTHS.SIDEBAR,
  },
});
