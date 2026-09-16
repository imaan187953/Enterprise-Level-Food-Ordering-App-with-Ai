import { Router } from "express";

import {
  adminGetUsers,
  adminGetUser,
  adminUpdateUserStatus,
} from "../controllers/user.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { requireAdmin } from "../middleware/role.middleware.js";

const router = Router();

/*
 * All routes in this file require:
 *
 * 1. Valid JWT
 * 2. Admin role
 */

router.use(
  authenticate,
  requireAdmin
);

/* =========================================================
   USER MANAGEMENT
========================================================= */

/**
 * Get all customers
 */
router.get(
  "/users",
  adminGetUsers
);

/**
 * Get customer by ID
 */
router.get(
  "/users/:id",
  adminGetUser
);

/**
 * Disable / Reactivate customer
 */
router.patch(
  "/users/:id/status",
  adminUpdateUserStatus
);

export default router;