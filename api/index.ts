import { NowRequest, NowResponse } from "@now/node";

export default async (req: NowRequest, res: NowResponse) => {
  try {
    return res.json({
      github: "https://github.com/TwenteMe/bot"
    });
  } catch (error) {
    res.status(500);
    res.json({ error });
  }
};
