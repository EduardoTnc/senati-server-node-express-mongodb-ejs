const ClienteService = require('../Services/ClienteService');
const clienteService = new ClienteService();

/**
 * Obtener todos los clientes.
 * 
 * @param {Object} req - Objeto de la petición.
 * @param {Object} res - Objeto de la respuesta con el resultado de la búsqueda.
 * 
 * @returns {Promise<void>} - Promesa que se resolverá una vez encontrados los clientes.
 */
exports.getAllClientes = async (req, res) => {
    try {
        console.log('Accediendo a getAllClientes');
        const clientes = await clienteService.getAllClientes(req.query);
        res.status(200).json({
            status: 'success',
            results: clientes.length,
            data: {
                clientes
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

/**
 * Obtener un cliente por ID.
 * 
 * @param {Object} req - Objeto de la petición con el ID del cliente a buscar.
 * @param {Object} res - Objeto de la respuesta con el resultado de la búsqueda.
 * 
 * @returns {Promise<void>} - Promesa que se resolverá una vez encontrado el cliente.
 */
exports.getCliente = async (req, res) => {
    try {
        console.log('Accediendo al cliente con id:' + req.params.id);
        const cliente = await clienteService.getClienteById(req.params.id);
        
        if (!cliente) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontró el cliente con ese ID'
            });
        }
        
        res.status(200).json({
            status: 'success',
            data: {
                cliente
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

/**
 * Crear un nuevo cliente.
 * 
 * @param {Object} req - Objeto de la petición con los datos del nuevo cliente.
 * @param {Object} res - Objeto de la respuesta con el resultado de la creación.
 * 
 * @returns {Promise<void>} - Promesa que se resolverá una vez creado el cliente.
 */
exports.createCliente = async (req, res) => {
    try {
        console.log('Accediendo a createCliente');
        const newCliente = await clienteService.createCliente(req.body);
        
        res.status(201).json({
            status: 'success',
            data: {
                cliente: newCliente
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

/**
 * Actualizar un cliente.
 * 
 * @param {Object} req - Objeto de la petición con los datos a actualizar.
 * @param {Object} res - Objeto de la respuesta con el resultado de la actualización.
 * 
 * @returns {Promise<void>} - Promesa que se resolverá una vez actualizado el cliente.
 */
exports.updateCliente = async (req, res) => {
    try {
        console.log('Accediendo a updateCliente');
        const cliente = await clienteService.updateCliente(req.params.id, req.body);
        
        if (!cliente) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontró el cliente con ese ID'
            });
        }
        
        res.status(200).json({
            status: 'success',
            data: {
                cliente
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

/**
 * Eliminar un cliente.
 * 
 * @param {Object} req - Objeto de la petición con el ID del cliente a eliminar.
 * @param {Object} res - Objeto de la respuesta con el resultado de la eliminación.
 * 
 * @returns {Promise<void>} - Promesa que se resolverá una vez eliminado el cliente.
 */
exports.deleteCliente = async (req, res) => {
    try {
        console.log('Accediendo a deleteCliente');
        const cliente = await clienteService.deleteCliente(req.params.id);
        
        if (!cliente) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontró el cliente con ese ID'
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

/**
 * Agregar una dirección a un cliente.
 * 
 * @param {Object} req - Objeto de la petición con los datos de la dirección a agregar.
 * @param {Object} res - Objeto de la respuesta con el resultado de la operación.
 * 
 * @returns {Promise<void>} - Promesa que se resolverá una vez agregada la dirección.
 */
exports.agregarDireccion = async (req, res) => {
    try {
        console.log('Accediendo a agregarDireccion');
        const cliente = await clienteService.agregarDireccion(req.params.id, req.body);
        
        res.status(200).json({
            status: 'success',
            data: {
                cliente
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

/**
 * Actualizar una dirección de un cliente.
 * 
 * @param {Object} req - Objeto de la petición con los datos de la dirección a actualizar.
 * @param {Object} res - Objeto de la respuesta con el resultado de la operación.
 * 
 * @returns {Promise<void>} - Promesa que se resolverá una vez actualizada la dirección.
 */
exports.actualizarDireccion = async (req, res) => {
    try {
        console.log('Accediendo a actualizarDireccion');
        const cliente = await clienteService.actualizarDireccion(
            req.params.id, 
            req.params.direccionId, 
            req.body
        );
        
        res.status(200).json({
            status: 'success',
            data: {
                cliente
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

/**
 * Eliminar una dirección de un cliente.
 * 
 * @param {Object} req - Objeto de la petición con el ID del cliente y de la dirección.
 * @param {Object} res - Objeto de la respuesta con el resultado de la operación.
 * 
 * @returns {Promise<void>} - Promesa que se resolverá una vez eliminada la dirección.
 */
exports.eliminarDireccion = async (req, res) => {
    try {
        console.log('Accediendo a eliminarDireccion');
        const cliente = await clienteService.eliminarDireccion(
            req.params.id, 
            req.params.direccionId
        );
        
        res.status(200).json({
            status: 'success',
            data: {
                cliente
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};
