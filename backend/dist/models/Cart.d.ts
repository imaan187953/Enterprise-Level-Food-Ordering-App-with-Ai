import mongoose, { Document } from "mongoose";
interface ICartOptionDocument {
    optionId: mongoose.Types.ObjectId;
    name: string;
    price: number;
}
export interface ICartItemDocument {
    food: mongoose.Types.ObjectId;
    quantity: number;
    unitPrice: number;
    options: ICartOptionDocument[];
    itemTotal: number;
}
export interface ICartDocument extends Document {
    user: mongoose.Types.ObjectId;
    items: ICartItemDocument[];
    subtotal: number;
    discount: number;
    deliveryFee: number;
    total: number;
    createdAt: Date;
    updatedAt: Date;
}
declare const Cart: mongoose.Model<ICartDocument, {}, {}, {}, Document<unknown, {}, ICartDocument, {}, mongoose.DefaultSchemaOptions> & ICartDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ICartDocument>;
export default Cart;
