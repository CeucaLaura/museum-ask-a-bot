import * as React from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import { DictaphoneCommand } from "~/types";

interface Props {
  commands: DictaphoneCommand[];
  onListenChange: (val: boolean) => void;
}

const Dictaphone: React.FC<Props> = ({
  commands,
  onListenChange,
}: Props): React.ReactElement<Props> | null => {
  const { listening, transcript } = useSpeechRecognition({ commands });
  console.log(transcript);
  React.useEffect(() => {
    onListenChange(listening);
  }, [listening, onListenChange]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  return <></>;
};

export default Dictaphone;
