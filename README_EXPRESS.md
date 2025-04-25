# Guía de Implementación de Express.js

## ¿Qué es Express.js?

Express.js es un framework web minimalista, flexible y rápido para Node.js. Proporciona un conjunto robusto de características para desarrollar aplicaciones web y móviles, incluyendo:

- Enrutamiento HTTP
- Middleware para procesar solicitudes
- Integración con motores de plantillas
- Configuración de aplicaciones web
- Manejo de errores

Express facilita la creación de APIs RESTful y aplicaciones web con Node.js, permitiendo organizar la aplicación en un patrón MVC (Modelo-Vista-Controlador).

## Instalación

Para instalar Express en tu proyecto, ejecuta:

```bash
# Con npm
npm install express

# Con pnpm
pnpm add express
```

## Configuración Básica

### 1. Crear una Aplicación Express

```javascript
// Importar Express
const express = require('express');

// Crear una instancia de la aplicación
const app = express();

// Definir el puerto
const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
```

### 2. Configurar Middleware Básico

```javascript
// Middleware para parsear JSON
app.use(express.json());

// Middleware para parsear datos de formularios
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use(express.static('public'));
```

## Enrutamiento

### 1. Rutas Básicas

```javascript
// Ruta GET simple
app.get('/', (req, res) => {
  res.send('¡Hola Mundo!');
});

// Ruta POST
app.post('/api/users', (req, res) => {
  // Acceder a los datos enviados en el cuerpo de la petición
  const userData = req.body;
  // Procesar los datos...
  res.status(201).json({ message: 'Usuario creado', user: userData });
});

// Ruta con parámetros
app.get('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  // Buscar usuario por ID...
  res.json({ userId });
});

// Ruta con múltiples parámetros
app.get('/api/posts/:year/:month', (req, res) => {
  const { year, month } = req.params;
  res.json({ year, month });
});

// Ruta con parámetros de consulta (query params)
app.get('/api/products', (req, res) => {
  // Acceder a los parámetros de consulta: /api/products?category=electronics&sort=price
  const { category, sort } = req.query;
  res.json({ category, sort });
});
```

### 2. Métodos HTTP

Express soporta todos los métodos HTTP:

```javascript
// GET - Obtener recursos
app.get('/api/users', (req, res) => {
  // Obtener todos los usuarios
});

// POST - Crear recursos
app.post('/api/users', (req, res) => {
  // Crear un nuevo usuario
});

// PUT - Actualizar recursos (reemplazar completamente)
app.put('/api/users/:id', (req, res) => {
  // Actualizar un usuario existente
});

// PATCH - Actualizar parcialmente recursos
app.patch('/api/users/:id', (req, res) => {
  // Actualizar parcialmente un usuario
});

// DELETE - Eliminar recursos
app.delete('/api/users/:id', (req, res) => {
  // Eliminar un usuario
});
```

### 3. Router de Express

Para organizar mejor las rutas, puedes usar el Router de Express:

```javascript
// userRoutes.js
const express = require('express');
const router = express.Router();

// Definir rutas en el router
router.get('/', (req, res) => {
  // Obtener todos los usuarios
});

router.get('/:id', (req, res) => {
  // Obtener un usuario específico
});

router.post('/', (req, res) => {
  // Crear un nuevo usuario
});

// Exportar el router
module.exports = router;

// app.js
const userRoutes = require('./routes/userRoutes');

// Montar el router en una ruta base
app.use('/api/users', userRoutes);
```

## Middleware

El middleware son funciones que tienen acceso al objeto de solicitud (req), al objeto de respuesta (res) y a la siguiente función de middleware en el ciclo de solicitud/respuesta.

### 1. Middleware de Aplicación

```javascript
// Middleware personalizado
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next(); // Pasar al siguiente middleware
});

// Middleware para una ruta específica
app.use('/api/users', (req, res, next) => {
  console.log('Accediendo a la API de usuarios');
  next();
});

// Middleware condicional
app.use((req, res, next) => {
  if (req.query.apiKey) {
    next(); // Continuar si hay una clave API
  } else {
    res.status(401).json({ error: 'API Key requerida' });
  }
});
```

### 2. Middleware de Terceros

Hay muchos paquetes de middleware disponibles:

```javascript
// Morgan - Logging HTTP
const morgan = require('morgan');
app.use(morgan('dev'));

// Helmet - Seguridad HTTP
const helmet = require('helmet');
app.use(helmet());

// CORS - Compartir recursos entre orígenes
const cors = require('cors');
app.use(cors());

// Cookie Parser - Analizar cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Express Session - Manejo de sesiones
const session = require('express-session');
app.use(session({
  secret: 'mi-secreto',
  resave: false,
  saveUninitialized: true
}));
```

