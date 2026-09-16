import { CreateImageInput } from "../types/image.types.js";
export declare const searchPexelsImages: (query: string, page?: number, perPage?: number) => Promise<{
    totalResults: number;
    page: number;
    perPage: number;
    photos: {
        pexelsPhotoId: string;
        url: string;
        photographer: string;
        photographerUrl: string;
        alt: string;
        width: number;
        height: number;
    }[];
}>;
export declare const saveImage: (data: CreateImageInput) => Promise<import("mongoose").Document<unknown, {}, import("../types/image.types.js").IImage, {}, import("mongoose").DefaultSchemaOptions> & import("../types/image.types.js").IImage & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}>;
export declare const getSavedImages: () => Promise<(import("mongoose").Document<unknown, {}, import("../types/image.types.js").IImage, {}, import("mongoose").DefaultSchemaOptions> & import("../types/image.types.js").IImage & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
})[]>;
export declare const getSavedImageById: (imageId: string) => Promise<import("mongoose").Document<unknown, {}, import("../types/image.types.js").IImage, {}, import("mongoose").DefaultSchemaOptions> & import("../types/image.types.js").IImage & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}>;
export declare const updateImageUsage: (imageId: string, isUsed: boolean) => Promise<import("mongoose").Document<unknown, {}, import("../types/image.types.js").IImage, {}, import("mongoose").DefaultSchemaOptions> & import("../types/image.types.js").IImage & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}>;
export declare const deleteUnusedImage: (imageId: string) => Promise<import("mongoose").Document<unknown, {}, import("../types/image.types.js").IImage, {}, import("mongoose").DefaultSchemaOptions> & import("../types/image.types.js").IImage & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}>;
