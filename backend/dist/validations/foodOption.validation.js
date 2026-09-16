import { z } from "zod";
export const createFoodOptionSchema = z.object({
    food: z.string().min(1, "Food ID is required"),
    groupName: z
        .string()
        .trim()
        .min(2, "Group name must be at least 2 characters")
        .max(50, "Group name must not exceed 50 characters"),
    name: z
        .string()
        .trim()
        .min(1, "Option name is required")
        .max(100, "Option name must not exceed 100 characters"),
    price: z
        .number()
        .min(0, "Price cannot be negative")
        .optional(),
    isAvailable: z.boolean().optional(),
});
export const updateFoodOptionSchema = z
    .object({
    groupName: z
        .string()
        .trim()
        .min(2)
        .max(50)
        .optional(),
    name: z
        .string()
        .trim()
        .min(1)
        .max(100)
        .optional(),
    price: z
        .number()
        .min(0)
        .optional(),
    isAvailable: z.boolean().optional(),
    isActive: z.boolean().optional(),
})
    .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
});
export const updateFoodOptionStatusSchema = z
    .object({
    isAvailable: z.boolean().optional(),
    isActive: z.boolean().optional(),
})
    .refine((data) => Object.keys(data).length > 0, {
    message: "At least one status field is required",
});
//# sourceMappingURL=foodOption.validation.js.map