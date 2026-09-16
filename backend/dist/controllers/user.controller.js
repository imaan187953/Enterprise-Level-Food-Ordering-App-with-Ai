import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { updateProfileSchema, changeAvatarSchema, changePhoneSchema, updateUserStatusSchema, } from "../validations/user.validation.js";
import { getUserProfile, updateUserProfile, changeUserAvatar, changeUserPhone, updateOwnAccountStatus, getAllUsers, getUserById, updateUserStatus, } from "../services/user.service.js";
/* =========================================================
   CUSTOMER
========================================================= */
/**
 * GET /api/v1/user/profile
 */
export const getProfile = asyncHandler(async (req, res) => {
    if (!req.user) {
        throw new ApiError(401, "Authentication required");
    }
    const user = await getUserProfile(req.user.userId);
    res.status(200).json({
        success: true,
        message: "Profile retrieved successfully",
        data: {
            user,
        },
    });
});
/**
 * PATCH /api/v1/user/profile
 */
export const updateProfile = asyncHandler(async (req, res) => {
    if (!req.user) {
        throw new ApiError(401, "Authentication required");
    }
    const result = updateProfileSchema.safeParse(req.body);
    if (!result.success) {
        throw new ApiError(400, "Validation failed", result.error.flatten().fieldErrors);
    }
    const user = await updateUserProfile(req.user.userId, {
        name: result.data.name,
        phone: result.data.phone,
    });
    res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        data: {
            user,
        },
    });
});
/**
 * PATCH /api/v1/user/avatar
 */
export const changeAvatar = asyncHandler(async (req, res) => {
    if (!req.user) {
        throw new ApiError(401, "Authentication required");
    }
    const result = changeAvatarSchema.safeParse(req.body);
    if (!result.success) {
        throw new ApiError(400, "Validation failed", result.error.flatten().fieldErrors);
    }
    const user = await changeUserAvatar(req.user.userId, result.data);
    res.status(200).json({
        success: true,
        message: "Avatar changed successfully",
        data: {
            user,
        },
    });
});
/**
 * PATCH /api/v1/user/phone
 */
export const changePhone = asyncHandler(async (req, res) => {
    if (!req.user) {
        throw new ApiError(401, "Authentication required");
    }
    const result = changePhoneSchema.safeParse(req.body);
    if (!result.success) {
        throw new ApiError(400, "Validation failed", result.error.flatten().fieldErrors);
    }
    const user = await changeUserPhone(req.user.userId, result.data);
    res.status(200).json({
        success: true,
        message: "Phone number changed successfully",
        data: {
            user,
        },
    });
});
/**
 * PATCH /api/v1/user/status
 */
export const updateOwnStatus = asyncHandler(async (req, res) => {
    if (!req.user) {
        throw new ApiError(401, "Authentication required");
    }
    const result = updateUserStatusSchema.safeParse(req.body);
    if (!result.success) {
        throw new ApiError(400, "Validation failed", result.error.flatten().fieldErrors);
    }
    const user = await updateOwnAccountStatus(req.user.userId, result.data.isActive);
    res.status(200).json({
        success: true,
        message: result.data.isActive
            ? "Account activated successfully"
            : "Account deactivated successfully",
        data: {
            user,
        },
    });
});
/* =========================================================
   ADMIN
========================================================= */
/**
 * GET /api/v1/admin/users
 */
export const adminGetUsers = asyncHandler(async (_req, res) => {
    const users = await getAllUsers();
    res.status(200).json({
        success: true,
        message: "Users retrieved successfully",
        data: {
            users,
            count: users.length,
        },
    });
});
/**
 * GET /api/v1/admin/users/:id
 */
export const adminGetUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    // Express params can be string | string[]
    if (!id || Array.isArray(id)) {
        throw new ApiError(400, "Invalid user ID");
    }
    const user = await getUserById(id);
    res.status(200).json({
        success: true,
        message: "User retrieved successfully",
        data: {
            user,
        },
    });
});
/**
 * PATCH /api/v1/admin/users/:id/status
 */
export const adminUpdateUserStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    // Express params can be string | string[]
    if (!id || Array.isArray(id)) {
        throw new ApiError(400, "Invalid user ID");
    }
    const result = updateUserStatusSchema.safeParse(req.body);
    if (!result.success) {
        throw new ApiError(400, "Validation failed", result.error.flatten().fieldErrors);
    }
    const user = await updateUserStatus(id, result.data);
    res.status(200).json({
        success: true,
        message: result.data.isActive
            ? "User reactivated successfully"
            : "User disabled successfully",
        data: {
            user,
        },
    });
});
//# sourceMappingURL=user.controller.js.map