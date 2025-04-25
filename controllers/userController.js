const User = require('../models/userModel');

// MARK: getAllUsers
/**
 * Obtener todos los usuarios.
 * 
 * @param {Object} req - Objeto de la petición.
 * @param {Object} res - Objeto de la respuesta con el resultado de la búsqueda.
 * 
 * @returns {Promise<void>} - Promesa que se resolverá una vez encontrado el usuario.
 */
exports.getAllUsers = async (req, res) => {
    try {
        console.log('Accediendo a getAllUsers');
        const users = await User.find();
        res.status(200).json({
            status: 'success',
            results: users.length,
            data: {
                users
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// MARK: getUser
/**
 * Obtener un usuario por ID.
 * 
 * @param {Object} req - Objeto de la petición con el ID del usuario a buscar.
 * @param {Object} res - Objeto de la respuesta con el resultado de la búsqueda.
 * 
 * @returns {Promise<void>} - Promesa que se resolverá una vez encontrado el usuario.
 */
exports.getUser = async (req, res) => {
    try {
        console.log('Accediendo al usuario con id:' + req.params.id);
        const user = await User.findById(req.params.id);
        
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontró el usuario con ese ID'
            });
        }
        
        res.status(200).json({
            status: 'success',
            data: {
                user
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// MARK: createUser
/**
 * Crear un nuevo usuario.
 * 
 * @param {Object} req - Objeto de la petición con los datos del nuevo usuario.
 * @param {Object} res - Objeto de la respuesta con el resultado de la creación.
 * 
 * @returns {Promise<void>} - Promesa que se resolverá una vez creado el usuario.
 */
exports.createUser = async (req, res) => {
    try {
        console.log('Accediendo a createUser');
        const newUser = await User.create(req.body);
        
        res.status(201).json({
            status: 'success',
            data: {
                user: newUser
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

// MARK: updateUser
  /**
   * Actualizar un usuario.
   * 
   * @param {Object} req - Objeto de la petición con los datos a actualizar.
   * @param {Object} res - Objeto de la respuesta con el resultado de la actualización.
   * 
   * @returns {Promise<void>} - Promesa que se resolverá una vez actualizado el usuario.
   */
exports.updateUser = async (req, res) => {
    try {
        console.log('Accediendo a updateUser');
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontró el usuario con ese ID'
            });
        }
        
        res.status(200).json({
            status: 'success',
            data: {
                user
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

// MARK: deleteUser
/**
 * Eliminar un usuario.
 * 
 * @param {Object} req - Objeto de la petición con el ID del usuario a eliminar.
 * @param {Object} res - Objeto de la respuesta con el resultado de la eliminación.
 * 
 * @returns {Promise<void>} - Promesa que se resolverá una vez eliminado el usuario.
 */
exports.deleteUser = async (req, res) => {
    try {
        console.log('Accediendo a deleteUser');
        const user = await User.findByIdAndDelete(req.params.id);
        
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontró el usuario con ese ID'
            });
        }
        
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};