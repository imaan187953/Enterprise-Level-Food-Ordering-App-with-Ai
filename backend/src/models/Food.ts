import mongoose, {
  Schema,
} from "mongoose";

import { IFood } from "../types/food.types.js";

const foodSchema = new Schema<IFood>(
  {
    name: {
      type: String,
      required: [true, "Food name is required"],
      trim: true,
      minlength: [
        2,
        "Food name must be at least 2 characters",
      ],
      maxlength: [
        100,
        "Food name cannot exceed 100 characters",
      ],
    },

    slug: {
      type: String,
      required: [true, "Food slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Food description is required"],
      trim: true,
      maxlength: [
        1000,
        "Description cannot exceed 1000 characters",
      ],
    },

    price: {
      type: Number,
      required: [true, "Food price is required"],
      min: [0, "Price cannot be negative"],
    },

    discountPrice: {
      type: Number,
      min: [0, "Discount price cannot be negative"],
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },

    image: {
      type: String,
      trim: true,
      default: "",
    },

    ingredients: {
      type: [String],
      default: [],
    },

    allergens: {
      type: [String],
      default: [],
    },

    isVegetarian: {
      type: Boolean,
      default: false,
    },

    isSpicy: {
      type: Boolean,
      default: false,
    },

    preparationTime: {
      type: Number,
      required: [
        true,
        "Preparation time is required",
      ],
      min: [
        1,
        "Preparation time must be at least 1 minute",
      ],
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    reviewCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

foodSchema.index({
  name: "text",
  description: "text",
});

foodSchema.index({
  category: 1,
  isActive: 1,
});

foodSchema.index({
  isFeatured: 1,
  isAvailable: 1,
});

const Food = mongoose.model<IFood>(
  "Food",
  foodSchema
);

export default Food;