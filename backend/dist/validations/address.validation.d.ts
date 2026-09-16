import { z } from "zod";
export declare const createAddressSchema: z.ZodObject<{
    label: z.ZodString;
    fullName: z.ZodString;
    phone: z.ZodString;
    addressLine: z.ZodString;
    city: z.ZodString;
    state: z.ZodOptional<z.ZodString>;
    postalCode: z.ZodOptional<z.ZodString>;
    latitude: z.ZodOptional<z.ZodNumber>;
    longitude: z.ZodOptional<z.ZodNumber>;
    isDefault: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export declare const updateAddressSchema: z.ZodObject<{
    label: z.ZodOptional<z.ZodString>;
    fullName: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    addressLine: z.ZodOptional<z.ZodString>;
    city: z.ZodOptional<z.ZodString>;
    state: z.ZodOptional<z.ZodString>;
    postalCode: z.ZodOptional<z.ZodString>;
    latitude: z.ZodOptional<z.ZodNumber>;
    longitude: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export declare const updateAddressDefaultSchema: z.ZodObject<{
    isDefault: z.ZodBoolean;
}, z.core.$strip>;
export type CreateAddressValidationInput = z.infer<typeof createAddressSchema>;
export type UpdateAddressValidationInput = z.infer<typeof updateAddressSchema>;
export type UpdateAddressDefaultValidationInput = z.infer<typeof updateAddressDefaultSchema>;
