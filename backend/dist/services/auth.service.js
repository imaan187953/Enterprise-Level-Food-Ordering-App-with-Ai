import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import { env } from "../config/env.js";
const generateTokens = (userId, role) => {
    const accessToken = jwt.sign({
        userId,
        role,
    }, env.jwtAccessSecret, {
        expiresIn: "15m",
    });
    const refreshToken = jwt.sign({
        userId,
    }, env.jwtRefreshSecret, {
        expiresIn: "7d",
    });
    return {
        accessToken,
        refreshToken,
    };
};
export const registerUser = async (data) => {
    const existingUser = await User.findOne({
        email: data.email.toLowerCase(),
    });
    if (existingUser) {
        throw new ApiError(409, "An account with this email already exists");
    }
    const hashedPassword = await bcrypt.hash(data.password, 12);
    const user = await User.create({
        name: data.name,
        email: data.email.toLowerCase(),
        password: hashedPassword,
        ...(data.phone !== undefined && {
            phone: data.phone,
        }),
        role: "customer",
    });
    const tokens = generateTokens(user._id.toString(), user.role);
    user.refreshToken = tokens.refreshToken;
    await user.save();
    return {
        user: {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
        },
        tokens,
    };
};
export const loginUser = async (data) => {
    const user = await User.findOne({
        email: data.email.toLowerCase(),
    }).select("+password +refreshToken");
    if (!user) {
        throw new ApiError(401, "Invalid email or password");
    }
    if (!user.isActive) {
        throw new ApiError(403, "Your account has been deactivated");
    }
    const passwordMatches = await bcrypt.compare(data.password, user.password);
    if (!passwordMatches) {
        throw new ApiError(401, "Invalid email or password");
    }
    const tokens = generateTokens(user._id.toString(), user.role);
    user.refreshToken = tokens.refreshToken;
    await user.save();
    return {
        user: {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
        },
        tokens,
    };
};
export const reactivateUser = async (data) => {
    const user = await User.findOne({
        email: data.email.toLowerCase(),
    }).select("+password");
    if (!user) {
        throw new ApiError(401, "Invalid email or password");
    }
    const passwordMatches = await bcrypt.compare(data.password, user.password);
    if (!passwordMatches) {
        throw new ApiError(401, "Invalid email or password");
    }
    if (user.isActive) {
        throw new ApiError(400, "Your account is already active");
    }
    user.isActive = true;
    await user.save();
    return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isActive: user.isActive,
    };
};
//# sourceMappingURL=auth.service.js.map