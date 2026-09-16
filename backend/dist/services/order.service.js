import mongoose from "mongoose";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Address from "../models/Address.js";
import ApiError from "../utils/ApiError.js";
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
export const createOrder = async (userId, data) => {
    validateUserId(userId);
    validateObjectId(data.addressId, "Invalid address ID");
    const address = await Address.findOne({
        _id: data.addressId,
        user: userId,
    });
    if (!address) {
        throw new ApiError(404, "Address not found");
    }
    const cart = await Cart.findOne({
        user: userId,
    });
    if (!cart ||
        cart.items.length === 0) {
        throw new ApiError(400, "Cart is empty");
    }
    await cart.populate({
        path: "items.food",
        select: "name image price discountPrice isAvailable isActive",
    });
    const orderItems = cart.items.map((item) => {
        const food = item.food;
        if (!food) {
            throw new ApiError(400, "Food item no longer exists");
        }
        if (!food.isActive) {
            throw new ApiError(400, `${food.name} is no longer available`);
        }
        if (!food.isAvailable) {
            throw new ApiError(400, `${food.name} is currently unavailable`);
        }
        return {
            food: food._id,
            name: food.name,
            image: food.image,
            unitPrice: item.unitPrice,
            quantity: item.quantity,
            options: item.options.map((option) => ({
                optionId: option.optionId,
                name: option.name,
                price: option.price,
            })),
            itemTotal: item.itemTotal,
        };
    });
    const order = await Order.create({
        user: userId,
        items: orderItems,
        address: address._id,
        subtotal: cart.subtotal,
        discount: cart.discount,
        deliveryFee: cart.deliveryFee,
        total: cart.total,
        status: "pending",
    });
    cart.items = [];
    cart.subtotal = 0;
    cart.discount = 0;
    cart.deliveryFee = 0;
    cart.total = 0;
    await cart.save();
    return order;
};
export const getUserOrders = async (userId) => {
    validateUserId(userId);
    return Order.find({
        user: userId,
    })
        .populate("address")
        .sort({
        createdAt: -1,
    });
};
export const getUserOrderById = async (userId, orderId) => {
    validateUserId(userId);
    validateObjectId(orderId, "Invalid order ID");
    const order = await Order.findOne({
        _id: orderId,
        user: userId,
    }).populate("address");
    if (!order) {
        throw new ApiError(404, "Order not found");
    }
    return order;
};
export const cancelOrder = async (userId, orderId) => {
    const order = await getUserOrderById(userId, orderId);
    if (order.status !== "pending" &&
        order.status !== "confirmed") {
        throw new ApiError(400, "This order can no longer be cancelled");
    }
    order.status = "cancelled";
    await order.save();
    return order;
};
export const getAllOrders = async () => {
    return Order.find()
        .populate("user", "name email")
        .populate("address")
        .sort({
        createdAt: -1,
    });
};
export const getOrderById = async (orderId) => {
    validateObjectId(orderId, "Invalid order ID");
    const order = await Order.findById(orderId)
        .populate("user", "name email")
        .populate("address");
    if (!order) {
        throw new ApiError(404, "Order not found");
    }
    return order;
};
export const updateOrderStatus = async (orderId, status) => {
    validateObjectId(orderId, "Invalid order ID");
    const order = await Order.findById(orderId);
    if (!order) {
        throw new ApiError(404, "Order not found");
    }
    order.status = status;
    await order.save();
    return order;
};
//# sourceMappingURL=order.service.js.map