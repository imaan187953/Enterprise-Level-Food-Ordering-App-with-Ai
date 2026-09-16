import { getCart, addToCart, updateCartItem, removeCartItem, clearCart, } from "../services/cart.service.js";
import { addCartItemSchema, updateCartItemSchema, } from "../validations/cart.validation.js";
import ApiError from "../utils/ApiError.js";
const getUserId = (req) => {
    const userId = req.user?.userId;
    if (!userId) {
        throw new ApiError(401, "Authentication required");
    }
    return userId;
};
const getItemId = (req) => {
    const itemId = req.params.itemId;
    if (typeof itemId !== "string" ||
        !itemId) {
        throw new ApiError(400, "Cart item ID is required");
    }
    return itemId;
};
export const get = async (req, res) => {
    const userId = getUserId(req);
    const cart = await getCart(userId);
    res.status(200).json({
        success: true,
        message: "Cart fetched successfully",
        data: cart,
    });
};
export const add = async (req, res) => {
    const userId = getUserId(req);
    const data = addCartItemSchema.parse(req.body);
    const cart = await addToCart(userId, data);
    res.status(200).json({
        success: true,
        message: "Item added to cart",
        data: cart,
    });
};
export const update = async (req, res) => {
    const userId = getUserId(req);
    const itemId = getItemId(req);
    const data = updateCartItemSchema.parse(req.body);
    const cart = await updateCartItem(userId, itemId, data);
    res.status(200).json({
        success: true,
        message: "Cart item updated",
        data: cart,
    });
};
export const remove = async (req, res) => {
    const userId = getUserId(req);
    const itemId = getItemId(req);
    const cart = await removeCartItem(userId, itemId);
    res.status(200).json({
        success: true,
        message: "Item removed from cart",
        data: cart,
    });
};
export const clear = async (req, res) => {
    const userId = getUserId(req);
    const cart = await clearCart(userId);
    res.status(200).json({
        success: true,
        message: "Cart cleared successfully",
        data: cart,
    });
};
//# sourceMappingURL=cart.controller.js.map