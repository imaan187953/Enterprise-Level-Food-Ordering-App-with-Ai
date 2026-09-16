import mongoose from "mongoose";

import Food from "../models/Food.js";
import FoodOption from "../models/FoodOption.js";
import {
  CreateFoodOptionInput,
  UpdateFoodOptionInput,
  UpdateFoodOptionStatusInput,
} from "../types/foodOption.types.js";
import ApiError  from "../utils/ApiError.js";

export const createFoodOption = async (
  data: CreateFoodOptionInput
) => {
  if (!mongoose.Types.ObjectId.isValid(data.food)) {
    throw new ApiError(400, "Invalid food ID");
  }

  const food = await Food.findById(data.food);

  if (!food) {
    throw new ApiError(404, "Food not found");
  }

  if (!food.isActive) {
    throw new ApiError(
      400,
      "Cannot add options to an inactive food"
    );
  }

  const existingOption = await FoodOption.findOne({
    food: data.food,
    groupName: data.groupName,
    name: data.name,
  });

  if (existingOption) {
    throw new ApiError(
      409,
      "This food option already exists"
    );
  }

  return FoodOption.create({
    food: data.food,
    groupName: data.groupName,
    name: data.name,
    price: data.price ?? 0,
    isAvailable: data.isAvailable ?? true,
    isActive: true,
  });
};

export const getFoodOptions = async (
  foodId?: string
) => {
  const filter: Record<string, unknown> = {
    isActive: true,
  };

  if (foodId) {
    if (!mongoose.Types.ObjectId.isValid(foodId)) {
      throw new ApiError(400, "Invalid food ID");
    }

    filter.food = foodId;
  }

  return FoodOption.find(filter)
    .populate("food", "name slug price")
    .sort({
      groupName: 1,
      name: 1,
    });
};

export const getFoodOptionById = async (
  id: string
) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid food option ID");
  }

  const option = await FoodOption.findById(id).populate(
    "food",
    "name slug price"
  );

  if (!option) {
    throw new ApiError(404, "Food option not found");
  }

  return option;
};

export const getFoodOptionsByGroup = async (
  foodId: string,
  groupName: string
) => {
  if (!mongoose.Types.ObjectId.isValid(foodId)) {
    throw new ApiError(400, "Invalid food ID");
  }

  return FoodOption.find({
    food: foodId,
    groupName,
    isActive: true,
  }).sort({
    name: 1,
  });
};

export const updateFoodOption = async (
  id: string,
  data: UpdateFoodOptionInput
) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid food option ID");
  }

  const option = await FoodOption.findById(id);

  if (!option) {
    throw new ApiError(404, "Food option not found");
  }

  if (data.groupName || data.name) {
    const existingOption = await FoodOption.findOne({
      _id: { $ne: id },
      food: option.food,
      groupName: data.groupName ?? option.groupName,
      name: data.name ?? option.name,
    });

    if (existingOption) {
      throw new ApiError(
        409,
        "This food option already exists"
      );
    }
  }

  Object.assign(option, data);

  await option.save();

  return option;
};

export const updateFoodOptionStatus = async (
  id: string,
  data: UpdateFoodOptionStatusInput
) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid food option ID");
  }

  const option = await FoodOption.findById(id);

  if (!option) {
    throw new ApiError(404, "Food option not found");
  }

  if (data.isAvailable !== undefined) {
    option.isAvailable = data.isAvailable;
  }

  if (data.isActive !== undefined) {
    option.isActive = data.isActive;
  }

  await option.save();

  return option;
};

export const deleteFoodOption = async (
  id: string
) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid food option ID");
  }

  const option = await FoodOption.findById(id);

  if (!option) {
    throw new ApiError(404, "Food option not found");
  }

  await option.deleteOne();

  return option;
};