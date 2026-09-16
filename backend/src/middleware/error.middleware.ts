import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/ApiError.js";

export const errorMiddleware = (
  error: Error | ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error(error);

  if (error instanceof ApiError) {
    const response: {
      success: boolean;
      message: string;
      errors?: unknown;
    } = {
      success: false,
      message: error.message,
    };

    if (error.errors !== undefined) {
      response.errors = error.errors;
    }

    res.status(error.statusCode).json(response);
    return;
  }

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};