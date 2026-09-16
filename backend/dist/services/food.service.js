import Food from "../models/Food.js";
import Category from "../models/Category.js";
import ApiError from "../utils/ApiError.js";
import mongoose from "mongoose";
export const createFood = async (data) => {
    const existingFood = await Food.findOne({
        $or: [
            { name: data.name.trim() },
            { slug: data.slug.trim().toLowerCase() },
        ],
    });
    if (existingFood) {
        throw new ApiError(409, "A food item with this name or slug already exists");
    }
    const categoryExists = await Category.findById(data.category);
    if (!categoryExists) {
        throw new ApiError(404, "Category not found");
    }
    if (!categoryExists.isActive) {
        throw new ApiError(400, "Cannot add food to an inactive category");
    }
    const food = await Food.create({
        name: data.name.trim(),
        slug: data.slug.trim().toLowerCase(),
        description: data.description.trim(),
        price: data.price,
        category: new mongoose.Types.ObjectId(data.category),
        ...(data.discountPrice !== undefined && {
            discountPrice: data.discountPrice,
        }),
        ...(data.image !== undefined && {
            image: data.image.trim(),
        }),
        ...(data.ingredients !== undefined && {
            ingredients: data.ingredients,
        }),
        ...(data.allergens !== undefined && {
            allergens: data.allergens,
        }),
        ...(data.isVegetarian !== undefined && {
            isVegetarian: data.isVegetarian,
        }),
        ...(data.isSpicy !== undefined && {
            isSpicy: data.isSpicy,
        }),
        preparationTime: data.preparationTime,
        ...(data.isAvailable !== undefined && {
            isAvailable: data.isAvailable,
        }),
        ...(data.isFeatured !== undefined && {
            isFeatured: data.isFeatured,
        }),
    });
    return food;
};
export const getAllFoods = async () => {
    return Food.find({
        isActive: true,
    })
        .populate("category", "name slug")
        .sort({
        isFeatured: -1,
        createdAt: -1,
    });
};
export const getAvailableFoods = async () => {
    return Food.find({
        isActive: true,
        isAvailable: true,
    })
        .populate("category", "name slug")
        .sort({
        isFeatured: -1,
        createdAt: -1,
    });
};
export const getFeaturedFoods = async () => {
    return Food.find({
        isActive: true,
        isAvailable: true,
        isFeatured: true,
    })
        .populate("category", "name slug")
        .sort({
        createdAt: -1,
    });
};
export const getFoodById = async (foodId) => {
    const food = await Food.findById(foodId)
        .populate("category", "name slug");
    if (!food) {
        throw new ApiError(404, "Food not found");
    }
    return food;
};
export const searchFoods = async (query) => {
    return Food.find({
        isActive: true,
        $text: {
            $search: query,
        },
    })
        .populate("category", "name slug")
        .sort({
        score: { $meta: "textScore" },
    });
};
export const getFoodsByCategory = async (categoryId) => {
    const category = await Category.findById(categoryId);
    if (!category) {
        throw new ApiError(404, "Category not found");
    }
    return Food.find({
        category: categoryId,
        isActive: true,
    })
        .populate("category", "name slug")
        .sort({
        isFeatured: -1,
        createdAt: -1,
    });
};
export const updateFood = async (foodId, data) => {
    const food = await Food.findById(foodId);
    if (!food) {
        throw new ApiError(404, "Food not found");
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
        const existingFood = await Food.findOne({
            $or: conditions,
            _id: { $ne: foodId },
        });
        if (existingFood) {
            throw new ApiError(409, "A food item with this name or slug already exists");
        }
    }
    if (data.category) {
        const category = await Category.findById(data.category);
        if (!category) {
            throw new ApiError(404, "Category not found");
        }
        if (!category.isActive) {
            throw new ApiError(400, "Cannot assign an inactive category");
        }
    }
    if (data.name !== undefined) {
        food.name = data.name.trim();
    }
    if (data.slug !== undefined) {
        food.slug = data.slug
            .trim()
            .toLowerCase();
    }
    if (data.description !== undefined) {
        food.description =
            data.description.trim();
    }
    if (data.price !== undefined) {
        food.price = data.price;
    }
    if (data.discountPrice !== undefined) {
        if (data.discountPrice > food.price) {
            throw new ApiError(400, "Discount price cannot be greater than the original price");
        }
        food.discountPrice =
            data.discountPrice;
    }
    if (data.category !== undefined) {
        food.category = new mongoose.Types.ObjectId(data.category);
    }
    if (data.image !== undefined) {
        food.image = data.image.trim();
    }
    if (data.ingredients !== undefined) {
        food.ingredients = data.ingredients;
    }
    if (data.allergens !== undefined) {
        food.allergens = data.allergens;
    }
    if (data.isVegetarian !== undefined) {
        food.isVegetarian =
            data.isVegetarian;
    }
    if (data.isSpicy !== undefined) {
        food.isSpicy = data.isSpicy;
    }
    if (data.preparationTime !== undefined) {
        food.preparationTime =
            data.preparationTime;
    }
    if (data.isAvailable !== undefined) {
        food.isAvailable =
            data.isAvailable;
    }
    if (data.isFeatured !== undefined) {
        food.isFeatured =
            data.isFeatured;
    }
    if (data.isActive !== undefined) {
        food.isActive =
            data.isActive;
    }
    await food.save();
    return food;
};
export const updateFoodStatus = async (foodId, data) => {
    const food = await Food.findById(foodId);
    if (!food) {
        throw new ApiError(404, "Food not found");
    }
    if (data.isAvailable !== undefined) {
        food.isAvailable =
            data.isAvailable;
    }
    if (data.isFeatured !== undefined) {
        food.isFeatured =
            data.isFeatured;
    }
    if (data.isActive !== undefined) {
        food.isActive =
            data.isActive;
    }
    await food.save();
    return food;
};
export const deleteFood = async (foodId) => {
    const food = await Food.findByIdAndDelete(foodId);
    if (!food) {
        throw new ApiError(404, "Food not found");
    }
    return food;
};
//# sourceMappingURL=food.service.js.map