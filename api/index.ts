import { NowRequest, NowResponse } from "@now/node";
import { update } from "../src/update";

export default async (req: NowRequest, res: NowResponse) => {
  if (req.query.key !== process.env.TWENTEBOT_KEY)
    return res.status(401).json({
      error: "invalid_api_key",
      message: "You've supplied an invalid API key to use Twente Bot"
    });

  try {
    const result = await update();
    res.json({ success: true, result });
  } catch (error) {
    res.status(500);
    res.json({ error });
  }
};
