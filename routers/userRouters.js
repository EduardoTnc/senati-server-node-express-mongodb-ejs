// Importamos el framework Express
const express = require('express');

// Creamos un router
const router = express.Router();

// Importamos el controlador de usuarios
const userController = require('../controllers/userController');
const userControllerTest = require('../controllers/userControllerTest');

// Definimos las rutas del controlador de prueba
router.get('/test/', userControllerTest.getAllUsers);
router.get('/test/:id', userControllerTest.getUser);
router.post('/test/', userControllerTest.createUser);
router.put('/test/:id', userControllerTest.updateUser);
router.delete('/test/:id', userControllerTest.deleteUser);


// Definimos las rutas
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUser);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

// Exportamos el router
module.exports = router;