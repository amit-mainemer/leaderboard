import { logger } from "../../services";
import { getUser, getUsersTotalCount } from "../users/user.model";
import { getLeaderboard as getLeaderboardFromDB } from "./leaderboard.model";
import {
    getLeaderboard as getLeaderboardFromCache,
    getLeaderboardUser
} from "./leaderboard.cache";
import { LeaderboardResponse, UserRankResponse } from "@common/types";
import { isUser } from "../../type-validations";

export const fetchLeaderboard = async (limit: number = 1000, page: number = 0): Promise<LeaderboardResponse> => {
    logger.debug(`[LeaderboardHandler] Attempting to fetch leaderboard from cache with limit: ${limit}, page: ${page}`);

    const start = limit * page;
    const end = start + limit - 1;
    const cachedData = await getLeaderboardFromCache(start, end);

    if (cachedData && cachedData.length > 0) {
        logger.debug(`[LeaderboardHandler] Leaderboard data found in cache, returning ${cachedData.length} users`);
        const total_users = await getUsersTotalCount()

        return {
            users: cachedData,
            total_users,
            page
        };
    }

    logger.debug("[LeaderboardHandler] data not found in cache, fetching from database");
    const dbData = await getLeaderboardFromDB(limit, page);

    logger.debug(`[LeaderboardHandler] Successfully fetched leaderboard from database `);
    return dbData;
};


export const fetchLeaderboardForUser = async (userId: number, margin: number = 100): Promise<UserRankResponse> => {
    logger.debug(`[LeaderboardHandler] Fetching leaderboard for user ${userId} with margin ${margin}`);

    const user = await getUser(userId);
    if (!isUser(user)) {
        throw new Error("User not found");
    }

    const { rank, score } = await getLeaderboardUser(userId);


    if (rank == null) {
        throw new Error("User rank not found");
    }

    const totalUsers = await getUsersTotalCount();

    const start = rank - margin >= 0 ? rank - margin : 0;
    const end = rank + margin > totalUsers ? totalUsers : rank + margin;

    const leaderboard = await getLeaderboardFromCache(start, end);

    return {
        leaderboard,
        total_users: totalUsers,
        user: {
            ...user,
            rank,
            score
        },

    }
    /// return the userLeaderboarde
};
