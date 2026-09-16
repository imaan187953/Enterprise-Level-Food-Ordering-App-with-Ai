import { createAddress, getUserAddresses, getUserAddressById, updateUserAddress, setDefaultAddress, deleteUserAddress, } from "../services/address.service.js";
import { createAddressSchema, updateAddressSchema, updateAddressDefaultSchema, } from "../validations/address.validation.js";
import ApiError from "../utils/ApiError.js";
const getUserId = (req) => {
    const userId = req.user?.userId;
    if (!userId) {
        throw new ApiError(401, "Authentication required");
    }
    return userId;
};
const getAddressId = (req) => {
    const addressId = req.params.id;
    if (typeof addressId !== "string" ||
        !addressId) {
        throw new ApiError(400, "Address ID is required");
    }
    return addressId;
};
export const create = async (req, res) => {
    const userId = getUserId(req);
    const data = createAddressSchema.parse(req.body);
    const address = await createAddress(userId, data);
    res.status(201).json({
        success: true,
        message: "Address created successfully",
        data: address,
    });
};
export const getAll = async (req, res) => {
    const userId = getUserId(req);
    const addresses = await getUserAddresses(userId);
    res.status(200).json({
        success: true,
        message: "Addresses fetched successfully",
        data: addresses,
    });
};
export const getById = async (req, res) => {
    const userId = getUserId(req);
    const addressId = getAddressId(req);
    const address = await getUserAddressById(userId, addressId);
    res.status(200).json({
        success: true,
        message: "Address fetched successfully",
        data: address,
    });
};
export const update = async (req, res) => {
    const userId = getUserId(req);
    const addressId = getAddressId(req);
    const data = updateAddressSchema.parse(req.body);
    const address = await updateUserAddress(userId, addressId, data);
    res.status(200).json({
        success: true,
        message: "Address updated successfully",
        data: address,
    });
};
export const setDefault = async (req, res) => {
    const userId = getUserId(req);
    const addressId = getAddressId(req);
    const data = updateAddressDefaultSchema.parse(req.body);
    const address = await setDefaultAddress(userId, addressId, data.isDefault);
    res.status(200).json({
        success: true,
        message: data.isDefault
            ? "Address set as default"
            : "Address removed from default",
        data: address,
    });
};
export const remove = async (req, res) => {
    const userId = getUserId(req);
    const addressId = getAddressId(req);
    await deleteUserAddress(userId, addressId);
    res.status(200).json({
        success: true,
        message: "Address deleted successfully",
    });
};
//# sourceMappingURL=address.controller.js.map