export interface IImage {
  pexelsPhotoId: string;
  url: string;
  photographer: string;
  photographerUrl?: string;
  alt?: string;
  width?: number;
  height?: number;
  isUsed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateImageInput {
  pexelsPhotoId: string;
  url: string;
  photographer: string;
  photographerUrl?: string | undefined;
  alt?: string | undefined;
  width?: number | undefined;
  height?: number | undefined;
}

export interface UpdateImageUsageInput {
  isUsed: boolean;
}