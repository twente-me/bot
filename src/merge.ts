import { cachedJson } from "./helpers/fetch";
import { generateRestrictedList } from "./helpers/restricted";

export const update = async () => {
  const restrictedUrls: string[] = generateRestrictedList(
    await cachedJson(
      "https://raw.githubusercontent.com/TwenteMe/data/master/restricted.json"
    )
  );
  return { restrictedUrls };
};
