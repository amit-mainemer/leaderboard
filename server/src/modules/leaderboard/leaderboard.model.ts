import prisma from "../../services/prisma.service";
import { LeaderboardUser, LeaderboardResponse, UserRankResponse } from "@common/types";

export async function getLeaderboard(
    limit: number = 1000,
    page: number = 0,
): Promise<LeaderboardResponse> {
    const skip = page * limit;

    const total_users = await prisma.user.count();

    const usersWithScores = await prisma.user.findMany({
        include: {
            score: true
        },
        orderBy: {
            score: {
                score: "desc"
            }
        },
        skip,
        take: limit
    });

    const users: LeaderboardUser[] = usersWithScores.map((user, index) => ({
        id: user.id,
        username: user.username,
        score: user.score?.score || 0,
        rank: skip + index + 1,
        createdAt: user.createdAt,
        imageUrl: user.imageUrl || undefined
    }));

    return {
        users,
        total_users,
        page
    };
}

export async function getUserRank(userId: number): Promise<any> {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            score: true
        }
    });

    if (!user) {
        return null;
    }

    const rank = await prisma.user.count({
        where: {
            score: {
                score: {
                    gt: user.score?.score || 0
                }
            }
        }
    });

    const leaderboardUser: LeaderboardUser = {
        id: user.id,
        username: user.username,
        score: user.score?.score || 0,
        rank: rank + 1,
        createdAt: user.createdAt,
        imageUrl: user.imageUrl || undefined
    };

    return {
        user: leaderboardUser
    };
}
