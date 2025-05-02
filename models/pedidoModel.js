const mongoose = require('mongoose');

// Definir el esquema para los items de pedido (productos dentro de un pedido)
const itemPedidoSchema = new mongoose.Schema({
    producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producto',
        required: [true, 'El producto es obligatorio']
    },
    nombre: {
        type: String,
        required: [true, 'El nombre del producto es obligatorio']
    },
    precio: {
        type: Number,
        required: [true, 'El precio es obligatorio'],
        min: [0, 'El precio no puede ser negativo']
    },
    cantidad: {
        type: Number,
        required: [true, 'La cantidad es obligatoria'],
        min: [1, 'La cantidad mínima es 1']
    },
    notas: {
        type: String,
        trim: true
    },
    subtotal: {
        type: Number,
        required: [true, 'El subtotal es obligatorio']
    }
});

// Definir el esquema para los pedidos
const pedidoSchema = new mongoose.Schema({
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente',
        required: [true, 'El cliente es obligatorio']
    },
    productos: [itemPedidoSchema],
    estado: {
        type: String,
        enum: ['pendiente', 'confirmado', 'en_preparacion', 'en_ruta', 'entregado', 'cancelado'],
        default: 'pendiente'
    },
    fechaPedido: {
        type: Date,
        default: Date.now
    },
    fechaEntrega: {
        type: Date
    },
    direccionEntrega: {
        calle: {
            type: String,
            required: [true, 'La calle es obligatoria']
        },
        numero: {
            type: String,
            required: [true, 'El número es obligatorio']
        },
        distrito: {
            type: String,
            required: [true, 'El distrito es obligatorio']
        },
        ciudad: {
            type: String,
            required: [true, 'La ciudad es obligatoria'],
            default: 'Lima'
        },
        referencia: {
            type: String
        }
    },
    metodoPago: {
        type: String,
        enum: ['efectivo', 'tarjeta', 'yape', 'plin', 'otro'],
        default: 'efectivo'
    },
    repartidor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Repartidor'
    },
    subtotal: {
        type: Number,
        required: [true, 'El subtotal es obligatorio']
    },
    costoEnvio: {
        type: Number,
        required: [true, 'El costo de envío es obligatorio'],
        default: 5
    },
    descuento: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
        required: [true, 'El total es obligatorio']
    },
    notas: {
        type: String,
        trim: true
    },
    tiempoEstimadoEntrega: {
        type: Number, // Tiempo en minutos
        min: [1, 'El tiempo mínimo estimado es 1 minuto']
    },
    calificacion: {
        puntuacion: {
            type: Number,
            min: 1,
            max: 5
        },
        comentario: {
            type: String,
            trim: true
        },
        fecha: {
            type: Date
        }
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Middleware para calcular el total antes de guardar
pedidoSchema.pre('save', function(next) {
    // Calcular el subtotal sumando los subtotales de cada producto
    this.subtotal = this.productos.reduce((sum, item) => sum + item.subtotal, 0);
    
    // Calcular el total (subtotal + envío - descuento)
    this.total = this.subtotal + this.costoEnvio - this.descuento;
    
    next();
});

// Índices para búsquedas eficientes
pedidoSchema.index({ cliente: 1 });
pedidoSchema.index({ repartidor: 1 });
pedidoSchema.index({ estado: 1 });
pedidoSchema.index({ fechaPedido: -1 });
pedidoSchema.index({ 'direccionEntrega.distrito': 1 });

// Crear el modelo a partir del esquema
const Pedido = mongoose.model('Pedido', pedidoSchema);

module.exports = Pedido;
