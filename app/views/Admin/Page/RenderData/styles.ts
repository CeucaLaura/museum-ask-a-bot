import { makeStyles } from "@material-ui/core/styles";

import DIMS from "~/constants/dims";

export default makeStyles({
  avatarRoot: {
    height: 150,
    width: 150,
  },
  gridRoot: {
    display: "flex",
    flexDirection: "column",
  },
  gridRootTools: {
    alignItems: "center",
    bottom: DIMS.SPACING.PADDING * 2,
    display: "flex",
    gap: DIMS.SPACING.PADDING * 2,
    justifyContent: "flex-end",
    position: "absolute",
    right: DIMS.SPACING.PADDING * 2,
  },
  paperRoot: {
    alignItems: "center",
    display: "flex",
    flex: "0 0 48%",
    gap: DIMS.SPACING.PADDING * 3,
    padding: DIMS.SPACING.PADDING * 2,
    paddingBottom: DIMS.SPACING.PADDING * 5,
    position: "relative",
  },
});
