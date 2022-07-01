/* eslint-disable filenames/match-exported */

import mongoose from "mongoose";

import {
  KnowledgeDoc,
  KnowledgeModel,
  knowledgeSchema,
  KnowledgeData,
} from "../schemas/knowledge";

import ENV from "../../app/constants/env";

class KnowledgeService {
  protected connection!: mongoose.Connection;

  protected Model!: KnowledgeModel;

  async init(): Promise<void> {
    /* eslint-disable immutable/no-mutation */
    this.connection = await mongoose.createConnection(ENV.DB_URL, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.Model = this.connection.model("Knowledge", knowledgeSchema);
    /* eslint-enable immutable/no-mutation */
  }

  async findByName(name: string): Promise<KnowledgeDoc | null> {
    return this.Model.findOne({ name });
  }

  async insert(data: any): Promise<KnowledgeDoc | null> {
    const newModel = new this.Model();
    Object.assign(newModel, data);

    return newModel.save();
  }

  async pushData(data: KnowledgeData, name: string): Promise<void> {
    await this.Model.updateOne({ name }, { $push: { data } });
  }

  async updateData(
    id: string,
    data: KnowledgeData,
    name: string
  ): Promise<void> {
    await this.Model.updateOne(
      { "data._id": id, name },
      {
        $set: {
          "data.$": { ...data },
        },
      }
    );
  }

  async removeData(id: string, name: string): Promise<void> {
    await this.Model.updateOne(
      { name },
      {
        $pull: {
          data: {
            _id: id,
          },
        },
      }
    );
  }

  async findMany(): Promise<KnowledgeDoc[]> {
    return this.Model.find();
  }

  async close(): Promise<void> {
    await this.connection.close();
  }
}

export default KnowledgeService;
