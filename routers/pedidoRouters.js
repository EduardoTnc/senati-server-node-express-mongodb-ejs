const express = require('express');
const pedidoController = require('../controllers/pedidoController');

const router = express.Router();

// Rutas para pedidos
router.route('/')
    .get(pedidoController.getAllPedidos)
    .post(pedidoController.createPedido);

router.route('/:id')
    .get(pedidoController.getPedido)
    .put(pedidoController.updatePedido);

// Rutas para pedidos por cliente
router.route('/cliente/:clienteId')
    .get(pedidoController.getPedidosByCliente);

// Rutas para pedidos por repartidor
router.route('/repartidor/:repartidorId')
    .get(pedidoController.getPedidosByRepartidor);

// Rutas para pedidos por estado
router.route('/estado/:estado')
    .get(pedidoController.getPedidosByEstado);

// Rutas para cambiar el estado del pedido
router.route('/:id/estado')
    .patch(pedidoController.actualizarEstado);

// Rutas para asignar repartidor
router.route('/:id/repartidor')
    .patch(pedidoController.asignarRepartidor);

// Rutas para calificar pedido
router.route('/:id/calificacion')
    .patch(pedidoController.calificarPedido);

// Rutas para cancelar pedido
router.route('/:id/cancelar')
    .patch(pedidoController.cancelarPedido);

module.exports = router;
