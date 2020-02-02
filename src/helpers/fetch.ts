import got from "got";

export const download = async (url: string, path: string) => {
  const response = await got(url);
  const body = response.body;
};
