import { Router } from "express";

import {
  create,
  getMyOrders,
  getMyOrder,
  cancel,
  getAll,
  getById,
  updateStatus,
} from "../controllers/order.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { requireAdmin } from "../middleware/role.middleware.js";

const router = Router();

router.use(authenticate);

// Customer routes
router.post("/", create);
router.get("/my", getMyOrders);
router.get("/my/:id", getMyOrder);
router.patch(
  "/my/:id/cancel",
  cancel
);

// Admin routes
router.get(
  "/admin/all",
  requireAdmin,
  getAll
);

router.get(
  "/admin/:id",
  requireAdmin,
  getById
);

router.patch(
  "/admin/:id/status",
  requireAdmin,
  updateStatus
);

export default router;