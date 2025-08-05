import Joi from "joi";

export const createUserSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  score: Joi.number().integer().min(0).required(),
});

export const updateScoreSchema = Joi.object({
  score: Joi.number().integer().min(0).required(),
  action: Joi.string().valid("add", "remove").required(),
});