### 3. Middleware de Error

```javascript
// Middleware para manejar rutas no encontradas (404)
app.use((req, res, next) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Middleware para manejar errores (debe tener 4 parámetros)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Capturar errores en rutas asíncronas
app.get('/api/async', async (req, res, next) => {
  try {
    // Operación asíncrona que podría fallar
    const data = await someAsyncOperation();
    res.json(data);
  } catch (error) {
    next(error); // Pasar el error al middleware de error
  }
});
```

## Respuestas HTTP

### 1. Tipos de Respuestas

```javascript
// Enviar texto plano
app.get('/plain', (req, res) => {
  res.send('Texto plano');
});

// Enviar HTML
app.get('/html', (req, res) => {
  res.send('<h1>Título HTML</h1>');
});

// Enviar JSON
app.get('/json', (req, res) => {
  res.json({ message: 'Respuesta JSON' });
});

// Enviar un archivo
app.get('/file', (req, res) => {
  res.sendFile('/ruta/absoluta/al/archivo.pdf');
});

// Descargar un archivo
app.get('/download', (req, res) => {
  res.download('/ruta/al/archivo.pdf', 'nombre-personalizado.pdf');
});

// Redirigir
app.get('/redirect', (req, res) => {
  res.redirect('/nueva-ruta');
});

// Establecer estado HTTP
app.get('/status', (req, res) => {
  res.status(201).send('Recurso creado');
});
```

### 2. Encabezados de Respuesta

```javascript
app.get('/headers', (req, res) => {
  // Establecer encabezados
  res.set('Content-Type', 'text/plain');
  res.set('X-Custom-Header', 'Valor personalizado');
  
  // O múltiples encabezados a la vez
  res.set({
    'Content-Type': 'text/plain',
    'X-Custom-Header': 'Valor personalizado'
  });
  
  res.send('Respuesta con encabezados personalizados');
});
```

### 3. Cookies

```javascript
// Establecer una cookie
app.get('/set-cookie', (req, res) => {
  res.cookie('nombre', 'valor', {
    maxAge: 900000, // Tiempo de vida en milisegundos
    httpOnly: true, // No accesible desde JavaScript
    secure: true,   // Solo en HTTPS
    sameSite: 'strict' // Controla cómo se envían las cookies en solicitudes cross-site
  });
  res.send('Cookie establecida');
});

// Leer cookies (requiere cookie-parser)
app.get('/get-cookie', (req, res) => {
  const cookieValue = req.cookies.nombre;
  res.send(`Valor de la cookie: ${cookieValue}`);
});

// Eliminar una cookie
app.get('/clear-cookie', (req, res) => {
  res.clearCookie('nombre');
  res.send('Cookie eliminada');
});
```

## Motores de Plantillas

Express puede integrarse con varios motores de plantillas como EJS, Pug, Handlebars, etc.

### 1. Configuración de EJS

```javascript
// Instalar EJS: pnpm add ejs

// Configurar EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', './views'); // Directorio de vistas

// Renderizar una vista
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Página de Inicio',
    message: '¡Bienvenido a Express!',
    users: ['Juan', 'María', 'Pedro']
  });
});
```

### 2. Ejemplo de Vista EJS (views/index.ejs)

```ejs
<!DOCTYPE html>
<html>
<head>
  <title><%= title %></title>
</head>
<body>
  <h1><%= message %></h1>
  
  <h2>Usuarios:</h2>
  <ul>
    <% users.forEach(user => { %>
      <li><%= user %></li>
    <% }); %>
  </ul>
</body>
</html>
```

## Manejo de Errores

### 1. Errores Síncronos

```javascript
app.get('/error', (req, res) => {
  // Express capturará automáticamente este error
  throw new Error('¡Algo salió mal!');
});
```

### 2. Errores Asíncronos

```javascript
app.get('/async-error', async (req, res, next) => {
  try {
    // Operación asíncrona
    const result = await someAsyncOperation();
    res.json(result);
  } catch (error) {
    // Pasar el error al middleware de error
    next(error);
  }
});

// Alternativa con express-async-errors
require('express-async-errors'); // Al inicio de tu aplicación

app.get('/async-error-simple', async (req, res) => {
  // No necesitas try/catch, los errores se capturan automáticamente
  const result = await someAsyncOperation();
  res.json(result);
});
```

