import { API_STRING, ERROR_MESSAGE } from "../constants/config";
import { getCache, setCache } from "../utils/casheStorage";

import apiClient from "./apiClient";


export const searchAPI = async (q) => {
  const config = { params: q  };

  const requestUrl = new URLSearchParams(q).toString();
  const cachedData = await getCache(requestUrl);
  if (q === "") return [];

  if (cachedData) return cachedData.json();

  try {
    const { data } = await apiClient.get(API_STRING, { config });
    console.info("calling api");
    setCache(requestUrl, data);
    return data;
  } catch (err) {
    alert(ERROR_MESSAGE);
  }
};