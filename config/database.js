const mongoose = require('mongoose');

// Función para conectar a la base de datos MongoDB
const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb://localhost:27017/test-database');
        console.log(`MongoDB conectada: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error al conectar a MongoDB: ${error.message}`);
        process.exit(1); // Salir con error
    }
};

module.exports = connectDB;
