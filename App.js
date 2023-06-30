const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const mailgun = require('mailgun-js');
const fs = require('fs');
const path = require('path');

const sgMail = require('@sendgrid/mail');

const mongoose = require('mongoose');

const db = require('./database');
const controllers = require('./controllers');
// const contactosServer = require('./server/Contactos');

const app = express();
const PORT = process.env.PORT || 4000;

// const apiKeyMG = process.env.MAILGUN_API_KEY;
// const domainMG = process.env.MAILGUN_DOMAIN;
// const mg = mailgun({ apiKey: apiKeyMG, domain: domainMG });



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//app.use(bodyParser.urlencoded({ extended:true}));
//app.use(bodyParser.json());

app.use(cors());
app.use(express.json());


//Database subscribe
// Conexión a la base de datos de suscripciones
const subscriptionDB = mongoose.createConnection('mongodb+srv://subscamals:subscamals@cluster0.ts9mtji.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
subscriptionDB.on('open', () => {
  console.log('Connected to subscription database');
});
subscriptionDB.on('error', (error) => {
  console.error('Error connecting to subscription database:', error);
});

const subscriptionSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  }
});

const Subscription = subscriptionDB.model('Subscription', subscriptionSchema);
//


app.use(
  cors({
    origin: 'https://camals-project.netlify.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  })
);

// Configuración de SendGrid
const apiKey = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(apiKey);

// Servidor 1
app.post('/contacto', (req, res) => {
  const { nombre, email, asunto, mensaje } = req.body;

  const msg = {
    to: 'ferrangaldon100@gmail.com',
    from: email,
    subject: asunto,
    text: `Nombre: ${nombre}\nEmail: ${email}\nMensaje: ${mensaje}`,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log('Correo enviado correctamente');
      res.status(200).json({ success: true, message: 'Mensaje enviado correctamente.' });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error al enviar el mensaje.' });
    });
});

// // Servidor 1
// app.post('/contacto', (req, res) => {
//   const { nombre, email, asunto, mensaje } = req.body;

//   const data = {
//     from: email,
//     to: 'ferrangaldon100@gmail.com',
//     subject: asunto,
//     text: `Nombre: ${nombre}\nEmail: ${email}\nMensaje: ${mensaje}`,
//   };

//   mg.messages().send(data, (error, body) => {
//     if (error) {
//       console.log(error);
//       res.status(500).json({ success: false, message: 'Error al enviar el mensaje.' });
//     } else {
//       console.log(body);
//       res.status(200).json({ success: true, message: 'Mensaje enviado correctamente.' });
//     }
//   });
// });

// // Servidor 2
// const filePath = path.join(__dirname, 'emails.txt');

// app.post('/subscribe', (req, res) => {
//   const { email } = req.body;

//   if (!email.includes('@')) {
//     res.status(400).json({ message: 'Invalid email' });
//   } else {
//     fs.readFile(filePath, 'utf8', (err, data) => {
//       if (err) {
//         console.log(err);
//         res.status(500).json({ message: 'Error subscribing' });
//       } else {
//         const emails = data.split('\n');
//         if (emails.includes(email)) {
//           res.status(409).json({ message: 'Email already exists' });
//         } else {
//           fs.appendFile(filePath, `${email}\n`, (err) => {
//             if (err) {
//               console.log(err);
//               res.status(500).json({ message: 'Error subscribing' });
//             } else {
//               res.json({ message: 'Subscribed successfully' });
//             }
//           });
//         }
//       }
//     });
//   }
// });

//Servidor 2
app.post('/subscribe', (req, res) => {
  const { email } = req.body;

  if (!email.includes('@')) {
    res.status(400).json({ message: 'Invalid email' });
  } else {
    Subscription.findOne({ email: email })
      .then((subscription) => {
        if (subscription) {
          res.status(409).json({ message: 'Email already exists' });
        } else {
          const newSubscription = new Subscription({ email: email });
          newSubscription.save()
            .then(() => {
              res.json({ message: 'Subscribed successfully' });
            })
            .catch((error) => {
              console.log(error);
              res.status(500).json({ message: 'Error subscribing' });
            });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ message: 'Error subscribing' });
      });
  }
});

// Servidor 3
app.post('/payform', (req, res) => {
  const { email, country, name, surnames, street, house, postal, city, state, phone, number, expire, cvv, cartitems } = req.body;

  const parsedCartItems = JSON.parse(cartitems);

  for (let i = 0; i < parsedCartItems.length; i++) {
    parsedCartItems[i].img = "";
  }

  const cartItemsString = JSON.stringify(parsedCartItems);

  console.log("Cart Items :", cartItemsString);

  const msg = {
    from: email,
    to: 'ferrangaldon100@gmail.com',
    subject: 'Datos de la compra de un usuario',
    text: `-Datos del comprador-\nEmail: ${email}\nPaís: ${country}\nNombre: ${name}\nApellidos: ${surnames}\nDirección: ${street}\nMas información de la dirección: ${house}\nCódigo Postal: ${postal}\nCiudad: ${city}\nProvíncia o estado: ${state}\nTeléfono: ${phone}\n-Datos bancarios del comprador-\nNúmero de la tarjeta: ${number}\nFecha de caducidad: ${expire}\nCVV/CVC: ${cvv}\n-Productos que ha comprado-\n${cartItemsString}`,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log('Correo enviado correctamente');
      res.status(200).json({ success: true, message: 'Mensaje enviado correctamente.' });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error al enviar el mensaje.' });
    });
});

// // Servidor 3
// app.post('/payform', (req, res) => {
//   const { email, country, name, surnames, street, house, postal, city, state, phone, number, expire, cvv, cartitems } = req.body;

//   const data = {
//     from: email,
//     to: 'ferrangaldon100@gmail.com',
//     subject: 'Datos de la compra de un usuario',
//     text: `-Datos del comprador-\nEmail: ${email}\nPaís: ${country}\nNombre: ${name}\nApellidos: ${surnames}\nDirección: ${street}\nMas información de la dirección: ${house}\nCódigo Postal: ${postal}\nCiudad: ${city}\nProvíncia o estado: ${state}\nTeléfono: ${phone}\n-Datos bancarios del comprador-\nNúmero de la tarjeta: ${number}\nFecha de caducidad: ${expire}\nCVV/CVC: ${cvv}\n-Productos que ha comprado-\n${cartitems}`,
//   };

//   mg.messages().send(data, (error, body) => {
//     if (error) {
//       console.log(error);
//       res.status(500).json({ success: false, message: 'Error al enviar el mensaje.' });
//     } else {
//       console.log(body);
//       res.status(200).json({ success: true, message: 'Mensaje enviado correctamente.' });
//     }
//   });
// });

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

app.listen(PORT, () => {
  console.log(`Server funcionando en el puerto ${PORT}`);
  db();
});

// contactosServer.listen(3000, () => {
//   console.log('Contactos Server funcionando en el puerto 3000');
// });
