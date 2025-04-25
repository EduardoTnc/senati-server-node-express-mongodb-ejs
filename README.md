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
├── README_EXPRESS.md           # Guía de Express.js
├── README_MONGOOSE.md          # Guía de Mongoose
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

## Próximos Pasos para una Aplicación en Producción

### 1. Mejoras de Seguridad

- **Implementar autenticación robusta**: Utilizar JWT (JSON Web Tokens) o sesiones para una autenticación completa.
- **Añadir HTTPS**: Configurar certificados SSL para conexiones seguras.
- **Implementar middleware de seguridad**: Usar Helmet para establecer cabeceras HTTP seguras.
- **Validación de datos**: Implementar Joi o express-validator para validar entradas.
- **Protección contra ataques comunes**: Configurar rate limiting, CORS, y protección contra CSRF.

### 2. Optimización de Rendimiento

- **Implementar caché**: Utilizar Redis para cachear respuestas frecuentes.
- **Compresión**: Añadir compresión gzip/brotli para reducir el tamaño de las respuestas.
- **Optimización de consultas**: Mejorar las consultas a MongoDB con índices adecuados.
- **Servir archivos estáticos eficientemente**: Configurar CDN para archivos estáticos.
- **Implementar lazy loading**: Para componentes pesados en el frontend.

### 3. Escalabilidad

- **Arquitectura de microservicios**: Dividir la aplicación en servicios independientes.
- **Balanceo de carga**: Implementar múltiples instancias con un balanceador de carga.
- **Contenedorización**: Utilizar Docker y Kubernetes para despliegue y escalado.
- **Base de datos distribuida**: Configurar sharding y replicación en MongoDB.
- **Implementar colas de mensajes**: Usar RabbitMQ o Kafka para operaciones asíncronas.

### 4. Monitoreo y Logging

- **Sistema de logging avanzado**: Implementar Winston o Bunyan con rotación de logs.
- **Monitoreo en tiempo real**: Integrar herramientas como New Relic, Datadog o Prometheus.
- **Alertas**: Configurar alertas para eventos críticos.
- **Análisis de rendimiento**: Implementar APM (Application Performance Monitoring).
- **Dashboards**: Crear dashboards con Grafana para visualizar métricas.

### 5. Mejoras en el Desarrollo

- **Testing automatizado**: Implementar pruebas unitarias, de integración y end-to-end.
- **CI/CD**: Configurar pipelines de integración y despliegue continuo.
- **Documentación de API**: Implementar Swagger o similar para documentar endpoints.
- **Versionado de API**: Añadir versionado para cambios no retrocompatibles.
- **Migraciones de base de datos**: Implementar sistema de migraciones para cambios en esquemas.

### 6. Funcionalidades Adicionales

- **Sistema de usuarios completo**: Registro, login, recuperación de contraseña, perfiles.
- **Subida de archivos**: Implementar almacenamiento de archivos con AWS S3 o similar.
- **Notificaciones**: Añadir sistema de notificaciones por email, SMS o push.
- **Búsqueda avanzada**: Implementar Elasticsearch para búsquedas eficientes.
- **Internacionalización**: Soporte para múltiples idiomas.
- **Pagos**: Integración con pasarelas de pago como Stripe o PayPal.
- **Analíticas**: Implementar seguimiento de eventos y analíticas.

### 7. Ejemplos de Aplicaciones Reales que podrías construir

1. **E-commerce**:
   - Catálogo de productos con categorías y búsqueda
   - Carrito de compras y proceso de checkout
   - Sistema de pagos y gestión de pedidos
   - Panel de administración para gestionar productos e inventario

2. **Red Social**:
   - Perfiles de usuario con autenticación
   - Publicaciones y comentarios
   - Sistema de seguimiento y notificaciones
   - Mensajería privada entre usuarios

3. **Plataforma de Contenido**:
   - Sistema de blogs o artículos
   - Comentarios y valoraciones
   - Categorización y etiquetado
   - Panel de administración para gestionar contenido

4. **Aplicación de Gestión**:
   - Dashboard con métricas y gráficos
   - CRUD completo para entidades de negocio
   - Generación de informes y exportación de datos
   - Control de acceso basado en roles

## Documentación Adicional

Este proyecto incluye documentación detallada sobre componentes específicos:

- [Guía de Express.js](./README_EXPRESS.md): Implementación y uso del framework Express.js
- [Guía de Mongoose](./README_MONGOOSE.md): Trabajo con MongoDB usando Mongoose ODM
- [Guía de EJS](./README_EJS.md): Implementación y uso del motor de plantillas EJS
- [Guía de Morgan](./README_MORGAN.md): Configuración y uso del middleware de logging Morgan

## Licencia

MIT
