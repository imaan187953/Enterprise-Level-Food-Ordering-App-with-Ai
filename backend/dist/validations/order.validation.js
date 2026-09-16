import { z } from "zod";
export const createOrderSchema = z.object({
    addressId: z
        .string()
        .min(1, "Address ID is required"),
});
export const updateOrderStatusSchema = z.object({
    status: z.enum([
        "pending",
        "confirmed",
        "preparing",
        "ready",
        "out_for_delivery",
        "delivered",
        "cancelled",
    ]),
});
//# sourceMappingURL=order.validation.js.map