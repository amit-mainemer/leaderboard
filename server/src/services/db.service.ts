import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

class DatabaseService {
  private static instance: Pool;

  private constructor() {}

  public static getInstance(): Pool {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new Pool({
        host: process.env.DB_HOST || "localhost",
        port: Number(process.env.DB_PORT) || 5432,
        user: process.env.DB_USER || "postgres",
        password: process.env.DB_PASSWORD || "postgres",
        database: process.env.DB_NAME || "leaderboard",
      });

  

      DatabaseService.instance.on("connect", () => {
        console.log("✅ Connected to PostgreSQL");
      });

      DatabaseService.instance.on("error", (err) => {
        console.error("❌ PostgreSQL connection error:", err);
        process.exit(1);
      });
    }

    return DatabaseService.instance;
  }
}

export default DatabaseService;
