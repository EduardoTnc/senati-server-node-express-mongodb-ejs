const mongoose = require('mongoose');

// Definir el esquema para los usuarios
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Por favor ingresa un email válido']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        minlength: [6, 'La contraseña debe tener al menos 6 caracteres']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    active: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Crear el modelo a partir del esquema
const User = mongoose.model('User', userSchema);

module.exports = User;

/* MARK: Explicación
EXPLICACIÓN DEL ESQUEMA DE MONGOOSE:

1. Importación de Mongoose:
   - Primero importamos mongoose para poder utilizarlo en nuestro archivo.

2. Definición del Esquema (Schema):
   - Un Schema define la estructura de los documentos que se almacenarán en una colección.
   - Cada propiedad en el Schema representa un campo en el documento MongoDB.

3. Tipos de datos en Mongoose:
   - String: Para textos (nombre, email)
   - Number: Para valores numéricos
   - Date: Para fechas (createdAt)
   - Boolean: Para valores verdadero/falso (active)
   - ObjectId: Para referencias a otros documentos
   - Array: Para listas de valores
   - Mixed: Para cualquier tipo de dato

4. Validaciones y opciones:
   - required: [true, 'mensaje'] - Campo obligatorio con mensaje personalizado
   - unique: true - Valor único en la colección
   - trim: true - Elimina espacios en blanco al inicio y final
   - lowercase: true - Convierte el texto a minúsculas
   - match: [regex, 'mensaje'] - Valida con expresión regular
   - enum: ['valor1', 'valor2'] - Restringe a valores específicos
   - default: valor - Valor por defecto si no se proporciona
   - min/max: Para números, valores mínimos/máximos
   - minlength/maxlength: Para strings, longitud mínima/máxima

5. Creación del Modelo:
   - mongoose.model('NombreModelo', esquema) - Crea un modelo basado en el esquema
   - El nombre del modelo ('User') determina el nombre de la colección en MongoDB (será 'users')

6. Exportación del Modelo:
   - Exportamos el modelo para usarlo en otros archivos de la aplicación
*/
