/**
 * Servicio para la gestión de repartidores en la base de datos
 * Este módulo encapsula todas las operaciones relacionadas con repartidores
 */
const Repartidor = require('../models/repartidorModel');
const Pedido = require('../models/pedidoModel');

class RepartidorService {
    constructor() {
        this.Repartidor = Repartidor;
        this.Pedido = Pedido;
    }

    /**
     * Crea un nuevo repartidor en la base de datos
     * @param {Object} data - Datos del repartidor a crear
     * @returns {Promise<Object>} Repartidor creado con su ID generado
     * @throws {Error} Si los datos no cumplen con las validaciones del modelo
     */
    async createRepartidor(data) {
        try {
            const repartidor = new Repartidor(data);
            return await repartidor.save();
        } catch (error) {
            throw new Error(`Error al crear repartidor: ${error.message}`);
        }
    }

    /**
     * Obtiene todos los repartidores de la base de datos
     * @param {Object} filtros - Filtros opcionales para la búsqueda
     * @returns {Promise<Array>} Lista de repartidores que cumplen con los filtros
     */
    async getAllRepartidores(filtros = {}) {
        try {
            return await this.Repartidor.find(filtros);
        } catch (error) {
            throw new Error(`Error al obtener repartidores: ${error.message}`);
        }
    }

    /**
     * Busca un repartidor por su ID
     * @param {string} id - ID del repartidor a buscar
     * @returns {Promise<Object|null>} Repartidor encontrado o null si no existe
     */
    async getRepartidorById(id) {
        try {
            return await this.Repartidor.findById(id);
        } catch (error) {
            throw new Error(`Error al buscar repartidor: ${error.message}`);
        }
    }

    /**
     * Obtiene todos los repartidores disponibles
     * @param {Array} zonasCobertura - Filtrar por zonas de cobertura específicas (opcional)
     * @returns {Promise<Array>} Lista de repartidores disponibles
     */
    async getRepartidoresDisponibles(zonasCobertura = []) {
        try {
            let filtro = { disponible: true, activo: true };
            
            // Si se especifican zonas, filtrar por ellas
            if (zonasCobertura.length > 0) {
                filtro.zonaCobertura = { $in: zonasCobertura };
            }
            
            return await this.Repartidor.find(filtro)
                .sort({ puntuacion: -1 });
        } catch (error) {
            throw new Error(`Error al obtener repartidores disponibles: ${error.message}`);
        }
    }

    /**
     * Busca repartidores por zona de cobertura
     * @param {string} zona - Zona de cobertura a buscar
     * @returns {Promise<Array>} Lista de repartidores que cubren la zona especificada
     */
    async getRepartidoresByZona(zona) {
        try {
            return await this.Repartidor.find({ 
                zonaCobertura: zona,
                activo: true 
            });
        } catch (error) {
            throw new Error(`Error al buscar repartidores por zona: ${error.message}`);
        }
    }

    /**
     * Actualiza un repartidor existente
     * @param {string} id - ID del repartidor a actualizar
     * @param {Object} data - Nuevos datos para el repartidor
     * @returns {Promise<Object|null>} Repartidor actualizado o null si no existe
     */
    async updateRepartidor(id, data) {
        try {
            return await this.Repartidor.findByIdAndUpdate(id, data, { 
                new: true,
                runValidators: true
            });
        } catch (error) {
            throw new Error(`Error al actualizar repartidor: ${error.message}`);
        }
    }

    /**
     * Elimina un repartidor de la base de datos
     * @param {string} id - ID del repartidor a eliminar
     * @returns {Promise<Object|null>} Repartidor eliminado o null si no existe
     */
    async deleteRepartidor(id) {
        try {
            // Verificar si el repartidor tiene pedidos activos
            const pedidosActivos = await this.Pedido.countDocuments({
                repartidor: id,
                estado: { $in: ['confirmado', 'en_preparacion', 'en_ruta'] }
            });

            if (pedidosActivos > 0) {
                throw new Error('No se puede eliminar un repartidor con pedidos activos');
            }

            return await this.Repartidor.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(`Error al eliminar repartidor: ${error.message}`);
        }
    }

