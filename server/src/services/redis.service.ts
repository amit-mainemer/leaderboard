import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

class RedisService {
  private static instance: Redis;

  private constructor() {}

  public static getInstance(): Redis {
    if (!RedisService.instance) {
      RedisService.instance = new Redis({
        host: process.env.REDIS_HOST || "localhost",
        port: Number(process.env.REDIS_PORT) || 6379,
      });


      RedisService.instance.on("connect", () => {
        console.log("✅ Connected to Redis");
      });

      RedisService.instance.on("error", (err) => {
        console.error("❌ Redis connection error:", err);
      });
    }

    return RedisService.instance;
  }
}

export default RedisService;
