import mongoose, { Document } from "mongoose";
export interface IFoodOptionDocument extends Document {
    food: mongoose.Types.ObjectId;
    groupName: string;
    name: string;
    price: number;
    isAvailable: boolean;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
declare const FoodOption: mongoose.Model<IFoodOptionDocument, {}, {}, {}, Document<unknown, {}, IFoodOptionDocument, {}, mongoose.DefaultSchemaOptions> & IFoodOptionDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IFoodOptionDocument>;
export default FoodOption;
