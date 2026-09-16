import mongoose, {
  Schema,
} from "mongoose";

import { ICategory } from "../types/category.types.js";

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      minlength: [
        2,
        "Category name must be at least 2 characters",
      ],
      maxlength: [
        50,
        "Category name cannot exceed 50 characters",
      ],
    },

    slug: {
      type: String,
      required: [true, "Category slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      maxlength: [
        500,
        "Description cannot exceed 500 characters",
      ],
    },

    image: {
      type: String,
      trim: true,
      default: "",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    sortOrder: {
      type: Number,
      default: 0,
      min: [0, "Sort order cannot be negative"],
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model<ICategory>(
  "Category",
  categorySchema
);

export default Category;