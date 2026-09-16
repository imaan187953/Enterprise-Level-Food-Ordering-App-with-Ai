import mongoose, {
  Schema,
} from "mongoose";

import { IImage } from "../types/image.types.js";

const imageSchema = new Schema<IImage>(
  {
    pexelsPhotoId: {
      type: String,
      required: [true, "Pexels photo ID is required"],
      unique: true,
      trim: true,
    },

    url: {
      type: String,
      required: [true, "Image URL is required"],
      trim: true,
    },

    photographer: {
      type: String,
      required: [true, "Photographer name is required"],
      trim: true,
    },

    photographerUrl: {
      type: String,
      trim: true,
      default: "",
    },

    alt: {
      type: String,
      trim: true,
      default: "",
    },

    width: {
      type: Number,
      min: [1, "Image width must be greater than 0"],
    },

    height: {
      type: Number,
      min: [1, "Image height must be greater than 0"],
    },

    isUsed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Image = mongoose.model<IImage>(
  "Image",
  imageSchema
);

export default Image;