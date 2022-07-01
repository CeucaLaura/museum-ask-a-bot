import { makeStyles } from "@material-ui/core/styles";

import COLORS from "~/constants/colors";

export default makeStyles({
  root: {
    color: COLORS.PRIMARY,
  },
  typographyRoot: {
    "& > span": {
      "& > span": {
        fontSize: 12,
        fontStyle: "italic",
      },
      display: "flex",
      flexDirection: "column",
    },
    display: "flex",
  },
});
