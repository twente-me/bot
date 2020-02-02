import cloudflare from "cloudflare";
import axios from "axios";
import { DnsRecord } from "./interfaces";
import { logEvent } from "./logger";

const cf = cloudflare({
  token: process.env.TWENTEME_API_KEY
});

export const getStatus = async () => {
  return await cf.zones.read(process.env.TWENTEME_ZONE_ID);
};

const safeDate = (date: number) => (date > 9 ? date.toString() : `0${date}`);
export const getAnalytics = async () => {
  const thisMonth = new Date();
  thisMonth.setDate(1);
  thisMonth.setHours(-1);
  return (
    await axios.post(
      "https://api.cloudflare.com/client/v4/graphql",
      {
        query: `query {
          viewer {
            zones(filter: {zoneTag: "${process.env.TWENTEME_ZONE_ID}"}) {
              httpRequests1dGroups(
                orderBy: [date_ASC],
                limit: 5
                filter: { date_gt: "${thisMonth.getUTCFullYear()}-${safeDate(
          thisMonth.getUTCMonth() + 1
        )}-${safeDate(thisMonth.getUTCDate())}" }) {
                  dimensions {
                    date
                  }
                  sum {
                  browserMap {
                    pageViews
                    uaBrowserFamily
                  }
                  bytes
                  cachedBytes
                  cachedRequests
                  contentTypeMap {
                    bytes
                    requests
                    edgeResponseContentTypeName
                  }
                  countryMap {
                    bytes
                    requests
                    threats
                    clientCountryName
                  }
                  encryptedBytes
                  encryptedRequests
                  pageViews
                  requests
                  responseStatusMap {
                    requests
                    edgeResponseStatus
                  }
                }
                uniq {
                  uniques
                }
              }
            }
          }
        }`
      },
      {
        headers: {
          "X-AUTH-EMAIL": process.env.CLOUDFLARE_EMAIL,
          "X-AUTH-KEY": process.env.CLOUDFLARE_API_KEY
        }
      }
    )
  ).data.data.viewer.zones[0].httpRequests1dGroups;
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
  logEvent("Adding email record", record);
  await cf.dnsRecords.add(process.env.TWENTEME_ZONE_ID, {
    type: "TXT",
    name: "@",
    content: record,
    ttl: 3600
  });
};

export const addCnameRecord = async (record: [string, string]) => {
  logEvent("Adding CNAME record", record);
  await cf.dnsRecords.add(process.env.TWENTEME_ZONE_ID, {
    type: "CNAME",
    name: record[0],
    content: record[1],
    ttl: 1,
    proxied: true
  });
};

export const removeDnsRecord = async (record: DnsRecord) => {
  logEvent("Removing DNS record", record.name, record.content);
  await cf.dnsRecords.del(process.env.TWENTEME_ZONE_ID, record.id);
};
