// const express = require('express');
// const bodyParser = require('body-parser');
// const mailgun = require('mailgun-js');
// const cors = require('cors');
// const fs = require('fs');
// const path = require('path');

// const app = express();
// const mg = mailgun({ apiKey: '5737fc6e35998bf799e68117cdc9d3d4-70c38fed-7665ed5f', domain: 'sandbox2d5fca84a86847e28a3c1faecd63ce02.mailgun.org' });

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.use(
//   cors({
//     origin: 'https://camals-project.netlify.app',
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

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

// const PORT = process.env.PORT || 3001;

// app.listen(PORT, () => {
//   console.log(`Servidor iniciado en el puerto ${PORT}`);
// });

// module.exports = app;
