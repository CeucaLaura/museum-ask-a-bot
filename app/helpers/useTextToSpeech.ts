/* eslint-disable immutable/no-mutation */

import { find, head } from "lodash";

interface Props {
  language?: string;
  pitch?: number;
  rate?: number;
  volume?: number;
}

interface Result {
  readText: (text: string) => void;
  stopReading: () => void;
}

const useTextToSpeech = ({ language, pitch, rate, volume }: Props): Result => {
  const stopReading = (): void => {
    window.speechSynthesis.cancel();
  };

  const prepVoice = (): any => {
    const possibleVoices = window.speechSynthesis.getVoices();
    return find(possibleVoices, ["lang", language]) || head(possibleVoices);
  };

  const readText = (text: string): void => {
    const speech = new window.SpeechSynthesisUtterance();
    speech.voice = prepVoice();
    speech.text = text;
    speech.lang = language || "en-GB";
    speech.pitch = pitch || 0.8;
    speech.rate = rate || 1;
    speech.volume = volume || 1;
    speech.text = text;

    stopReading();
    window.speechSynthesis.speak(speech);
  };

  return { readText, stopReading };
};

export default useTextToSpeech;