### 3. Middleware de Error Personalizado

```javascript
// Crear un error personalizado
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    
    Error.captureStackTrace(this, this.constructor);
  }
}

// Middleware para lanzar un error 404
app.all('*', (req, res, next) => {
  next(new AppError(`No se encontró ${req.originalUrl} en este servidor`, 404));
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  
  // Respuesta para desarrollo
  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  } 
  // Respuesta para producción
  else {
    // Solo enviar errores operacionales al cliente
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });
    } 
    // Errores de programación o desconocidos
    else {
      console.error('ERROR 💥', err);
      res.status(500).json({
        status: 'error',
        message: 'Algo salió mal'
      });
    }
  }
});
```

## Arquitectura MVC con Express

### 1. Estructura de Directorios

```
proyecto/
├── app.js                  # Punto de entrada
├── server.js               # Configuración del servidor
├── config/                 # Configuraciones
│   └── database.js         # Configuración de la base de datos
├── controllers/            # Controladores
│   ├── userController.js   # Controlador de usuarios
│   └── errorController.js  # Controlador de errores
├── models/                 # Modelos
│   └── userModel.js        # Modelo de usuario
├── routes/                 # Rutas
│   └── userRoutes.js       # Rutas de usuario
├── views/                  # Vistas (plantillas)
│   ├── base.ejs            # Plantilla base
│   └── users/              # Vistas relacionadas con usuarios
│       ├── index.ejs       # Lista de usuarios
│       └── show.ejs        # Detalle de usuario
├── public/                 # Archivos estáticos
│   ├── css/                # Estilos
│   ├── js/                 # JavaScript del cliente
│   └── img/                # Imágenes
├── middlewares/            # Middleware personalizado
│   ├── auth.js             # Middleware de autenticación
│   └── logger.js           # Middleware de logging
└── utils/                  # Utilidades
    ├── apiFeatures.js      # Características de API (filtrado, ordenación)
    └── appError.js         # Clase de error personalizada
```

### 2. Ejemplo de Controlador (controllers/userController.js)

```javascript
const User = require('../models/userModel');
const AppError = require('../utils/appError');

// Factory para manejar errores en funciones asíncronas
const catchAsync = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

// Obtener todos los usuarios
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users
    }
  });
});

// Obtener un usuario por ID
exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  
  if (!user) {
    return next(new AppError('No se encontró el usuario con ese ID', 404));
  }
  
  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

// Crear un nuevo usuario
exports.createUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  
  res.status(201).json({
    status: 'success',
    data: {
      user: newUser
    }
  });
});

// Actualizar un usuario
exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  
  if (!user) {
    return next(new AppError('No se encontró el usuario con ese ID', 404));
  }
  
  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

// Eliminar un usuario
exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  
  if (!user) {
    return next(new AppError('No se encontró el usuario con ese ID', 404));
  }
  
  res.status(204).json({
    status: 'success',
    data: null
  });
});
```

### 3. Ejemplo de Rutas (routes/userRoutes.js)

```javascript
const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

// Middleware de protección para todas las rutas
router.use(authMiddleware.protect);

// Rutas para /api/users
router
  .route('/')
  .get(userController.getAllUsers)
  .post(
    authMiddleware.restrictTo('admin'), 
    userController.createUser
  );

// Rutas para /api/users/:id
router
  .route('/:id')
  .get(userController.getUser)
  .patch(
    authMiddleware.restrictTo('admin'), 
    userController.updateUser
  )
  .delete(
    authMiddleware.restrictTo('admin'), 
    userController.deleteUser
  );

module.exports = router;
```

## Seguridad en Express

### 1. Mejores Prácticas de Seguridad

```javascript
// Instalar paquetes de seguridad
// pnpm add helmet express-rate-limit cors xss-clean hpp express-mongo-sanitize

const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const xss = require('xss-clean');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');

const app = express();

// Establecer encabezados de seguridad HTTP
app.use(helmet());

// Habilitar CORS
app.use(cors());
app.options('*', cors()); // Habilitar pre-flight para todas las rutas

// Limitar solicitudes desde la misma IP
const limiter = rateLimit({
  max: 100, // 100 solicitudes
  windowMs: 60 * 60 * 1000, // 1 hora
  message: 'Demasiadas solicitudes desde esta IP, inténtalo de nuevo en una hora'
});
app.use('/api', limiter);

// Sanitización de datos contra NoSQL query injection
app.use(mongoSanitize());

// Sanitización de datos contra XSS
app.use(xss());

// Prevenir parameter pollution
app.use(hpp({
  whitelist: ['nombre', 'precio'] // Parámetros que pueden duplicarse
}));

// Limitar el tamaño del payload
app.use(express.json({ limit: '10kb' }));
```

