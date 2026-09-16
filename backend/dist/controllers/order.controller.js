import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { createOrder, getUserOrders, getUserOrderById, cancelOrder, getAllOrders, getOrderById, updateOrderStatus, } from "../services/order.service.js";
import { createOrderSchema, updateOrderStatusSchema, } from "../validations/order.validation.js";
const getUserId = (req) => {
    const userId = req.user?.userId;
    if (!userId) {
        throw new ApiError(401, "Authentication required");
    }
    return userId;
};
export const create = asyncHandler(async (req, res) => {
    const userId = getUserId(req);
    const data = createOrderSchema.parse(req.body);
    const order = await createOrder(userId, data);
    res.status(201).json({
        success: true,
        message: "Order created successfully",
        data: order,
    });
});
export const getMyOrders = asyncHandler(async (req, res) => {
    const userId = getUserId(req);
    const orders = await getUserOrders(userId);
    res.status(200).json({
        success: true,
        message: "Orders fetched successfully",
        data: orders,
    });
});
export const getMyOrder = asyncHandler(async (req, res) => {
    const userId = getUserId(req);
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
        throw new ApiError(400, "Order ID is required");
    }
    const order = await getUserOrderById(userId, id);
    res.status(200).json({
        success: true,
        message: "Order fetched successfully",
        data: order,
    });
});
export const cancel = asyncHandler(async (req, res) => {
    const userId = getUserId(req);
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
        throw new ApiError(400, "Order ID is required");
    }
    const order = await cancelOrder(userId, id);
    res.status(200).json({
        success: true,
        message: "Order cancelled successfully",
        data: order,
    });
});
export const getAll = asyncHandler(async (_req, res) => {
    const orders = await getAllOrders();
    res.status(200).json({
        success: true,
        message: "All orders fetched successfully",
        data: orders,
    });
});
export const getById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
        throw new ApiError(400, "Order ID is required");
    }
    const order = await getOrderById(id);
    res.status(200).json({
        success: true,
        message: "Order fetched successfully",
        data: order,
    });
});
export const updateStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
        throw new ApiError(400, "Order ID is required");
    }
    const data = updateOrderStatusSchema.parse(req.body);
    const order = await updateOrderStatus(id, data.status);
    res.status(200).json({
        success: true,
        message: "Order status updated successfully",
        data: order,
    });
});
//# sourceMappingURL=order.controller.js.map