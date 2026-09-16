import mongoose from "mongoose";
import { IFood } from "../types/food.types.js";
declare const Food: mongoose.Model<IFood, {}, {}, {}, mongoose.Document<unknown, {}, IFood, {}, mongoose.DefaultSchemaOptions> & IFood & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, IFood>;
export default Food;
