import Joi from "joi";

export const getLeaderboardSchema = Joi.object({
    limit: Joi.number().integer().min(1).max(1000).default(100),
    page: Joi.number().integer().min(0).default(0),
});

export const getUserRankSchema = Joi.object({
    userId: Joi.number().integer().min(1).required()
});

export interface GetUserRankParams {
    userId: string;
}
