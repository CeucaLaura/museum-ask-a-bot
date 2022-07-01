/* eslint-disable @typescript-eslint/no-explicit-any */

export interface KnowledgeData {
  _id?: string;
  answers: string[];
  intent: string;
  utterances: string[];
}

export interface Knowledge {
  data: KnowledgeData[];
  locale: string;
  name: string;
}

export interface AppSettings {
  continuousListening: boolean;
  readOnReceive: boolean;
}

export interface AppContextType {
  settings: AppSettings;
}

export type MessageType = "QUESTION" | "ANSWER";

export interface DictaphoneCommand {
  bestMatchOnly?: boolean;
  callback: (...params: any[]) => void;
  command: string;
  fuzzyMatchingThreshold?: boolean;
  isFuzzyMatch?: boolean;
  matchInterim?: boolean;
}

export interface ChatLog {
  picture?: string;
  type: MessageType;
  value: string | any;
}
