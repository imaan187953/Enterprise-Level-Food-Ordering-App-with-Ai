import mongoose from "mongoose";
import { CreateAddressInput, UpdateAddressInput } from "../types/address.types.js";
export declare const createAddress: (userId: string, data: CreateAddressInput) => Promise<mongoose.Document<unknown, {}, import("../models/Address.js").IAddressDocument, {}, mongoose.DefaultSchemaOptions> & import("../models/Address.js").IAddressDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>;
export declare const getUserAddresses: (userId: string) => Promise<(mongoose.Document<unknown, {}, import("../models/Address.js").IAddressDocument, {}, mongoose.DefaultSchemaOptions> & import("../models/Address.js").IAddressDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
})[]>;
export declare const getUserAddressById: (userId: string, addressId: string) => Promise<mongoose.Document<unknown, {}, import("../models/Address.js").IAddressDocument, {}, mongoose.DefaultSchemaOptions> & import("../models/Address.js").IAddressDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>;
export declare const updateUserAddress: (userId: string, addressId: string, data: UpdateAddressInput) => Promise<mongoose.Document<unknown, {}, import("../models/Address.js").IAddressDocument, {}, mongoose.DefaultSchemaOptions> & import("../models/Address.js").IAddressDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>;
export declare const setDefaultAddress: (userId: string, addressId: string, isDefault: boolean) => Promise<mongoose.Document<unknown, {}, import("../models/Address.js").IAddressDocument, {}, mongoose.DefaultSchemaOptions> & import("../models/Address.js").IAddressDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>;
export declare const deleteUserAddress: (userId: string, addressId: string) => Promise<mongoose.Document<unknown, {}, import("../models/Address.js").IAddressDocument, {}, mongoose.DefaultSchemaOptions> & import("../models/Address.js").IAddressDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>;
