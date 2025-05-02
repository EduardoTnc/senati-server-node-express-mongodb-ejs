# Servidor Node.js + Express.js con MongoDB y EJS

Este proyecto es un servidor completo desarrollado con Node.js, Express.js, MongoDB y EJS, ideal para aprender los fundamentos del desarrollo backend con JavaScript y la creación de aplicaciones web fullstack.

## Características

- Servidor Express con arquitectura MVC
- Base de datos MongoDB
- Motor de plantillas EJS para vistas
- Middleware de autenticación
- Logging con Morgan
- APIs RESTful para usuarios, clientes, productos, pedidos y repartidores
- Interfaz web con estilos CSS
- Scripts para desarrollo y producción

## Requisitos

- [Node.js](https://nodejs.org/) (v14 o superior recomendado)
- [MongoDB](https://www.mongodb.com/try/download/community) (instalado y ejecutándose)
- [pnpm](https://pnpm.io/) (recomendado) o [npm](https://www.npmjs.com/)

## Instalación

Clona el repositorio y navega a la carpeta del proyecto:

```bash
git clone <url-del-repositorio>
cd nodejs-expressjs-servers/basic-server
```

Instala las dependencias:

```bash
pnpm install
# o
npm install
```

## Uso

Para iniciar el servidor en modo desarrollo (con recarga automática usando nodemon):

```bash
pnpm run dev
# o
npm run dev
```

Para iniciar el servidor en modo producción:

```bash
pnpm start
# o
npm start
```

El servidor estará disponible en `http://localhost:3000` por defecto.

## Estructura del Proyecto

```
basic-server/
├── app.js                      # Punto de entrada principal
├── config/
│   └── database.js             # Configuración de MongoDB
├── controllers/
│   ├── userController.js       # Controlador de usuarios
│   ├── clienteController.js    # Controlador de clientes
│   ├── productoController.js   # Controlador de productos
│   ├── pedidoController.js     # Controlador de pedidos
│   └── repartidorController.js # Controlador de repartidores
├── middlewares/
│   └── userLogin.js            # Middleware de autenticación
├── models/
│   ├── userModel.js            # Modelo de usuarios
│   ├── clienteModel.js         # Modelo de clientes
│   ├── productoModel.js        # Modelo de productos
│   ├── pedidoModel.js          # Modelo de pedidos
│   └── repartidorModel.js      # Modelo de repartidores
├── routers/
│   ├── userRouters.js          # Rutas de usuarios
│   ├── clienteRouters.js       # Rutas de clientes
│   ├── productoRouters.js      # Rutas de productos
│   ├── pedidoRouters.js        # Rutas de pedidos
│   └── repartidorRouters.js    # Rutas de repartidores
├── services/                    # Capa de servicios
│   ├── UserService.js          # Servicio de usuarios
│   ├── ClienteService.js       # Servicio de clientes
│   ├── ProductoService.js      # Servicio de productos
│   ├── PedidoService.js        # Servicio de pedidos
│   └── RepartidorService.js    # Servicio de repartidores
├── view/                       # Vistas EJS
│   ├── index.ejs               # Página principal
│   └── pages/                  # Páginas específicas
│       ├── error.ejs           # Página de error
│       ├── user.ejs            # Detalle de usuario
│       └── users.ejs           # Lista de usuarios
├── package.json                # Dependencias y scripts
├── README.md                   # Documentación principal
├── README_EJS.md               # Guía de EJS
├── README_EXPRESS.md           # Guía de Express.js
├── README_MONGOOSE.md          # Guía de Mongoose
└── README_MORGAN.md            # Guía de Morgan
```

## Rutas Disponibles

### Interfaz Web

- `/` - Página principal
- `/pages/users` - Lista de usuarios

### API REST de Usuarios

- `GET /users` - Obtener todos los usuarios
- `GET /users/:id` - Obtener un usuario específico
- `POST /users` - Crear un nuevo usuario
- `PUT /users/:id` - Actualizar un usuario existente
- `DELETE /users/:id` - Eliminar un usuario

### API REST de Clientes

- `GET /api/clientes` - Obtener todos los clientes
- `GET /api/clientes/:id` - Obtener un cliente específico
- `POST /api/clientes` - Crear un nuevo cliente
- `PUT /api/clientes/:id` - Actualizar un cliente existente
- `DELETE /api/clientes/:id` - Eliminar un cliente
- `POST /api/clientes/:id/direcciones` - Agregar dirección a un cliente
- `PUT /api/clientes/:id/direcciones/:direccionId` - Actualizar dirección de un cliente
- `DELETE /api/clientes/:id/direcciones/:direccionId` - Eliminar dirección de un cliente

### API REST de Productos

- `GET /api/productos` - Obtener todos los productos
- `GET /api/productos/:id` - Obtener un producto específico
- `POST /api/productos` - Crear un nuevo producto
- `PUT /api/productos/:id` - Actualizar un producto existente
- `DELETE /api/productos/:id` - Eliminar un producto
- `GET /api/productos/categoria/:categoria` - Obtener productos por categoría
- `PATCH /api/productos/:id/disponibilidad` - Cambiar disponibilidad de un producto
- `PATCH /api/productos/:id/destacado` - Cambiar estado destacado de un producto

### API REST de Pedidos

- `GET /api/pedidos` - Obtener todos los pedidos
- `GET /api/pedidos/:id` - Obtener un pedido específico
- `POST /api/pedidos` - Crear un nuevo pedido
- `PUT /api/pedidos/:id` - Actualizar un pedido existente
- `GET /api/pedidos/cliente/:clienteId` - Obtener pedidos de un cliente
- `GET /api/pedidos/repartidor/:repartidorId` - Obtener pedidos de un repartidor
- `GET /api/pedidos/estado/:estado` - Obtener pedidos por estado
- `PATCH /api/pedidos/:id/estado` - Actualizar estado de un pedido
- `PATCH /api/pedidos/:id/repartidor` - Asignar repartidor a un pedido
- `PATCH /api/pedidos/:id/calificacion` - Calificar un pedido
- `PATCH /api/pedidos/:id/cancelar` - Cancelar un pedido

### API REST de Repartidores

- `GET /api/repartidores` - Obtener todos los repartidores
- `GET /api/repartidores/:id` - Obtener un repartidor específico
- `POST /api/repartidores` - Crear un nuevo repartidor
- `PUT /api/repartidores/:id` - Actualizar un repartidor existente
- `DELETE /api/repartidores/:id` - Eliminar un repartidor
- `GET /api/repartidores/disponibles` - Obtener repartidores disponibles
- `PATCH /api/repartidores/:id/disponibilidad` - Actualizar disponibilidad de un repartidor
- `PATCH /api/repartidores/:id/ubicacion` - Actualizar ubicación de un repartidor
- `PATCH /api/repartidores/:id/zonas` - Actualizar zonas de cobertura de un repartidor
- `GET /api/repartidores/:id/estadisticas` - Obtener estadísticas de un repartidor

## Documentación de APIs

A continuación se detallan ejemplos de uso para cada una de las APIs disponibles en el sistema.

### Usuarios

#### Obtener todos los usuarios

```http
GET /users
```

Respuesta:

```json
[
  {
    "_id": "60d21b4667d0d8992e610c85",
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "rol": "admin",
    "createdAt": "2023-05-01T15:30:45.123Z",
    "updatedAt": "2023-05-01T15:30:45.123Z"
  },
  {
    "_id": "60d21b4667d0d8992e610c86",
    "nombre": "María López",
    "email": "maria@example.com",
    "rol": "usuario",
    "createdAt": "2023-05-01T16:20:10.456Z",
    "updatedAt": "2023-05-01T16:20:10.456Z"
  }
]
```

#### Crear un nuevo usuario

```http
POST /users
Content-Type: application/json

{
  "nombre": "Pedro González",
  "email": "pedro@example.com",
  "password": "contraseña123",
  "rol": "usuario"
}
```

Respuesta:

```json
{
  "_id": "60d21b4667d0d8992e610c87",
  "nombre": "Pedro González",
  "email": "pedro@example.com",
  "rol": "usuario",
  "createdAt": "2023-05-02T10:15:30.789Z",
  "updatedAt": "2023-05-02T10:15:30.789Z"
}
```

### Clientes

#### Obtener todos los clientes

```http
GET /api/clientes
```

Respuesta:

```json
[
  {
    "_id": "60d21b4667d0d8992e610c88",
    "nombre": "Ana Martínez",
    "email": "ana@example.com",
    "telefono": "123456789",
    "direcciones": [
      {
        "_id": "60d21b4667d0d8992e610c89",
        "calle": "Av. Principal 123",
        "ciudad": "Lima",
        "codigoPostal": "15001",
        "principal": true
      }
    ],
    "createdAt": "2023-05-03T09:45:20.123Z",
    "updatedAt": "2023-05-03T09:45:20.123Z"
  }
]
```

#### Agregar dirección a un cliente

```http
POST /api/clientes/60d21b4667d0d8992e610c88/direcciones
Content-Type: application/json

{
  "calle": "Calle Secundaria 456",
  "ciudad": "Lima",
  "codigoPostal": "15002",
  "principal": false
}
```

Respuesta:

```json
{
  "_id": "60d21b4667d0d8992e610c88",
  "nombre": "Ana Martínez",
  "email": "ana@example.com",
  "telefono": "123456789",
  "direcciones": [
    {
      "_id": "60d21b4667d0d8992e610c89",
      "calle": "Av. Principal 123",
      "ciudad": "Lima",
      "codigoPostal": "15001",
      "principal": true
    },
    {
      "_id": "60d21b4667d0d8992e610c90",
      "calle": "Calle Secundaria 456",
      "ciudad": "Lima",
      "codigoPostal": "15002",
      "principal": false
    }
  ],
  "createdAt": "2023-05-03T09:45:20.123Z",
  "updatedAt": "2023-05-03T10:30:15.456Z"
}
```

### Productos

#### Obtener productos por categoría

```http
GET /api/productos/categoria/bebidas
```

Respuesta:

```json
[
  {
    "_id": "60d21b4667d0d8992e610c91",
    "nombre": "Agua Mineral",
    "descripcion": "Agua mineral natural sin gas",
    "precio": 2.5,
    "categoria": "bebidas",
    "disponible": true,
    "destacado": false,
    "createdAt": "2023-05-04T11:20:30.123Z",
    "updatedAt": "2023-05-04T11:20:30.123Z"
  },
  {
    "_id": "60d21b4667d0d8992e610c92",
    "nombre": "Refresco de Cola",
    "descripcion": "Refresco carbonatado sabor cola",
    "precio": 3.0,
    "categoria": "bebidas",
    "disponible": true,
    "destacado": true,
    "createdAt": "2023-05-04T11:25:45.456Z",
    "updatedAt": "2023-05-04T11:25:45.456Z"
  }
]
```

#### Cambiar disponibilidad de un producto

```http
PATCH /api/productos/60d21b4667d0d8992e610c91/disponibilidad
Content-Type: application/json

{
  "disponible": false
}
```

Respuesta:

```json
{
  "_id": "60d21b4667d0d8992e610c91",
  "nombre": "Agua Mineral",
  "descripcion": "Agua mineral natural sin gas",
  "precio": 2.5,
  "categoria": "bebidas",
  "disponible": false,
  "destacado": false,
  "createdAt": "2023-05-04T11:20:30.123Z",
  "updatedAt": "2023-05-04T12:15:10.789Z"
}
```

### Pedidos

#### Crear un nuevo pedido

```http
POST /api/pedidos
Content-Type: application/json

{
  "cliente": "60d21b4667d0d8992e610c88",
  "direccionEntrega": "60d21b4667d0d8992e610c89",
  "productos": [
    {
      "producto": "60d21b4667d0d8992e610c92",
      "cantidad": 2
    },
    {
      "producto": "60d21b4667d0d8992e610c91",
      "cantidad": 1
    }
  ],
  "metodoPago": "tarjeta"
}
```

Respuesta:

```json
{
  "_id": "60d21b4667d0d8992e610c93",
  "cliente": "60d21b4667d0d8992e610c88",
  "direccionEntrega": {
    "calle": "Av. Principal 123",
    "ciudad": "Lima",
    "codigoPostal": "15001"
  },
  "productos": [
    {
      "producto": {
        "_id": "60d21b4667d0d8992e610c92",
        "nombre": "Refresco de Cola",
        "precio": 3.0
      },
      "cantidad": 2,
      "subtotal": 6.0
    },
    {
      "producto": {
        "_id": "60d21b4667d0d8992e610c91",
        "nombre": "Agua Mineral",
        "precio": 2.5
      },
      "cantidad": 1,
      "subtotal": 2.5
    }
  ],
  "total": 8.5,
  "estado": "pendiente",
  "metodoPago": "tarjeta",
  "createdAt": "2023-05-05T14:30:20.123Z",
  "updatedAt": "2023-05-05T14:30:20.123Z"
}
```

#### Actualizar estado de un pedido

```http
PATCH /api/pedidos/60d21b4667d0d8992e610c93/estado
Content-Type: application/json

{
  "estado": "en_proceso"
}
```

Respuesta:

```json
{
  "_id": "60d21b4667d0d8992e610c93",
  "estado": "en_proceso",
  "updatedAt": "2023-05-05T15:10:45.456Z"
}
```

### Repartidores

#### Obtener repartidores disponibles

```http
GET /api/repartidores/disponibles
```

Respuesta:

```json
[
  {
    "_id": "60d21b4667d0d8992e610c94",
    "nombre": "Carlos Rodríguez",
    "email": "carlos@example.com",
    "telefono": "987654321",
    "disponible": true,
    "zonas": ["Lima Norte", "Lima Centro"],
    "ubicacion": {
      "latitud": -12.0464,
      "longitud": -77.0428
    },
    "createdAt": "2023-05-06T09:15:30.123Z",
    "updatedAt": "2023-05-06T09:15:30.123Z"
  }
]
```

#### Actualizar ubicación de un repartidor

```http
PATCH /api/repartidores/60d21b4667d0d8992e610c94/ubicacion
Content-Type: application/json

{
  "latitud": -12.0500,
  "longitud": -77.0450
}
```

Respuesta:

```json
{
  "_id": "60d21b4667d0d8992e610c94",
  "ubicacion": {
    "latitud": -12.0500,
    "longitud": -77.0450
  },
  "updatedAt": "2023-05-06T10:20:15.456Z"
}
```

## Tecnologías Utilizadas

- **Express.js**: Framework web para Node.js
- **MongoDB**: Base de datos NoSQL
- **Mongoose**: ODM para MongoDB
- **EJS**: Motor de plantillas para generar HTML
- **Morgan**: Middleware de logging HTTP
- **Nodemon**: Herramienta de desarrollo para recarga automática

## Guía General del Proyecto

Este proyecto implementa una aplicación web completa utilizando el stack MEEN (MongoDB, Express.js, EJS, Node.js), siguiendo una arquitectura MVC (Modelo-Vista-Controlador) para mantener el código organizado y escalable.

### Componentes Principales

1. **Modelos (Models)**: Utilizan Mongoose para definir esquemas y modelos que representan los datos en MongoDB. El proyecto incluye un modelo de usuario con validaciones y estructura definida.

2. **Vistas (Views)**: Implementadas con EJS, permiten renderizar HTML dinámicamente en el servidor. Las plantillas están organizadas en carpetas para mantener una estructura clara.

3. **Controladores (Controllers)**: Manejan la lógica de negocio, procesando las solicitudes HTTP y generando respuestas adecuadas. Siguen principios RESTful para las operaciones CRUD.

4. **Rutas (Routes)**: Definen los endpoints de la API y las rutas web, conectando las URL con los controladores correspondientes.

5. **Middleware**: Funciones que procesan las solicitudes antes de llegar a los controladores. Incluye autenticación, logging, y parseo de datos.

6. **Configuración**: Archivos para configurar la conexión a la base de datos y otros aspectos del servidor.

### Flujo de la Aplicación

1. Las solicitudes HTTP llegan al servidor Express.
2. Pasan por middleware como Morgan para logging y autenticación.
3. Se dirigen a las rutas correspondientes.
4. Los controladores procesan la solicitud, interactuando con los modelos si es necesario.
5. Se genera una respuesta, ya sea JSON para la API o HTML renderizado con EJS para la interfaz web.
6. La respuesta se envía al cliente.

## Configuración de MongoDB

Este proyecto utiliza MongoDB como base de datos. A continuación se detalla cómo configurar la conexión:

### 1. Configuración Básica

La configuración de la base de datos se encuentra en el archivo `config.js` en la raíz del proyecto:

```javascript
module.exports = {
    db: {
        host: 'localhost',  // Host de MongoDB
        port: 27017,        // Puerto estándar de MongoDB
        name: 'test-database' // Nombre de la base de datos
    }
}
```

### 2. Conexión a MongoDB

La conexión a MongoDB se gestiona en el archivo `config/database.js` utilizando Mongoose:

```javascript
const mongoose = require('mongoose');
const { db } = require('../config');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`mongodb://${db.host}:${db.port}/${db.name}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB conectada: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error al conectar a MongoDB: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
```

### 3. Uso en el Proyecto

Para utilizar MongoDB en tu propio proyecto:

1. Asegúrate de tener MongoDB instalado y ejecutándose en tu sistema
2. Modifica el archivo `config.js` con los datos de tu base de datos
3. La conexión se establece automáticamente al iniciar el servidor

## Documentación Adicional

Este proyecto incluye documentación detallada sobre componentes específicos:

- [Guía de Express.js](./README_EXPRESS.md): Implementación y uso del framework Express.js
- [Guía de Mongoose](./README_MONGOOSE.md): Trabajo con MongoDB usando Mongoose ODM
- [Guía de EJS](./README_EJS.md): Implementación y uso del motor de plantillas EJS
- [Guía de Morgan](./README_MORGAN.md): Configuración y uso del middleware de logging Morgan

## Licencia

MIT
