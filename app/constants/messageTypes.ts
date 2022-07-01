import { MessageType } from "~/types";

const MESSAGE_TYPES: Record<string, MessageType> = {
  ANSWER: "ANSWER" as MessageType,
  QUESTION: "QUESTION" as MessageType,
};

export default MESSAGE_TYPES;
