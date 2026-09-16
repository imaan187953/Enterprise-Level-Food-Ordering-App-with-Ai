import mongoose from "mongoose";
import { AddCartItemInput, UpdateCartItemInput } from "../types/cart.types.js";
export declare const getCart: (userId: string) => Promise<mongoose.Document<unknown, {}, import("../models/Cart.js").ICartDocument, {}, mongoose.DefaultSchemaOptions> & import("../models/Cart.js").ICartDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>;
export declare const addToCart: (userId: string, data: AddCartItemInput) => Promise<mongoose.Document<unknown, {}, import("../models/Cart.js").ICartDocument, {}, mongoose.DefaultSchemaOptions> & import("../models/Cart.js").ICartDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>;
export declare const updateCartItem: (userId: string, itemId: string, data: UpdateCartItemInput) => Promise<mongoose.Document<unknown, {}, import("../models/Cart.js").ICartDocument, {}, mongoose.DefaultSchemaOptions> & import("../models/Cart.js").ICartDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>;
export declare const removeCartItem: (userId: string, itemId: string) => Promise<mongoose.Document<unknown, {}, import("../models/Cart.js").ICartDocument, {}, mongoose.DefaultSchemaOptions> & import("../models/Cart.js").ICartDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>;
export declare const clearCart: (userId: string) => Promise<mongoose.Document<unknown, {}, import("../models/Cart.js").ICartDocument, {}, mongoose.DefaultSchemaOptions> & import("../models/Cart.js").ICartDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>;
