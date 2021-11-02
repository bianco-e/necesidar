const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const LICENSE = {
  connectionString: process.env.PG_URI,
  ssl: { rejectUnauthorized: false },
};

const pool = new Pool(LICENSE);

const mapResponse = (rows: any[]) => {
  if (!rows) {
    console.log("undefined rows", rows);
  }
  return rows.map((r: any) => {
    if (r.created_at !== undefined) {
      return { ...r, created_at: r.created_at.getTime() };
    } else return r;
  });
};

export const getMostRecentUrgentNeeds = async () => {
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
};

export const getPublicationsByType = async (publicationType?: number) => {
  try {
    const res = await pool.query(
      `SELECT *
      FROM publications p
      ${
        publicationType !== undefined
          ? `WHERE p.publication_type = ${publicationType}`
          : ""
      } 
      ORDER BY p.created_at desc
      LIMIT 15`
    );
    return mapResponse(res.rows);
  } catch (e) {
    console.error(e);
  }
};

export const getAllPublicationsIds = async () => {
  try {
    const res = await pool.query(`SELECT id FROM publications p`);
    return mapResponse(res.rows);
  } catch (e) {
    console.error(e);
  }
};

export const getPublicationById = async (id: string) => {
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
};

export const getPublicationsByUserId = async (
  userId: number,
  publicationType?: number
) => {
  try {
    const res = await pool.query(
      `SELECT *
      FROM publications p
      WHERE p.user_id = ${userId}
      ${
        publicationType !== undefined
          ? `AND p.publication_type = ${publicationType}`
          : ""
      } 
      ORDER BY p.created_at desc`
    );
    return mapResponse(res.rows);
  } catch (e) {
    console.error(e);
  }
};
