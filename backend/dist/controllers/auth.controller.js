import bcrypt from "bcryptjs";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { registerSchema, loginSchema, reactivateSchema, } from "../validations/auth.validation.js";
import { registerUser, loginUser, reactivateUser, } from "../services/auth.service.js";
import User from "../models/User.js";
const setRefreshTokenCookie = (res, refreshToken) => {
    res.setHeader("Set-Cookie", `refreshToken=${encodeURIComponent(refreshToken)}; HttpOnly; Path=/api/v1/auth; Max-Age=604800; SameSite=Lax`);
};
/* =========================================================
   CUSTOMER AUTHENTICATION
========================================================= */
/**
 * Register
 * POST /api/v1/auth/register
 */
export const register = asyncHandler(async (req, res) => {
    const result = registerSchema.safeParse(req.body);
    if (!result.success) {
        throw new ApiError(400, "Validation failed", result.error.flatten().fieldErrors);
    }
    const data = await registerUser(result.data);
    setRefreshTokenCookie(res, data.tokens.refreshToken);
    res.status(201).json({
        success: true,
        message: "Account created successfully",
        data: {
            user: data.user,
            accessToken: data.tokens.accessToken,
        },
    });
});
/**
 * Login
 * POST /api/v1/auth/login
 */
export const login = asyncHandler(async (req, res) => {
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
        throw new ApiError(400, "Validation failed", result.error.flatten().fieldErrors);
    }
    const data = await loginUser(result.data);
    setRefreshTokenCookie(res, data.tokens.refreshToken);
    res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
            user: data.user,
            accessToken: data.tokens.accessToken,
        },
    });
});
/**
 * Get Current User
 * GET /api/v1/auth/me
 */
export const getCurrentUser = asyncHandler(async (req, res) => {
    if (!req.user) {
        throw new ApiError(401, "Authentication required");
    }
    const user = await User.findById(req.user.userId).select("-password -refreshToken");
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    if (!user.isActive) {
        throw new ApiError(403, "Your account has been deactivated");
    }
    res.status(200).json({
        success: true,
        message: "Current user retrieved successfully",
        data: {
            user: {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                isActive: user.isActive,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
        },
    });
});
/**
 * Update Profile
 * PATCH /api/v1/auth/profile
 */
export const updateProfile = asyncHandler(async (req, res) => {
    if (!req.user) {
        throw new ApiError(401, "Authentication required");
    }
    const { name, phone } = req.body;
    if (name !== undefined &&
        (typeof name !== "string" ||
            name.trim().length < 2)) {
        throw new ApiError(400, "Name must be at least 2 characters long");
    }
    if (phone !== undefined &&
        typeof phone !== "string") {
        throw new ApiError(400, "Phone must be a valid string");
    }
    if (name === undefined &&
        phone === undefined) {
        throw new ApiError(400, "No profile fields provided for update");
    }
    const updateData = {};
    if (name !== undefined) {
        updateData.name = name.trim();
    }
    if (phone !== undefined) {
        updateData.phone = phone.trim();
    }
    const user = await User.findByIdAndUpdate(req.user.userId, {
        $set: updateData,
    }, {
        new: true,
        runValidators: true,
    }).select("-password -refreshToken");
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    if (!user.isActive) {
        throw new ApiError(403, "Your account has been deactivated");
    }
    res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        data: {
            user: {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                isActive: user.isActive,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
        },
    });
});
/**
 * Change Password
 * PATCH /api/v1/auth/password
 */
export const changePassword = asyncHandler(async (req, res) => {
    if (!req.user) {
        throw new ApiError(401, "Authentication required");
    }
    const { currentPassword, newPassword, } = req.body;
    if (typeof currentPassword !== "string" ||
        !currentPassword) {
        throw new ApiError(400, "Current password is required");
    }
    if (typeof newPassword !== "string" ||
        newPassword.length < 8) {
        throw new ApiError(400, "New password must be at least 8 characters long");
    }
    if (currentPassword === newPassword) {
        throw new ApiError(400, "New password must be different from current password");
    }
    const user = await User.findById(req.user.userId).select("+password");
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    if (!user.isActive) {
        throw new ApiError(403, "Your account has been deactivated");
    }
    const passwordMatches = await bcrypt.compare(currentPassword, user.password);
    if (!passwordMatches) {
        throw new ApiError(401, "Current password is incorrect");
    }
    user.password = newPassword;
    // Invalidate the existing refresh token
    // so the old session cannot continue.
    user.set("refreshToken", null);
    await user.save();
    res.setHeader("Set-Cookie", "refreshToken=; HttpOnly; Path=/api/v1/auth; Max-Age=0; SameSite=Lax");
    res.status(200).json({
        success: true,
        message: "Password changed successfully. Please login again.",
    });
});
/* =========================================================
   ADMIN AUTHENTICATION
========================================================= */
/**
 * Admin Login
 * POST /api/v1/auth/admin/login
 */
export const adminLogin = asyncHandler(async (req, res) => {
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
        throw new ApiError(400, "Validation failed", result.error.flatten().fieldErrors);
    }
    const data = await loginUser(result.data);
    if (data.user.role !== "admin") {
        throw new ApiError(403, "Admin access required");
    }
    setRefreshTokenCookie(res, data.tokens.refreshToken);
    res.status(200).json({
        success: true,
        message: "Admin login successful",
        data: {
            user: data.user,
            accessToken: data.tokens.accessToken,
        },
    });
});
/**
 * Get Current Admin
 * GET /api/v1/auth/admin/me
 *
 * Authentication + admin role verification
 * is handled by middleware in auth.routes.ts.
 */
export const getCurrentAdmin = asyncHandler(async (req, res) => {
    if (!req.user) {
        throw new ApiError(401, "Authentication required");
    }
    const user = await User.findById(req.user.userId).select("-password -refreshToken");
    if (!user) {
        throw new ApiError(404, "Admin not found");
    }
    if (!user.isActive) {
        throw new ApiError(403, "Admin account has been deactivated");
    }
    if (user.role !== "admin") {
        throw new ApiError(403, "Admin access required");
    }
    res.status(200).json({
        success: true,
        message: "Admin authenticated successfully",
        data: {
            user: {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                isActive: user.isActive,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
        },
    });
});
/**
 * Reactivate Account
 * POST /api/v1/auth/reactivate
 */
export const reactivate = asyncHandler(async (req, res) => {
    const result = reactivateSchema.safeParse(req.body);
    if (!result.success) {
        throw new ApiError(400, "Validation failed", result.error.flatten().fieldErrors);
    }
    const user = await reactivateUser(result.data);
    res.status(200).json({
        success: true,
        message: "Account reactivated successfully",
        data: {
            user,
        },
    });
});
//# sourceMappingURL=auth.controller.js.map