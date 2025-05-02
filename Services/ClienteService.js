/**
 * Servicio para la gestión de clientes en la base de datos
 * Este módulo encapsula todas las operaciones relacionadas con clientes
 */
const Cliente = require('../models/clienteModel');

class ClienteService {
    constructor() {
        this.Cliente = Cliente;
    }

    /**
     * Crea un nuevo cliente en la base de datos
     * @param {Object} data - Datos del cliente a crear
     * @returns {Promise<Object>} Cliente creado con su ID generado
     * @throws {Error} Si los datos no cumplen con las validaciones del modelo
     */
    async createCliente(data) {
        try {
            const cliente = new Cliente(data);
            return await cliente.save();
        } catch (error) {
            throw new Error(`Error al crear cliente: ${error.message}`);
        }
    }

    /**
     * Obtiene todos los clientes de la base de datos
     * @param {Object} filtros - Filtros opcionales para la búsqueda
     * @returns {Promise<Array>} Lista de clientes que cumplen con los filtros
     */
    async getAllClientes(filtros = {}) {
        try {
            return await this.Cliente.find(filtros);
        } catch (error) {
            throw new Error(`Error al obtener clientes: ${error.message}`);
        }
    }

    /**
     * Busca un cliente por su ID
     * @param {string} id - ID del cliente a buscar
     * @returns {Promise<Object|null>} Cliente encontrado o null si no existe
     */
    async getClienteById(id) {
        try {
            return await this.Cliente.findById(id);
        } catch (error) {
            throw new Error(`Error al buscar cliente: ${error.message}`);
        }
    }

    /**
     * Busca un cliente por su email
     * @param {string} email - Email del cliente a buscar
     * @returns {Promise<Object|null>} Cliente encontrado o null si no existe
     */
    async getClienteByEmail(email) {
        try {
            return await this.Cliente.findOne({ email });
        } catch (error) {
            throw new Error(`Error al buscar cliente por email: ${error.message}`);
        }
    }

    /**
     * Actualiza un cliente existente
     * @param {string} id - ID del cliente a actualizar
     * @param {Object} data - Nuevos datos para el cliente
     * @returns {Promise<Object|null>} Cliente actualizado o null si no existe
     */
    async updateCliente(id, data) {
        try {
            return await this.Cliente.findByIdAndUpdate(id, data, { 
                new: true,
                runValidators: true
            });
        } catch (error) {
            throw new Error(`Error al actualizar cliente: ${error.message}`);
        }
    }

    /**
     * Elimina un cliente de la base de datos
     * @param {string} id - ID del cliente a eliminar
     * @returns {Promise<Object|null>} Cliente eliminado o null si no existe
     */
    async deleteCliente(id) {
        try {
            return await this.Cliente.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(`Error al eliminar cliente: ${error.message}`);
        }
    }

    /**
     * Agrega una nueva dirección al cliente
     * @param {string} clienteId - ID del cliente
     * @param {Object} direccion - Datos de la dirección a agregar
     * @returns {Promise<Object>} Cliente actualizado con la nueva dirección
     */
    async agregarDireccion(clienteId, direccion) {
        try {
            const cliente = await this.Cliente.findById(clienteId);
            if (!cliente) {
                throw new Error('Cliente no encontrado');
            }

            // Si la dirección es predeterminada, desmarcar otras direcciones predeterminadas
            if (direccion.predeterminada) {
                cliente.direcciones.forEach(dir => {
                    dir.predeterminada = false;
                });
            }

            cliente.direcciones.push(direccion);
            return await cliente.save();
        } catch (error) {
            throw new Error(`Error al agregar dirección: ${error.message}`);
        }
    }

    /**
     * Actualiza una dirección existente del cliente
     * @param {string} clienteId - ID del cliente
     * @param {string} direccionId - ID de la dirección a actualizar
     * @param {Object} nuevaDireccion - Nuevos datos de la dirección
     * @returns {Promise<Object>} Cliente actualizado con la dirección modificada
     */
    async actualizarDireccion(clienteId, direccionId, nuevaDireccion) {
        try {
            const cliente = await this.Cliente.findById(clienteId);
            if (!cliente) {
                throw new Error('Cliente no encontrado');
            }

            const direccion = cliente.direcciones.id(direccionId);
            if (!direccion) {
                throw new Error('Dirección no encontrada');
            }

            // Si la nueva dirección es predeterminada, desmarcar otras direcciones
            if (nuevaDireccion.predeterminada && !direccion.predeterminada) {
                cliente.direcciones.forEach(dir => {
                    if (dir._id.toString() !== direccionId) {
                        dir.predeterminada = false;
                    }
                });
            }

            // Actualizar los campos de la dirección
            Object.keys(nuevaDireccion).forEach(key => {
                direccion[key] = nuevaDireccion[key];
            });

            return await cliente.save();
        } catch (error) {
            throw new Error(`Error al actualizar dirección: ${error.message}`);
        }
    }

    /**
     * Elimina una dirección del cliente
     * @param {string} clienteId - ID del cliente
     * @param {string} direccionId - ID de la dirección a eliminar
     * @returns {Promise<Object>} Cliente actualizado sin la dirección eliminada
     */
    async eliminarDireccion(clienteId, direccionId) {
        try {
            const cliente = await this.Cliente.findById(clienteId);
            if (!cliente) {
                throw new Error('Cliente no encontrado');
            }

            const direccion = cliente.direcciones.id(direccionId);
            if (!direccion) {
                throw new Error('Dirección no encontrada');
            }

            direccion.remove();
            return await cliente.save();
        } catch (error) {
            throw new Error(`Error al eliminar dirección: ${error.message}`);
        }
    }
}

module.exports = ClienteService;
