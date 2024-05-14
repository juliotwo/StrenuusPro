// const fetch = require('node-fetch');

// module.exports = async (req, res) => {
//   // URL del servidor backend al que deseas realizar la solicitud
//   const backendURL =
//     'https://backend.bstable.bitrus.com/api/v1/merchant_transaction/';

//   // Hacer la solicitud al servidor backend
//   const response = await fetch(backendURL, {
//     method: req.method,
//     headers: {
//       ...req.headers,
//       // Puedes modificar o agregar encabezados según sea necesario
//     },
//     body: req.body,
//   });

//   // Devolver la respuesta del servidor backend al frontend
//   res.status(response.status).json(await response.json());
// };
