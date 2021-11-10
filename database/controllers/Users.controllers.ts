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

  static async createUser(user: {
    name: string;
    email: string;
    image: string;
  }) {
    try {
      const res = await pool.query(
        `INSERT INTO users (first_name , last_name , email, avatar)
        VALUES ('${user.name}', '${user.name}', '${user.email}', '${user.image}')
        ON CONFLICT (email) DO NOTHING`
      );
      return {
        userExists: res.rowCount === 1,
      };
    } catch (e) {
      console.error(e);
    }
  }
}
