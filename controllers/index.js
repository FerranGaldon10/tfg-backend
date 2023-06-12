// const getProducts = require("./getProducts");
const getProductsCart = require("./GetProductsCart");
const AddProductCart = require("./AddProductCart");
const putProduct = require("./putProduct");
const deleteProduct = require("./DeleteProduct");
const getProducts = require("../controllers/getProducts");


module.exports = {
  getProducts,
  getProductsCart,
  AddProductCart,
  putProduct,
  deleteProduct,
};
