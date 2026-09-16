import { Response } from "express";

import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

import {
  createCategorySchema,
  updateCategorySchema,
} from "../validations/category.validation.js";

import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  updateCategoryStatus,
} from "../services/category.service.js";

import { AuthenticatedRequest } from "../middleware/auth.middleware.js";

export const create = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const parsed = createCategorySchema.safeParse(req.body);

    if (!parsed.success) {
      throw new ApiError(
        400,
        "Invalid category data",
        parsed.error.flatten()
      );
    }

    const category = await createCategory(parsed.data);

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  }
);

export const getAll = asyncHandler(
  async (_req: AuthenticatedRequest, res: Response) => {
    const categories = await getAllCategories();

    res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      data: categories,
    });
  }
);

export const getById = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      throw new ApiError(400, "Category ID is required");
    }

    const category = await getCategoryById(id);

    res.status(200).json({
      success: true,
      message: "Category fetched successfully",
      data: category,
    });
  }
);

export const update = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      throw new ApiError(400, "Category ID is required");
    }

    const parsed = updateCategorySchema.safeParse(
      req.body
    );

    if (!parsed.success) {
      throw new ApiError(
        400,
        "Invalid category data",
        parsed.error.flatten()
      );
    }

    const category = await updateCategory(
      id,
      parsed.data
    );

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: category,
    });
  }
);

export const remove = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;

   if (!id || Array.isArray(id)) {
      throw new ApiError(400, "Category ID is required");
    }

    await deleteCategory(id);

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  }
);

export const updateStatus = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      throw new ApiError(400, "Category ID is required");
    }

    if (typeof req.body.isActive !== "boolean") {
      throw new ApiError(
        400,
        "isActive must be a boolean"
      );
    }

    const category = await updateCategoryStatus(
      id,
      req.body.isActive
    );

    res.status(200).json({
      success: true,
      message: "Category status updated successfully",
      data: category,
    });
  }
);