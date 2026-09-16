export interface IFoodOption {
  food: string;
  groupName: string;
  name: string;
  price: number;
  isAvailable: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateFoodOptionInput {
  food: string;
  groupName: string;
  name: string;
  price?: number | undefined;
  isAvailable?: boolean | undefined;
}

export interface UpdateFoodOptionInput {
  groupName?: string | undefined;
  name?: string | undefined;
  price?: number | undefined;
  isAvailable?: boolean | undefined;
  isActive?: boolean | undefined;
}

export interface UpdateFoodOptionStatusInput {
  isAvailable?: boolean | undefined;
  isActive?: boolean | undefined;
}