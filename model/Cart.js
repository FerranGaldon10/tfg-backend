const { model, Schema } = require("mongoose");

const CartSchema = new Schema({
  name: { type: String, required: true, unique: true },
  img: { type: String, required: true },
  amount: { type: Number, required: true },
  price: { type: Number, required: true },
  size: { type: String, required: true },
});

module.exports = model("Cart", CartSchema);

// const mongoose = require("mongoose");

// const cartSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     img: { type: String, required: true },
//     price: { type: Number, required: true },
//     size: { type: String, required: true },
//     amount: { type: Number, required: true },
//   },
//   { timestamps: true }
// );

// cartSchema.index({ name: 1, size: 1 }, { unique: true });

// const Cart = mongoose.model("Cart", cartSchema);

// module.exports = Cart;

