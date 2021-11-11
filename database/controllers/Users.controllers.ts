import { SessionUser } from "../../interfaces";
import pool from "../index";
import { mapResponse } from "../utils";

export default class UsersControllers {
  static async getUserMe(userEmail: string) {
    try {
      const res = await pool.query(
        `SELECT * FROM users u
         WHERE p.email = ${userEmail}`
      );
      return mapResponse(res.rows);
    } catch (e) {
      console.error(e);
    }
  }

  static async createUserOrGetUserIfExists(user: SessionUser) {
    try {
      const res = await pool.query(
        `WITH s as (
          SELECT * FROM users
          WHERE email = '${user.email}'
      ), i as (
          INSERT INTO users (first_name , last_name , email, avatar, google_id, created_at)
          SELECT '${user.first_name}', '${user.last_name}', '${user.email}', '${user.image}', '${user.google_id}', 'NOW()'
          WHERE NOT EXISTS (select 1 from s)
          RETURNING *
      )
      SELECT * FROM i
      UNION ALL
      SELECT * FROM s`
      );
      console.log("res", res.rows);
      return res.rows[0];
    } catch (e) {
      console.error(e);
    }
  }
}
