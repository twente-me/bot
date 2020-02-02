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
