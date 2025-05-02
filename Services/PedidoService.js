/**
 * Servicio para la gestión de pedidos en la base de datos
 * Este módulo encapsula todas las operaciones relacionadas con pedidos
 */
const Pedido = require('../models/pedidoModel');
const Producto = require('../models/productoModel');
const Cliente = require('../models/clienteModel');
const Repartidor = require('../models/repartidorModel');

class PedidoService {
    constructor() {
        this.Pedido = Pedido;
        this.Producto = Producto;
        this.Cliente = Cliente;
        this.Repartidor = Repartidor;
    }

    /**
     * Crea un nuevo pedido en la base de datos
     * @param {Object} data - Datos del pedido a crear
     * @returns {Promise<Object>} Pedido creado con su ID generado
     * @throws {Error} Si los datos no cumplen con las validaciones del modelo
     */
    async createPedido(data) {
        try {
            // Verificar si el cliente existe
            const cliente = await this.Cliente.findById(data.cliente);
            if (!cliente) {
                throw new Error('El cliente especificado no existe');
            }

            // Calcular subtotal y preparar los productos del pedido
            let subtotal = 0;
            const productosPromises = data.productos.map(async (item) => {
                const producto = await this.Producto.findById(item.producto);
                if (!producto) {
                    throw new Error(`Producto con ID ${item.producto} no encontrado`);
                }
                if (!producto.disponible) {
                    throw new Error(`Producto ${producto.nombre} no está disponible`);
                }

                const subtotalItem = producto.precio * item.cantidad;
                subtotal += subtotalItem;

                return {
                    producto: producto._id,
                    nombre: producto.nombre,
                    precio: producto.precio,
                    cantidad: item.cantidad,
                    notas: item.notas || '',
                    subtotal: subtotalItem
                };
            });

            const productos = await Promise.all(productosPromises);

            // Calcular totales
            const costoEnvio = data.costoEnvio || 5;
            const descuento = data.descuento || 0;
            const total = subtotal + costoEnvio - descuento;

            // Preparar datos del pedido
            const pedidoData = {
                ...data,
                productos,
                subtotal,
                costoEnvio,
                descuento,
                total
            };

            // Crear y guardar el pedido
            const pedido = new Pedido(pedidoData);
            const nuevoPedido = await pedido.save();

            // Actualizar la fecha del último pedido del cliente
            await this.Cliente.findByIdAndUpdate(data.cliente, {
                ultimoPedido: Date.now()
            });

            return nuevoPedido;
        } catch (error) {
            throw new Error(`Error al crear pedido: ${error.message}`);
        }
    }

    /**
     * Obtiene todos los pedidos de la base de datos
     * @param {Object} filtros - Filtros opcionales para la búsqueda
     * @returns {Promise<Array>} Lista de pedidos que cumplen con los filtros
     */
    async getAllPedidos(filtros = {}) {
        try {
            return await this.Pedido.find(filtros)
                .populate('cliente', 'nombre apellido email telefono')
                .populate('repartidor', 'nombre apellido telefono');
        } catch (error) {
            throw new Error(`Error al obtener pedidos: ${error.message}`);
        }
    }

    /**
     * Busca un pedido por su ID
     * @param {string} id - ID del pedido a buscar
     * @returns {Promise<Object|null>} Pedido encontrado o null si no existe
     */
    async getPedidoById(id) {
        try {
            return await this.Pedido.findById(id)
                .populate('cliente', 'nombre apellido email telefono direcciones')
                .populate('repartidor', 'nombre apellido telefono');
        } catch (error) {
            throw new Error(`Error al buscar pedido: ${error.message}`);
        }
    }

    /**
     * Obtiene pedidos por cliente
     * @param {string} clienteId - ID del cliente
     * @param {Object} filtros - Filtros adicionales opcionales
     * @returns {Promise<Array>} Lista de pedidos del cliente
     */
    async getPedidosByCliente(clienteId, filtros = {}) {
        try {
            return await this.Pedido.find({ cliente: clienteId, ...filtros })
                .sort({ fechaPedido: -1 })
                .populate('repartidor', 'nombre apellido telefono');
        } catch (error) {
            throw new Error(`Error al obtener pedidos del cliente: ${error.message}`);
        }
    }

