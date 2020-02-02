import { NowRequest, NowResponse } from "@now/node";
import { cachedJson } from "../src/helpers/fetch";

export default async (req: NowRequest, res: NowResponse) => {
  try {
    const data = await cachedJson(
      "https://raw.githubusercontent.com/TwenteMe/data/master/restricted.json"
    );
    return res.json({
      github: "https://github.com/TwenteMe/bot",
      data
    });
  } catch (error) {
    res.status(500);
    res.json({ error });
  }
};
