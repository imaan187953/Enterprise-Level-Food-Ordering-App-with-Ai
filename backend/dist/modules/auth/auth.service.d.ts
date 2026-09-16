import type { LoginInput, RegisterInput, AuthResponse } from "./auth.types.js";
export declare const registerUser: (input: RegisterInput) => Promise<AuthResponse>;
export declare const loginUser: (input: LoginInput) => Promise<AuthResponse>;
