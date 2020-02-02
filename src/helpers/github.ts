import axios from "axios";
import { logEvent } from "./logger";

const REPO = "TwenteMe/data";

const getMostRecentCommit = async () => {
  const commits = await axios.get(
    `https://api.github.com/repos/${REPO}/commits`,
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
  logEvent("Updating GitHub status");
  const sha = await getMostRecentCommit();
  const url = "";
  await axios.post(
    `https://api.github.com/repos/${REPO}/statuses/${sha}`,
    {
      state: "success",
      target_url: url,
      description: "Updated Cloudflare DNS",
      context: "TwenteBot"
    },
    {
      headers: {
        "User-Agent": "TwenteBot",
        Authorization: `token ${process.env.TWENTEBOT_ACCESS_TOKEN}`,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }
  );
};
