import type { UTM } from "../../interfaces";
import pool from "../index";
const dotenv = require("dotenv");
dotenv.config();

const env = process.env.NODE_ENV;
export default class ActionsControllers {
  static async trackAction(
    action_type: string,
    utm: UTM,
    user_id?: number,
    user_agent?: string
  ): Promise<number | undefined> {
    if (env === "development") return;
    const { utm_source, utm_medium, utm_campaign } = utm;
    try {
      const res = await pool.query(
        `INSERT INTO tracking_actions (action_type, user_id, utm_source, utm_medium, utm_campaign, user_agent, created_at)
        VALUES ('${action_type}', ${user_id || null}, ${
          utm_source ? `'${utm_source}'` : null
        }, ${utm_medium ? `'${utm_medium}'` : null}, ${
          utm_campaign ? `'${utm_campaign}'` : null
        }, ${user_agent ? `'${user_agent}'` : null}, now())`
      );
      return res.rowCount;
    } catch (e) {
      console.error(e);
    }
  }
}
