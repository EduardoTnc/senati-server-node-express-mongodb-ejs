const PedidoService = require('../Services/PedidoService');
const pedidoService = new PedidoService();

/**
 * Obtener todos los pedidos.
 * 
 * @param {Object} req - Objeto de la petición.
 * @param {Object} res - Objeto de la respuesta con el resultado de la búsqueda.
 * 
 * @returns {Promise<void>} - Promesa que se resolverá una vez encontrados los pedidos.
 */
exports.getAllPedidos = async (req, res) => {
    try {
        console.log('Accediendo a getAllPedidos');
        const pedidos = await pedidoService.getAllPedidos(req.query);
        res.status(200).json({
            status: 'success',
            results: pedidos.length,
            data: {
                pedidos
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
 * Obtener un pedido por ID.
 * 
 * @param {Object} req - Objeto de la petición con el ID del pedido a buscar.
 * @param {Object} res - Objeto de la respuesta con el resultado de la búsqueda.
 * 
 * @returns {Promise<void>} - Promesa que se resolverá una vez encontrado el pedido.
 */
exports.getPedido = async (req, res) => {
    try {
        console.log('Accediendo al pedido con id:' + req.params.id);
        const pedido = await pedidoService.getPedidoById(req.params.id);
        
        if (!pedido) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontró el pedido con ese ID'
            });
        }
        
        res.status(200).json({
            status: 'success',
            data: {
                pedido
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
 * Obtener pedidos por cliente.
 * 
 * @param {Object} req - Objeto de la petición con el ID del cliente.
 * @param {Object} res - Objeto de la respuesta con los pedidos encontrados.
 * 
 * @returns {Promise<void>} - Promesa que se resolverá una vez encontrados los pedidos.
 */
exports.getPedidosByCliente = async (req, res) => {
    try {
        console.log('Accediendo a getPedidosByCliente: ' + req.params.clienteId);
        const pedidos = await pedidoService.getPedidosByCliente(req.params.clienteId, req.query);
        
        res.status(200).json({
            status: 'success',
            results: pedidos.length,
            data: {
                pedidos
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
 * Obtener pedidos por repartidor.
 * 
 * @param {Object} req - Objeto de la petición con el ID del repartidor.
 * @param {Object} res - Objeto de la respuesta con los pedidos encontrados.
 * 
 * @returns {Promise<void>} - Promesa que se resolverá una vez encontrados los pedidos.
 */
exports.getPedidosByRepartidor = async (req, res) => {
    try {
        console.log('Accediendo a getPedidosByRepartidor: ' + req.params.repartidorId);
        const pedidos = await pedidoService.getPedidosByRepartidor(req.params.repartidorId, req.query);
        
        res.status(200).json({
            status: 'success',
            results: pedidos.length,
            data: {
                pedidos
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
 * Obtener pedidos por estado.
 * 
 * @param {Object} req - Objeto de la petición con el estado a buscar.
 * @param {Object} res - Objeto de la respuesta con los pedidos encontrados.
 * 
 * @returns {Promise<void>} - Promesa que se resolverá una vez encontrados los pedidos.
 */
exports.getPedidosByEstado = async (req, res) => {
    try {
        console.log('Accediendo a getPedidosByEstado: ' + req.params.estado);
        const pedidos = await pedidoService.getPedidosByEstado(req.params.estado);
        
        res.status(200).json({
            status: 'success',
            results: pedidos.length,
            data: {
                pedidos
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
 * Crear un nuevo pedido.
 * 
 * @param {Object} req - Objeto de la petición con los datos del nuevo pedido.
 * @param {Object} res - Objeto de la respuesta con el resultado de la creación.
 * 
 * @returns {Promise<void>} - Promesa que se resolverá una vez creado el pedido.
 */
exports.createPedido = async (req, res) => {
    try {
        console.log('Accediendo a createPedido');
        const newPedido = await pedidoService.createPedido(req.body);
        
        res.status(201).json({
            status: 'success',
            data: {
                pedido: newPedido
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
 * Actualizar un pedido.
 * 
 * @param {Object} req - Objeto de la petición con los datos a actualizar.
 * @param {Object} res - Objeto de la respuesta con el resultado de la actualización.
 * 
 * @returns {Promise<void>} - Promesa que se resolverá una vez actualizado el pedido.
 */
exports.updatePedido = async (req, res) => {
    try {
        console.log('Accediendo a updatePedido');
        const pedido = await pedidoService.updatePedido(req.params.id, req.body);
        
        if (!pedido) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontró el pedido con ese ID'
            });
        }
        
        res.status(200).json({
            status: 'success',
            data: {
                pedido
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
 * Actualizar el estado de un pedido.
 * 
 * @param {Object} req - Objeto de la petición con el nuevo estado.
 * @param {Object} res - Objeto de la respuesta con el resultado de la actualización.
 * 
 * @returns {Promise<void>} - Promesa que se resolverá una vez actualizado el estado.
 */
exports.actualizarEstado = async (req, res) => {
    try {
        console.log('Accediendo a actualizarEstado');
        const { estado } = req.body;
        
        if (!estado) {
            return res.status(400).json({
                status: 'fail',
                message: 'Debe proporcionar el campo estado'
            });
        }
        
        const pedido = await pedidoService.actualizarEstadoPedido(req.params.id, estado);
        
        if (!pedido) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontró el pedido con ese ID'
            });
        }
        
        res.status(200).json({
            status: 'success',
            data: {
                pedido
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
 * Asignar un repartidor a un pedido.
 * 
 * @param {Object} req - Objeto de la petición con el ID del repartidor.
 * @param {Object} res - Objeto de la respuesta con el resultado de la asignación.
 * 
 * @returns {Promise<void>} - Promesa que se resolverá una vez asignado el repartidor.
 */
exports.asignarRepartidor = async (req, res) => {
    try {
        console.log('Accediendo a asignarRepartidor');
        const { repartidorId } = req.body;
        
        if (!repartidorId) {
            return res.status(400).json({
                status: 'fail',
                message: 'Debe proporcionar el campo repartidorId'
            });
        }
        
        const pedido = await pedidoService.asignarRepartidor(req.params.id, repartidorId);
        
        res.status(200).json({
            status: 'success',
            data: {
                pedido
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
 * Calificar un pedido.
 * 
 * @param {Object} req - Objeto de la petición con los datos de la calificación.
 * @param {Object} res - Objeto de la respuesta con el resultado de la calificación.
 * 
 * @returns {Promise<void>} - Promesa que se resolverá una vez calificado el pedido.
 */
exports.calificarPedido = async (req, res) => {
    try {
        console.log('Accediendo a calificarPedido');
        const { puntuacion, comentario } = req.body;
        
        if (puntuacion === undefined) {
            return res.status(400).json({
                status: 'fail',
                message: 'Debe proporcionar el campo puntuación'
            });
        }
        
        const pedido = await pedidoService.calificarPedido(req.params.id, {
            puntuacion,
            comentario
        });
        
        res.status(200).json({
            status: 'success',
            data: {
                pedido
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
 * Cancelar un pedido.
 * 
 * @param {Object} req - Objeto de la petición con el motivo de cancelación.
 * @param {Object} res - Objeto de la respuesta con el resultado de la cancelación.
 * 
 * @returns {Promise<void>} - Promesa que se resolverá una vez cancelado el pedido.
 */
exports.cancelarPedido = async (req, res) => {
    try {
        console.log('Accediendo a cancelarPedido');
        const { motivoCancelacion } = req.body;
        
        if (!motivoCancelacion) {
            return res.status(400).json({
                status: 'fail',
                message: 'Debe proporcionar el campo motivoCancelacion'
            });
        }
        
        const pedido = await pedidoService.cancelarPedido(req.params.id, motivoCancelacion);
        
        res.status(200).json({
            status: 'success',
            data: {
                pedido
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};
