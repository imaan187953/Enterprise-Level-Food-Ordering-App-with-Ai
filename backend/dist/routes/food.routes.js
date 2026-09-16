import { Router } from "express";
import { create, getAll, getAvailable, getFeatured, getById, search, getByCategory, update, updateStatus, remove, } from "../controllers/food.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { requireAdmin } from "../middleware/role.middleware.js";
const router = Router();
// Public routes
router.get("/", getAll);
router.get("/available", getAvailable);
router.get("/featured", getFeatured);
router.get("/search", search);
router.get("/category/:categoryId", getByCategory);
router.get("/:id", getById);
// Admin routes
router.use(authenticate, requireAdmin);
router.post("/", create);
router.patch("/:id", update);
router.patch("/:id/status", updateStatus);
router.delete("/:id", remove);
export default router;
//# sourceMappingURL=food.routes.js.map