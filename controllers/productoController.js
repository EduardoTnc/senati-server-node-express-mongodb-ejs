const ProductoService = require('../Services/ProductoService');
const productoService = new ProductoService();

/**
 * Obtener todos los productos.
 * 
 * @param {Object} req - Objeto de la petición.
 * @param {Object} res - Objeto de la respuesta con el resultado de la búsqueda.
 * 
 * @returns {Promise<void>} - Promesa que se resolverá una vez encontrados los productos.
 */
exports.getAllProductos = async (req, res) => {
    try {
        console.log('Accediendo a getAllProductos');
        const productos = await productoService.getAllProductos(req.query);
        res.status(200).json({
            status: 'success',
            results: productos.length,
            data: {
                productos
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
 * Obtener productos por categoría.
 * 
 * @param {Object} req - Objeto de la petición con la categoría a buscar.
 * @param {Object} res - Objeto de la respuesta con el resultado de la búsqueda.
 * 
 * @returns {Promise<void>} - Promesa que se resolverá una vez encontrados los productos.
 */
exports.getProductosByCategoria = async (req, res) => {
    try {
        console.log('Accediendo a getProductosByCategoria: ' + req.params.categoria);
        const productos = await productoService.getProductosByCategoria(req.params.categoria);
        res.status(200).json({
            status: 'success',
            results: productos.length,
            data: {
                productos
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
 * Obtener un producto por ID.
 * 
 * @param {Object} req - Objeto de la petición con el ID del producto a buscar.
 * @param {Object} res - Objeto de la respuesta con el resultado de la búsqueda.
 * 
 * @returns {Promise<void>} - Promesa que se resolverá una vez encontrado el producto.
 */
exports.getProducto = async (req, res) => {
    try {
        console.log('Accediendo al producto con id:' + req.params.id);
        const producto = await productoService.getProductoById(req.params.id);
        
        if (!producto) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontró el producto con ese ID'
            });
        }
        
        res.status(200).json({
            status: 'success',
            data: {
                producto
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
 * Crear un nuevo producto.
 * 
 * @param {Object} req - Objeto de la petición con los datos del nuevo producto.
 * @param {Object} res - Objeto de la respuesta con el resultado de la creación.
 * 
 * @returns {Promise<void>} - Promesa que se resolverá una vez creado el producto.
 */
exports.createProducto = async (req, res) => {
    try {
        console.log('Accediendo a createProducto');
        const newProducto = await productoService.createProducto(req.body);
        
        res.status(201).json({
            status: 'success',
            data: {
                producto: newProducto
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
 * Actualizar un producto.
 * 
 * @param {Object} req - Objeto de la petición con los datos a actualizar.
 * @param {Object} res - Objeto de la respuesta con el resultado de la actualización.
 * 
 * @returns {Promise<void>} - Promesa que se resolverá una vez actualizado el producto.
 */
exports.updateProducto = async (req, res) => {
    try {
        console.log('Accediendo a updateProducto');
        const producto = await productoService.updateProducto(req.params.id, req.body);
        
        if (!producto) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontró el producto con ese ID'
            });
        }
        
        res.status(200).json({
            status: 'success',
            data: {
                producto
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
 * Eliminar un producto.
 * 
 * @param {Object} req - Objeto de la petición con el ID del producto a eliminar.
 * @param {Object} res - Objeto de la respuesta con el resultado de la eliminación.
 * 
 * @returns {Promise<void>} - Promesa que se resolverá una vez eliminado el producto.
 */
exports.deleteProducto = async (req, res) => {
    try {
        console.log('Accediendo a deleteProducto');
        const producto = await productoService.deleteProducto(req.params.id);
        
        if (!producto) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontró el producto con ese ID'
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
 * Cambiar disponibilidad de un producto.
 * 
 * @param {Object} req - Objeto de la petición con el ID del producto.
 * @param {Object} res - Objeto de la respuesta con el resultado de la operación.
 * 
 * @returns {Promise<void>} - Promesa que se resolverá una vez actualizada la disponibilidad.
 */
exports.toggleDisponibilidad = async (req, res) => {
    try {
        console.log('Accediendo a toggleDisponibilidad');
        const disponible = req.body.disponible;
        
        if (disponible === undefined) {
            return res.status(400).json({
                status: 'fail',
                message: 'Debe proporcionar el campo disponible'
            });
        }
        
        const producto = await productoService.toggleDisponibilidad(req.params.id, disponible);
        
        if (!producto) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontró el producto con ese ID'
            });
        }
        
        res.status(200).json({
            status: 'success',
            data: {
                producto
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
 * Cambiar estado destacado de un producto.
 * 
 * @param {Object} req - Objeto de la petición con el ID del producto.
 * @param {Object} res - Objeto de la respuesta con el resultado de la operación.
 * 
 * @returns {Promise<void>} - Promesa que se resolverá una vez actualizado el estado destacado.
 */
exports.toggleDestacado = async (req, res) => {
    try {
        console.log('Accediendo a toggleDestacado');
        const destacado = req.body.destacado;
        
        if (destacado === undefined) {
            return res.status(400).json({
                status: 'fail',
                message: 'Debe proporcionar el campo destacado'
            });
        }
        
        const producto = await productoService.toggleDestacado(req.params.id, destacado);
        
        if (!producto) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontró el producto con ese ID'
            });
        }
        
        res.status(200).json({
            status: 'success',
            data: {
                producto
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};
