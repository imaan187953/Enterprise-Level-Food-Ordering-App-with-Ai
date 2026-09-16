import { Router, Response, NextFunction } from "express";

import {
  register,
  login,
  reactivate,
  getCurrentUser,
  updateProfile,
  changePassword,
  adminLogin,
  getCurrentAdmin,
} from "../controllers/auth.controller.js";

import {
  refresh,
  logout,
} from "../controllers/authSession.controller.js";

import {
  authenticate,
  AuthenticatedRequest,
} from "../middleware/auth.middleware.js";

import ApiError from "../utils/ApiError.js";

const router = Router();

/* =========================================================
   CUSTOMER AUTHENTICATION
========================================================= */

/**
 * Register
 */
router.post(
  "/register",
  register
);

/**
 * Login
 */
router.post(
  "/login",
  login
);

/**
 * Reactivate Account
 */
router.post(
  "/reactivate",
  reactivate
);

/**
 * Refresh Access Token
 */
router.post(
  "/refresh",
  refresh
);

/**
 * Logout
 */
router.post(
  "/logout",
  logout
);

/**
 * Get Current User
 */
router.get(
  "/me",
  authenticate,
  getCurrentUser
);

/**
 * Update Profile
 */
router.patch(
  "/profile",
  authenticate,
  updateProfile
);

/**
 * Change Password
 */
router.patch(
  "/password",
  authenticate,
  changePassword
);

/* =========================================================
   ADMIN AUTHENTICATION
========================================================= */

/**
 * Admin Login
 */
router.post(
  "/admin/login",
  adminLogin
);

/**
 * Admin Role Verification Middleware
 *
 * authenticate:
 *   Verifies JWT and attaches req.user
 *
 * requireAdmin:
 *   Verifies that authenticated user has admin role
 */
const requireAdmin = (
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

/**
 * Admin Authentication Check
 */
router.get(
  "/admin/me",
  authenticate,
  requireAdmin,
  getCurrentAdmin
);

export default router;
