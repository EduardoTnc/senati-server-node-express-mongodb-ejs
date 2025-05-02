/**
 * Servicio para la gestión de productos en la base de datos
 * Este módulo encapsula todas las operaciones relacionadas con el catálogo de productos
 */
const Producto = require('../models/productoModel');

class ProductoService {
    constructor() {
        this.Producto = Producto;
    }

    /**
     * Crea un nuevo producto en la base de datos
     * @param {Object} data - Datos del producto a crear
     * @returns {Promise<Object>} Producto creado con su ID generado
     * @throws {Error} Si los datos no cumplen con las validaciones del modelo
     */
    async createProducto(data) {
        try {
            const producto = new Producto(data);
            return await producto.save();
        } catch (error) {
            throw new Error(`Error al crear producto: ${error.message}`);
        }
    }

    /**
     * Obtiene todos los productos de la base de datos
     * @param {Object} filtros - Filtros opcionales para la búsqueda
     * @returns {Promise<Array>} Lista de productos que cumplen con los filtros
     */
    async getAllProductos(filtros = {}) {
        try {
            return await this.Producto.find(filtros);
        } catch (error) {
            throw new Error(`Error al obtener productos: ${error.message}`);
        }
    }

    /**
     * Busca un producto por su ID
     * @param {string} id - ID del producto a buscar
     * @returns {Promise<Object|null>} Producto encontrado o null si no existe
     */
    async getProductoById(id) {
        try {
            return await this.Producto.findById(id);
        } catch (error) {
            throw new Error(`Error al buscar producto: ${error.message}`);
        }
    }

    /**
     * Obtiene productos por categoría
     * @param {string} categoria - Categoría de productos a buscar
     * @returns {Promise<Array>} Lista de productos de la categoría especificada
     */
    async getProductosByCategoria(categoria) {
        try {
            return await this.Producto.find({ categoria });
        } catch (error) {
            throw new Error(`Error al buscar productos por categoría: ${error.message}`);
        }
    }

    /**
     * Obtiene productos destacados
     * @param {number} limit - Número máximo de productos a retornar
     * @returns {Promise<Array>} Lista de productos destacados
     */
    async getProductosDestacados(limit = 10) {
        try {
            return await this.Producto.find({ destacado: true })
                .limit(limit);
        } catch (error) {
            throw new Error(`Error al obtener productos destacados: ${error.message}`);
        }
    }

    /**
     * Busca productos por nombre o descripción
     * @param {string} query - Texto a buscar en nombre o descripción
     * @returns {Promise<Array>} Lista de productos que coinciden con la búsqueda
     */
    async searchProductos(query) {
        try {
            const regex = new RegExp(query, 'i');
            return await this.Producto.find({
                $or: [
                    { nombre: regex },
                    { descripcion: regex },
                    { etiquetas: regex }
                ]
            });
        } catch (error) {
            throw new Error(`Error en la búsqueda de productos: ${error.message}`);
        }
    }

    /**
     * Actualiza un producto existente
     * @param {string} id - ID del producto a actualizar
     * @param {Object} data - Nuevos datos para el producto
     * @returns {Promise<Object|null>} Producto actualizado o null si no existe
     */
    async updateProducto(id, data) {
        try {
            return await this.Producto.findByIdAndUpdate(id, data, { 
                new: true,
                runValidators: true
            });
        } catch (error) {
            throw new Error(`Error al actualizar producto: ${error.message}`);
        }
    }

    /**
     * Elimina un producto de la base de datos
     * @param {string} id - ID del producto a eliminar
     * @returns {Promise<Object|null>} Producto eliminado o null si no existe
     */
    async deleteProducto(id) {
        try {
            return await this.Producto.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(`Error al eliminar producto: ${error.message}`);
        }
    }

    /**
     * Actualiza la disponibilidad de un producto
     * @param {string} id - ID del producto
     * @param {boolean} disponible - Nueva disponibilidad
     * @returns {Promise<Object|null>} Producto actualizado o null si no existe
     */
    async toggleDisponibilidad(id, disponible) {
        try {
            return await this.Producto.findByIdAndUpdate(id, 
                { disponible }, 
                { new: true }
            );
        } catch (error) {
            throw new Error(`Error al actualizar disponibilidad: ${error.message}`);
        }
    }

    /**
     * Actualiza si un producto es destacado
     * @param {string} id - ID del producto
     * @param {boolean} destacado - Si el producto debe ser destacado
     * @returns {Promise<Object|null>} Producto actualizado o null si no existe
     */
    async toggleDestacado(id, destacado) {
        try {
            return await this.Producto.findByIdAndUpdate(id, 
                { destacado }, 
                { new: true }
            );
        } catch (error) {
            throw new Error(`Error al actualizar estado destacado: ${error.message}`);
        }
    }
}

module.exports = ProductoService;
