import { RegisterInput, LoginInput, AuthTokens } from "../types/auth.types.js";
export declare const registerUser: (data: RegisterInput) => Promise<{
    user: {
        id: string;
        name: string;
        email: string;
        phone: string | undefined;
        role: import("../types/user.types.js").UserRole;
    };
    tokens: AuthTokens;
}>;
export declare const loginUser: (data: LoginInput) => Promise<{
    user: {
        id: string;
        name: string;
        email: string;
        phone: string | undefined;
        role: import("../types/user.types.js").UserRole;
    };
    tokens: AuthTokens;
}>;
export declare const reactivateUser: (data: LoginInput) => Promise<{
    id: string;
    name: string;
    email: string;
    phone: string | undefined;
    role: import("../types/user.types.js").UserRole;
    isActive: boolean;
}>;
