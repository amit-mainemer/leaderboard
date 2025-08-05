import { Router } from "express";
import userRouter from "./modules/users/user.router";

const apiRouter = Router();

apiRouter.use("/users", userRouter);
// apiRouter.use("/leaderboard", leaderboardRouter)

export default apiRouter;