    /**
     * Actualiza la disponibilidad de un repartidor
     * @param {string} id - ID del repartidor
     * @param {boolean} disponible - Nueva disponibilidad
     * @returns {Promise<Object|null>} Repartidor actualizado o null si no existe
     */
    async actualizarDisponibilidad(id, disponible) {
        try {
            // Si se está marcando como no disponible, verificar si tiene pedidos activos
            if (!disponible) {
                const repartidor = await this.Repartidor.findById(id);
                if (repartidor && repartidor.pedidoActual) {
                    throw new Error('No se puede marcar como no disponible mientras tiene un pedido asignado');
                }
            }

            return await this.Repartidor.findByIdAndUpdate(id, 
                { disponible }, 
                { new: true }
            );
        } catch (error) {
            throw new Error(`Error al actualizar disponibilidad: ${error.message}`);
        }
    }

    /**
     * Actualiza la ubicación actual de un repartidor
     * @param {string} id - ID del repartidor
     * @param {Object} ubicacion - Coordenadas de ubicación (lat, lng)
     * @returns {Promise<Object|null>} Repartidor actualizado o null si no existe
     */
    async actualizarUbicacion(id, ubicacion) {
        try {
            // Validar coordenadas
            if (!ubicacion.lat || !ubicacion.lng) {
                throw new Error('Se requieren coordenadas de latitud y longitud');
            }

            return await this.Repartidor.findByIdAndUpdate(id, {
                'ubicacionActual.lat': ubicacion.lat,
                'ubicacionActual.lng': ubicacion.lng,
                'ubicacionActual.ultimaActualizacion': Date.now()
            }, { new: true });
        } catch (error) {
            throw new Error(`Error al actualizar ubicación: ${error.message}`);
        }
    }

    /**
     * Actualiza las zonas de cobertura de un repartidor
     * @param {string} id - ID del repartidor
     * @param {Array} zonas - Nuevas zonas de cobertura
     * @returns {Promise<Object|null>} Repartidor actualizado o null si no existe
     */
    async actualizarZonas(id, zonas) {
        try {
            if (!Array.isArray(zonas) || zonas.length === 0) {
                throw new Error('Debe especificar al menos una zona de cobertura');
            }

            return await this.Repartidor.findByIdAndUpdate(id, 
                { zonaCobertura: zonas }, 
                { new: true }
            );
        } catch (error) {
            throw new Error(`Error al actualizar zonas de cobertura: ${error.message}`);
        }
    }

    /**
     * Obtiene estadísticas de un repartidor
     * @param {string} id - ID del repartidor
     * @returns {Promise<Object>} Estadísticas del repartidor
     */
    async getEstadisticas(id) {
        try {
            const repartidor = await this.Repartidor.findById(id);
            if (!repartidor) {
                throw new Error('Repartidor no encontrado');
            }

            // Obtener todos los pedidos entregados por el repartidor
            const pedidosEntregados = await this.Pedido.find({
                repartidor: id,
                estado: 'entregado'
            });

            // Calcular estadísticas
            const totalPedidos = pedidosEntregados.length;
            
            const pedidosCalificados = pedidosEntregados.filter(p => p.calificacion && p.calificacion.puntuacion);
            const totalCalificaciones = pedidosCalificados.length;
            
            const sumaPuntuaciones = pedidosCalificados.reduce(
                (sum, p) => sum + p.calificacion.puntuacion, 0
            );
            
            const puntuacionPromedio = totalCalificaciones > 0 
                ? sumaPuntuaciones / totalCalificaciones 
                : 0;

            // Pedidos por día de la semana
            const pedidosPorDia = [0, 0, 0, 0, 0, 0, 0]; // Dom, Lun, Mar, Mie, Jue, Vie, Sab
            pedidosEntregados.forEach(p => {
                const dia = new Date(p.fechaEntrega).getDay();
                pedidosPorDia[dia]++;
            });

            return {
                totalEntregas: totalPedidos,
                calificacionPromedio: puntuacionPromedio,
                totalCalificaciones,
                pedidosPorDia
            };
        } catch (error) {
            throw new Error(`Error al obtener estadísticas: ${error.message}`);
        }
    }
}

module.exports = RepartidorService;
