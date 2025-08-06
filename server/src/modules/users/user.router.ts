import { Router, Request, Response } from "express";
import { validate } from "../../middlewares/validation.middleware"
import { createUserSchema, updateScoreSchema } from "./user.validations";
import { asyncHandler } from "../../middlewares/error.middleware";
import { handleUserCreation, handleUserScoreUpdate } from "./users.handler";

const usersRouter = Router();

usersRouter.post("/", validate(createUserSchema), asyncHandler(async (req: Request, res: Response) => {
  const { name, score, image  } = req.body;
  const newUserId = await handleUserCreation(name, score, image);
  res.status(201).json({ newUserId });
}));

usersRouter.put("/:id", validate(updateScoreSchema), asyncHandler(async (req: Request, res: Response) => {
  const { amount, action } = req.body;
  const { id } = req.params;
  const newScore = await handleUserScoreUpdate(parseInt(id), amount, action);
  res.status(200).json({ newScore });
}));

export default usersRouter;
