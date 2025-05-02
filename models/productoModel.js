const mongoose = require('mongoose');

// Definir el esquema para los productos
const productoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del producto es obligatorio'],
        trim: true,
        unique: true
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria'],
        trim: true
    },
    precio: {
        type: Number,
        required: [true, 'El precio es obligatorio'],
        min: [0, 'El precio no puede ser negativo']
    },
    categoria: {
        type: String,
        required: [true, 'La categoría es obligatoria'],
        enum: ['Entradas', 'Platos principales', 'Postres', 'Bebidas', 'Complementos'],
        index: true
    },
    imagen: {
        type: String,
        default: 'default-producto.jpg'
    },
    disponible: {
        type: Boolean,
        default: true
    },
    tiempoPreparacion: {
        type: Number, // Tiempo en minutos
        default: 15,
        min: [1, 'El tiempo mínimo de preparación es 1 minuto']
    },
    destacado: {
        type: Boolean,
        default: false
    },
    ingredientes: {
        type: [String],
        default: []
    },
    alergenos: {
        type: [String],
        default: []
    },
    etiquetas: {
        type: [String],
        default: []
    },
    calorias: {
        type: Number,
        min: [0, 'Las calorías no pueden ser negativas']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    // Habilitar virtuals cuando el documento se convierte a JSON
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Middleware pre-save para actualizar la fecha de modificación
productoSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Índices para búsquedas eficientes
productoSchema.index({ nombre: 1 });
productoSchema.index({ categoria: 1 });
productoSchema.index({ precio: 1 });
productoSchema.index({ disponible: 1 });
productoSchema.index({ destacado: 1 });
productoSchema.index({ etiquetas: 1 });

// Crear el modelo a partir del esquema
const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;
