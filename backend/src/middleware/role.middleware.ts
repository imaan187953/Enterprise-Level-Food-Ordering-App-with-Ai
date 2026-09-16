import { Response, NextFunction } from "express";

import ApiError from "../utils/ApiError.js";

import { AuthenticatedRequest } from "./auth.middleware.js";

export const requireAdmin = (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
): void => {
  if (!req.user) {
    return next(
      new ApiError(
        401,
        "Authentication required"
      )
    );
  }

  if (req.user.role !== "admin") {
    return next(
      new ApiError(
        403,
        "Admin access required"
      )
    );
  }

  next();
};