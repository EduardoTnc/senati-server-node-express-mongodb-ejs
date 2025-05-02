const express = require('express');
const clienteController = require('../controllers/clienteController');

const router = express.Router();

// Rutas para clientes
router.route('/')
    .get(clienteController.getAllClientes)
    .post(clienteController.createCliente);

router.route('/:id')
    .get(clienteController.getCliente)
    .put(clienteController.updateCliente)
    .delete(clienteController.deleteCliente);

// Rutas para direcciones de clientes
router.route('/:id/direcciones')
    .post(clienteController.agregarDireccion);

router.route('/:id/direcciones/:direccionId')
    .put(clienteController.actualizarDireccion)
    .delete(clienteController.eliminarDireccion);

module.exports = router;
