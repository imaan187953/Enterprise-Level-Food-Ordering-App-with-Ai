import { Request, Response } from "express";

import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

import {
  refreshAccessToken,
  revokeRefreshToken,
} from "../services/token.service.js";

const getRefreshTokenFromRequest = (
  req: Request
): string | undefined => {
  const cookies = req.headers.cookie;

  if (cookies) {
    const refreshCookie = cookies
      .split(";")
      .map((cookie) => cookie.trim())
      .find((cookie) =>
        cookie.startsWith("refreshToken=")
      );

    if (refreshCookie) {
      return decodeURIComponent(
        refreshCookie.substring("refreshToken=".length)
      );
    }
  }

  // Temporary fallback so our current login response
  // can still be used while we transition to cookies.
  if (
    typeof req.body?.refreshToken === "string" &&
    req.body.refreshToken
  ) {
    return req.body.refreshToken;
  }

  return undefined;
};

export const refresh = asyncHandler(
  async (req: Request, res: Response) => {
    const refreshToken =
      getRefreshTokenFromRequest(req);

    if (!refreshToken) {
      throw new ApiError(
        401,
        "Refresh token is required"
      );
    }

    const accessToken =
      await refreshAccessToken(refreshToken);

    res.status(200).json({
      success: true,
      message: "Access token refreshed successfully",
      data: {
        accessToken,
      },
    });
  }
);

export const logout = asyncHandler(
  async (req: Request, res: Response) => {
    const refreshToken =
      getRefreshTokenFromRequest(req);

    if (refreshToken) {
      await revokeRefreshToken(refreshToken);
    }

    res.setHeader(
      "Set-Cookie",
      "refreshToken=; HttpOnly; Path=/api/v1/auth; Max-Age=0; SameSite=Lax"
    );

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  }
);