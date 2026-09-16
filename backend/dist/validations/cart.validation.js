import { z } from "zod";
export const addCartItemSchema = z.object({
    foodId: z
        .string()
        .min(1, "Food ID is required"),
    quantity: z
        .number()
        .int("Quantity must be a whole number")
        .min(1, "Quantity must be at least 1"),
    optionIds: z
        .array(z.string().min(1))
        .optional(),
});
export const updateCartItemSchema = z.object({
    quantity: z
        .number()
        .int("Quantity must be a whole number")
        .min(1, "Quantity must be at least 1"),
    optionIds: z
        .array(z.string().min(1))
        .optional(),
});
export const removeCartItemSchema = z.object({
    foodId: z
        .string()
        .min(1, "Food ID is required"),
});
//# sourceMappingURL=cart.validation.js.map