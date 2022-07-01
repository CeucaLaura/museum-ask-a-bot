import { makeStyles } from "@material-ui/core/styles";

import DIMS from "~/constants/dims";

export default makeStyles({
  buttonRootSelect: {
    textTransform: "none",
  },
  inputAdornmentRoot: {
    padding: `0 ${DIMS.SPACING.PADDING}px`,
  },
  removeButton: {
    cursor: "pointer",
  },
});
