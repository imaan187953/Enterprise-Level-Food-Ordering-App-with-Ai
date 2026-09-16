interface AccessTokenPayload {
    userId: string;
    role: "user" | "admin";
}
interface RefreshTokenPayload {
    userId: string;
}
export declare const generateAccessToken: (payload: AccessTokenPayload) => string;
export declare const generateRefreshToken: (payload: RefreshTokenPayload) => string;
export declare const verifyAccessToken: (token: string) => AccessTokenPayload;
export declare const verifyRefreshToken: (token: string) => RefreshTokenPayload;
export {};
