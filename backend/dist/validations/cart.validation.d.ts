import { z } from "zod";
export declare const addCartItemSchema: z.ZodObject<{
    foodId: z.ZodString;
    quantity: z.ZodNumber;
    optionIds: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
export declare const updateCartItemSchema: z.ZodObject<{
    quantity: z.ZodNumber;
    optionIds: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
export declare const removeCartItemSchema: z.ZodObject<{
    foodId: z.ZodString;
}, z.core.$strip>;
export type AddCartItemValidationInput = z.infer<typeof addCartItemSchema>;
export type UpdateCartItemValidationInput = z.infer<typeof updateCartItemSchema>;
export type RemoveCartItemValidationInput = z.infer<typeof removeCartItemSchema>;
