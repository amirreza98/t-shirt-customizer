import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

// ساخت Pool اتصال
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // مهم برای Supabase
});

pool.on("connect", () => {
    console.log("Connected to the database");
});

pool.on("error", (err) => {
    console.error("Database error", err);
});

export default pool;
