import { Router } from "express";
import { get, add, update, remove, clear, } from "../controllers/cart.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
const router = Router();
router.use(authenticate);
router.get("/", get);
router.post("/items", add);
router.patch("/items/:itemId", update);
router.delete("/items/:itemId", remove);
router.delete("/", clear);
export default router;
//# sourceMappingURL=cart.routes.js.map