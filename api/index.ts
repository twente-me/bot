import { NowRequest, NowResponse } from "@now/node";
import { update } from "../src/update";

export default async (req: NowRequest, res: NowResponse) => {
  try {
    const result = await update();
    res.json({ success: true, result });
  } catch (error) {
    res.status(500);
    res.json({ error });
  }
};
