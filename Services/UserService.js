/**
 * Servicio para la gestión de usuarios en la base de datos
 * Este módulo encapsula todas las operaciones relacionadas con usuarios
 */
const User = require('../models/userModel');

class UserService {
    constructor() {
        this.User = User;
    }

    /**
     * Crea un nuevo usuario en la base de datos
     * @param {Object} data - Datos del usuario a crear (nombre, email, etc.)
     * @returns {Promise<Object>} Usuario creado con su ID generado
     * @throws {Error} Si los datos no cumplen con las validaciones del modelo
     */
    async createUser(data) {
        try {
            const user = new User(data);
            return await user.save();
        } catch (error) {
            throw new Error(`Error al crear usuario: ${error.message}`);
        }
    }

    /**
     * Obtiene todos los usuarios de la base de datos
     * @returns {Promise<Array>} Lista de todos los usuarios
     */
    async getAllUsers() {
        try {
            return await this.User.find();
        } catch (error) {
            throw new Error(`Error al obtener usuarios: ${error.message}`);
        }
    }

    /**
     * Busca un usuario por su ID
     * @param {string} id - ID del usuario a buscar
     * @returns {Promise<Object|null>} Usuario encontrado o null si no existe
     */
    async getUserById(id) {
        try {
            return await this.User.findById(id);
        } catch (error) {
            throw new Error(`Error al buscar usuario: ${error.message}`);
        }
    }

    /**
     * Actualiza un usuario existente
     * @param {string} id - ID del usuario a actualizar
     * @param {Object} data - Nuevos datos para el usuario
     * @returns {Promise<Object|null>} Usuario actualizado o null si no existe
     */
    async updateUser(id, data) {
        try {
            // El {new: true} hace que devuelva el documento actualizado en lugar del antiguo
            return await this.User.findByIdAndUpdate(id, data, { new: true });
        } catch (error) {
            throw new Error(`Error al actualizar usuario: ${error.message}`);
        }
    }

    /**
     * Elimina un usuario de la base de datos
     * @param {string} id - ID del usuario a eliminar
     * @returns {Promise<Object|null>} Usuario eliminado o null si no existe
     */
    async deleteUser(id) {
        try {
            return await this.User.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(`Error al eliminar usuario: ${error.message}`);
        }
    }
}

module.exports = UserService;