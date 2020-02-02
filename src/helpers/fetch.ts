import axios from "axios";
import { ensureDir, readJson, writeJson } from "fs-extra";
import { join } from "path";
import { urlToCache } from "./utils";
import { logEvent } from "./logger";

export const cachedJson = async (url: string) => {
  logEvent(`Fetching ${url}`);
  const response = await axios(url);
  const body = response.data;
  return body;
};
