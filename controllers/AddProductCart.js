const Cart = require("../model/Cart");
const Product = require("../model/Product");

const addProductCart = async (req, res) => {
  const { name, img, price, size } = req.body;

  /* Nos fijamos si tenemos el producto */
  const estaEnProducts = await Product.findOne({ name });

  /* Nos fijamos si todos los campos vienen con info */
  const noEstaVacio = name !== "" && img !== "" && price !== "" && size !== "";

  /* Nos fijamos si el producto ya esta en el carrito */
  const estaEnElCarrito = await Cart.findOne({ name });

  /* Si no tenemos el producto */
  if (!estaEnProducts) {
    res.status(400).json({
      mensaje: "Este producto no se encuentra en nuestra base de datos",
    });

    /* Si nos envian algo y no esta en el carrito lo agregamos */
  } else if (noEstaVacio && !estaEnElCarrito) {
    const newProductInCart = new Cart({ name, img, price, size, amount: 1 });

    /* Y actualizamos la prop inCart: true en nuestros productos */
    await Product.findByIdAndUpdate(
      estaEnProducts?._id,
      { inCart: true, name, img, price, size },
      { new: true }
    )
      .then((product) => {
        newProductInCart.save();
        res.json({
          mensaje: `El producto fue agregado al carrito`,
          product,
        });
      })
      .catch((error) => console.error(error));

    /* Y si esta en el carrito avisamos */
  } else if (estaEnElCarrito) {
    res.status(400).json({
      mensaje: "El producto ya esta en el carrito",
    });
  }
};

module.exports = addProductCart;




// const AddProductCart = async (req, res) => {
//   const { name, img, price, size } = req.body;

//   // Verificar si el producto ya está en el carrito
//   const estaEnElCarrito = await Cart.findOne({ name, size });

//   // Si el producto no está en el carrito, agregarlo
//   if (!estaEnElCarrito) {
//     // Verificar si tenemos el producto en la base de datos
//     const estaEnProducts = await Product.findOne({ name });

//     if (!estaEnProducts) {
//       res.status(400).json({
//         mensaje: "Este producto no se encuentra en nuestra base de datos",
//       });
//     } else {
//       let newProductName = name;

//       // Si la size es diferente, agregar un número al nombre
//       if (estaEnProducts.size !== size) {
//         const productsWithSameName = await Cart.find({ name });
//         const count = productsWithSameName.length;

//         newProductName = `${name} ${count + 1}`;
//       }

//       const newProductInCart = new Cart({ name: newProductName, img, price, size, amount: 1 });

//       // Actualizar la prop inCart: true en nuestros productos
//       await Product.findByIdAndUpdate(
//         estaEnProducts?._id,
//         { inCart: true, name: newProductName, img, price, size },
//         { new: true }
//       )
//         .then((product) => {
//           newProductInCart.save();
//           res.json({
//             mensaje: `El producto fue agregado al carrito`,
//             product,
//           });
//         })
//         .catch((error) => console.error(error));
//     }
//   } else {
//     res.status(400).json({
//       mensaje: "El producto ya está en el carrito",
//     });
//   }
// };

// module.exports = AddProductCart;


