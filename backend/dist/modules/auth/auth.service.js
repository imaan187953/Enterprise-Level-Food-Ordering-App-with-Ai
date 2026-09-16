"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_js_1 = require("../users/user.model.js");
const ApiError_js_1 = require("../../utils/ApiError.js");
const token_js_1 = require("./token.js");
const registerUser = async (input) => {
    const existingUser = await user_model_js_1.User.findOne({
        email: input.email,
    });
    if (existingUser) {
        throw new ApiError_js_1.ApiError(409, "An account with this email already exists");
    }
    const hashedPassword = await bcryptjs_1.default.hash(input.password, 12);
    const user = await user_model_js_1.User.create({
        name: input.name,
        email: input.email,
        password: hashedPassword,
        phone: input.phone,
    });
    const accessToken = (0, token_js_1.generateAccessToken)({
        userId: user._id.toString(),
        role: user.role,
    });
    const refreshToken = (0, token_js_1.generateRefreshToken)({
        userId: user._id.toString(),
    });
    return {
        accessToken,
        refreshToken,
    };
};
exports.registerUser = registerUser;
const loginUser = async (input) => {
    const user = await user_model_js_1.User.findOne({
        email: input.email,
    }).select("+password");
    if (!user) {
        throw new ApiError_js_1.ApiError(401, "Invalid email or password");
    }
    if (!user.isActive) {
        throw new ApiError_js_1.ApiError(403, "Your account has been disabled");
    }
    const passwordMatches = await bcryptjs_1.default.compare(input.password, user.password);
    if (!passwordMatches) {
        throw new ApiError_js_1.ApiError(401, "Invalid email or password");
    }
    const accessToken = (0, token_js_1.generateAccessToken)({
        userId: user._id.toString(),
        role: user.role,
    });
    const refreshToken = (0, token_js_1.generateRefreshToken)({
        userId: user._id.toString(),
    });
    return {
        accessToken,
        refreshToken,
    };
};
exports.loginUser = loginUser;
//# sourceMappingURL=auth.service.js.map