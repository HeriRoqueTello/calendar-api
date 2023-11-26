const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./src/db/config');

// Crear servidor express
const app = express();

// Base de Datos
dbConnection();

// CORS
app.use(cors());

// Directorio publicos
app.use( express.static('public') );

// Lectura y parseo del Body
app.use( express.json() );

// Rutas
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/events', require('./src/routes/events'));

// Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});