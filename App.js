const express = require('express');
const cors = require('cors');

const db = require('./database');
const controllers = require('./controllers');
const contactosServer = require('./server/Contactos');

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

/* GET */
app.get('https://tfg-backend-camals.up.railway.app//products', controllers.getProducts);
app.get('https://tfg-backend-camals.up.railway.app//products-cart', controllers.getProductsCart);

/* POST */
app.post('https://tfg-backend-camals.up.railway.app//products-cart', controllers.addProductCart);

/* PUT */
app.put('https://tfg-backend-camals.up.railway.app//products-cart/:productId', controllers.putProduct);

/* DELETE */
app.delete('https://tfg-backend-camals.up.railway.app//products-cart/:productId', controllers.deleteProduct);

app.listen(port, () => {
  console.log(`Server funcionando en el puerto ${port}`);
  db();
});

contactosServer.listen(3000, () => {
  console.log('Contactos Server funcionando en el puerto 3000');
});
