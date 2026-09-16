import Category from "../models/Category.js";
import ApiError from "../utils/ApiError.js";

import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "../types/category.types.js";

export const createCategory = async (
  data: CreateCategoryInput
) => {
  const existingCategory = await Category.findOne({
    $or: [
      { name: data.name.trim() },
      { slug: data.slug.trim().toLowerCase() },
    ],
  });

  if (existingCategory) {
    throw new ApiError(
      409,
      "A category with this name or slug already exists"
    );
  }

  const category = await Category.create({
  name: data.name.trim(),
  slug: data.slug.trim().toLowerCase(),
  ...(data.description !== undefined && {
    description: data.description.trim(),
  }),
  ...(data.image !== undefined && {
    image: data.image.trim(),
  }),
  ...(data.sortOrder !== undefined && {
    sortOrder: data.sortOrder,
  }),
});

  return category;
};

export const getAllCategories = async () => {
  return Category.find()
    .sort({ sortOrder: 1, name: 1 });
};

export const getCategoryById = async (
  categoryId: string
) => {
  const category = await Category.findById(categoryId);

  if (!category) {
    throw new ApiError(
      404,
      "Category not found"
    );
  }

  return category;
};

export const updateCategory = async (
  categoryId: string,
  data: UpdateCategoryInput
) => {
  const category = await Category.findById(categoryId);

  if (!category) {
    throw new ApiError(
      404,
      "Category not found"
    );
  }

  if (data.name || data.slug) {
    const conditions = [];

    if (data.name) {
      conditions.push({
        name: data.name.trim(),
      });
    }

    if (data.slug) {
      conditions.push({
        slug: data.slug.trim().toLowerCase(),
      });
    }

    const existingCategory =
      await Category.findOne({
        $or: conditions,
        _id: { $ne: categoryId },
      });

    if (existingCategory) {
      throw new ApiError(
        409,
        "A category with this name or slug already exists"
      );
    }
  }

  if (data.name !== undefined) {
    category.name = data.name.trim();
  }

  if (data.slug !== undefined) {
    category.slug = data.slug
      .trim()
      .toLowerCase();
  }

  if (data.description !== undefined) {
    category.description =
      data.description.trim();
  }

  if (data.image !== undefined) {
    category.image = data.image.trim();
  }

  if (data.sortOrder !== undefined) {
    category.sortOrder = data.sortOrder;
  }

  if (data.isActive !== undefined) {
    category.isActive = data.isActive;
  }

  await category.save();

  return category;
};

export const deleteCategory = async (
  categoryId: string
) => {
  const category =
    await Category.findByIdAndDelete(categoryId);

  if (!category) {
    throw new ApiError(
      404,
      "Category not found"
    );
  }

  return category;
};

export const updateCategoryStatus = async (
  categoryId: string,
  isActive: boolean
) => {
  const category =
    await Category.findByIdAndUpdate(
      categoryId,
      { isActive },
      { new: true, runValidators: true }
    );

  if (!category) {
    throw new ApiError(
      404,
      "Category not found"
    );
  }

  return category;
};