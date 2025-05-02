const express = require('express');
const repartidorController = require('../controllers/repartidorController');

const router = express.Router();

// Rutas para repartidores
router.route('/')
    .get(repartidorController.getAllRepartidores)
    .post(repartidorController.createRepartidor);

router.route('/disponibles')
    .get(repartidorController.getRepartidoresDisponibles);

router.route('/:id')
    .get(repartidorController.getRepartidor)
    .put(repartidorController.updateRepartidor)
    .delete(repartidorController.deleteRepartidor);

// Rutas para actualizar disponibilidad
router.route('/:id/disponibilidad')
    .patch(repartidorController.actualizarDisponibilidad);

// Rutas para actualizar ubicación
router.route('/:id/ubicacion')
    .patch(repartidorController.actualizarUbicacion);

// Rutas para actualizar zonas de cobertura
router.route('/:id/zonas')
    .patch(repartidorController.actualizarZonas);

// Rutas para obtener estadísticas
router.route('/:id/estadisticas')
    .get(repartidorController.getEstadisticas);

module.exports = router;
