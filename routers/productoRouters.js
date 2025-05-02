const express = require('express');
const productoController = require('../controllers/productoController');

const router = express.Router();

// Rutas para productos
router.route('/')
    .get(productoController.getAllProductos)
    .post(productoController.createProducto);

router.route('/:id')
    .get(productoController.getProducto)
    .put(productoController.updateProducto)
    .delete(productoController.deleteProducto);

// Rutas para gestionar categorías
router.route('/categoria/:categoria')
    .get(productoController.getProductosByCategoria);

// Rutas para cambiar disponibilidad y estado destacado
router.route('/:id/disponibilidad')
    .patch(productoController.toggleDisponibilidad);

router.route('/:id/destacado')
    .patch(productoController.toggleDestacado);

module.exports = router;
