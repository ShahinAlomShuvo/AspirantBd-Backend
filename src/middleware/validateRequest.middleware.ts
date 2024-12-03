import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";

const validateRequest = (
  localSchema: AnyZodObject,
  externalSchema: AnyZodObject
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Determine which schema to use based on the provider
      const provider = req.body.provider || "local";
      const schema = provider === "local" ? localSchema : externalSchema;

      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Validation error",
          errors: error.errors,
        });
      }
      next(error);
    }
  };
};

export default validateRequest;
