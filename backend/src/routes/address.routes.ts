import { Router } from "express";

import {
  create,
  getAll,
  getById,
  update,
  setDefault,
  remove,
} from "../controllers/address.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.use(authenticate);

router.post("/", create);

router.get("/", getAll);

router.get("/:id", getById);

router.patch("/:id", update);

router.patch("/:id/default", setDefault);

router.delete("/:id", remove);

export default router;