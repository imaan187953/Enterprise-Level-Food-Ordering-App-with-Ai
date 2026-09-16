import { z } from "zod";
export declare const updateProfileSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const changeAvatarSchema: z.ZodObject<{
    avatar: z.ZodString;
}, z.core.$strip>;
export declare const changePhoneSchema: z.ZodObject<{
    phone: z.ZodString;
}, z.core.$strip>;
export declare const updateUserStatusSchema: z.ZodObject<{
    isActive: z.ZodBoolean;
}, z.core.$strip>;
