const mongoose = require('mongoose');

// Definir el esquema para los repartidores
const repartidorSchema = new mongoose.Schema({
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
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
        select: false // No incluir la contraseña en las consultas por defecto
    },
    documento: {
        tipo: {
            type: String,
            enum: ['DNI', 'CE', 'Pasaporte'],
            required: [true, 'El tipo de documento es obligatorio']
        },
        numero: {
            type: String,
            required: [true, 'El número de documento es obligatorio'],
            trim: true,
            unique: true
        }
    },
    fechaNacimiento: {
        type: Date,
        required: [true, 'La fecha de nacimiento es obligatoria']
    },
    vehiculo: {
        tipo: {
            type: String,
            enum: ['Moto', 'Bicicleta', 'Carro', 'A pie'],
            required: [true, 'El tipo de vehículo es obligatorio']
        },
        placa: {
            type: String,
            trim: true
        },
        modelo: {
            type: String,
            trim: true
        }
    },
    zonaCobertura: {
        type: [String],
        required: [true, 'Al menos una zona de cobertura es obligatoria']
    },
    disponible: {
        type: Boolean,
        default: true
    },
    activo: {
        type: Boolean,
        default: true
    },
    ubicacionActual: {
        lat: Number,
        lng: Number,
        ultimaActualizacion: Date
    },
    puntuacion: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    totalEntregas: {
        type: Number,
        default: 0
    },
    pedidoActual: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pedido'
    },
    fechaRegistro: {
        type: Date,
        default: Date.now
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Método para obtener el nombre completo
repartidorSchema.virtual('nombreCompleto').get(function() {
    return `${this.nombre} ${this.apellido}`;
});

// Índices para búsquedas eficientes
repartidorSchema.index({ email: 1 });
repartidorSchema.index({ telefono: 1 });
repartidorSchema.index({ 'documento.numero': 1 });
repartidorSchema.index({ disponible: 1 });
repartidorSchema.index({ activo: 1 });
repartidorSchema.index({ zonaCobertura: 1 });

// Crear el modelo a partir del esquema
const Repartidor = mongoose.model('Repartidor', repartidorSchema);

module.exports = Repartidor;
