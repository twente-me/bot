import axios from "axios";
import { ensureDir, readJson, writeJson } from "fs-extra";
import { join } from "path";
import { urlToCache } from "./utils";

export const cachedJson = async (url: string) => {
  const cachePath = join(__dirname, ".cache", urlToCache(url));
  await ensureDir(join(cachePath, ".."));
  try {
    const cachedResult = await readJson(cachePath);
    if (cachedResult) return cachedResult;
  } catch {}
  console.log(`Fetching  ${url}`);
  const response = await axios(url);
  const body = response.data;
  await writeJson(cachePath, body);
  return body;
};
