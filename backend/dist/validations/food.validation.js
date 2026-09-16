import { z } from "zod";
export const createFoodSchema = z
    .object({
    name: z
        .string()
        .trim()
        .min(2, "Food name must be at least 2 characters")
        .max(100, "Food name cannot exceed 100 characters"),
    slug: z
        .string()
        .trim()
        .min(2, "Slug must be at least 2 characters")
        .max(120, "Slug cannot exceed 120 characters")
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
    description: z
        .string()
        .trim()
        .min(1, "Description is required")
        .max(1000, "Description cannot exceed 1000 characters"),
    price: z
        .number()
        .min(0, "Price cannot be negative"),
    discountPrice: z
        .number()
        .min(0, "Discount price cannot be negative")
        .optional(),
    category: z
        .string()
        .trim()
        .min(1, "Category is required"),
    image: z
        .string()
        .trim()
        .url("Image must be a valid URL")
        .optional(),
    ingredients: z
        .array(z.string().trim().min(1))
        .optional(),
    allergens: z
        .array(z.string().trim().min(1))
        .optional(),
    isVegetarian: z
        .boolean()
        .optional(),
    isSpicy: z
        .boolean()
        .optional(),
    preparationTime: z
        .number()
        .int("Preparation time must be an integer")
        .min(1, "Preparation time must be at least 1 minute"),
    isAvailable: z
        .boolean()
        .optional(),
    isFeatured: z
        .boolean()
        .optional(),
})
    .refine((data) => data.discountPrice === undefined ||
    data.discountPrice <= data.price, {
    message: "Discount price cannot be greater than the original price",
    path: ["discountPrice"],
});
export const updateFoodSchema = z
    .object({
    name: z
        .string()
        .trim()
        .min(2, "Food name must be at least 2 characters")
        .max(100, "Food name cannot exceed 100 characters")
        .optional(),
    slug: z
        .string()
        .trim()
        .min(2, "Slug must be at least 2 characters")
        .max(120, "Slug cannot exceed 120 characters")
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug can only contain lowercase letters, numbers, and hyphens")
        .optional(),
    description: z
        .string()
        .trim()
        .max(1000, "Description cannot exceed 1000 characters")
        .optional(),
    price: z
        .number()
        .min(0, "Price cannot be negative")
        .optional(),
    discountPrice: z
        .number()
        .min(0, "Discount price cannot be negative")
        .optional(),
    category: z
        .string()
        .trim()
        .min(1, "Category is required")
        .optional(),
    image: z
        .string()
        .trim()
        .url("Image must be a valid URL")
        .optional(),
    ingredients: z
        .array(z.string().trim().min(1))
        .optional(),
    allergens: z
        .array(z.string().trim().min(1))
        .optional(),
    isVegetarian: z
        .boolean()
        .optional(),
    isSpicy: z
        .boolean()
        .optional(),
    preparationTime: z
        .number()
        .int("Preparation time must be an integer")
        .min(1)
        .optional(),
    isAvailable: z
        .boolean()
        .optional(),
    isFeatured: z
        .boolean()
        .optional(),
    isActive: z
        .boolean()
        .optional(),
})
    .refine((data) => data.name !== undefined ||
    data.slug !== undefined ||
    data.description !== undefined ||
    data.price !== undefined ||
    data.discountPrice !== undefined ||
    data.category !== undefined ||
    data.image !== undefined ||
    data.ingredients !== undefined ||
    data.allergens !== undefined ||
    data.isVegetarian !== undefined ||
    data.isSpicy !== undefined ||
    data.preparationTime !== undefined ||
    data.isAvailable !== undefined ||
    data.isFeatured !== undefined ||
    data.isActive !== undefined, {
    message: "At least one field is required",
});
export const updateFoodStatusSchema = z.object({
    isAvailable: z.boolean().optional(),
    isFeatured: z.boolean().optional(),
    isActive: z.boolean().optional(),
});
//# sourceMappingURL=food.validation.js.map