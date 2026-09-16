import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { createFoodOptionSchema, updateFoodOptionSchema, updateFoodOptionStatusSchema, } from "../validations/foodOption.validation.js";
import { createFoodOption, getFoodOptions, getFoodOptionById, getFoodOptionsByGroup, updateFoodOption, updateFoodOptionStatus, deleteFoodOption, } from "../services/foodOption.service.js";
export const create = asyncHandler(async (req, res) => {
    const result = createFoodOptionSchema.safeParse(req.body);
    if (!result.success) {
        throw new ApiError(400, result.error.issues[0]?.message ||
            "Invalid request data");
    }
    const option = await createFoodOption(result.data);
    res.status(201).json({
        success: true,
        message: "Food option created successfully",
        data: option,
    });
});
export const getAll = asyncHandler(async (req, res) => {
    const foodId = typeof req.query.foodId === "string"
        ? req.query.foodId
        : undefined;
    const options = await getFoodOptions(foodId);
    res.status(200).json({
        success: true,
        message: "Food options fetched successfully",
        data: options,
    });
});
export const getById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
        throw new ApiError(400, "Food option ID is required");
    }
    const option = await getFoodOptionById(id);
    res.status(200).json({
        success: true,
        message: "Food option fetched successfully",
        data: option,
    });
});
export const getByGroup = asyncHandler(async (req, res) => {
    const { foodId, groupName } = req.params;
    if (!foodId ||
        Array.isArray(foodId)) {
        throw new ApiError(400, "Food ID is required");
    }
    if (!groupName ||
        Array.isArray(groupName)) {
        throw new ApiError(400, "Group name is required");
    }
    const options = await getFoodOptionsByGroup(foodId, groupName);
    res.status(200).json({
        success: true,
        message: "Food options fetched successfully",
        data: options,
    });
});
export const update = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
        throw new ApiError(400, "Food option ID is required");
    }
    const result = updateFoodOptionSchema.safeParse(req.body);
    if (!result.success) {
        throw new ApiError(400, result.error.issues[0]?.message ||
            "Invalid request data");
    }
    const option = await updateFoodOption(id, result.data);
    res.status(200).json({
        success: true,
        message: "Food option updated successfully",
        data: option,
    });
});
export const updateStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
        throw new ApiError(400, "Food option ID is required");
    }
    const result = updateFoodOptionStatusSchema.safeParse(req.body);
    if (!result.success) {
        throw new ApiError(400, result.error.issues[0]?.message ||
            "Invalid status data");
    }
    const option = await updateFoodOptionStatus(id, result.data);
    res.status(200).json({
        success: true,
        message: "Food option status updated successfully",
        data: option,
    });
});
export const remove = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
        throw new ApiError(400, "Food option ID is required");
    }
    await deleteFoodOption(id);
    res.status(200).json({
        success: true,
        message: "Food option deleted successfully",
    });
});
//# sourceMappingURL=foodOption.controller.js.map