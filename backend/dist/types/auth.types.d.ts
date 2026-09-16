import type { UserRole } from "./user.types.js";
export interface RegisterInput {
    name: string;
    email: string;
    password: string;
    phone?: string | undefined;
}
export interface LoginInput {
    email: string;
    password: string;
}
export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}
export interface AuthenticatedUser {
    userId: string;
    role: UserRole;
}
export interface AuthResponse {
    user: {
        id: string;
        name: string;
        email: string;
        phone?: string;
        role: UserRole;
    };
    tokens: AuthTokens;
}
