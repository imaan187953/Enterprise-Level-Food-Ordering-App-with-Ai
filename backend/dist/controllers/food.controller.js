import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { createFoodSchema, updateFoodSchema, updateFoodStatusSchema, } from "../validations/food.validation.js";
import { createFood, getAllFoods, getAvailableFoods, getFeaturedFoods, getFoodById, searchFoods, getFoodsByCategory, updateFood, updateFoodStatus, deleteFood, } from "../services/food.service.js";
export const create = asyncHandler(async (req, res) => {
    const parsed = createFoodSchema.safeParse(req.body);
    if (!parsed.success) {
        throw new ApiError(400, "Invalid food data", parsed.error.flatten());
    }
    const food = await createFood(parsed.data);
    res.status(201).json({
        success: true,
        message: "Food created successfully",
        data: food,
    });
});
export const getAll = asyncHandler(async (_req, res) => {
    const foods = await getAllFoods();
    res.status(200).json({
        success: true,
        message: "Foods fetched successfully",
        data: foods,
    });
});
export const getAvailable = asyncHandler(async (_req, res) => {
    const foods = await getAvailableFoods();
    res.status(200).json({
        success: true,
        message: "Available foods fetched successfully",
        data: foods,
    });
});
export const getFeatured = asyncHandler(async (_req, res) => {
    const foods = await getFeaturedFoods();
    res.status(200).json({
        success: true,
        message: "Featured foods fetched successfully",
        data: foods,
    });
});
export const getById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
        throw new ApiError(400, "Food ID is required");
    }
    const food = await getFoodById(id);
    res.status(200).json({
        success: true,
        message: "Food fetched successfully",
        data: food,
    });
});
export const search = asyncHandler(async (req, res) => {
    const query = req.query.query;
    if (typeof query !== "string" ||
        !query.trim()) {
        throw new ApiError(400, "Search query is required");
    }
    const foods = await searchFoods(query.trim());
    res.status(200).json({
        success: true,
        message: "Food search completed successfully",
        data: foods,
    });
});
export const getByCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;
    if (!categoryId || Array.isArray(categoryId)) {
        throw new ApiError(400, "Category ID is required");
    }
    const foods = await getFoodsByCategory(categoryId);
    res.status(200).json({
        success: true,
        message: "Foods fetched successfully",
        data: foods,
    });
});
export const update = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
        throw new ApiError(400, "Image ID is required");
    }
    const parsed = updateFoodSchema.safeParse(req.body);
    if (!parsed.success) {
        throw new ApiError(400, "Invalid food data", parsed.error.flatten());
    }
    const food = await updateFood(id, parsed.data);
    res.status(200).json({
        success: true,
        message: "Food updated successfully",
        data: food,
    });
});
export const updateStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
        throw new ApiError(400, "Image ID is required");
    }
    const parsed = updateFoodStatusSchema.safeParse(req.body);
    if (!parsed.success) {
        throw new ApiError(400, "Invalid food status data", parsed.error.flatten());
    }
    const food = await updateFoodStatus(id, parsed.data);
    res.status(200).json({
        success: true,
        message: "Food status updated successfully",
        data: food,
    });
});
export const remove = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
        throw new ApiError(400, "Image ID is required");
    }
    await deleteFood(id);
    res.status(200).json({
        success: true,
        message: "Food deleted successfully",
    });
});
//# sourceMappingURL=food.controller.js.map