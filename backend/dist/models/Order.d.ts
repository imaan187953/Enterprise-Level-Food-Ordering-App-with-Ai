import mongoose, { Document } from "mongoose";
type OrderStatus = "pending" | "confirmed" | "preparing" | "ready" | "out_for_delivery" | "delivered" | "cancelled";
interface IOrderItemOptionDocument {
    optionId: mongoose.Types.ObjectId;
    name: string;
    price: number;
}
interface IOrderItemDocument {
    food: mongoose.Types.ObjectId;
    name: string;
    image?: string;
    unitPrice: number;
    quantity: number;
    options: IOrderItemOptionDocument[];
    itemTotal: number;
}
export interface IOrderDocument extends Document {
    user: mongoose.Types.ObjectId;
    items: IOrderItemDocument[];
    address: mongoose.Types.ObjectId;
    subtotal: number;
    discount: number;
    deliveryFee: number;
    total: number;
    status: OrderStatus;
    createdAt: Date;
    updatedAt: Date;
}
declare const Order: mongoose.Model<IOrderDocument, {}, {}, {}, Document<unknown, {}, IOrderDocument, {}, mongoose.DefaultSchemaOptions> & IOrderDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IOrderDocument>;
export default Order;
