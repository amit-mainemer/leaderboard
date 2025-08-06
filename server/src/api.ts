import { Router } from "express";
import userRouter from "./modules/users/user.router";
import leaderboardRouter from "./modules/leaderboard/leaderboard.router";

const apiRouter = Router();

apiRouter.use("/health", (req, res) => {
    res.send("OK");
});
apiRouter.use("/users", userRouter);
apiRouter.use("/leaderboard", leaderboardRouter)

export default apiRouter;