    /**
     * Obtiene pedidos por repartidor
     * @param {string} repartidorId - ID del repartidor
     * @param {Object} filtros - Filtros adicionales opcionales
     * @returns {Promise<Array>} Lista de pedidos asignados al repartidor
     */
    async getPedidosByRepartidor(repartidorId, filtros = {}) {
        try {
            return await this.Pedido.find({ repartidor: repartidorId, ...filtros })
                .sort({ fechaPedido: -1 })
                .populate('cliente', 'nombre apellido telefono direcciones');
        } catch (error) {
            throw new Error(`Error al obtener pedidos del repartidor: ${error.message}`);
        }
    }

    /**
     * Obtiene pedidos por estado
     * @param {string} estado - Estado del pedido
     * @returns {Promise<Array>} Lista de pedidos con el estado especificado
     */
    async getPedidosByEstado(estado) {
        try {
            return await this.Pedido.find({ estado })
                .sort({ fechaPedido: -1 })
                .populate('cliente', 'nombre apellido telefono')
                .populate('repartidor', 'nombre apellido telefono');
        } catch (error) {
            throw new Error(`Error al obtener pedidos por estado: ${error.message}`);
        }
    }

    /**
     * Actualiza un pedido existente
     * @param {string} id - ID del pedido a actualizar
     * @param {Object} data - Nuevos datos para el pedido
     * @returns {Promise<Object|null>} Pedido actualizado o null si no existe
     */
    async updatePedido(id, data) {
        try {
            return await this.Pedido.findByIdAndUpdate(id, data, { 
                new: true,
                runValidators: true
            });
        } catch (error) {
            throw new Error(`Error al actualizar pedido: ${error.message}`);
        }
    }

    /**
     * Actualiza el estado de un pedido
     * @param {string} id - ID del pedido
     * @param {string} estado - Nuevo estado del pedido
     * @returns {Promise<Object|null>} Pedido actualizado o null si no existe
     */
    async actualizarEstadoPedido(id, estado) {
        try {
            const estadosValidos = ['pendiente', 'confirmado', 'en_preparacion', 'en_ruta', 'entregado', 'cancelado'];
            
            if (!estadosValidos.includes(estado)) {
                throw new Error(`Estado no válido. Debe ser uno de: ${estadosValidos.join(', ')}`);
            }

            const pedido = await this.Pedido.findById(id);
            if (!pedido) {
                throw new Error('Pedido no encontrado');
            }

            // Validaciones según el estado
            if (estado === 'entregado') {
                if (!pedido.repartidor) {
                    throw new Error('No se puede marcar como entregado sin asignar un repartidor');
                }
                // Actualizar fecha de entrega
                pedido.fechaEntrega = Date.now();
            }

            pedido.estado = estado;
            return await pedido.save();
        } catch (error) {
            throw new Error(`Error al actualizar estado: ${error.message}`);
        }
    }

    /**
     * Asigna un repartidor a un pedido
     * @param {string} pedidoId - ID del pedido
     * @param {string} repartidorId - ID del repartidor a asignar
     * @returns {Promise<Object>} Pedido actualizado con el repartidor asignado
     */
    async asignarRepartidor(pedidoId, repartidorId) {
        try {
            // Verificar si el repartidor existe y está disponible
            const repartidor = await this.Repartidor.findById(repartidorId);
            if (!repartidor) {
                throw new Error('Repartidor no encontrado');
            }
            if (!repartidor.disponible) {
                throw new Error('El repartidor no está disponible actualmente');
            }

            // Verificar si el pedido existe
            const pedido = await this.Pedido.findById(pedidoId);
            if (!pedido) {
                throw new Error('Pedido no encontrado');
            }

            // Actualizar el pedido con el repartidor asignado
            pedido.repartidor = repartidorId;
            
            // Si el pedido estaba en estado confirmado o en_preparacion, actualizarlo a en_ruta
            if (pedido.estado === 'confirmado' || pedido.estado === 'en_preparacion') {
                pedido.estado = 'en_ruta';
            }

            const pedidoActualizado = await pedido.save();

            // Actualizar el repartidor con el pedido actual
            repartidor.pedidoActual = pedidoId;
            await repartidor.save();

            return pedidoActualizado;
        } catch (error) {
            throw new Error(`Error al asignar repartidor: ${error.message}`);
        }
    }

