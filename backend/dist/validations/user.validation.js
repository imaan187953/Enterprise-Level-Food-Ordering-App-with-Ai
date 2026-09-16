import { z } from "zod";
export const updateProfileSchema = z
    .object({
    name: z
        .string()
        .trim()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name cannot exceed 50 characters")
        .optional(),
    phone: z
        .string()
        .trim()
        .min(7, "Phone number is too short")
        .max(20, "Phone number is too long")
        .optional(),
})
    .refine((data) => data.name !== undefined ||
    data.phone !== undefined, {
    message: "At least one field is required",
});
export const changeAvatarSchema = z.object({
    avatar: z
        .string()
        .trim()
        .url("Avatar must be a valid URL"),
});
export const changePhoneSchema = z.object({
    phone: z
        .string()
        .trim()
        .min(7, "Phone number is too short")
        .max(20, "Phone number is too long"),
});
export const updateUserStatusSchema = z.object({
    isActive: z.boolean(),
});
//# sourceMappingURL=user.validation.js.map