import { cachedJson } from "./helpers/fetch";
import { generateEmailRecords } from "./helpers/emails";
import { getEmailRecordsDelta, getCnameRecordsDelta } from "./helpers/records";
import {
  getDnsRecords,
  addEmailRecord,
  addCnameRecord,
  removeDnsRecord
} from "./helpers/cloudflare";
import { updateStatus } from "./helpers/github";
import { logEvent } from "./helpers/logger";

export const update = async () => {
  logEvent("Started update");

  const emails: {
    [index: string]: string | string[];
  } = await cachedJson(
    "https://raw.githubusercontent.com/TwenteMe/data/master/emails.json"
  );
  const emailRecords = generateEmailRecords(emails);

  const cname: {
    [index: string]: string;
  } = await cachedJson(
    "https://raw.githubusercontent.com/TwenteMe/data/master/cname.json"
  );

  const dnsRecords = await getDnsRecords();

  const emailRecordsDelta = getEmailRecordsDelta(
    dnsRecords.emailRecords,
    emailRecords
  );
  logEvent("emailRecordsDelta", emailRecordsDelta);
  for await (const record of emailRecordsDelta.recordsToRemove)
    await removeDnsRecord(record);
  for await (const record of emailRecordsDelta.recordsToAdd)
    await addEmailRecord(record);

  const cnameRecordsDelta = getCnameRecordsDelta(
    dnsRecords.cnameRecords,
    cname
  );
  logEvent("cnameRecordsDelta", cnameRecordsDelta);
  for await (const record of cnameRecordsDelta.recordsToRemove)
    await removeDnsRecord(record);
  for await (const record of cnameRecordsDelta.recordsToAdd)
    await addCnameRecord(record);

  await updateStatus();

  logEvent("Completed update");
  return { emailRecordsDelta, cnameRecordsDelta };
};
