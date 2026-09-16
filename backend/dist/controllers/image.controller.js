import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { searchImageSchema, createImageSchema, updateImageUsageSchema, } from "../validations/image.validation.js";
import { searchPexelsImages, saveImage, getSavedImages, getSavedImageById, updateImageUsage, deleteUnusedImage, } from "../services/image.service.js";
export const search = asyncHandler(async (req, res) => {
    const parsed = searchImageSchema.safeParse({
        query: req.query.query,
        page: req.query.page
            ? Number(req.query.page)
            : undefined,
        perPage: req.query.perPage
            ? Number(req.query.perPage)
            : undefined,
    });
    if (!parsed.success) {
        throw new ApiError(400, "Invalid image search data", parsed.error.flatten());
    }
    const result = await searchPexelsImages(parsed.data.query, parsed.data.page, parsed.data.perPage);
    res.status(200).json({
        success: true,
        message: "Pexels images fetched successfully",
        data: result,
    });
});
export const save = asyncHandler(async (req, res) => {
    const parsed = createImageSchema.safeParse(req.body);
    if (!parsed.success) {
        throw new ApiError(400, "Invalid image data", parsed.error.flatten());
    }
    const image = await saveImage(parsed.data);
    res.status(201).json({
        success: true,
        message: "Image saved successfully",
        data: image,
    });
});
export const getAll = asyncHandler(async (_req, res) => {
    const images = await getSavedImages();
    res.status(200).json({
        success: true,
        message: "Saved images fetched successfully",
        data: images,
    });
});
export const getById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
        throw new ApiError(400, "Image ID is required");
    }
    const image = await getSavedImageById(id);
    res.status(200).json({
        success: true,
        message: "Image fetched successfully",
        data: image,
    });
});
export const updateUsage = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
        throw new ApiError(400, "Image ID is required");
    }
    const parsed = updateImageUsageSchema.safeParse(req.body);
    if (!parsed.success) {
        throw new ApiError(400, "Invalid image usage data", parsed.error.flatten());
    }
    const image = await updateImageUsage(id, parsed.data.isUsed);
    res.status(200).json({
        success: true,
        message: "Image usage updated successfully",
        data: image,
    });
});
export const remove = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
        throw new ApiError(400, "Image ID is required");
    }
    await deleteUnusedImage(id);
    res.status(200).json({
        success: true,
        message: "Unused image deleted successfully",
    });
});
//# sourceMappingURL=image.controller.js.map