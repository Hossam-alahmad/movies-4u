import axios from "axios";
import config from "./config";

export const fetchDataFromApi = async (url: string, params?: object) => {
  return await axios.get(config.URL + url, {
    params,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...config.authHeader(),
    },
  });
};
