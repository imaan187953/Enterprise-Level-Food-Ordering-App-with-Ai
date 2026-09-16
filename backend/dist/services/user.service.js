import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
/* =========================================================
   HELPER
========================================================= */
const formatUser = (user) => {
    return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
};
/* =========================================================
   GET PROFILE
========================================================= */
export const getUserProfile = async (userId) => {
    const user = await User.findById(userId).select("-password -refreshToken");
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    if (!user.isActive) {
        throw new ApiError(403, "Your account has been deactivated");
    }
    return formatUser(user);
};
/* =========================================================
   UPDATE PROFILE
========================================================= */
export const updateUserProfile = async (userId, data) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    if (!user.isActive) {
        throw new ApiError(403, "Your account has been deactivated");
    }
    if (data.name !== undefined) {
        user.name = data.name.trim();
    }
    if (data.phone !== undefined) {
        user.phone = data.phone.trim();
    }
    await user.save();
    return formatUser(user);
};
/* =========================================================
   CHANGE AVATAR
========================================================= */
export const changeUserAvatar = async (userId, data) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    if (!user.isActive) {
        throw new ApiError(403, "Your account has been deactivated");
    }
    user.avatar = data.avatar;
    await user.save();
    return formatUser(user);
};
/* =========================================================
   CHANGE PHONE
========================================================= */
export const changeUserPhone = async (userId, data) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    if (!user.isActive) {
        throw new ApiError(403, "Your account has been deactivated");
    }
    user.phone = data.phone.trim();
    await user.save();
    return formatUser(user);
};
/* =========================================================
   ACTIVATE / DEACTIVATE OWN ACCOUNT
========================================================= */
export const updateOwnAccountStatus = async (userId, isActive) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    /*
     * Admin accounts cannot change their status
     * through the customer endpoint.
     */
    if (user.role === "admin") {
        throw new ApiError(403, "Admin account status cannot be changed here");
    }
    user.isActive = isActive;
    /*
     * If the account is being deactivated,
     * invalidate the refresh token.
     */
    if (!isActive) {
        user.set("refreshToken", null);
    }
    await user.save();
    return formatUser(user);
};
/* =========================================================
   ADMIN - GET ALL USERS
========================================================= */
export const getAllUsers = async () => {
    const users = await User.find({
        role: "customer",
    })
        .select("-password -refreshToken")
        .sort({ createdAt: -1 });
    return users.map(formatUser);
};
/* =========================================================
   ADMIN - GET USER BY ID
========================================================= */
export const getUserById = async (userId) => {
    const user = await User.findById(userId).select("-password -refreshToken");
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    return formatUser(user);
};
/* =========================================================
   ADMIN - UPDATE USER STATUS
========================================================= */
export const updateUserStatus = async (userId, data) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    /*
     * Prevent admin from disabling another admin
     * through the customer management endpoint.
     */
    if (user.role === "admin") {
        throw new ApiError(403, "Admin accounts cannot be managed here");
    }
    user.isActive = data.isActive;
    /*
     * If the user is being deactivated,
     * invalidate their refresh token.
     */
    if (!data.isActive) {
        user.set("refreshToken", null);
    }
    await user.save();
    return formatUser(user);
};
//# sourceMappingURL=user.service.js.map