const mongoose = require('mongoose');

const dbConnection = async() => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION);
    console.log('db online');
  } catch (error) {
    throw new Error('Error en inicializar la base de datos')
  }
}

module.exports = {
  dbConnection
}