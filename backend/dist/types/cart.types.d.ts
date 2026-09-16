export interface ICartItemOption {
    optionId: string;
    name: string;
    price: number;
}
export interface ICartItem {
    food: string;
    quantity: number;
    unitPrice: number;
    options: ICartItemOption[];
    itemTotal: number;
}
export interface ICart {
    user: string;
    items: ICartItem[];
    subtotal: number;
    discount: number;
    deliveryFee: number;
    total: number;
    createdAt: Date;
    updatedAt: Date;
}
export interface AddCartItemInput {
    foodId: string;
    quantity: number;
    optionIds?: string[] | undefined;
}
export interface UpdateCartItemInput {
    quantity: number;
    optionIds?: string[] | undefined;
}
