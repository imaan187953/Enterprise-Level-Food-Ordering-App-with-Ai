import mongoose, {
  Document,
  Schema,
} from "mongoose";

interface ICartOptionDocument {
  optionId: mongoose.Types.ObjectId;
  name: string;
  price: number;
}

export interface ICartItemDocument {
  food: mongoose.Types.ObjectId;
  quantity: number;
  unitPrice: number;
  options: ICartOptionDocument[];
  itemTotal: number;
}

export interface ICartDocument
  extends Document {
  user: mongoose.Types.ObjectId;

  items: ICartItemDocument[];

  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;

  createdAt: Date;
  updatedAt: Date;
}

const cartOptionSchema =
  new Schema<ICartOptionDocument>(
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

const cartItemSchema =
  new Schema<ICartItemDocument>(
    {
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
    },
    {
      _id: false,
    }
  );

const cartSchema =
  new Schema<ICartDocument>(
    {
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
    },
    {
      timestamps: true,
    }
  );

const Cart =
  mongoose.model<ICartDocument>(
    "Cart",
    cartSchema
  );

export default Cart;