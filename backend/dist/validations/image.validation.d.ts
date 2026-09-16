import { z } from "zod";
export declare const searchImageSchema: z.ZodObject<{
    query: z.ZodString;
    page: z.ZodOptional<z.ZodNumber>;
    perPage: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export declare const createImageSchema: z.ZodObject<{
    pexelsPhotoId: z.ZodString;
    url: z.ZodString;
    photographer: z.ZodString;
    photographerUrl: z.ZodOptional<z.ZodString>;
    alt: z.ZodOptional<z.ZodString>;
    width: z.ZodOptional<z.ZodNumber>;
    height: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export declare const updateImageUsageSchema: z.ZodObject<{
    isUsed: z.ZodBoolean;
}, z.core.$strip>;
export type SearchImageInput = z.infer<typeof searchImageSchema>;
export type CreateImageValidationInput = z.infer<typeof createImageSchema>;
export type UpdateImageUsageValidationInput = z.infer<typeof updateImageUsageSchema>;
