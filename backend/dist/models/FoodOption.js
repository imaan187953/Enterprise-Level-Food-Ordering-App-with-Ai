import mongoose, { Schema } from "mongoose";
const foodOptionSchema = new Schema({
    food: {
        type: Schema.Types.ObjectId,
        ref: "Food",
        required: true,
    },
    groupName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50,
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100,
    },
    price: {
        type: Number,
        default: 0,
        min: 0,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});
foodOptionSchema.index({
    food: 1,
    groupName: 1,
});
foodOptionSchema.index({
    food: 1,
    isActive: 1,
    isAvailable: 1,
});
const FoodOption = mongoose.model("FoodOption", foodOptionSchema);
export default FoodOption;
//# sourceMappingURL=FoodOption.js.map