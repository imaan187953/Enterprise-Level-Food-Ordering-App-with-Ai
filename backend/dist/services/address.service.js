import mongoose from "mongoose";
import Address from "../models/Address.js";
import ApiError from "../utils/ApiError.js";
export const createAddress = async (userId, data) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new ApiError(400, "Invalid user ID");
    }
    const addressCount = await Address.countDocuments({
        user: userId,
    });
    const shouldBeDefault = data.isDefault === true ||
        addressCount === 0;
    if (shouldBeDefault) {
        await Address.updateMany({
            user: userId,
            isDefault: true,
        }, {
            $set: {
                isDefault: false,
            },
        });
    }
    const addressData = {
        user: new mongoose.Types.ObjectId(userId),
        label: data.label,
        fullName: data.fullName,
        phone: data.phone,
        addressLine: data.addressLine,
        city: data.city,
        isDefault: shouldBeDefault,
        ...(data.state !== undefined && {
            state: data.state,
        }),
        ...(data.postalCode !== undefined && {
            postalCode: data.postalCode,
        }),
        ...(data.latitude !== undefined && {
            latitude: data.latitude,
        }),
        ...(data.longitude !== undefined && {
            longitude: data.longitude,
        }),
    };
    return Address.create(addressData);
};
export const getUserAddresses = async (userId) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new ApiError(400, "Invalid user ID");
    }
    return Address.find({
        user: userId,
    }).sort({
        isDefault: -1,
        createdAt: -1,
    });
};
export const getUserAddressById = async (userId, addressId) => {
    if (!mongoose.Types.ObjectId.isValid(addressId)) {
        throw new ApiError(400, "Invalid address ID");
    }
    const address = await Address.findOne({
        _id: addressId,
        user: userId,
    });
    if (!address) {
        throw new ApiError(404, "Address not found");
    }
    return address;
};
export const updateUserAddress = async (userId, addressId, data) => {
    const address = await getUserAddressById(userId, addressId);
    Object.assign(address, data);
    await address.save();
    return address;
};
export const setDefaultAddress = async (userId, addressId, isDefault) => {
    const address = await getUserAddressById(userId, addressId);
    if (isDefault) {
        await Address.updateMany({
            user: userId,
            _id: {
                $ne: addressId,
            },
            isDefault: true,
        }, {
            $set: {
                isDefault: false,
            },
        });
    }
    address.isDefault = isDefault;
    await address.save();
    return address;
};
export const deleteUserAddress = async (userId, addressId) => {
    const address = await getUserAddressById(userId, addressId);
    const wasDefault = address.isDefault;
    await address.deleteOne();
    if (wasDefault) {
        const nextAddress = await Address.findOne({
            user: userId,
        }).sort({
            createdAt: -1,
        });
        if (nextAddress) {
            nextAddress.isDefault = true;
            await nextAddress.save();
        }
    }
    return address;
};
//# sourceMappingURL=address.service.js.map