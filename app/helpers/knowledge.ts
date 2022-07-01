/* eslint-disable no-console, import/prefer-default-export */

import axios from "axios";
import { cloneDeep, get } from "lodash";

import getTenantName from "~/helpers/getTenantName";
import { Knowledge, KnowledgeData } from "~/types";
import URLS from "~/constants/urls";

export const fetchKnowledge = async (
  name: string
): Promise<Knowledge | null> => {
  try {
    const res = await axios.get(`${URLS.KNOWLEDGE}${name}`);

    if (res) {
      const data = get(res, "data");

      return {
        data: get(data, "data"),
        locale: get(data, "locale"),
        name: get(data, "name"),
      } as Knowledge;
    }
  } catch (err) {
    console.error(err);
  }

  return null;
};

export const pushDataInKnowledge = async (
  accessToken: string,
  data: KnowledgeData,
  name = getTenantName()
): Promise<any> => {
  try {
    return axios.post(`${URLS.KNOWLEDGE}${name}/pushData`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const updateDataInKnowledge = async (
  accessToken: string,
  id: string,
  data: KnowledgeData,
  name = getTenantName()
): Promise<any> => {
  try {
    return axios.post(`${URLS.KNOWLEDGE}${name}/updateData/${id}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const removeDataFromKnowledge = async (
  accessToken: string,
  id: string,
  name = getTenantName()
): Promise<any> => {
  try {
    return axios.post(
      `${URLS.KNOWLEDGE}${name}/removeData/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const importKnowledge = async (
  name = getTenantName()
): Promise<void> => {
  const knowledge = await fetchKnowledge(name);
  localStorage.setItem("knowledge", JSON.stringify(knowledge));
};

export const getKnowledgeFromStorage = (): Knowledge | null => {
  const stringified = localStorage.getItem("knowledge");
  const raw = stringified ? JSON.parse(stringified) : null;

  return raw || null;
};

export const loadKnowledgeAndTrain = async (nlp: any): Promise<any> => {
  const nlpClone = cloneDeep(nlp);
  const knowledge = getKnowledgeFromStorage();

  // eslint-disable-next-line immutable/no-mutation
  nlpClone.settings.autoSave = false;

  if (knowledge) {
    nlpClone.addLanguage(knowledge.locale);
    nlpClone.addData(knowledge.data, knowledge.locale.slice(0, 2));
    await nlpClone.train();
  }

  return nlpClone;
};
