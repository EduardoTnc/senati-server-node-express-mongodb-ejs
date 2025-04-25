# Guía de Implementación de EJS en Express.js

## ¿Qué es EJS?

EJS (Embedded JavaScript) es un motor de plantillas simple pero potente para Node.js. Te permite generar HTML con JavaScript plano, lo que facilita la creación de vistas dinámicas para aplicaciones web. EJS es particularmente útil cuando:

- Necesitas renderizar HTML dinámicamente en el servidor
- Prefieres mantener la sintaxis de JavaScript en tus plantillas
- Buscas un motor de plantillas con una curva de aprendizaje baja

## Instalación

Ya has instalado EJS con:

```bash
pnpm i ejs
```

## Configuración Básica en Express

### 1. Configurar Express para usar EJS

En tu archivo principal (`app.js`):

```javascript
const express = require('express');
const path = require('path');

const app = express();

// Configurar EJS como motor de plantillas
app.set('view engine', 'ejs');

// Establecer el directorio de vistas
app.set('views', path.join(__dirname, 'views'));
```

### 2. Crear la estructura de directorios

```
basic-server/
├── views/                  # Directorio para las plantillas EJS
│   ├── partials/           # Componentes reutilizables
│   │   ├── header.ejs
│   │   ├── footer.ejs
│   │   └── navbar.ejs
│   ├── pages/              # Páginas completas
│   │   ├── index.ejs
│   │   ├── users.ejs
│   │   └── user-detail.ejs
│   └── layouts/            # Layouts base
│       └── main.ejs
├── public/                 # Archivos estáticos
│   ├── css/
│   ├── js/
│   └── img/
└── app.js
```

### 3. Configurar archivos estáticos

```javascript
// Servir archivos estáticos desde el directorio 'public'
app.use(express.static(path.join(__dirname, 'public')));
```

## Sintaxis Básica de EJS

### 1. Etiquetas EJS

- `<%= ... %>`: Muestra el valor (con escape HTML)
- `<%- ... %>`: Muestra el valor sin escape (útil para incluir HTML)
- `<% ... %>`: Ejecuta código JavaScript sin mostrar nada
- `<%# ... %>`: Comentario (no se ejecuta ni se muestra)
- `<%_ ... %>`: Elimina espacios en blanco antes de la etiqueta
- `... _%>`: Elimina espacios en blanco después de la etiqueta

### 2. Ejemplo de una plantilla básica

```ejs
<!DOCTYPE html>
<html>
<head>
    <title><%= title %></title>
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
    <header>
        <h1><%= title %></h1>
    </header>
    
    <main>
        <% if (users.length > 0) { %>
            <ul>
                <% users.forEach(function(user) { %>
                    <li><%= user.name %> - <%= user.email %></li>
                <% }); %>
            </ul>
        <% } else { %>
            <p>No hay usuarios disponibles.</p>
        <% } %>
    </main>
    
    <footer>
        <p>&copy; <%= new Date().getFullYear() %> Mi Aplicación</p>
    </footer>
</body>
</html>
```

## Renderizando Vistas en Express

### 1. Renderizar una vista simple

```javascript
app.get('/', (req, res) => {
    res.render('pages/index', {
        title: 'Página de Inicio',
        message: '¡Bienvenido a mi aplicación!'
    });
});
```

### 2. Renderizar una lista de datos

```javascript
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.render('pages/users', {
            title: 'Lista de Usuarios',
            users: users
        });
    } catch (error) {
        res.status(500).render('pages/error', {
            title: 'Error',
            message: error.message
        });
    }
});
```

### 3. Renderizar detalles de un elemento

```javascript
app.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).render('pages/error', {
                title: 'Usuario no encontrado',
                message: 'El usuario solicitado no existe'
            });
        }
        
        res.render('pages/user-detail', {
            title: `Perfil de ${user.name}`,
            user: user
        });
    } catch (error) {
        res.status(500).render('pages/error', {
            title: 'Error',
            message: error.message
        });
    }
});
```

## Características Avanzadas

### 1. Incluir Parciales (Componentes Reutilizables)

En `views/partials/header.ejs`:
```ejs
<header>
    <h1><%= title %></h1>
    <nav>
        <a href="/">Inicio</a>
        <a href="/users">Usuarios</a>
    </nav>
</header>
```

En tu página principal:
```ejs
<!DOCTYPE html>
<html>
<head>
    <title><%= title %></title>
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
    <%- include('../partials/header') %>
    
    <main>
        <h2><%= message %></h2>
    </main>
    
    <%- include('../partials/footer') %>
</body>
</html>
```

### 2. Layouts (Plantillas Base)

Para implementar layouts, puedes usar `ejs-mate` o crear tu propio sistema:

```bash
pnpm add ejs-mate
```

En `app.js`:
```javascript
const ejsMate = require('ejs-mate');

// Usar ejs-mate como motor
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
```

En `views/layouts/main.ejs`:
```ejs
<!DOCTYPE html>
<html>
<head>
    <title><%= title %></title>
    <link rel="stylesheet" href="/css/style.css">
    <%- block('head').toString() %>
</head>
<body>
    <%- include('../partials/header') %>
    
    <main>
        <%- body %>
    </main>
    
    <%- include('../partials/footer') %>
    
    <script src="/js/main.js"></script>
    <%- block('scripts').toString() %>
</body>
</html>
```

En `views/pages/index.ejs`:
```ejs
<% layout('layouts/main') %>

<% block('head').append('<link rel="stylesheet" href="/css/home.css">') %>

<div class="welcome">
    <h2><%= message %></h2>
    <p>Esta es la página de inicio.</p>
</div>

<% block('scripts').append('<script src="/js/home.js"></script>') %>
```

