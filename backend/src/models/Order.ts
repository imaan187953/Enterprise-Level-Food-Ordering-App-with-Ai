import mongoose, {
  Document,
  Schema,
} from "mongoose";

type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "ready"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

interface IOrderItemOptionDocument {
  optionId: mongoose.Types.ObjectId;
  name: string;
  price: number;
}

interface IOrderItemDocument {
  food: mongoose.Types.ObjectId;
  name: string;
  image?: string;

  unitPrice: number;
  quantity: number;

  options: IOrderItemOptionDocument[];

  itemTotal: number;
}

export interface IOrderDocument
  extends Document {
  user: mongoose.Types.ObjectId;

  items: IOrderItemDocument[];

  address: mongoose.Types.ObjectId;

  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;

  status: OrderStatus;

  createdAt: Date;
  updatedAt: Date;
}

const orderItemOptionSchema =
  new Schema<IOrderItemOptionDocument>(
    {
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
    },
    {
      _id: false,
    }
  );

const orderItemSchema =
  new Schema<IOrderItemDocument>(
    {
      food: {
        type: Schema.Types.ObjectId,
        ref: "Food",
        required: true,
      },

      name: {
        type: String,
        required: true,
        trim: true,
      },

      image: {
        type: String,
        trim: true,
      },

      unitPrice: {
        type: Number,
        required: true,
        min: 0,
      },

      quantity: {
        type: Number,
        required: true,
        min: 1,
      },

      options: {
        type: [orderItemOptionSchema],
        default: [],
      },

      itemTotal: {
        type: Number,
        required: true,
        min: 0,
      },
    },
    {
      _id: false,
    }
  );

const orderSchema =
  new Schema<IOrderDocument>(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
      },

      items: {
        type: [orderItemSchema],
        required: true,
        validate: {
          validator: (
            value: IOrderItemDocument[]
          ) => value.length > 0,
          message:
            "Order must contain at least one item",
        },
      },

      address: {
        type: Schema.Types.ObjectId,
        ref: "Address",
        required: true,
      },

      subtotal: {
        type: Number,
        required: true,
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
        required: true,
        min: 0,
      },

      status: {
        type: String,
        enum: [
          "pending",
          "confirmed",
          "preparing",
          "ready",
          "out_for_delivery",
          "delivered",
          "cancelled",
        ],
        default: "pending",
        index: true,
      },
    },
    {
      timestamps: true,
    }
  );

orderSchema.index({
  user: 1,
  createdAt: -1,
});

orderSchema.index({
  status: 1,
  createdAt: -1,
});

const Order =
  mongoose.model<IOrderDocument>(
    "Order",
    orderSchema
  );

export default Order;