import axios from "axios";
import { logEvent, getLog } from "./logger";

const BOT_REPO = "TwenteMe/bot";
const DATA_REPO = "TwenteMe/data";
const requestHeaders = {
  headers: {
    "User-Agent": "TwenteBot",
    Authorization: `token ${process.env.TWENTEBOT_ACCESS_TOKEN}`,
    Accept: "application/json",
    "Content-Type": "application/json"
  }
};

const getMostRecentCommit = async () => {
  const commits = await axios.get(
    `https://api.github.com/repos/${DATA_REPO}/commits`,
    {
      headers: {
        "User-Agent": "TwenteBot",
        Authorization: `token ${process.env.TWENTEBOT_ACCESS_TOKEN}`,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }
  );
  return commits.data[0].sha;
};

export const updateStatus = async () => {
  const logFilePath = `logs/${new Date().toISOString()}.txt`;
  const logFileHtmlUrl = `https://github.com/TwenteMe/bot/blob/master/${logFilePath}`;
  logEvent("Creating log file", logFileHtmlUrl);

  const content = getLog();
  await axios.put(
    `https://api.github.com/repos/${BOT_REPO}/contents/${logFilePath}`,
    {
      message: ":loud_sound: Add bot logs",
      content: Buffer.from(content).toString("base64")
    },
    requestHeaders
  );

  const sha = await getMostRecentCommit();
  await axios.post(
    `https://api.github.com/repos/${DATA_REPO}/statuses/${sha}`,
    {
      state: "success",
      target_url: logFileHtmlUrl,
      description: "Updated Cloudflare DNS",
      context: "TwenteBot"
    },
    requestHeaders
  );
};
