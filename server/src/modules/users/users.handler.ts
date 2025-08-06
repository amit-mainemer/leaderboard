import { logger } from "../../services";
import { createUser, updateUserScore } from "./user.model";
import { addUserToLeaderboard, updateUserScore as updateUserScoreInCache } from "../leaderboard/leaderboard.cache";
import { Action } from "@common/types";

export const handleUserCreation = async (name: string, score: number, image: string) => {
    const newUserId = await createUser(name, score, image);
    await addUserToLeaderboard(newUserId, score, name, image);
    logger.info("[UserHandler] User created", { newUserId, name, score, image });
    return newUserId;
}

export const handleUserScoreUpdate = async (userId: number, amount: number, action: Action) => {
    const newScore = await updateUserScore(userId, amount, action);
    await updateUserScoreInCache(userId, newScore);
    logger.info("[UserHandler] User score updated", { userId, newScore });
    return newScore;
}