import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import { env } from "../config/env.js";
export const authenticate = (req, _res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization ||
        !authorization.startsWith("Bearer ")) {
        next(new ApiError(401, "Authentication required"));
        return;
    }
    const token = authorization.split(" ")[1];
    if (!token) {
        next(new ApiError(401, "Access token is missing"));
        return;
    }
    try {
        const decoded = jwt.verify(token, env.jwtAccessSecret);
        req.user = {
            userId: decoded.userId,
            role: decoded.role,
        };
        next();
    }
    catch {
        next(new ApiError(401, "Invalid or expired access token"));
    }
};
//# sourceMappingURL=auth.middleware.js.map