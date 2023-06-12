const { model, Schema } = require("mongoose");

const ProductSchema = new Schema({
  name: { type: String, required: true, unique: true },
  img: { type: String, required: true },
  imghover:{ type: String, required: true },
  inCart: { type: Boolean, default: false },
  price: { type: Number, required: true },
  description:{ type: String, required: true },
  type:{ type: String, required: true },
  special:{ type: String, required: true },
  size:{ type: String }
});

module.exports = model("Product", ProductSchema);
