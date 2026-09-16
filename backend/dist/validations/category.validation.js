import { z } from "zod";
export const createCategorySchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Category name must be at least 2 characters")
        .max(50, "Category name cannot exceed 50 characters"),
    slug: z
        .string()
        .trim()
        .min(2, "Slug must be at least 2 characters")
        .max(60, "Slug cannot exceed 60 characters")
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
    description: z
        .string()
        .trim()
        .max(500, "Description cannot exceed 500 characters")
        .optional(),
    image: z
        .string()
        .trim()
        .url("Image must be a valid URL")
        .optional(),
    sortOrder: z
        .number()
        .int("Sort order must be an integer")
        .min(0, "Sort order cannot be negative")
        .optional(),
});
export const updateCategorySchema = z
    .object({
    name: z
        .string()
        .trim()
        .min(2, "Category name must be at least 2 characters")
        .max(50, "Category name cannot exceed 50 characters")
        .optional(),
    slug: z
        .string()
        .trim()
        .min(2, "Slug must be at least 2 characters")
        .max(60, "Slug cannot exceed 60 characters")
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug can only contain lowercase letters, numbers, and hyphens")
        .optional(),
    description: z
        .string()
        .trim()
        .max(500, "Description cannot exceed 500 characters")
        .optional(),
    image: z
        .string()
        .trim()
        .url("Image must be a valid URL")
        .optional(),
    sortOrder: z
        .number()
        .int("Sort order must be an integer")
        .min(0, "Sort order cannot be negative")
        .optional(),
    isActive: z.boolean().optional(),
})
    .refine((data) => data.name !== undefined ||
    data.slug !== undefined ||
    data.description !== undefined ||
    data.image !== undefined ||
    data.sortOrder !== undefined ||
    data.isActive !== undefined, {
    message: "At least one field is required",
});
//# sourceMappingURL=category.validation.js.map