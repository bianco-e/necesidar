import type { NextApiRequest, NextApiResponse } from "next";
import ActionsControllers from "../../../database/controllers/Actions.controllers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.body) {
    const body = JSON.parse(req.body);
    const { action_type, user_id, utm, user_agent } = body;
    try {
      const response = await ActionsControllers.trackAction(
        action_type,
        utm,
        user_id,
        user_agent
      );
      if (response && response > 0) {
        res
          .status(200)
          .json(JSON.stringify({ action: action_type, status: "ADDED" }));
      }
    } catch (e) {
      console.error("Error tracking user action =>", e);
      res.status(500).send(e);
    }
  }
}
