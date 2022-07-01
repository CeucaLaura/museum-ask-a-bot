import * as React from "react";
import { Button, InputAdornment } from "@material-ui/core";
import { CloseCircleOutline } from "mdi-material-ui";
import { isString } from "lodash";

import FormInput from "~/components/FormInput";

import useStyles from "./styles";

interface Props {
  accept?: string;
  onChange: (val: string | undefined) => void;
  value: string | undefined;
}

const FileUpload: React.FC<Props> = ({
  accept,
  onChange,
  value,
}: Props): React.ReactElement<Props> => {
  const [tempFile, setTempFile] = React.useState<any>(undefined);
  const classes = useStyles();
  return (
    <FormInput
      inputProps={{
        endAdornment: Boolean(value) && (
          <InputAdornment
            classes={{ root: classes.inputAdornmentRoot }}
            position="end"
          >
            <CloseCircleOutline
              classes={{
                root: classes.removeButton,
              }}
              fontSize="small"
              onClick={(): void => {
                onChange(undefined);
                setTempFile(undefined);
              }}
            />
          </InputAdornment>
        ),
        placeholder: "Pick a file",
        readOnly: true,
        startAdornment: (
          <Button
            classes={{ root: classes.buttonRootSelect }}
            color="primary"
            component="label"
            disabled={Boolean(value)}
            variant="text"
          >
            Select
            <input
              accept={accept}
              hidden
              onChange={({
                target,
              }: React.ChangeEvent<HTMLInputElement>): void => {
                const f = target.files ? target.files[0] : null;
                setTempFile(target.value);

                if (f) {
                  const reader = new FileReader();
                  reader.addEventListener("load", (): void => {
                    onChange(
                      isString(reader.result) ? reader.result : undefined
                    );
                  });
                  reader.readAsDataURL(f);
                }
              }}
              type="file"
              value={tempFile}
            />
          </Button>
        ),
        value,
      }}
      label="Picture (optional)"
    />
  );
};

// eslint-disable-next-line immutable/no-mutation
FileUpload.defaultProps = {
  accept: undefined,
};

export default FileUpload;
