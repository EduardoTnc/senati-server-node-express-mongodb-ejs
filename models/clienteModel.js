const mongoose = require('mongoose');

// Definir el esquema para las direcciones
const direccionSchema = new mongoose.Schema({
    calle: {
        type: String,
        required: [true, 'La calle es obligatoria'],
        trim: true
    },
    numero: {
        type: String,
        required: [true, 'El número es obligatorio'],
        trim: true
    },
    distrito: {
        type: String,
        required: [true, 'El distrito es obligatorio'],
        trim: true
    },
    ciudad: {
        type: String,
        required: [true, 'La ciudad es obligatoria'],
        trim: true,
        default: 'Lima'
    },
    referencia: {
        type: String,
        trim: true
    },
    predeterminada: {
        type: Boolean,
        default: false
    }
});

// Definir el esquema para los clientes
const clienteSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true
    },
    apellido: {
        type: String,
        required: [true, 'El apellido es obligatorio'],
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
    telefono: {
        type: String,
        required: [true, 'El teléfono es obligatorio'],
        trim: true
    },
    direcciones: [direccionSchema],
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
        select: false // No incluir la contraseña en las consultas por defecto
    },
    fechaRegistro: {
        type: Date,
        default: Date.now
    },
    activo: {
        type: Boolean,
        default: true
    },
    ultimoPedido: {
        type: Date
    }
});

// Crear índices para búsquedas eficientes
clienteSchema.index({ email: 1 });
clienteSchema.index({ telefono: 1 });

// Método para obtener el nombre completo
clienteSchema.virtual('nombreCompleto').get(function() {
    return `${this.nombre} ${this.apellido}`;
});

// Crear el modelo a partir del esquema
const Cliente = mongoose.model('Cliente', clienteSchema);

module.exports = Cliente;
