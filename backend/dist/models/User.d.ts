import mongoose, { HydratedDocument } from "mongoose";
import { IUser } from "../types/user.types.js";
export type IUserDocument = HydratedDocument<IUser>;
declare const User: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, IUser>;
export default User;
