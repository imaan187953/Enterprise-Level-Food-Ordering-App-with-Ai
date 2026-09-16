export interface ICategory {
    name: string;
    slug: string;
    description?: string;
    image?: string;
    isActive: boolean;
    sortOrder: number;
    createdAt: Date;
    updatedAt: Date;
}
export interface CreateCategoryInput {
    name: string;
    slug: string;
    description?: string | undefined;
    image?: string | undefined;
    sortOrder?: number | undefined;
}
export interface UpdateCategoryInput {
    name?: string | undefined;
    slug?: string | undefined;
    description?: string | undefined;
    image?: string | undefined;
    sortOrder?: number | undefined;
    isActive?: boolean | undefined;
}
