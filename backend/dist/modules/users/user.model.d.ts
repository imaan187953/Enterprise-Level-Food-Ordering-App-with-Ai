import mongoose from "mongoose";
import type { UserDocument } from "./user.types.js";
export declare const User: mongoose.Model<UserDocument, {}, {}, {}, mongoose.Document<unknown, {}, UserDocument, {}, mongoose.DefaultSchemaOptions> & import("./user.types.js").IUser & mongoose.Document<mongoose.Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, UserDocument>;
