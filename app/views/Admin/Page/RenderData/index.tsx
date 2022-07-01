import * as React from "react";
import { Avatar, Grid, IconButton, Paper, Tooltip } from "@material-ui/core";
import { Delete, Pencil } from "mdi-material-ui";

import COLORS from "~/constants/colors";
import { KnowledgeData } from "~/types";

import RenderRow from "./RenderRow";
import useStyles from "./styles";

interface Props {
  data: KnowledgeData;
  onDelete: () => void;
  onEdit: () => void;
}

const RenderData: React.FC<Props> = ({
  data,
  onDelete,
  onEdit,
}: Props): React.ReactElement<Props> => {
  const classes = useStyles();

  return (
    <Paper classes={{ root: classes.paperRoot }}>
      <Avatar classes={{ root: classes.avatarRoot }} src={data.answers[1]}>
        No Image
      </Avatar>

      <Grid classes={{ root: classes.gridRoot }}>
        <RenderRow label="Answer" value={data.answers[0]} />

        <RenderRow label="Intent" value={data.intent} />

        <RenderRow label="Utterances" value={data.utterances} />
      </Grid>

      <Grid classes={{ root: classes.gridRootTools }}>
        <Tooltip arrow placement="top" title="Modify">
          <IconButton color="primary" onClick={onEdit} size="small">
            <Pencil fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip arrow placement="top" title="Remove">
          <IconButton
            onClick={onDelete}
            size="small"
            style={{ color: COLORS.RED_ERROR }}
          >
            <Delete fontSize="small" />
          </IconButton>
        </Tooltip>
      </Grid>
    </Paper>
  );
};

export default RenderData;
