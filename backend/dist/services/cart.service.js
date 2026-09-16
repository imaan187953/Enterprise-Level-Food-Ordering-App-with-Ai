import mongoose from "mongoose";
import Cart from "../models/Cart.js";
import Food from "../models/Food.js";
import FoodOption from "../models/FoodOption.js";
import ApiError from "../utils/ApiError.js";
const DELIVERY_FEE = 0;
const validateUserId = (userId) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new ApiError(400, "Invalid user ID");
    }
};
const validateObjectId = (id, message) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, message);
    }
};
const calculateTotals = (cart) => {
    cart.subtotal = cart.items.reduce((sum, item) => sum + item.itemTotal, 0);
    cart.discount = 0;
    cart.deliveryFee = DELIVERY_FEE;
    cart.total =
        cart.subtotal -
            cart.discount +
            cart.deliveryFee;
};
const getOrCreateCart = async (userId) => {
    let cart = await Cart.findOne({
        user: userId,
    });
    if (!cart) {
        cart = await Cart.create({
            user: userId,
            items: [],
            subtotal: 0,
            discount: 0,
            deliveryFee: DELIVERY_FEE,
            total: 0,
        });
    }
    return cart;
};
export const getCart = async (userId) => {
    validateUserId(userId);
    const cart = await getOrCreateCart(userId);
    await cart.populate({
        path: "items.food",
        select: "name slug image price discountPrice isAvailable isActive",
    });
    return cart;
};
export const addToCart = async (userId, data) => {
    validateUserId(userId);
    validateObjectId(data.foodId, "Invalid food ID");
    const food = await Food.findOne({
        _id: data.foodId,
        isActive: true,
    });
    if (!food) {
        throw new ApiError(404, "Food not found");
    }
    if (!food.isAvailable) {
        throw new ApiError(400, "Food is currently unavailable");
    }
    const selectedOptionIds = data.optionIds || [];
    const options = [];
    if (selectedOptionIds.length > 0) {
        for (const optionId of selectedOptionIds) {
            validateObjectId(optionId, "Invalid option ID");
        }
        const foodOptions = await FoodOption.find({
            _id: {
                $in: selectedOptionIds,
            },
            food: data.foodId,
            isActive: true,
        });
        if (foodOptions.length !==
            selectedOptionIds.length) {
            throw new ApiError(400, "One or more selected options are invalid");
        }
        for (const option of foodOptions) {
            options.push({
                optionId: option._id,
                name: option.name,
                price: option.price,
            });
        }
    }
    const basePrice = food.discountPrice ??
        food.price;
    const optionTotal = options.reduce((sum, option) => sum + option.price, 0);
    const unitPrice = basePrice + optionTotal;
    const itemTotal = unitPrice * data.quantity;
    const cart = await getOrCreateCart(userId);
    const existingItem = cart.items.find((item) => item.food.toString() ===
        data.foodId &&
        JSON.stringify(item.options
            .map((option) => option.optionId.toString())
            .sort()) ===
            JSON.stringify(selectedOptionIds.sort()));
    if (existingItem) {
        existingItem.quantity +=
            data.quantity;
        existingItem.unitPrice =
            unitPrice;
        existingItem.itemTotal =
            existingItem.quantity *
                unitPrice;
    }
    else {
        cart.items.push({
            food: food._id,
            quantity: data.quantity,
            unitPrice,
            options,
            itemTotal,
        });
    }
    calculateTotals(cart);
    await cart.save();
    return cart;
};
export const updateCartItem = async (userId, itemId, data) => {
    validateUserId(userId);
    validateObjectId(itemId, "Invalid cart item ID");
    const cart = await getOrCreateCart(userId);
    const item = cart.items.find((cartItem) => cartItem._id?.toString() === itemId);
    if (!item) {
        throw new ApiError(404, "Cart item not found");
    }
    const food = await Food.findOne({
        _id: item.food,
        isActive: true,
    });
    if (!food) {
        throw new ApiError(404, "Food not found");
    }
    const optionIds = data.optionIds ??
        item.options.map((option) => option.optionId.toString());
    const options = [];
    if (optionIds.length > 0) {
        const foodOptions = await FoodOption.find({
            _id: {
                $in: optionIds,
            },
            food: food._id,
            isActive: true,
        });
        if (foodOptions.length !==
            optionIds.length) {
            throw new ApiError(400, "One or more selected options are invalid");
        }
        for (const option of foodOptions) {
            options.push({
                optionId: option._id,
                name: option.name,
                price: option.price,
            });
        }
    }
    const basePrice = food.discountPrice ??
        food.price;
    const optionTotal = options.reduce((sum, option) => sum + option.price, 0);
    const unitPrice = basePrice + optionTotal;
    item.quantity = data.quantity;
    item.unitPrice = unitPrice;
    item.options = options;
    item.itemTotal =
        unitPrice * data.quantity;
    calculateTotals(cart);
    await cart.save();
    return cart;
};
export const removeCartItem = async (userId, itemId) => {
    validateUserId(userId);
    validateObjectId(itemId, "Invalid cart item ID");
    const cart = await getOrCreateCart(userId);
    const itemIndex = cart.items.findIndex((item) => item._id?.toString() === itemId);
    if (itemIndex === -1) {
        throw new ApiError(404, "Cart item not found");
    }
    cart.items.splice(itemIndex, 1);
    calculateTotals(cart);
    await cart.save();
    return cart;
};
export const clearCart = async (userId) => {
    validateUserId(userId);
    const cart = await getOrCreateCart(userId);
    cart.items = [];
    calculateTotals(cart);
    await cart.save();
    return cart;
};
//# sourceMappingURL=cart.service.js.map