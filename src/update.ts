import { cachedJson } from "./helpers/fetch";
import { generateEmailRecords } from "./helpers/emails";
import { getDnsRecords } from "./helpers/cloudflare";

export const update = async () => {
  const emails: {
    [index: string]: string | string[];
  } = await cachedJson(
    "https://raw.githubusercontent.com/TwenteMe/data/master/emails.json"
  );
  const emailRecords = generateEmailRecords(emails);

  // const cname: {
  //   [index: string]: string;
  // } = await cachedJson(
  //   "https://raw.githubusercontent.com/TwenteMe/data/master/cname.json"
  // );

  // const dnsRecords = await getDnsRecords();

  return { emailRecords };
};
