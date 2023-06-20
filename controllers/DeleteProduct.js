// const Cart = require("../model/Cart");
// const Product = require("../model/Product");

// const deleteProduct = async (req, res) => {
//   const { productId } = req.params;

//   /* Buscamos el producto en el carrito */
//   const productInCart = await Cart.findById(productId);

//   /* Buscamos el producto en nuestra DB por el nombre del que esta en el carrito */
//   const { name, img, price,size, _id } = await Product.findOne({
//     name: productInCart.name,
//   });

//   /* Buscamos y eliminamos el producto con la id */
//   await Cart.findByIdAndDelete(productId);
  
//   /* Buscamos y editamos la prop inCart: false */
//   /* Le pasamos la id del producto en la DB */
//   /* La prop a cambiar y las demas */
//   /* Y el new para devolver el producto editado */
//   await Product.findByIdAndUpdate(
//     _id,
//     { inCart: false, name, img, price, size },
//     { new: true }
//   )
//     .then((product) => {
//       res.json({
//         mensaje: `El producto ${product.name} fue eliminado del carrito`,
//       });
//     })
//     .catch((error) => res.json({ mensaje: "Hubo un error" }));
// };

// module.exports = deleteProduct;

const Cart = require("../model/Cart");
const Product = require("../model/Product");

const deleteProduct = async (req, res) => {
  const { productId } = req.params;


  try {
    /* Buscamos el producto en el carrito */
    const productInCart = await Cart.findById(productId);

    if (!productInCart) {
      return res.status(404).json({ message: 'El producto no existe en el carrito' });
    }

    /* Buscamos el producto en nuestra DB por el nombre del que está en el carrito */
    const { name, img, price, size, _id } = await Product.findOne({
      name: productInCart.name,
    });

    if (!_id) {
      return res.status(404).json({ message: 'El producto no existe en la base de datos' });
    }

    /* Eliminamos el producto del carrito */
    await Cart.findByIdAndDelete(productId);

    /* Actualizamos la propiedad 'inCart' a false en la base de datos */
    const updatedProduct = await Product.findByIdAndUpdate(
      _id,
      { inCart: false, name, img, price, size },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Error al actualizar el producto en la base de datos' });
    }

    return res.json({ message: `El producto ${updatedProduct.name} fue eliminado del carrito` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};

module.exports = deleteProduct;
