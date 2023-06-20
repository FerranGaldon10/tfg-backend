const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


const db = require('./database');
const controllers = require('./controllers');
const contactosServer = require('./server/Contactos');

const app = express();
const port = process.env.port || 4000;

app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());

/* GET */
app.get('/', (req,res) => {
  res.send("Backend Funcionando")
});
app.get('/products', controllers.getProducts);
app.get('/products-cart', controllers.getProductsCart);

/* POST */
app.post('/products-cart', controllers.addProductCart);

/* PUT */
app.put('/products-cart/:productId', controllers.putProduct);

/* DELETE */
app.delete('/products-cart/:productId', controllers.deleteProduct);

app.listen(port, () => {
  console.log(`Server funcionando en el puerto ${port}`);
  db();
});

contactosServer.listen(3000, () => {
  console.log('Contactos Server funcionando en el puerto 3000');
});
