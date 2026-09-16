export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "ready"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export interface IOrderItemOption {
  optionId: string;
  name: string;
  price: number;
}

export interface IOrderItem {
  food: string;
  name: string;
  image?: string;

  unitPrice: number;
  quantity: number;

  options: IOrderItemOption[];

  itemTotal: number;
}

export interface IOrder {
  user: string;

  items: IOrderItem[];

  address: string;

  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;

  status: OrderStatus;

  createdAt: Date;
  updatedAt: Date;
}

export interface CreateOrderInput {
  addressId: string;
}

export interface UpdateOrderStatusInput {
  status: OrderStatus;
}