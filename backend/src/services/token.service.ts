import jwt from "jsonwebtoken";

import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import { env } from "../config/env.js";
import { AuthTokens } from "../types/auth.types.js";
import { UserRole } from "../types/user.types.js";

interface AccessTokenPayload {
  userId: string;
  role: UserRole;
}

interface RefreshTokenPayload {
  userId: string;
}

export const generateTokens = (
  userId: string,
  role: UserRole
): AuthTokens => {
  const accessToken = jwt.sign(
    {
      userId,
      role,
    },
    env.jwtAccessSecret,
    {
      expiresIn: "15m",
    }
  );

  const refreshToken = jwt.sign(
    {
      userId,
    },
    env.jwtRefreshSecret,
    {
      expiresIn: "7d",
    }
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const verifyRefreshToken = (
  refreshToken: string
): RefreshTokenPayload => {
  try {
    return jwt.verify(
      refreshToken,
      env.jwtRefreshSecret
    ) as RefreshTokenPayload;
  } catch {
    throw new ApiError(
      401,
      "Invalid or expired refresh token"
    );
  }
};

export const refreshAccessToken = async (
  refreshToken: string
): Promise<string> => {
  const decoded = verifyRefreshToken(refreshToken);

  const user = await User.findById(decoded.userId).select(
    "+refreshToken"
  );

  if (!user) {
    throw new ApiError(401, "User not found");
  }

  if (!user.isActive) {
    throw new ApiError(
      403,
      "Your account has been deactivated"
    );
  }

  if (
    !user.refreshToken ||
    user.refreshToken !== refreshToken
  ) {
    throw new ApiError(
      401,
      "Refresh token has been revoked"
    );
  }

  const newAccessToken = jwt.sign(
    {
      userId: user._id.toString(),
      role: user.role,
    },
    env.jwtAccessSecret,
    {
      expiresIn: "15m",
    }
  );

  return newAccessToken;
};

export const revokeRefreshToken = async (
  refreshToken: string
): Promise<void> => {
  try {
    const decoded = verifyRefreshToken(refreshToken);

    await User.findByIdAndUpdate(decoded.userId, {
      $unset: {
        refreshToken: 1,
      },
    });
  } catch {
    // Logout should remain successful even if
    // the refresh token is already invalid.
  }
};