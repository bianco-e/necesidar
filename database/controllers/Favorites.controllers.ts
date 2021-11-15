import pool from "../index";
import { mapResponse } from "../utils";

export default class UsersControllers {
  static async toggleFavorite(user_id: string, publication_id: string) {
    try {
      const res = await pool.query(
        `WITH d as (
          DELETE FROM favorite_publications
          WHERE user_id = ${user_id} AND publication_id  = ${publication_id}
          RETURNING user_id
      ), i as (
          INSERT INTO favorite_publications (user_id, publication_id)
          SELECT ${user_id}, ${publication_id}
          WHERE NOT EXISTS (SELECT 1 FROM d)
          RETURNING publication_id
      )
      SELECT * FROM i
      UNION ALL
      SELECT * FROM d`
      );
      return mapResponse(res.rows);
    } catch (e) {
      console.error(e);
    }
  }

  static async getUserFavorites(user_id: string) {
    try {
      const res = await pool.query(
        `SELECT p.*
        FROM favorite_publications fp
        LEFT JOIN publications p 
        ON fp.publication_id = p.id
        WHERE fp.user_id = ${user_id}`
      );
      return mapResponse(res.rows);
    } catch (e) {
      console.error(e);
    }
  }
}
