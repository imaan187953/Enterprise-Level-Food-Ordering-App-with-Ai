import mongoose from "mongoose";
import { IImage } from "../types/image.types.js";
declare const Image: mongoose.Model<IImage, {}, {}, {}, mongoose.Document<unknown, {}, IImage, {}, mongoose.DefaultSchemaOptions> & IImage & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, IImage>;
export default Image;
