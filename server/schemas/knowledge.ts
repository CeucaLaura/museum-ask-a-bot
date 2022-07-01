import { Document, model, Model, Schema, Types } from "mongoose";

export interface KnowledgeData {
  _id: string;
  answers: string[];
  intent: string;
  utterances: string[];
}

export interface KnowledgeDoc extends Document {
  data: KnowledgeData[];
  locale: string;
  name: string;
}

export type KnowledgeModel = Model<KnowledgeDoc>;

export const knowledgeSchema = new Schema<KnowledgeDoc, KnowledgeModel>(
  {
    data: [
      new Schema({
        _id: { auto: true, type: Types.ObjectId },
        answers: [String],
        intent: {
          required: true,
          type: String,
        },
        utterances: [String],
      }),
    ],
    locale: {
      default: "en-US",
      type: String,
    },
    name: {
      required: true,
      type: String,
      unique: true,
    },
  },
  { collection: "knowledge", timestamps: true }
);

export default model<KnowledgeDoc, KnowledgeModel>(
  "Knowledge",
  knowledgeSchema
);
