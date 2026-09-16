import { Router } from "express";

import {
  search,
  save,
  getAll,
  getById,
  updateUsage,
  remove,
} from "../controllers/image.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { requireAdmin } from "../middleware/role.middleware.js";

const router = Router();

// All image management routes require admin access
router.use(
  authenticate,
  requireAdmin
);

router.get("/search", search);
router.get("/", getAll);
router.get("/:id", getById);

router.post("/", save);

router.patch(
  "/:id/usage",
  updateUsage
);

router.delete(
  "/:id",
  remove
);

export default router;