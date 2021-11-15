import type { NextApiRequest, NextApiResponse } from "next";
import FavoritesControllers from "../../../database/controllers/Favorites.controllers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.body) {
    const body = JSON.parse(req.body);
    const { user_id, publication_id } = body;
    try {
      const response: { publication_id: number }[] | undefined =
        await FavoritesControllers.toggleFavorite(user_id, publication_id);
      if (response !== undefined) {
        const status =
          response[0].publication_id &&
          response[0].publication_id === publication_id
            ? "ADDED FAVORITE"
            : "REMOVED FAVORITE";
        res
          .status(200)
          .json(JSON.stringify({ publication: publication_id, status }));
      }
    } catch (e) {
      console.error("Error toggling favorite publication =>", e);
      res.status(500).send(e);
    }
  }
}
