import mongoose, { Schema, } from "mongoose";
const addressSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    label: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 30,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        maxlength: 20,
    },
    addressLine: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 250,
    },
    city: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100,
    },
    state: {
        type: String,
        trim: true,
        maxlength: 100,
    },
    postalCode: {
        type: String,
        trim: true,
        maxlength: 20,
    },
    latitude: {
        type: Number,
        min: -90,
        max: 90,
    },
    longitude: {
        type: Number,
        min: -180,
        max: 180,
    },
    isDefault: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
addressSchema.index({
    user: 1,
    isDefault: 1,
});
const Address = mongoose.model("Address", addressSchema);
export default Address;
//# sourceMappingURL=Address.js.map