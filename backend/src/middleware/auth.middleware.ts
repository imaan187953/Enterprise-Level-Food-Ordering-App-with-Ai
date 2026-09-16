import type {
  Request,
  Response,
  NextFunction,
} from "express";
import jwt from "jsonwebtoken";

import ApiError from "../utils/ApiError.js";
import { env } from "../config/env.js";
import type { UserRole } from "../types/user.types.js";
import type { AuthenticatedUser } from "../types/auth.types.js";

export interface AuthenticatedRequest
  extends Request {
  user?: AuthenticatedUser;
}

export const authenticate = (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
): void => {
  const authorization =
    req.headers.authorization;

  if (
    !authorization ||
    !authorization.startsWith("Bearer ")
  ) {
    next(
      new ApiError(
        401,
        "Authentication required"
      )
    );

    return;
  }

  const token = authorization.split(" ")[1];

  if (!token) {
    next(
      new ApiError(
        401,
        "Access token is missing"
      )
    );

    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      env.jwtAccessSecret
    ) as {
      userId: string;
      role: UserRole;
    };

    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    };

    next();
  } catch {
    next(
      new ApiError(
        401,
        "Invalid or expired access token"
      )
    );
  }
};