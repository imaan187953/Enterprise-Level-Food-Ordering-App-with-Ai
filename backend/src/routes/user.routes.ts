import { Router } from "express";

import {
  getProfile,
  updateProfile,
  changeAvatar,
  changePhone,
  updateOwnStatus,
} from "../controllers/user.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

/* =========================================================
   CUSTOMER USER ROUTES
========================================================= */

router.get(
  "/profile",
  authenticate,
  getProfile
);

router.patch(
  "/profile",
  authenticate,
  updateProfile
);

router.patch(
  "/avatar",
  authenticate,
  changeAvatar
);

router.patch(
  "/phone",
  authenticate,
  changePhone
);

router.patch(
  "/status",
  authenticate,
  updateOwnStatus
);

export default router;