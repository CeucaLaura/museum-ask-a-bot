import * as React from "react";
import { cloneDeep, compact, get, isNumber } from "lodash";
import { CloseCircleOutline, PlusCircleOutline } from "mdi-material-ui";
import clsx from "clsx";
import {
  Grid,
  IconButton,
  InputAdornment,
  Typography,
} from "@material-ui/core";
import { Scrollbars } from "react-custom-scrollbars";
import { useAuth0 } from "@auth0/auth0-react";

import Button from "~/components/Button";
import ENV from "~/constants/env";
import FileUpload from "~/components/FileUpload";
import FormInput from "~/components/FormInput";
import { KnowledgeData } from "~/types";
import Modal from "~/components/Modal";
import {
  pushDataInKnowledge,
  updateDataInKnowledge,
} from "~/helpers/knowledge";

import useStyles from "./styles";

interface Props {
  data?: KnowledgeData;
  id?: string;
  onClose: () => void;
  open: boolean;
}

const INITIAL_STATE: KnowledgeData = {
  answers: [""],
  intent: "",
  utterances: [""],
};

const INITIAL_ERR_STATE = {
  answers: false,
  intent: false,
  utterances: false,
};

const KnowledgeEditModal: React.FC<Props> = ({
  data,
  id,
  onClose,
  open,
}: Props): React.ReactElement<Props> => {
  const { getAccessTokenSilently } = useAuth0();
  const [errors, setErrors] = React.useState(INITIAL_ERR_STATE);
  const [values, setValues] = React.useState<KnowledgeData>(
    data || INITIAL_STATE
  );

  const onChange = (index?: number) => {
    return ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
      const { name, value } = target;

      setValues((vals) => {
        const currentValues = cloneDeep(get(vals, name));
        if (isNumber(index)) {
          currentValues.splice(index, 1, value);
          return { ...vals, [name]: currentValues };
        }
        return { ...vals, [name]: value };
      });
    };
  };

  const classes = useStyles();

  return (
    <Modal
      modalProps={{ onClose, open }}
      paperProps={{ classes: { root: classes.paperRoot } }}
    >
      <Grid classes={{ root: classes.gridRootContent }}>
        <Typography classes={{ root: classes.typographyRootHeader }}>
          {id ? "Update knowledge data" : "Insert new knowledge data"}
        </Typography>

        <FormInput
          error={errors.answers}
          inputProps={{
            multiline: true,
            name: "answers",
            onChange: onChange(0),
            value: values.answers[0],
          }}
          label="Answer"
        />

        <FileUpload
          accept="image/*"
          onChange={(v: string | undefined): void => {
            setValues((vals) => {
              const answers = [...vals.answers];
              answers.splice(1, 1, v || "");
              return { ...vals, answers };
            });
          }}
          value={values.answers[1]}
        />

        <FormInput
          error={errors.intent}
          inputProps={{
            name: "intent",
            onChange: onChange(),
            value: values.intent,
          }}
          label="Intent"
        />

        <Typography
          classes={{
            root: clsx(
              classes.typographyRootSection,
              errors.utterances && classes.typographyRootSectionError
            ),
          }}
        >
          Utterances
          <IconButton
            onClick={(): void => {
              setValues((vals) => {
                const utterances = [...vals.utterances, ""];
                return { ...vals, utterances };
              });
            }}
            size="small"
          >
            <PlusCircleOutline color="primary" fontSize="small" />
          </IconButton>
        </Typography>

        <Grid classes={{ root: classes.gridRootQuestions }}>
          <Scrollbars autoHide style={{ height: "100%", width: "100%" }}>
            {values.utterances.map(
              (utterance, index): React.ReactElement => (
                <FormInput
                  inputProps={{
                    endAdornment: index > 0 && (
                      <InputAdornment
                        classes={{ root: classes.inputAdornmentRoot }}
                        position="end"
                      >
                        <CloseCircleOutline
                          classes={{ root: classes.removeButton }}
                          color="primary"
                          fontSize="small"
                          onClick={(): void => {
                            setValues((vals) => {
                              const utterances = [...vals.utterances];
                              utterances.splice(index, 1);
                              return { ...vals, utterances };
                            });
                          }}
                          role="button"
                        />
                      </InputAdornment>
                    ),
                    name: "utterances",
                    onChange: onChange(index),
                    value: utterance,
                  }}
                  // eslint-disable-next-line react/no-array-index-key
                  key={`question_${index}`}
                  label={`Possible question ${index + 1}`}
                />
              )
            )}
          </Scrollbars>
        </Grid>
      </Grid>

      <Grid classes={{ root: classes.gridRootFooter }}>
        <Button
          onClick={(): void => {
            onClose();
          }}
          variant="outlined"
        >
          Close
        </Button>
        <Button
          onClick={async (): Promise<void> => {
            const { answers } = values;
            const intent = values.intent
              .trim()
              .replace(/ /g, ".")
              .toLowerCase();
            const utterances = compact(values.utterances);

            const utterancesValid = utterances.length !== 0;
            const answersValid =
              Boolean(answers.length) &&
              answers.length <= 2 &&
              Boolean(answers[0]);

            const intentValid = Boolean(intent);

            if (utterancesValid && answersValid && intentValid) {
              try {
                const token = await getAccessTokenSilently({
                  audience: `https://${ENV.AUTH0_DOMAIN}/api/v2/`,
                });

                if (!id) {
                  const res = await pushDataInKnowledge(token, {
                    answers,
                    intent,
                    utterances,
                  });
                  if (res) {
                    onClose();
                  }
                } else {
                  const res = await updateDataInKnowledge(token, id, {
                    answers,
                    intent,
                    utterances,
                  });
                  if (res) {
                    onClose();
                  }
                }
              } catch (err) {
                console.error(err);
              }
            } else {
              setErrors({
                answers: !answersValid,
                intent: !intentValid,
                utterances: !utterancesValid,
              });
            }
          }}
          variant="contained"
        >
          Save
        </Button>
      </Grid>
    </Modal>
  );
};

// eslint-disable-next-line immutable/no-mutation
KnowledgeEditModal.defaultProps = {
  data: undefined,
  id: undefined,
};

export default KnowledgeEditModal;
