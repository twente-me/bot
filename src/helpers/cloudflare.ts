import cloudflare from "cloudflare";
import { DnsRecord } from "./interfaces";

const cf = cloudflare({
  token: process.env.TWENTEME_API_KEY
});

export const getStatus = async () => {
  return await cf.zones.read(process.env.TWENTEME_ZONE_ID);
};

export const getDnsRecords = async () => {
  const all: DnsRecord[] = (
    await cf.dnsRecords.browse(process.env.TWENTEME_ZONE_ID)
  ).result;
  const cnameRecords = all.filter(i => i.type === "CNAME");
  const emailRecords = all.filter(
    i => i.type === "TXT" && i.content.startsWith("forward-email")
  );
  return { all, cnameRecords, emailRecords };
};

export const addEmailRecord = async (record: string) => {
  console.log("Adding email record", record);
  await cf.dnsRecords.add(process.env.TWENTEME_ZONE_ID, {
    type: "TXT",
    name: "@",
    content: record,
    ttl: 3600
  });
};

export const addCnameRecord = async (record: [string, string]) => {
  console.log("Adding CNAME record", record);
  await cf.dnsRecords.add(process.env.TWENTEME_ZONE_ID, {
    type: "CNAME",
    name: record[0],
    content: record[1],
    ttl: 1
  });
};

export const removeDnsRecord = async (record: DnsRecord) => {
  console.log("Removing DNS record", record.name, record.content);
  await cf.dnsRecords.del(process.env.TWENTEME_ZONE_ID, record.id);
};
