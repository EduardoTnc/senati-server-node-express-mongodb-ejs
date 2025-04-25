# Guía de Implementación de Morgan en Express.js

## ¿Qué es Morgan?

Morgan es un middleware de registro (logging) HTTP para Node.js. Es especialmente útil en aplicaciones Express para registrar detalles sobre las solicitudes HTTP que recibe tu servidor, como:

- Método HTTP (GET, POST, PUT, DELETE, etc.)
- URL solicitada
- Código de estado HTTP de la respuesta
- Tiempo de respuesta
- Tamaño de la respuesta en bytes

## Instalación

Para instalar Morgan en tu proyecto, ejecuta:

```bash
# Con npm
npm install morgan

# Con pnpm
pnpm add morgan
```

## Configuración Básica

### 1. Importar Morgan

En tu archivo principal (`app.js`):

```javascript
const express = require('express');
const morgan = require('morgan');

const app = express();

// Configurar Morgan
app.use(morgan('dev'));

// Resto de tu código...
```

### 2. Formatos Predefinidos

Morgan viene con varios formatos predefinidos:

- **dev**: Colorea la salida por estado de respuesta, útil durante el desarrollo.
  ```
  :method :url :status :response-time ms
  ```

- **combined**: Formato estándar de Apache combinado.
  ```
  :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"
  ```

- **common**: Formato común de Apache.
  ```
  :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]
  ```

- **short**: Más corto que el común, incluye tiempo de respuesta.
  ```
  :remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms
  ```

- **tiny**: La versión más mínima.
  ```
  :method :url :status :res[content-length] - :response-time ms
  ```

## Configuración Avanzada

### 1. Formato Personalizado

Puedes crear tu propio formato:

```javascript
app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :date[iso]'));
```

### 2. Guardar Logs en Archivo

Para guardar los logs en un archivo en lugar de mostrarlos en la consola:

```javascript
const fs = require('fs');
const path = require('path');

// Crear un stream de escritura
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'logs', 'access.log'),
  { flags: 'a' }
);

// Configurar Morgan para escribir en el archivo
app.use(morgan('combined', { stream: accessLogStream }));
```

### 3. Logs Condicionales

Para registrar solo ciertas solicitudes:

```javascript
// Solo registrar errores (códigos 4xx y 5xx)
app.use(morgan('dev', {
  skip: function (req, res) { return res.statusCode < 400 }
}));
```

### 4. Rotación de Logs

Para manejar la rotación de archivos de log (útil en producción), puedes usar `rotating-file-stream`:

```bash
pnpm add rotating-file-stream
```

```javascript
const rfs = require('rotating-file-stream');

// Crear un stream rotativo
const accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // Rotar diariamente
  path: path.join(__dirname, 'logs')
});

app.use(morgan('combined', { stream: accessLogStream }));
```

## Integración con Winston

Si ya estás usando Winston para logging, puedes integrar Morgan:

```javascript
const winston = require('winston');
const logger = winston.createLogger({
  // Configuración de Winston...
});

app.use(morgan('combined', {
  stream: {
    write: message => logger.info(message.trim())
  }
}));
```

## Ejemplo Completo para tu Proyecto

Aquí tienes un ejemplo completo para integrar Morgan en tu servidor actual:

```javascript
// En app.js
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

// Importamos la configuración de la base de datos
const connectDB = require('./config/database');

// Creamos una instancia de la aplicación Express
const app = express();

// Aseguramos que existe el directorio de logs
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Configuramos Morgan para desarrollo (consola)
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Configuramos Morgan para producción (archivo)
const accessLogStream = fs.createWriteStream(
  path.join(logsDir, 'access.log'),
  { flags: 'a' }
);
app.use(morgan('combined', { stream: accessLogStream }));

// Conectamos a la base de datos MongoDB
connectDB();

// Resto de tu código...
```

## Mejores Prácticas

1. **Usa diferentes formatos según el entorno**:
   - `dev` para desarrollo (colorido y conciso)
   - `combined` para producción (detallado)

2. **Guarda logs en archivos en producción** para análisis posterior y depuración.

3. **Implementa rotación de logs** para evitar archivos demasiado grandes.

4. **Combina con otros sistemas de logging** como Winston para una solución más completa.

5. **Considera la privacidad y seguridad** de los datos registrados (evita registrar información sensible).

## Recursos Adicionales

- [Documentación oficial de Morgan](https://github.com/expressjs/morgan)
- [Documentación de Express.js](https://expressjs.com/en/resources/middleware/morgan.html)
- [Rotating File Stream](https://github.com/iccicci/rotating-file-stream)
