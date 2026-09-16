import mongoose from "mongoose";
import { CreateOrderInput, OrderStatus } from "../types/order.types.js";
export declare const createOrder: (userId: string, data: CreateOrderInput) => Promise<mongoose.Document<unknown, {}, import("../models/Order.js").IOrderDocument, {}, mongoose.DefaultSchemaOptions> & import("../models/Order.js").IOrderDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>;
export declare const getUserOrders: (userId: string) => Promise<(mongoose.Document<unknown, {}, import("../models/Order.js").IOrderDocument, {}, mongoose.DefaultSchemaOptions> & import("../models/Order.js").IOrderDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
})[]>;
export declare const getUserOrderById: (userId: string, orderId: string) => Promise<mongoose.Document<unknown, {}, import("../models/Order.js").IOrderDocument, {}, mongoose.DefaultSchemaOptions> & import("../models/Order.js").IOrderDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>;
export declare const cancelOrder: (userId: string, orderId: string) => Promise<mongoose.Document<unknown, {}, import("../models/Order.js").IOrderDocument, {}, mongoose.DefaultSchemaOptions> & import("../models/Order.js").IOrderDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>;
export declare const getAllOrders: () => Promise<(mongoose.Document<unknown, {}, import("../models/Order.js").IOrderDocument, {}, mongoose.DefaultSchemaOptions> & import("../models/Order.js").IOrderDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
})[]>;
export declare const getOrderById: (orderId: string) => Promise<mongoose.Document<unknown, {}, import("../models/Order.js").IOrderDocument, {}, mongoose.DefaultSchemaOptions> & import("../models/Order.js").IOrderDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>;
export declare const updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<mongoose.Document<unknown, {}, import("../models/Order.js").IOrderDocument, {}, mongoose.DefaultSchemaOptions> & import("../models/Order.js").IOrderDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>;
