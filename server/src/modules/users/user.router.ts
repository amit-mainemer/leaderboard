import { Router } from "express";
import { createUser, updateUserScore } from "./user.model";
import { validate } from "../../middlewares/validation.middleware"
import { createUserSchema, updateScoreSchema } from "./user.validations";

const usersRouter = Router();


usersRouter.post("/users", validate(createUserSchema), async (req, res) => {
  const { name, score } = req.body;
  const newUserId = await createUser(name, score);
  res.status(201).json({ newUserId });
});

usersRouter.put("/users/:id", validate(updateScoreSchema), async (req, res) => {
  const { score, action } = req.body;
  const newScore = await updateUserScore(Number(req.params.id), score, action);
  res.json({ newScore });
});

export default usersRouter;
