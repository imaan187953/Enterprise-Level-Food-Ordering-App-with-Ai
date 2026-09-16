import Image from "../models/Image.js";
import ApiError from "../utils/ApiError.js";

import {
  CreateImageInput,
} from "../types/image.types.js";

import { pexelsConfig } from "../config/pexels.js";

interface PexelsPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  alt: string | null;
  src: {
    original: string;
    large: string;
    medium: string;
  };
}

interface PexelsSearchResponse {
  total_results: number;
  page: number;
  per_page: number;
  photos: PexelsPhoto[];
}

export const searchPexelsImages = async (
  query: string,
  page = 1,
  perPage = 20
) => {
  const url = new URL(
    `${pexelsConfig.baseUrl}/search`
  );

  url.searchParams.set("query", query);
  url.searchParams.set("page", String(page));
  url.searchParams.set("per_page", String(perPage));

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: pexelsConfig.apiKey,
    },
  });

  if (!response.ok) {
    throw new ApiError(
      response.status,
      "Failed to search Pexels images"
    );
  }

  const data =
    (await response.json()) as PexelsSearchResponse;

  return {
    totalResults: data.total_results,
    page: data.page,
    perPage: data.per_page,
    photos: data.photos.map((photo) => ({
      pexelsPhotoId: String(photo.id),
      url: photo.src.large,
      photographer: photo.photographer,
      photographerUrl: photo.photographer_url,
      alt: photo.alt || "",
      width: photo.width,
      height: photo.height,
    })),
  };
};

export const saveImage = async (
  data: CreateImageInput
) => {
  const existingImage =
    await Image.findOne({
      pexelsPhotoId: data.pexelsPhotoId,
    });

  if (existingImage) {
    return existingImage;
  }

  return Image.create({
    pexelsPhotoId: data.pexelsPhotoId,
    url: data.url,
    photographer: data.photographer,
    ...(data.photographerUrl !== undefined && {
      photographerUrl: data.photographerUrl,
    }),
    ...(data.alt !== undefined && {
      alt: data.alt,
    }),
    ...(data.width !== undefined && {
      width: data.width,
    }),
    ...(data.height !== undefined && {
      height: data.height,
    }),
    isUsed: false,
  });
};

export const getSavedImages = async () => {
  return Image.find()
    .sort({ createdAt: -1 });
};

export const getSavedImageById = async (
  imageId: string
) => {
  const image = await Image.findById(imageId);

  if (!image) {
    throw new ApiError(
      404,
      "Image not found"
    );
  }

  return image;
};

export const updateImageUsage = async (
  imageId: string,
  isUsed: boolean
) => {
  const image =
    await Image.findByIdAndUpdate(
      imageId,
      { isUsed },
      {
        new: true,
        runValidators: true,
      }
    );

  if (!image) {
    throw new ApiError(
      404,
      "Image not found"
    );
  }

  return image;
};

export const deleteUnusedImage = async (
  imageId: string
) => {
  const image = await Image.findById(imageId);

  if (!image) {
    throw new ApiError(
      404,
      "Image not found"
    );
  }

  if (image.isUsed) {
    throw new ApiError(
      400,
      "Used images cannot be deleted"
    );
  }

  await image.deleteOne();

  return image;
};