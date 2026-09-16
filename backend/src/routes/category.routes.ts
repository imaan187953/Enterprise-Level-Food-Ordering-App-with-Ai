import { Router } from "express";

import {
  create,
  getAll,
  getById,
  update,
  remove,
  updateStatus,
} from "../controllers/category.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { requireAdmin } from "../middleware/role.middleware.js";

const router = Router();

// Public routes
router.get("/", getAll);
router.get("/:id", getById);

// Admin routes
router.use(
  authenticate,
  requireAdmin
);

router.post("/", create);
router.patch("/:id", update);
router.delete("/:id", remove);
router.patch(
  "/:id/status",
  updateStatus
);

export default router;