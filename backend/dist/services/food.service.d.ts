import mongoose from "mongoose";
import { CreateFoodInput, UpdateFoodInput, UpdateFoodStatusInput } from "../types/food.types.js";
export declare const createFood: (data: CreateFoodInput) => Promise<mongoose.Document<unknown, {}, import("../types/food.types.js").IFood, {}, mongoose.DefaultSchemaOptions> & import("../types/food.types.js").IFood & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}>;
export declare const getAllFoods: () => Promise<(mongoose.Document<unknown, {}, import("../types/food.types.js").IFood, {}, mongoose.DefaultSchemaOptions> & import("../types/food.types.js").IFood & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
})[]>;
export declare const getAvailableFoods: () => Promise<(mongoose.Document<unknown, {}, import("../types/food.types.js").IFood, {}, mongoose.DefaultSchemaOptions> & import("../types/food.types.js").IFood & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
})[]>;
export declare const getFeaturedFoods: () => Promise<(mongoose.Document<unknown, {}, import("../types/food.types.js").IFood, {}, mongoose.DefaultSchemaOptions> & import("../types/food.types.js").IFood & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
})[]>;
export declare const getFoodById: (foodId: string) => Promise<mongoose.Document<unknown, {}, import("../types/food.types.js").IFood, {}, mongoose.DefaultSchemaOptions> & import("../types/food.types.js").IFood & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}>;
export declare const searchFoods: (query: string) => Promise<(mongoose.Document<unknown, {}, import("../types/food.types.js").IFood, {}, mongoose.DefaultSchemaOptions> & import("../types/food.types.js").IFood & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
})[]>;
export declare const getFoodsByCategory: (categoryId: string) => Promise<(mongoose.Document<unknown, {}, import("../types/food.types.js").IFood, {}, mongoose.DefaultSchemaOptions> & import("../types/food.types.js").IFood & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
})[]>;
export declare const updateFood: (foodId: string, data: UpdateFoodInput) => Promise<mongoose.Document<unknown, {}, import("../types/food.types.js").IFood, {}, mongoose.DefaultSchemaOptions> & import("../types/food.types.js").IFood & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}>;
export declare const updateFoodStatus: (foodId: string, data: UpdateFoodStatusInput) => Promise<mongoose.Document<unknown, {}, import("../types/food.types.js").IFood, {}, mongoose.DefaultSchemaOptions> & import("../types/food.types.js").IFood & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}>;
export declare const deleteFood: (foodId: string) => Promise<mongoose.Document<unknown, {}, import("../types/food.types.js").IFood, {}, mongoose.DefaultSchemaOptions> & import("../types/food.types.js").IFood & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}>;
