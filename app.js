// ==========================================
// IMPORTACIONES
// ==========================================

// Importamos el framework Express
const express = require('express');
// Importamos la configuración de la base de datos
const connectDB = require('./config/database');
// Importamos morgan
const morgan = require('morgan');
// Importamos el middleware de login
const userLogin = require('./middlewares/userLogin');
// Importamos los routers
const userRouter = require('./routers/userRouters');
const clienteRouter = require('./routers/clienteRouters');
const productoRouter = require('./routers/productoRouters');
const pedidoRouter = require('./routers/pedidoRouters');
const repartidorRouter = require('./routers/repartidorRouters');
// Importamos el motor de plantillas EJS
const path = require('path');
// Importamos el modelo de usuarios
const User = require('./models/userModel');

// ==========================================
// CONFIGURACIÓN INICIAL
// ==========================================

// Creamos una instancia de la aplicación Express
const app = express();
// Definimos el puerto en el que se ejecutará el servidor
const PORT = 3000;
// Configuramos EJS como motor de plantillas
app.set('view engine', 'ejs');
// Establecemos el directorio de plantillas
app.set('views', path.join(__dirname, 'view'));

// ==========================================
// MIDDLEWARES
// ==========================================

// Configuramos morgan
app.use(morgan('dev'));
// Usamos el middleware de login
app.use(userLogin);
// Middleware para parsear JSON en las peticiones
app.use(express.json());
// Middleware para parsear datos de formularios
app.use(express.urlencoded({ extended: true }));
// Servimos archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// ==========================================
// CONEXIÓN A BASE DE DATOS
// ==========================================

// Conectamos a la base de datos MongoDB
connectDB();

// ==========================================
// RUTAS
// ==========================================

// Montamos los routers en sus respectivas rutas
app.use('/users', userRouter);
app.use('/api/clientes', clienteRouter);
app.use('/api/productos', productoRouter);
app.use('/api/pedidos', pedidoRouter);
app.use('/api/repartidores', repartidorRouter);

// Definimos la ruta principal con el middleware de login
app.get('/', userLogin, (req, res) => {
    const data = {
        title: 'Bienvenido a nuestro Servidor Express',
        message: 'Esta es una aplicación de ejemplo que utiliza Express.js, EJS, MongoDB y otras tecnologías modernas para crear un servidor web completo.',
        showLogin: true
    };
    res.render('index', data);
});

// Definimos la ruta de usuarios con el middleware de login
app.get('/pages/users', userLogin, async (req, res) => {
    try {
        const users = await User.find();
        const data = {
            title: 'Lista de Usuarios',
            users: users,
            message: 'Lista de usuarios',
            showLogin: true
        };
        res.render('pages/users', data);
    } catch (error) {
        res.status(500).render('pages/error', {
            title: 'Error',
            message: error.message,
            showLogin: true
        });
    }
});

// ========================================== 
// MANEJO DE ERRORES
// ========================================== 

// Middleware para manejar rutas no encontradas
app.all('*', (req, res) => {
    res.status(404).render('pages/error', {
        title: 'Error',
        message: `No se encontró la ruta ${req.originalUrl} en este servidor`
    });
});

// ==========================================
// INICIAR SERVIDOR
// ==========================================

// Iniciamos el servidor en el puerto especificado
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
