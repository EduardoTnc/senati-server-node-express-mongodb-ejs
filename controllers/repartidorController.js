const RepartidorService = require('../Services/RepartidorService');
const repartidorService = new RepartidorService();

/**
 * Obtener todos los repartidores.
 * 
 * @param {Object} req - Objeto de la petición.
 * @param {Object} res - Objeto de la respuesta con el resultado de la búsqueda.
 * 
 * @returns {Promise<void>} - Promesa que se resolverá una vez encontrados los repartidores.
 */
exports.getAllRepartidores = async (req, res) => {
    try {
        console.log('Accediendo a getAllRepartidores');
        const repartidores = await repartidorService.getAllRepartidores(req.query);
        res.status(200).json({
            status: 'success',
            results: repartidores.length,
            data: {
                repartidores
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
 * Obtener un repartidor por ID.
 * 
 * @param {Object} req - Objeto de la petición con el ID del repartidor a buscar.
 * @param {Object} res - Objeto de la respuesta con el resultado de la búsqueda.
 * 
 * @returns {Promise<void>} - Promesa que se resolverá una vez encontrado el repartidor.
 */
exports.getRepartidor = async (req, res) => {
    try {
        console.log('Accediendo al repartidor con id:' + req.params.id);
        const repartidor = await repartidorService.getRepartidorById(req.params.id);
        
        if (!repartidor) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontró el repartidor con ese ID'
            });
        }
        
        res.status(200).json({
            status: 'success',
            data: {
                repartidor
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
 * Obtener repartidores disponibles.
 * 
 * @param {Object} req - Objeto de la petición.
 * @param {Object} res - Objeto de la respuesta con los repartidores disponibles.
 * 
 * @returns {Promise<void>} - Promesa que se resolverá una vez encontrados los repartidores.
 */
exports.getRepartidoresDisponibles = async (req, res) => {
    try {
        console.log('Accediendo a getRepartidoresDisponibles');
        const { zonas } = req.query;
        let zonasArray = [];
        
        if (zonas) {
            zonasArray = Array.isArray(zonas) ? zonas : [zonas];
        }
        
        const repartidores = await repartidorService.getRepartidoresDisponibles(zonasArray);
        
        res.status(200).json({
            status: 'success',
            results: repartidores.length,
            data: {
                repartidores
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
 * Crear un nuevo repartidor.
 * 
 * @param {Object} req - Objeto de la petición con los datos del nuevo repartidor.
 * @param {Object} res - Objeto de la respuesta con el resultado de la creación.
 * 
 * @returns {Promise<void>} - Promesa que se resolverá una vez creado el repartidor.
 */
exports.createRepartidor = async (req, res) => {
    try {
        console.log('Accediendo a createRepartidor');
        const newRepartidor = await repartidorService.createRepartidor(req.body);
        
        res.status(201).json({
            status: 'success',
            data: {
                repartidor: newRepartidor
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
 * Actualizar un repartidor.
 * 
 * @param {Object} req - Objeto de la petición con los datos a actualizar.
 * @param {Object} res - Objeto de la respuesta con el resultado de la actualización.
 * 
 * @returns {Promise<void>} - Promesa que se resolverá una vez actualizado el repartidor.
 */
exports.updateRepartidor = async (req, res) => {
    try {
        console.log('Accediendo a updateRepartidor');
        const repartidor = await repartidorService.updateRepartidor(req.params.id, req.body);
        
        if (!repartidor) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontró el repartidor con ese ID'
            });
        }
        
        res.status(200).json({
            status: 'success',
            data: {
                repartidor
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
 * Eliminar un repartidor.
 * 
 * @param {Object} req - Objeto de la petición con el ID del repartidor a eliminar.
 * @param {Object} res - Objeto de la respuesta con el resultado de la eliminación.
 * 
 * @returns {Promise<void>} - Promesa que se resolverá una vez eliminado el repartidor.
 */
exports.deleteRepartidor = async (req, res) => {
    try {
        console.log('Accediendo a deleteRepartidor');
        const repartidor = await repartidorService.deleteRepartidor(req.params.id);
        
        if (!repartidor) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontró el repartidor con ese ID'
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
 * Actualizar disponibilidad de un repartidor.
 * 
 * @param {Object} req - Objeto de la petición con el estado de disponibilidad.
 * @param {Object} res - Objeto de la respuesta con el resultado de la actualización.
 * 
 * @returns {Promise<void>} - Promesa que se resolverá una vez actualizada la disponibilidad.
 */
exports.actualizarDisponibilidad = async (req, res) => {
    try {
        console.log('Accediendo a actualizarDisponibilidad');
        const { disponible } = req.body;
        
        if (disponible === undefined) {
            return res.status(400).json({
                status: 'fail',
                message: 'Debe proporcionar el campo disponible'
            });
        }
        
        const repartidor = await repartidorService.actualizarDisponibilidad(req.params.id, disponible);
        
        if (!repartidor) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontró el repartidor con ese ID'
            });
        }
        
        res.status(200).json({
            status: 'success',
            data: {
                repartidor
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
 * Actualizar ubicación de un repartidor.
 * 
 * @param {Object} req - Objeto de la petición con las coordenadas de ubicación.
 * @param {Object} res - Objeto de la respuesta con el resultado de la actualización.
 * 
 * @returns {Promise<void>} - Promesa que se resolverá una vez actualizada la ubicación.
 */
exports.actualizarUbicacion = async (req, res) => {
    try {
        console.log('Accediendo a actualizarUbicacion');
        const { lat, lng } = req.body;
        
        if (lat === undefined || lng === undefined) {
            return res.status(400).json({
                status: 'fail',
                message: 'Debe proporcionar las coordenadas lat y lng'
            });
        }
        
        const repartidor = await repartidorService.actualizarUbicacion(req.params.id, { lat, lng });
        
        if (!repartidor) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontró el repartidor con ese ID'
            });
        }
        
        res.status(200).json({
            status: 'success',
            data: {
                repartidor
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
 * Actualizar zonas de cobertura de un repartidor.
 * 
 * @param {Object} req - Objeto de la petición con las zonas de cobertura.
 * @param {Object} res - Objeto de la respuesta con el resultado de la actualización.
 * 
 * @returns {Promise<void>} - Promesa que se resolverá una vez actualizadas las zonas.
 */
exports.actualizarZonas = async (req, res) => {
    try {
        console.log('Accediendo a actualizarZonas');
        const { zonas } = req.body;
        
        if (!zonas || !Array.isArray(zonas) || zonas.length === 0) {
            return res.status(400).json({
                status: 'fail',
                message: 'Debe proporcionar un arreglo de zonas no vacío'
            });
        }
        
        const repartidor = await repartidorService.actualizarZonas(req.params.id, zonas);
        
        if (!repartidor) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontró el repartidor con ese ID'
            });
        }
        
        res.status(200).json({
            status: 'success',
            data: {
                repartidor
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
 * Obtener estadísticas de un repartidor.
 * 
 * @param {Object} req - Objeto de la petición con el ID del repartidor.
 * @param {Object} res - Objeto de la respuesta con las estadísticas obtenidas.
 * 
 * @returns {Promise<void>} - Promesa que se resolverá una vez obtenidas las estadísticas.
 */
exports.getEstadisticas = async (req, res) => {
    try {
        console.log('Accediendo a getEstadisticas');
        const estadisticas = await repartidorService.getEstadisticas(req.params.id);
        
        res.status(200).json({
            status: 'success',
            data: {
                estadisticas
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};