    /**
     * Registra una calificación para un pedido
     * @param {string} pedidoId - ID del pedido
     * @param {Object} calificacion - Datos de la calificación (puntuación y comentario)
     * @returns {Promise<Object>} Pedido actualizado con la calificación
     */
    async calificarPedido(pedidoId, calificacion) {
        try {
            const pedido = await this.Pedido.findById(pedidoId);
            if (!pedido) {
                throw new Error('Pedido no encontrado');
            }

            if (pedido.estado !== 'entregado') {
                throw new Error('Solo se pueden calificar pedidos entregados');
            }

            // Validar puntuación
            if (calificacion.puntuacion < 1 || calificacion.puntuacion > 5) {
                throw new Error('La puntuación debe estar entre 1 y 5');
            }

            // Actualizar calificación del pedido
            pedido.calificacion = {
                puntuacion: calificacion.puntuacion,
                comentario: calificacion.comentario || '',
                fecha: Date.now()
            };

            // Guardar el pedido actualizado
            const pedidoActualizado = await pedido.save();

            // Si hay un repartidor asignado, actualizar su puntuación
            if (pedido.repartidor) {
                const repartidor = await this.Repartidor.findById(pedido.repartidor);
                if (repartidor) {
                    // Calcular nueva puntuación promedio
                    const pedidosCalificados = await this.Pedido.find({
                        repartidor: repartidor._id,
                        'calificacion.puntuacion': { $exists: true }
                    });
                    
                    const totalPuntuacion = pedidosCalificados.reduce(
                        (sum, p) => sum + p.calificacion.puntuacion, 0
                    );
                    
                    repartidor.puntuacion = totalPuntuacion / pedidosCalificados.length;
                    repartidor.totalEntregas += 1;
                    await repartidor.save();
                }
            }

            return pedidoActualizado;
        } catch (error) {
            throw new Error(`Error al calificar pedido: ${error.message}`);
        }
    }

    /**
     * Cancela un pedido
     * @param {string} id - ID del pedido a cancelar
     * @param {string} motivoCancelacion - Motivo de la cancelación
     * @returns {Promise<Object|null>} Pedido cancelado o null si no existe
     */
    async cancelarPedido(id, motivoCancelacion) {
        try {
            const pedido = await this.Pedido.findById(id);
            if (!pedido) {
                throw new Error('Pedido no encontrado');
            }

            // Verificar si el pedido ya ha sido entregado
            if (pedido.estado === 'entregado') {
                throw new Error('No se puede cancelar un pedido ya entregado');
            }

            // Actualizar estado y agregar motivo de cancelación
            pedido.estado = 'cancelado';
            pedido.notas = pedido.notas 
                ? `${pedido.notas}\n[Cancelación] ${motivoCancelacion}`
                : `[Cancelación] ${motivoCancelacion}`;

            // Si había un repartidor asignado, liberarlo
            if (pedido.repartidor) {
                const repartidor = await this.Repartidor.findById(pedido.repartidor);
                if (repartidor && repartidor.pedidoActual?.toString() === id) {
                    repartidor.pedidoActual = null;
                    await repartidor.save();
                }
            }

            return await pedido.save();
        } catch (error) {
            throw new Error(`Error al cancelar pedido: ${error.message}`);
        }
    }
}

module.exports = PedidoService;
