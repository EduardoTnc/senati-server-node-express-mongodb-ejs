# Servidor Node.js + Express.js con MongoDB y EJS

Este proyecto es un servidor completo desarrollado con Node.js, Express.js, MongoDB y EJS, ideal para aprender los fundamentos del desarrollo backend con JavaScript y la creación de aplicaciones web fullstack.

## Características

- Servidor Express con arquitectura MVC
- Base de datos MongoDB
- Motor de plantillas EJS para vistas
- Middleware de autenticación
- Logging con Morgan
- API RESTful para usuarios
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
│   └── userController.js       # Controladores para usuarios
├── middlewares/
│   └── userLogin.js            # Middleware de autenticación
├── models/
│   └── userModel.js            # Modelos de datos (MongoDB/Mongoose)
├── routers/
│   └── userRouters.js          # Rutas de la API
├── view/                       # Vistas EJS
│   ├── index.ejs               # Página principal
│   └── pages/                  # Páginas específicas
│       ├── error.ejs           # Página de error
│       ├── user.ejs            # Detalle de usuario
│       └── users.ejs           # Lista de usuarios
├── package.json                # Dependencias y scripts
├── README.md                   # Documentación principal
├── README_EJS.md               # Guía de EJS
└── README_MORGAN.md            # Guía de Morgan
```

## Rutas Disponibles

### API REST

- `GET /users` - Obtener todos los usuarios
- `GET /users/:id` - Obtener un usuario específico
- `POST /users` - Crear un nuevo usuario
- `PUT /users/:id` - Actualizar un usuario existente
- `DELETE /users/:id` - Eliminar un usuario

### Interfaz Web

- `/` - Página principal
- `/pages/users` - Lista de usuarios
- `/users/:id` - Detalle de un usuario

## Tecnologías Utilizadas

- **Express.js**: Framework web para Node.js
- **MongoDB**: Base de datos NoSQL
- **Mongoose**: ODM para MongoDB
- **EJS**: Motor de plantillas para generar HTML
- **Morgan**: Middleware de logging HTTP
- **Nodemon**: Herramienta de desarrollo para recarga automática

## Documentación Adicional

Este proyecto incluye documentación detallada sobre componentes específicos:

- [Guía de EJS](./README_EJS.md): Implementación y uso del motor de plantillas EJS
- [Guía de Morgan](./README_MORGAN.md): Configuración y uso del middleware de logging Morgan

## Contribuir

1. Haz un fork del proyecto
2. Crea una rama para tu función (`git checkout -b feature/nueva-funcion`)
3. Haz commit de tus cambios (`git commit -m 'Añadir nueva función'`)
4. Haz push a la rama (`git push origin feature/nueva-funcion`)
5. Abre un Pull Request

## Licencia

MIT
