import mongoose, { Document } from "mongoose";
export interface IAddressDocument extends Document {
    user: mongoose.Types.ObjectId;
    label: string;
    fullName: string;
    phone: string;
    addressLine: string;
    city: string;
    state?: string | undefined;
    postalCode?: string | undefined;
    latitude?: number | undefined;
    longitude?: number | undefined;
    isDefault: boolean;
    createdAt: Date;
    updatedAt: Date;
}
declare const Address: mongoose.Model<IAddressDocument, {}, {}, {}, Document<unknown, {}, IAddressDocument, {}, mongoose.DefaultSchemaOptions> & IAddressDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IAddressDocument>;
export default Address;
