import type { NextApiRequest, NextApiResponse } from "next";
import PublicationsController from "../../../database/controllers/Publications.controllers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.body) {
    const body = JSON.parse(req.body);
    const { filters, publication_type } = body;
    try {
      const response = await PublicationsController.getFilteredPublications(
        filters,
        publication_type
      );
      res.status(200).json(JSON.stringify(response));
    } catch (e) {
      console.error("Error getting filtered publications =>", e);
    }
  }
}
