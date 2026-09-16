import { Types } from "mongoose";

export interface IFood {
  name: string;
  slug: string;
  description: string;

  price: number;
  discountPrice?: number;

  category: Types.ObjectId;
  image?: string;

  ingredients: string[];
  allergens: string[];

  isVegetarian: boolean;
  isSpicy: boolean;

  preparationTime: number;

  rating: number;
  reviewCount: number;

  isAvailable: boolean;
  isFeatured: boolean;
  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;
}

export interface CreateFoodInput {
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPrice?: number | undefined;
  category: string;
  image?: string | undefined;
  ingredients?: string[] | undefined;
  allergens?: string[] | undefined;
  isVegetarian?: boolean | undefined;
  isSpicy?: boolean | undefined;
  preparationTime: number;
  isAvailable?: boolean | undefined;
  isFeatured?: boolean | undefined;
}

export interface UpdateFoodInput {
  name?: string | undefined;
  slug?: string | undefined;
  description?: string | undefined;
  price?: number | undefined;
  discountPrice?: number | undefined;
  category?: string | undefined;
  image?: string | undefined;
  ingredients?: string[] | undefined;
  allergens?: string[] | undefined;
  isVegetarian?: boolean | undefined;
  isSpicy?: boolean | undefined;
  preparationTime?: number | undefined;
  isAvailable?: boolean | undefined;
  isFeatured?: boolean | undefined;
  isActive?: boolean | undefined;
}

export interface UpdateFoodStatusInput {
  isAvailable?: boolean | undefined;
  isFeatured?: boolean | undefined;
  isActive?: boolean | undefined;
}