import { Router, Request, Response } from "express";
import { fetchLeaderboard, fetchLeaderboardForUser } from "./leaderboard.handler";
import { getLeaderboardSchema, getUserRankSchema } from "./leaderboard.validations";
import { validate } from "../../middlewares/validation.middleware";
import { asyncHandler } from "../../middlewares/error.middleware";
import { isString } from "../../type-validations";


const LeaderboardRouter = Router();

LeaderboardRouter.get("/",
    validate(getLeaderboardSchema),
    asyncHandler(async (req: Request, res: Response) => {
        const { limit, page } = req.query;

        if (!isString(limit) || !isString(page)) {
            return res.status(400).json({
                error: "Invalid query parameters"
            });
        }

        const leaderboardData = await fetchLeaderboard(parseInt(limit), parseInt(page));
        res.status(200).json(leaderboardData);
    })
);

LeaderboardRouter.get(
    "/user/:userId",
    validate(getUserRankSchema),
    asyncHandler(async (req: Request, res: Response) => {
        const { userId } = req.params;
        const data = await fetchLeaderboardForUser(parseInt(userId), 100);
        res.status(200).json(data);
    })
);

export default LeaderboardRouter;
