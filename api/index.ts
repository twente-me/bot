import { NowRequest, NowResponse } from "@now/node";
import { download } from "../src/helpers/fetch";

export default async (req: NowRequest, res: NowResponse) => {
  try {
    await download(
      "https://raw.githubusercontent.com/TwenteMe/data/master/restricted.json",
      ".cache/restricted.json"
    );
    return res.json({
      github: "https://github.com/TwenteMe/bot"
    });
  } catch (error) {
    res.status(500);
    res.json({ error });
  }
};
