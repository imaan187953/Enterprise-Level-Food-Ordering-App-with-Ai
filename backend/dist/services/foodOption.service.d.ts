import mongoose from "mongoose";
import { CreateFoodOptionInput, UpdateFoodOptionInput, UpdateFoodOptionStatusInput } from "../types/foodOption.types.js";
export declare const createFoodOption: (data: CreateFoodOptionInput) => Promise<mongoose.Document<unknown, {}, import("../models/FoodOption.js").IFoodOptionDocument, {}, mongoose.DefaultSchemaOptions> & import("../models/FoodOption.js").IFoodOptionDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>;
export declare const getFoodOptions: (foodId?: string) => Promise<(mongoose.Document<unknown, {}, import("../models/FoodOption.js").IFoodOptionDocument, {}, mongoose.DefaultSchemaOptions> & import("../models/FoodOption.js").IFoodOptionDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
})[]>;
export declare const getFoodOptionById: (id: string) => Promise<mongoose.Document<unknown, {}, import("../models/FoodOption.js").IFoodOptionDocument, {}, mongoose.DefaultSchemaOptions> & import("../models/FoodOption.js").IFoodOptionDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>;
export declare const getFoodOptionsByGroup: (foodId: string, groupName: string) => Promise<(mongoose.Document<unknown, {}, import("../models/FoodOption.js").IFoodOptionDocument, {}, mongoose.DefaultSchemaOptions> & import("../models/FoodOption.js").IFoodOptionDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
})[]>;
export declare const updateFoodOption: (id: string, data: UpdateFoodOptionInput) => Promise<mongoose.Document<unknown, {}, import("../models/FoodOption.js").IFoodOptionDocument, {}, mongoose.DefaultSchemaOptions> & import("../models/FoodOption.js").IFoodOptionDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>;
export declare const updateFoodOptionStatus: (id: string, data: UpdateFoodOptionStatusInput) => Promise<mongoose.Document<unknown, {}, import("../models/FoodOption.js").IFoodOptionDocument, {}, mongoose.DefaultSchemaOptions> & import("../models/FoodOption.js").IFoodOptionDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>;
export declare const deleteFoodOption: (id: string) => Promise<mongoose.Document<unknown, {}, import("../models/FoodOption.js").IFoodOptionDocument, {}, mongoose.DefaultSchemaOptions> & import("../models/FoodOption.js").IFoodOptionDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>;
