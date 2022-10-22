const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  shippingInfo: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    campus: {
      type: String,
      required: true,
    },
    postalCode: {
      type: Number,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  user: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "User",
    unique: false,
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      book: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Books",
      },
      seller: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    },
  ],

  paymentInfo: {
    id: {
      type: String,
      required: true,
      unique: false,
    },
    status: {
      type: String,
      required: true,
      unique: false,
    },
  },
  paidAt: {
    type: Date,
  },
  itemsPrice: {
    type: Number,
    required: true,
    default: 0.0,
    unique: false,
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0.0,
    unique: false,
  },
  shipingPrice: {
    type: Number,
    required: true,
    default: 0.0,
    unique: false,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0,
    unique: false,
  },
  orderStatus: {
    type: String,
    required: true,
    default: "processing",
    unique: false,
  },
  orderId: {
    type: String,
    required: true,
    unique: true,
  },

  deliveredAt: {
    type: Date,
    unique: false,
  },
  sellers: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    unique: false,
  },
});

module.exports = new mongoose.model("Order", orderSchema);
