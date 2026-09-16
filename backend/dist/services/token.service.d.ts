import { AuthTokens } from "../types/auth.types.js";
import { UserRole } from "../types/user.types.js";
interface RefreshTokenPayload {
    userId: string;
}
export declare const generateTokens: (userId: string, role: UserRole) => AuthTokens;
export declare const verifyRefreshToken: (refreshToken: string) => RefreshTokenPayload;
export declare const refreshAccessToken: (refreshToken: string) => Promise<string>;
export declare const revokeRefreshToken: (refreshToken: string) => Promise<void>;
export {};
