import { SessionUser } from "../../interfaces";
import pool from "../index";
import { mapResponse } from "../utils";

export default class UsersControllers {
  static async getUserMe(userEmail: string) {
    try {
      const res = await pool.query(
        `SELECT * FROM users u
         WHERE u.email = ${userEmail}`
      );
      return mapResponse(res.rows);
    } catch (e) {
      console.error(e);
    }
  }

  static async createUserOrGetUserIfExists(user?: SessionUser) {
    if (!user) return;
    if (!user.name || !user.email) return;
    try {
      const res = await pool.query(
        `WITH s as (
          SELECT * FROM users
          WHERE email = '${user.email}'
      ), i as (
          INSERT INTO users (first_name , last_name , email, image, google_id, created_at)
          SELECT '${user.first_name}', '${user.last_name}', '${user.email}', '${user.image}', '${user.google_id}', 'NOW()'
          WHERE NOT EXISTS (SELECT 1 FROM s)
          RETURNING *
      )
      SELECT * FROM i
      UNION ALL
      SELECT * FROM s`
      );
      return res.rows[0];
    } catch (e) {
      console.error(e);
    }
  }

  static async updateUserContactColumns(
    user_id: number,
    province: string,
    city: string,
    phone: string,
    can_move: boolean
  ) {
    try {
      const res = await pool.query(
        `UPDATE users u
        SET province = '${province}',
        city = '${city}',
        phone = '${phone}',
        can_move = ${can_move}
        WHERE u.user_id = ${user_id}`
      );
      return mapResponse(res.rows);
    } catch (e) {
      console.error(e);
    }
  }
}
