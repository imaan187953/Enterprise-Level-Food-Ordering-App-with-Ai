import { z } from "zod";
export declare const createOrderSchema: z.ZodObject<{
    addressId: z.ZodString;
}, z.core.$strip>;
export declare const updateOrderStatusSchema: z.ZodObject<{
    status: z.ZodEnum<{
        cancelled: "cancelled";
        confirmed: "confirmed";
        delivered: "delivered";
        out_for_delivery: "out_for_delivery";
        pending: "pending";
        preparing: "preparing";
        ready: "ready";
    }>;
}, z.core.$strip>;
export type CreateOrderValidationInput = z.infer<typeof createOrderSchema>;
export type UpdateOrderStatusValidationInput = z.infer<typeof updateOrderStatusSchema>;
