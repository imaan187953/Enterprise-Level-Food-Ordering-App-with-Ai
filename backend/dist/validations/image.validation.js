import { z } from "zod";
export const searchImageSchema = z.object({
    query: z
        .string()
        .trim()
        .min(1, "Search query is required")
        .max(100, "Search query cannot exceed 100 characters"),
    page: z
        .number()
        .int("Page must be an integer")
        .min(1, "Page must be at least 1")
        .optional(),
    perPage: z
        .number()
        .int("Per page must be an integer")
        .min(1, "Per page must be at least 1")
        .max(80, "Per page cannot exceed 80")
        .optional(),
});
export const createImageSchema = z.object({
    pexelsPhotoId: z
        .string()
        .trim()
        .min(1, "Pexels photo ID is required"),
    url: z
        .string()
        .trim()
        .url("Image URL must be valid"),
    photographer: z
        .string()
        .trim()
        .min(1, "Photographer name is required"),
    photographerUrl: z
        .string()
        .trim()
        .url("Photographer URL must be valid")
        .optional(),
    alt: z
        .string()
        .trim()
        .max(300, "Alt text cannot exceed 300 characters")
        .optional(),
    width: z
        .number()
        .int()
        .min(1)
        .optional(),
    height: z
        .number()
        .int()
        .min(1)
        .optional(),
});
export const updateImageUsageSchema = z.object({
    isUsed: z.boolean(),
});
//# sourceMappingURL=image.validation.js.map