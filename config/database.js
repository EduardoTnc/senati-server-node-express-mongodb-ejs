
const mongoose = require('mongoose')
const { db } = require('../config')

// Conexión con async/await
// - Usa sintaxis moderna async/await
// - Mejor manejo de excepciones con try/catch
// - Permite terminar el proceso si hay error (process.exit)
// - Más control sobre el flujo de ejecución
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`mongodb://${db.host}:${db.port}/${db.name}`, {
            // Estas opciones ya no son necesarias en versiones recientes de Mongoose
            // pero se incluyen por compatibilidad con versiones anteriores
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB conectada: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error al conectar a MongoDB: ${error.message}`);
        process.exit(1); // Salir con error
    }
};

// Forma 1: Conexión con Promesas
// - Usa el patrón de promesas con .then() y .catch()
// - No requiere función async/await
// - Más conciso pero menos control sobre el flujo
// const connectDB = mongoose.connect(`mongodb://${db.host}:${db.port}/${db.name}`)
//     .then(() => console.log(`MongoDB conectada: ${conn.connection.host}`))
//     .catch((error) => console.log(error), process.exit(1)); // Salir con error





module.exports = connectDB


