import { getAnalytics } from "./helpers/cloudflare";
import {} from "./helpers/github";

export const updateAnalytics = async () => {
  return await getAnalytics();
};