### 3. Funciones Personalizadas

Puedes añadir funciones personalizadas a todas tus vistas:

```javascript
// En app.js
app.locals.formatDate = function(date) {
    return new Date(date).toLocaleDateString('es-ES');
};

app.locals.truncate = function(str, len) {
    return str.length > len ? str.substring(0, len) + '...' : str;
};
```

Uso en plantillas:
```ejs
<p>Fecha: <%= formatDate(user.createdAt) %></p>
<p><%= truncate(user.bio, 100) %></p>
```

## Ejemplo Completo para tu Proyecto

### 1. Actualizar app.js

```javascript
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const connectDB = require('./config/database');
const userRouter = require('./routers/userRouters');
const userLogin = require('./middlewares/userLogin');

const app = express();

// Configurar EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Middleware de login global
app.use(userLogin);

// Conectar a MongoDB
connectDB();

// Rutas API
app.use('/api/users', userRouter);

// Rutas de vistas
app.get('/', (req, res) => {
    res.render('pages/index', {
        title: 'Inicio',
        message: 'Bienvenido a nuestro servidor Express con EJS'
    });
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.render('pages/users', {
            title: 'Usuarios',
            users: users
        });
    } catch (error) {
        res.status(500).render('pages/error', {
            title: 'Error',
            message: error.message
        });
    }
});

// Manejo de 404
app.all('*', (req, res) => {
    res.status(404).render('pages/error', {
        title: 'Página no encontrada',
        message: `No se encontró la ruta ${req.originalUrl}`
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
```

### 2. Crear Estructura de Directorios y Archivos Básicos

```bash
mkdir -p views/pages views/partials views/layouts public/css public/js
```

#### views/layouts/main.ejs
```ejs
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= title %> - Mi Aplicación</title>
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
    <%- include('../partials/header') %>
    
    <div class="container">
        <%- body %>
    </div>
    
    <%- include('../partials/footer') %>
    
    <script src="/js/main.js"></script>
</body>
</html>
```

#### views/partials/header.ejs
```ejs
<header>
    <nav>
        <div class="logo">
            <h1>Mi Aplicación</h1>
        </div>
        <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/users">Usuarios</a></li>
        </ul>
    </nav>
</header>
```

#### views/partials/footer.ejs
```ejs
<footer>
    <p>&copy; <%= new Date().getFullYear() %> Mi Aplicación - Todos los derechos reservados</p>
</footer>
```

#### views/pages/index.ejs
```ejs
<div class="welcome">
    <h2><%= message %></h2>
    <p>Esta es una aplicación de ejemplo que utiliza Express y EJS.</p>
    <a href="/users" class="btn">Ver Usuarios</a>
</div>
```

#### views/pages/users.ejs
```ejs
<h2>Lista de Usuarios</h2>

<% if (users && users.length > 0) { %>
    <div class="user-list">
        <% users.forEach(function(user) { %>
            <div class="user-card">
                <h3><%= user.name %></h3>
                <p>Email: <%= user.email %></p>
                <p>Rol: <%= user.role %></p>
                <a href="/users/<%= user._id %>" class="btn">Ver Detalles</a>
            </div>
        <% }); %>
    </div>
<% } else { %>
    <p>No hay usuarios disponibles.</p>
    <a href="/users/new" class="btn">Crear Usuario</a>
<% } %>
```

#### views/pages/error.ejs
```ejs
<div class="error-container">
    <h2>Error: <%= title %></h2>
    <p><%= message %></p>
    <a href="/" class="btn">Volver al Inicio</a>
</div>
```

#### public/css/style.css
```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f4f4f4;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

header {
    background-color: #333;
    color: #fff;
    padding: 1rem 0;
}

header nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

header ul {
    display: flex;
    list-style: none;
}

header ul li {
    margin-left: 20px;
}

header a {
    color: #fff;
    text-decoration: none;
}

.welcome {
    text-align: center;
    margin: 50px 0;
}

.btn {
    display: inline-block;
    background: #333;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    text-decoration: none;
    margin-top: 15px;
}

.user-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.user-card {
    background: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

footer {
    text-align: center;
    padding: 20px;
    margin-top: 50px;
    background: #333;
    color: #fff;
}

.error-container {
    text-align: center;
    margin: 50px auto;
    max-width: 600px;
}
```

## Mejores Prácticas

1. **Organiza tus vistas**: Usa una estructura clara de directorios (layouts, partials, pages).

2. **Evita lógica compleja en las plantillas**: Mantén tus plantillas simples y mueve la lógica compleja a controladores o helpers.

3. **Usa parciales para código reutilizable**: Componentes como headers, footers y sidebars deben ser parciales.

4. **Maneja los errores adecuadamente**: Crea plantillas específicas para diferentes tipos de errores.

5. **Implementa un sistema de layouts**: Usa ejs-mate o crea tu propio sistema para evitar duplicación de código.

6. **Separa la API del frontend**: Considera tener rutas separadas para tu API y tus vistas.

7. **Optimiza el rendimiento**: Usa caché cuando sea posible y minimiza el procesamiento en plantillas.

## Recursos Adicionales

- [Documentación oficial de EJS](https://ejs.co/)
- [EJS en GitHub](https://github.com/mde/ejs)
- [ejs-mate para layouts](https://github.com/JacksonTian/ejs-mate)
- [Express.js + EJS](https://expressjs.com/en/guide/using-template-engines.html)
