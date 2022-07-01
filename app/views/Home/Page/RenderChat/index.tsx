import * as React from "react";
import { Grid } from "@material-ui/core";
import { isString } from "lodash";
import SpeechRecognition from "react-speech-recognition";
import { Scrollbars } from "react-custom-scrollbars";

import AnswerComponent from "~/components/AnswerComponent";
import ChatControls from "~/components/ChatControls";
import { ChatLog } from "~/types";
import Dictaphone from "~/components/Dictaphone";
import MESSAGE_TYPES from "~/constants/messageTypes";
import NAMES from "~/constants/names";
import NlpContext from "~/context/NlpContext";
import QuestionComponent from "~/components/QuestionComponent";
import useStateAsync from "~/helpers/useStateAsync";

import useStyles from "./styles";

interface Props {
  continuous: boolean;
}

const RenderChat: React.FC<Props> = ({
  continuous,
}: Props): React.ReactElement<Props> => {
  const nlpContext = React.useContext(NlpContext);

  const [chatLog, setChatLog] = React.useState<ChatLog[]>([]);
  const logContRef = React.useRef<any>(null);

  const [message, setMessage] = useStateAsync("");
  const [listening, setListening] = React.useState(continuous);

  const classes = useStyles();

  const processMessage = async (tempMessage?: string): Promise<void> => {
    const messageToUse = tempMessage || message;
    setChatLog((prev) => {
      return [
        ...prev,
        {
          type: MESSAGE_TYPES.QUESTION,
          value: messageToUse,
        },
      ];
    });

    const res = await nlpContext.actions.process({ message: messageToUse });

    if (res) {
      setChatLog((prev) => {
        return [
          ...prev,
          {
            picture:
              res.answers[1] && res.answers[1].answer.includes("data:image")
                ? res.answers[1].answer
                : undefined,
            type: MESSAGE_TYPES.ANSWER,
            value: res.answers[0].answer,
          },
        ];
      });

      if (logContRef && logContRef.current) {
        logContRef.current.scrollToBottom();
      }
      setMessage("");
    }
  };

  const commands = continuous
    ? [
        {
          callback: async (
            value: string,
            { resetTranscript }: { resetTranscript: () => void }
          ): Promise<void> => {
            if (value && isString(value)) {
              const valueToProcess = await setMessage(value);
              resetTranscript();
              await processMessage(valueToProcess);
            }
          },
          command: `${NAMES.LISTEN_COMMAND} *`,
        },
      ]
    : [
        {
          callback: async (
            value: string,
            { resetTranscript }: { resetTranscript: () => void }
          ): Promise<void> => {
            if (value && isString(value)) {
              const valueToProcess = await setMessage(value);
              resetTranscript();
              await processMessage(valueToProcess);
            }
          },
          command: "*",
        },
      ];

  React.useEffect((): void => {
    if (continuous && SpeechRecognition.browserSupportsSpeechRecognition()) {
      SpeechRecognition.startListening({ continuous: true });
    }
  }, []);

  return (
    <>
      <Grid classes={{ root: classes.gridRootChatlist }}>
        <Scrollbars
          autoHide
          ref={logContRef}
          style={{ height: "100%", width: "100%" }}
        >
          {chatLog.map(
            (l, index): React.ReactElement<any> => {
              if (MESSAGE_TYPES.QUESTION === l.type) {
                return (
                  <QuestionComponent
                    // eslint-disable-next-line react/no-array-index-key
                    key={`${l.value}_${index}`}
                    message={l.value}
                  />
                );
              }

              return (
                <AnswerComponent
                  // eslint-disable-next-line react/no-array-index-key
                  key={`${l.value}_${index}`}
                  message={l.value}
                  picture={l.picture}
                />
              );
            }
          )}
        </Scrollbars>
      </Grid>

      <ChatControls
        inputValue={message}
        listening={listening}
        micHidden={continuous}
        onInputChange={(val: string): void => {
          setMessage(val);
        }}
        onMicClick={(): void => {
          SpeechRecognition.startListening();
        }}
        onPlayClick={processMessage}
      />

      <Dictaphone
        commands={commands}
        onListenChange={(val: boolean): void => {
          setListening(val);
        }}
      />
    </>
  );
};

export default RenderChat;
