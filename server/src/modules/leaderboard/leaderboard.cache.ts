import { redis } from "../../services";
import { LeaderboardUser } from "@common/types";

const LEADERBOARD_KEY = "leaderboard";

export async function getLeaderboard(start: number, end: number): Promise<LeaderboardUser[]> {
    const data = await redis.zrevrange(LEADERBOARD_KEY, start, end, "WITHSCORES");
    const results = [];


    for (let i = 0; i < data.length; i += 2) {
        const userId = data[i];
        const score = Number(data[i + 1]);
        const redisRank = await redis.zrevrank(LEADERBOARD_KEY, userId);
        const [username, imageUrl] = await redis.hmget(`user:${userId}`, "username", "imageUrl");
        results.push({ 
            rank: redisRank === null ? null : redisRank + 1, 
            id: Number(userId), 
            username: username || "Unknown", 
            score,
            imageUrl: imageUrl || undefined
        });
    }

    return results;
}

export async function updateAllLeaderboard(users: LeaderboardUser[]) {
    await redis.del(LEADERBOARD_KEY);

    const pipeline = redis.multi();
    for (const user of users) {
        pipeline.zadd(LEADERBOARD_KEY, user.score, String(user.id));
        pipeline.hmset(`user:${user.id}`, {
            username: user.username,
            imageUrl: user.imageUrl || "",
        });
    }
    await pipeline.exec();
}

export async function addUserToLeaderboard(userId: number, score: number, username: string, imageUrl?: string) {
    const pipeline = redis.multi();
    pipeline.zadd(LEADERBOARD_KEY, score, String(userId));
    pipeline.hmset(`user:${userId}`, { 
        username,
        imageUrl: imageUrl || ""
    });
    await pipeline.exec();
}


export async function updateUserScore(userId: number, score: number) {
    await redis.zadd(LEADERBOARD_KEY, score, String(userId));
}

export async function getLeaderboardUser(userId: number): Promise<{
    rank: number | null, score: number
}> {
    const score = await redis.zscore(LEADERBOARD_KEY, String(userId));
    const rank = await redis.zrevrank(LEADERBOARD_KEY, String(userId));

    return {
        rank: rank === null ? null : rank + 1,
        score: score ? parseInt(score) : 0
    };
}
