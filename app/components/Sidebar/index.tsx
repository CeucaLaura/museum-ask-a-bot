import * as React from "react";
import { Paper } from "@material-ui/core";
import { useAuth0 } from "@auth0/auth0-react";

import UserMenu from "~/components/UserMenu";

import useStyles from "./styles";

const Sidebar: React.FC = (): React.ReactElement<any> => {
  const { logout, user, isLoading, isAuthenticated } = useAuth0();
  const classes = useStyles();

  return (
    <Paper classes={{ root: classes.paperRoot }} component="nav" square>
      {!isLoading && isAuthenticated && (
        <UserMenu logout={logout} user={user} />
      )}
    </Paper>
  );
};

export default Sidebar;
