import { createMuiTheme } from "@material-ui/core/styles";

import COLORS from "~/constants/colors";

export default createMuiTheme({
  palette: {
    primary: {
      main: COLORS.PRIMARY,
    },
    secondary: {
      main: COLORS.WHITE,
    },
  },
});
