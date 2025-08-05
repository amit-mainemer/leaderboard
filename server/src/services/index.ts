import RedisService from "./redis.service";
import LoggerService from "./logger.service";
import prisma from "./prisma.service";

export const db = prisma
export const redis = RedisService.getInstance();
export const logger = LoggerService;
