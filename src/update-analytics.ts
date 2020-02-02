import { getAnalytics } from "./helpers/cloudflare";
import {
  readGitHubFile,
  updateGitHubFile,
  writeGitHubFile
} from "./helpers/github";

const months = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december"
];

export const updateAnalytics = async () => {
  const filePath = `analytics/${new Date().getUTCFullYear()}-${
    months[new Date().getUTCMonth()]
  }`;
  const message = `:card_file_box: Update analytics for ${new Date().toLocaleDateString(
    "en",
    { year: "numeric", month: "long" }
  )}.json`;
  const content = JSON.stringify(await getAnalytics(), null, 2);

  let fileExists = false;
  try {
    const result = await readGitHubFile(filePath);
    if (result.name) fileExists = true;
  } catch {}

  if (fileExists) await updateGitHubFile(filePath, message, content);
  else await writeGitHubFile(filePath, message, content);

  return { fileWritten: true };
};
