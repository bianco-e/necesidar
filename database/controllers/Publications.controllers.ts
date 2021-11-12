import { PublicationsFilters } from "../../interfaces";
import pool from "../index";
import { mapResponse } from "../utils";
import { parseFiltersToSQLQuery } from "./utils";

const PUBLICATIONS_BASE_QUERY = `
SELECT p.*, u.first_name as user_first_name, u.last_name as user_last_name, u.image as user_image
FROM publications p 
LEFT JOIN users u 
ON p.user_id = u.user_id`;

export default class PublicationsController {
  static async getMostRecentUrgentNeeds() {
    try {
      const res = await pool.query(
        `${PUBLICATIONS_BASE_QUERY} 
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
        `${PUBLICATIONS_BASE_QUERY}
          ${optionalQuery} 
          ORDER BY p.created_at desc
          LIMIT 12`
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
        `${PUBLICATIONS_BASE_QUERY}
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
        `${PUBLICATIONS_BASE_QUERY}
          WHERE p.user_id = ${userId}
          ${optionalQuery} 
          ORDER BY p.created_at desc`
      );
      return mapResponse(res.rows);
    } catch (e) {
      console.error(e);
    }
  }

  static async getFavoritesByUserId(userId: number) {
    try {
      const res = await pool.query(
        `${PUBLICATIONS_BASE_QUERY}
          WHERE p.user_id = ${userId}
          ORDER BY p.created_at desc`
      );
      return mapResponse(res.rows);
    } catch (e) {
      console.error(e);
    }
  }

  static async getFilteredPublications(
    filters: PublicationsFilters,
    publicationType: number,
    sortBy?: string
  ) {
    const filtersQuery = parseFiltersToSQLQuery(filters);
    const sortQuery = sortBy ? `${sortBy}` : "p.created_at desc";
    try {
      const res = await pool.query(
        `${PUBLICATIONS_BASE_QUERY}
          WHERE p.publication_type = ${publicationType}
          ${filtersQuery} 
          ORDER BY ${sortQuery}`
      );
      return mapResponse(res.rows);
    } catch (e) {
      console.error(e);
    }
  }
}
