import type { NextApiRequest, NextApiResponse } from "next";
import UsersControllers from "../../../database/controllers/Users.controllers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.body) {
    const body = JSON.parse(req.body);
    const { user_id, province, city, phone, can_move } = body;
    try {
      const response = await UsersControllers.updateUserContactColumns(
        user_id,
        province,
        city,
        phone,
        can_move
      );
      res
        .status(200)
        .json(JSON.stringify({ user: user_id, status: "UPDATED" }));
    } catch (e) {
      console.error("Error updating user contact columns =>", e);
      res.status(500).send(e);
    }
  }
}
