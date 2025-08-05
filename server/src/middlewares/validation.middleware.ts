import { Request, Response, NextFunction } from "express";
import Joi from "joi";

/**
 * Middleware to validate request data using Joi
 * @param schema Joi schema to validate
 * @param property Which part of the request to validate: "body" | "query" | "params"
 */
export function validate(
  schema: Joi.ObjectSchema,
  property: "body" | "query" | "params" = "body"
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      allowUnknown: false,
      stripUnknown: true, 
    });

    if (error) {
      return res.status(400).json({
        error: error.details.map((d) => d.message).join(", "),
      });
    }

    req[property] = value;
    next();
  };
}
