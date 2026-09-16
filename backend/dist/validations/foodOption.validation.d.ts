import { z } from "zod";
export declare const createFoodOptionSchema: z.ZodObject<{
    food: z.ZodString;
    groupName: z.ZodString;
    name: z.ZodString;
    price: z.ZodOptional<z.ZodNumber>;
    isAvailable: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export declare const updateFoodOptionSchema: z.ZodObject<{
    groupName: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    price: z.ZodOptional<z.ZodNumber>;
    isAvailable: z.ZodOptional<z.ZodBoolean>;
    isActive: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export declare const updateFoodOptionStatusSchema: z.ZodObject<{
    isAvailable: z.ZodOptional<z.ZodBoolean>;
    isActive: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export type CreateFoodOptionValidationInput = z.infer<typeof createFoodOptionSchema>;
export type UpdateFoodOptionValidationInput = z.infer<typeof updateFoodOptionSchema>;
export type UpdateFoodOptionStatusValidationInput = z.infer<typeof updateFoodOptionStatusSchema>;
