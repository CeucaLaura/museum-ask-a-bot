import * as React from "react";
import { Avatar, Grid, Typography } from "@material-ui/core";
import { Logout } from "mdi-material-ui";

import Button from "~/components/Button";

import useStyles from "./styles";

interface Props {
  logout: () => void;
  user: any;
}

const UserMenu: React.FC<Props> = ({
  logout,
  user,
}: Props): React.ReactElement<Props> => {
  const { name, picture } = user;
  const classes = useStyles();

  return (
    <Grid classes={{ root: classes.gridRoot }}>
      <Avatar classes={{ root: classes.avatarRoot }} src={picture}>
        {name.charAt(0)}
      </Avatar>

      <Typography classes={{ root: classes.typographyRoot }}>{name}</Typography>

      <Button onClick={logout} startIcon={<Logout />} variant="text">
        Logout
      </Button>
    </Grid>
  );
};

export default UserMenu;
