// const getProducts = require("./getProducts");
// const getProductsCart = require("./GetProductsCart");
// const AddProductCart = require("./AddProductCart");
// const putProduct = require("./putProduct");
// const deleteProduct = require("./DeleteProduct");
const getProducts = require("../controllers/getProducts");
const getProductsCart = require("../controllers/GetProductsCart");
const AddProductCart = require("../controllers/AddProductCart");
const putProduct = require("../controllers/putProduct");
const deleteProduct = require("../controllers/DeleteProduct");


module.exports = {
  getProducts,
  getProductsCart,
  AddProductCart,
  putProduct,
  deleteProduct,
};
