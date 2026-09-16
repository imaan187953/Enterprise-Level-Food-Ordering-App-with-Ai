import { CreateCategoryInput, UpdateCategoryInput } from "../types/category.types.js";
export declare const createCategory: (data: CreateCategoryInput) => Promise<import("mongoose").Document<unknown, {}, import("../types/category.types.js").ICategory, {}, import("mongoose").DefaultSchemaOptions> & import("../types/category.types.js").ICategory & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}>;
export declare const getAllCategories: () => Promise<(import("mongoose").Document<unknown, {}, import("../types/category.types.js").ICategory, {}, import("mongoose").DefaultSchemaOptions> & import("../types/category.types.js").ICategory & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
})[]>;
export declare const getCategoryById: (categoryId: string) => Promise<import("mongoose").Document<unknown, {}, import("../types/category.types.js").ICategory, {}, import("mongoose").DefaultSchemaOptions> & import("../types/category.types.js").ICategory & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}>;
export declare const updateCategory: (categoryId: string, data: UpdateCategoryInput) => Promise<import("mongoose").Document<unknown, {}, import("../types/category.types.js").ICategory, {}, import("mongoose").DefaultSchemaOptions> & import("../types/category.types.js").ICategory & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}>;
export declare const deleteCategory: (categoryId: string) => Promise<import("mongoose").Document<unknown, {}, import("../types/category.types.js").ICategory, {}, import("mongoose").DefaultSchemaOptions> & import("../types/category.types.js").ICategory & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}>;
export declare const updateCategoryStatus: (categoryId: string, isActive: boolean) => Promise<import("mongoose").Document<unknown, {}, import("../types/category.types.js").ICategory, {}, import("mongoose").DefaultSchemaOptions> & import("../types/category.types.js").ICategory & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}>;