### 2. Autenticación con JWT

```javascript
// pnpm add jsonwebtoken bcryptjs

const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const AppError = require('../utils/appError');

// Generar token JWT
const signToken = id => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

// Crear y enviar token
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  
  // Configurar cookie
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };
  
  // Solo enviar cookie en HTTPS en producción
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  
  res.cookie('jwt', token, cookieOptions);
  
  // Eliminar la contraseña de la salida
  user.password = undefined;
  
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

// Registro de usuario
exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      role: req.body.role
    });
    
    createSendToken(newUser, 201, res);
  } catch (error) {
    next(error);
  }
};

// Inicio de sesión
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    // Verificar si se proporcionó email y password
    if (!email || !password) {
      return next(new AppError('Por favor proporciona email y contraseña', 400));
    }
    
    // Verificar si el usuario existe y la contraseña es correcta
    const user = await User.findOne({ email }).select('+password');
    
    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError('Email o contraseña incorrectos', 401));
    }
    
    // Si todo está bien, enviar token al cliente
    createSendToken(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// Middleware de protección de rutas
exports.protect = async (req, res, next) => {
  try {
    // Obtener token
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
    
    if (!token) {
      return next(
        new AppError('No has iniciado sesión. Por favor inicia sesión para obtener acceso.', 401)
      );
    }
    
    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Verificar si el usuario aún existe
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError('El usuario al que pertenece este token ya no existe.', 401)
      );
    }
    
    // Verificar si el usuario cambió la contraseña después de que se emitió el token
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(
        new AppError('El usuario cambió recientemente su contraseña. Por favor inicia sesión de nuevo.', 401)
      );
    }
    
    // Acceso concedido
    req.user = currentUser;
    res.locals.user = currentUser; // Para las plantillas
    next();
  } catch (error) {
    next(error);
  }
};

// Restricción de acceso por roles
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('No tienes permiso para realizar esta acción', 403)
      );
    }
    next();
  };
};
```

## Despliegue

### 1. Variables de Entorno

Usa un archivo `.env` para configuraciones:

```
NODE_ENV=development
PORT=3000
DATABASE=mongodb://localhost:27017/mi-base-de-datos
JWT_SECRET=mi-secreto-super-seguro
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90
```

Y carga las variables con `dotenv`:

```javascript
// En server.js (antes de importar app.js)
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

// Ahora puedes acceder a las variables
console.log(process.env.PORT);
```

### 2. Configuración para Producción

```javascript
// En app.js
if (process.env.NODE_ENV === 'production') {
  // Configuraciones específicas para producción
  app.use(express.static('client/build')); // Para aplicaciones React
  
  // Servir el frontend para cualquier ruta no reconocida
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
```

### 3. Manejo de Errores No Capturados

```javascript
// En server.js
process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Cerrando...');
  console.log(err.name, err.message);
  process.exit(1);
});

const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Cerrando...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECIBIDO. Cerrando el servidor graciosamente');
  server.close(() => {
    console.log('💥 Proceso terminado!');
  });
});
```

## Mejores Prácticas

1. **Estructura tu aplicación**: Usa un patrón MVC para organizar tu código.

2. **Centraliza la configuración**: Usa variables de entorno para configuraciones.

3. **Maneja los errores adecuadamente**: Implementa un sistema robusto de manejo de errores.

4. **Usa middleware para funcionalidades transversales**: Logging, autenticación, etc.

5. **Valida los datos de entrada**: Usa bibliotecas como Joi o express-validator.

6. **Implementa seguridad**: Usa helmet, rate limiting y otras medidas de seguridad.

7. **Optimiza el rendimiento**: Usa compresión, caché y otras técnicas de optimización.

8. **Documenta tu API**: Usa Swagger o similar para documentar tus endpoints.

9. **Escribe pruebas**: Implementa pruebas unitarias e integración.

10. **Monitorea tu aplicación**: Usa herramientas como PM2, New Relic o similar.

## Recursos Adicionales

- [Documentación oficial de Express](https://expressjs.com/)
- [Mejores prácticas de Express](https://expressjs.com/en/advanced/best-practice-performance.html)
- [Express en GitHub](https://github.com/expressjs/express)
- [Awesome Express](https://github.com/rajikaimal/awesome-express) - Lista de recursos
