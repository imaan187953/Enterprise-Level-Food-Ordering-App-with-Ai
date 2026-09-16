import { UpdateProfileInput, ChangeAvatarInput, ChangePhoneInput, UpdateUserStatusInput } from "../types/user.types.js";
export declare const getUserProfile: (userId: string) => Promise<{
    id: any;
    name: any;
    email: any;
    phone: any;
    avatar: any;
    role: any;
    isActive: any;
    createdAt: any;
    updatedAt: any;
}>;
export declare const updateUserProfile: (userId: string, data: UpdateProfileInput) => Promise<{
    id: any;
    name: any;
    email: any;
    phone: any;
    avatar: any;
    role: any;
    isActive: any;
    createdAt: any;
    updatedAt: any;
}>;
export declare const changeUserAvatar: (userId: string, data: ChangeAvatarInput) => Promise<{
    id: any;
    name: any;
    email: any;
    phone: any;
    avatar: any;
    role: any;
    isActive: any;
    createdAt: any;
    updatedAt: any;
}>;
export declare const changeUserPhone: (userId: string, data: ChangePhoneInput) => Promise<{
    id: any;
    name: any;
    email: any;
    phone: any;
    avatar: any;
    role: any;
    isActive: any;
    createdAt: any;
    updatedAt: any;
}>;
export declare const updateOwnAccountStatus: (userId: string, isActive: boolean) => Promise<{
    id: any;
    name: any;
    email: any;
    phone: any;
    avatar: any;
    role: any;
    isActive: any;
    createdAt: any;
    updatedAt: any;
}>;
export declare const getAllUsers: () => Promise<{
    id: any;
    name: any;
    email: any;
    phone: any;
    avatar: any;
    role: any;
    isActive: any;
    createdAt: any;
    updatedAt: any;
}[]>;
export declare const getUserById: (userId: string) => Promise<{
    id: any;
    name: any;
    email: any;
    phone: any;
    avatar: any;
    role: any;
    isActive: any;
    createdAt: any;
    updatedAt: any;
}>;
export declare const updateUserStatus: (userId: string, data: UpdateUserStatusInput) => Promise<{
    id: any;
    name: any;
    email: any;
    phone: any;
    avatar: any;
    role: any;
    isActive: any;
    createdAt: any;
    updatedAt: any;
}>;
