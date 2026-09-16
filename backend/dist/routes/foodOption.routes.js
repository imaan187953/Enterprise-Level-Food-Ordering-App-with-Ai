import { Router } from "express";
import { create, getAll, getById, getByGroup, update, updateStatus, remove, } from "../controllers/foodOption.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { requireAdmin } from "../middleware/role.middleware.js";
const router = Router();
// Public routes
router.get("/", getAll);
router.get("/food/:foodId/group/:groupName", getByGroup);
router.get("/:id", getById);
// Admin routes
router.use(authenticate, requireAdmin);
router.post("/", create);
router.patch("/:id", update);
router.patch("/:id/status", updateStatus);
router.delete("/:id", remove);
export default router;
//# sourceMappingURL=foodOption.routes.js.map