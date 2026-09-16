import { z } from "zod";

export const createAddressSchema = z.object({
  label: z
    .string()
    .trim()
    .min(2, "Label must be at least 2 characters")
    .max(30, "Label must not exceed 30 characters"),

  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must not exceed 100 characters"),

  phone: z
    .string()
    .trim()
    .min(7, "Invalid phone number")
    .max(20, "Phone number is too long"),

  addressLine: z
    .string()
    .trim()
    .min(5, "Address must be at least 5 characters")
    .max(250, "Address must not exceed 250 characters"),

  city: z
    .string()
    .trim()
    .min(2, "City must be at least 2 characters")
    .max(100, "City must not exceed 100 characters"),

  state: z
    .string()
    .trim()
    .max(100, "State must not exceed 100 characters")
    .optional(),

  postalCode: z
    .string()
    .trim()
    .max(20, "Postal code is too long")
    .optional(),

  latitude: z
    .number()
    .min(-90, "Invalid latitude")
    .max(90, "Invalid latitude")
    .optional(),

  longitude: z
    .number()
    .min(-180, "Invalid longitude")
    .max(180, "Invalid longitude")
    .optional(),

  isDefault: z.boolean().optional(),
});

export const updateAddressSchema = z
  .object({
    label: z
      .string()
      .trim()
      .min(2, "Label must be at least 2 characters")
      .max(30, "Label must not exceed 30 characters")
      .optional(),

    fullName: z
      .string()
      .trim()
      .min(2, "Full name must be at least 2 characters")
      .max(100, "Full name must not exceed 100 characters")
      .optional(),

    phone: z
      .string()
      .trim()
      .min(7, "Invalid phone number")
      .max(20, "Phone number is too long")
      .optional(),

    addressLine: z
      .string()
      .trim()
      .min(5, "Address must be at least 5 characters")
      .max(250, "Address must not exceed 250 characters")
      .optional(),

    city: z
      .string()
      .trim()
      .min(2, "City must be at least 2 characters")
      .max(100, "City must not exceed 100 characters")
      .optional(),

    state: z
      .string()
      .trim()
      .max(100, "State must not exceed 100 characters")
      .optional(),

    postalCode: z
      .string()
      .trim()
      .max(20, "Postal code is too long")
      .optional(),

    latitude: z
      .number()
      .min(-90, "Invalid latitude")
      .max(90, "Invalid latitude")
      .optional(),

    longitude: z
      .number()
      .min(-180, "Invalid longitude")
      .max(180, "Invalid longitude")
      .optional(),
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    {
      message: "At least one field is required",
    }
  );

export const updateAddressDefaultSchema =
  z.object({
    isDefault: z.boolean(),
  });

export type CreateAddressValidationInput =
  z.infer<typeof createAddressSchema>;

export type UpdateAddressValidationInput =
  z.infer<typeof updateAddressSchema>;

export type UpdateAddressDefaultValidationInput =
  z.infer<typeof updateAddressDefaultSchema>;