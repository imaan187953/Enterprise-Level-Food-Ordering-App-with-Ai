import mongoose, { Schema, } from "mongoose";
const cartOptionSchema = new Schema({
    optionId: {
        type: Schema.Types.ObjectId,
        ref: "FoodOption",
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
}, {
    _id: false,
});
const cartItemSchema = new Schema({
    food: {
        type: Schema.Types.ObjectId,
        ref: "Food",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    unitPrice: {
        type: Number,
        required: true,
        min: 0,
    },
    options: {
        type: [cartOptionSchema],
        default: [],
    },
    itemTotal: {
        type: Number,
        required: true,
        min: 0,
    },
}, {
    _id: false,
});
const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
        index: true,
    },
    items: {
        type: [cartItemSchema],
        default: [],
    },
    subtotal: {
        type: Number,
        default: 0,
        min: 0,
    },
    discount: {
        type: Number,
        default: 0,
        min: 0,
    },
    deliveryFee: {
        type: Number,
        default: 0,
        min: 0,
    },
    total: {
        type: Number,
        default: 0,
        min: 0,
    },
}, {
    timestamps: true,
});
const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
//# sourceMappingURL=Cart.js.map