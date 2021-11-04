import pool from "../index";
import { mapResponse } from "../utils";

export default class PublicationsController {
  static async getMostRecentUrgentNeeds() {
    try {
      const res = await pool.query(
        `SELECT *
         FROM publications p 
         WHERE p.is_urgent = true
         ORDER BY p.created_at desc
         LIMIT 6`
      );
      return mapResponse(res.rows);
    } catch (e) {
      console.error(e);
    }
  }

  static async getPublicationsByType(publicationType?: number) {
    const optionalQuery =
      publicationType !== undefined
        ? `WHERE p.publication_type = ${publicationType}`
        : "";
    try {
      const res = await pool.query(
        `SELECT *
          FROM publications p
          ${optionalQuery} 
          ORDER BY p.created_at desc
          LIMIT 15`
      );
      return mapResponse(res.rows);
    } catch (e) {
      console.error(e);
    }
  }

  static async getAllPublicationsIds() {
    try {
      const res = await pool.query(`SELECT id FROM publications p`);
      return mapResponse(res.rows);
    } catch (e) {
      console.error(e);
    }
  }

  static async getPublicationById(id: string) {
    try {
      const res = await pool.query(
        `SELECT *
         FROM publications p 
         WHERE p.id = ${id}`
      );
      return mapResponse(res.rows)[0];
    } catch (e) {
      console.error(e);
    }
  }

  static async getPublicationsByUserId(
    userId: number,
    publicationType?: number
  ) {
    const optionalQuery =
      publicationType !== undefined
        ? `AND p.publication_type = ${publicationType}`
        : "";
    try {
      const res = await pool.query(
        `SELECT *
          FROM publications p
          WHERE p.user_id = ${userId}
          ${optionalQuery} 
          ORDER BY p.created_at desc`
      );
      return mapResponse(res.rows);
    } catch (e) {
      console.error(e);
    }
  }
}
