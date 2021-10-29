// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PublicationData } from "../../interfaces";
import mocked_publications from "../../mocked_publications.json";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<PublicationData[]>
) {
  res.status(200).json(mocked_publications);
}
