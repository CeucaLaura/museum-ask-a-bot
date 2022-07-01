import { makeStyles } from "@material-ui/core/styles";

import DIMS from "~/constants/dims";

export default makeStyles({
  container: {
    display: "flex",
    flexWrap: "wrap",
    gap: DIMS.SPACING.PADDING * 3,
    padding: DIMS.SPACING.PADDING * 4,
  },
  iconButtonRootCreate: {
    bottom: DIMS.SPACING.PADDING * 5,
    position: "fixed",
    right: DIMS.SPACING.PADDING * 5,
  },
});
