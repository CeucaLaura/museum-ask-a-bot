/* eslint-disable no-console */

import * as React from "react";
import { get } from "lodash";
import { IconButton, Tooltip } from "@material-ui/core";
import { PlusCircle } from "mdi-material-ui";
import { useAuth0 } from "@auth0/auth0-react";

import AdminLayout from "~/layouts/AdminLayout";
import ConfirmationDialog from "~/components/ConfirmationDialog";
import ENV from "~/constants/env";
import { fetchKnowledge, removeDataFromKnowledge } from "~/helpers/knowledge";
import { Knowledge, KnowledgeData } from "~/types";
import KnowledgeEditModal from "~/components/KnowledgeEditModal";
import { Router } from "~/helpers/router";
import ROUTES from "~/constants/routes";

import RenderData from "./RenderData";
import useStyles from "./styles";

const Page: React.FC<any> = (): React.ReactElement<any> => {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [knowledge, setKnowledge] = React.useState<Knowledge | null>(null);

  const [displayModal, setDisplayModal] = React.useState(false);
  const [editModalData, setEditModalData] = React.useState<null | {
    data?: KnowledgeData;
    id?: string;
  }>(null);

  const [displayConfirmation, setDisplayConfirmation] = React.useState(false);
  const [confirmationData, setConfirmationData] = React.useState<{
    id?: string;
  } | null>(null);

  const fetchData = async (): Promise<void> => {
    const res = await fetchKnowledge("Museum-Dev");
    if (res) {
      setKnowledge(res);
    }
  };

  React.useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      Router.pushRoute(ROUTES.SIGN_IN);
    } else if (isAuthenticated && !isLoading) {
      fetchData();
    }
  }, [isAuthenticated, isLoading]);

  const classes = useStyles();

  if (isLoading) {
    return <></>;
  }

  return (
    <>
      <AdminLayout>
        <div className={classes.container}>
          {knowledge &&
            knowledge.data.map(
              (data): React.ReactElement => (
                <RenderData
                  data={data}
                  key={data._id}
                  onDelete={(): void => {
                    setConfirmationData({ id: data._id });
                    setDisplayConfirmation(true);
                  }}
                  onEdit={async (): Promise<void> => {
                    setEditModalData({ data, id: data._id });
                    setDisplayModal(true);
                  }}
                />
              )
            )}
        </div>
      </AdminLayout>

      <Tooltip arrow placement="top" title="Insert new knowledge data">
        <IconButton
          classes={{ root: classes.iconButtonRootCreate }}
          onClick={(): void => {
            setEditModalData({ data: undefined, id: undefined });
            setDisplayModal(true);
          }}
        >
          <PlusCircle color="primary" fontSize="large" />
        </IconButton>
      </Tooltip>

      {displayModal && (
        <KnowledgeEditModal
          data={get(editModalData, "data")}
          id={get(editModalData, "id")}
          onClose={async (): Promise<void> => {
            setEditModalData(null);
            setTimeout((): void => {
              setDisplayModal(false);
            }, 250);
            await fetchData();
          }}
          open={Boolean(editModalData)}
        />
      )}

      {displayConfirmation && (
        <ConfirmationDialog
          description={
            'By clicking "Proceed" you will permanently remove the selected record.'
          }
          onClose={(): void => {
            setConfirmationData(null);
            setTimeout((): void => {
              setDisplayConfirmation(false);
            }, 250);
          }}
          onConfirm={async (): Promise<void> => {
            if (confirmationData && confirmationData.id) {
              try {
                const token = await getAccessTokenSilently({
                  audience: `https://${ENV.AUTH0_DOMAIN}/api/v2/`,
                });
                const res = await removeDataFromKnowledge(
                  token,
                  confirmationData.id
                );
                if (res) {
                  setConfirmationData(null);
                  setTimeout((): void => {
                    setDisplayConfirmation(false);
                  }, 250);
                  await fetchData();
                }
              } catch (err) {
                console.error(err);
              }
            }
          }}
          open={Boolean(confirmationData)}
          title="Are you sure you want to remove this record?"
        />
      )}
    </>
  );
};

export default Page;
