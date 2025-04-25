# Guía de Implementación de Mongoose en Express.js

## ¿Qué es Mongoose?

Mongoose es una biblioteca de modelado de datos orientada a objetos (ODM - Object Data Modeling) para MongoDB y Node.js. Proporciona una solución sencilla basada en esquemas para modelar los datos de tu aplicación, incluyendo:

- Validación incorporada
- Conversión de tipos
- Construcción de consultas
- Hooks para lógica de negocio
- Middleware personalizable

## Instalación

Para instalar Mongoose en tu proyecto, ejecuta:

```bash
# Con npm
npm install mongoose

# Con pnpm
pnpm add mongoose
```

## Configuración Básica

### 1. Conexión a MongoDB

En un archivo de configuración (por ejemplo, `config/database.js`):

```javascript
const mongoose = require('mongoose');

// Función para conectar a la base de datos MongoDB
const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb://localhost:27017/mi-base-de-datos', {
            // Estas opciones ya no son necesarias en versiones recientes de Mongoose
            // pero se incluyen por compatibilidad con versiones anteriores
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB conectada: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error al conectar a MongoDB: ${error.message}`);
        process.exit(1); // Salir con error
    }
};

module.exports = connectDB;
```

### 2. Importar y usar la conexión

En tu archivo principal (`app.js`):

```javascript
const express = require('express');
const connectDB = require('./config/database');

const app = express();

// Conectar a MongoDB
connectDB();

// Resto de tu código...
```

## Definición de Esquemas y Modelos

### 1. Crear un Esquema Básico

```javascript
const mongoose = require('mongoose');

// Definir el esquema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    active: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Crear el modelo
const User = mongoose.model('User', userSchema);

module.exports = User;
```

### 2. Tipos de Datos Disponibles

- `String`: Para textos
- `Number`: Para valores numéricos (enteros, decimales)
- `Date`: Para fechas y horas
- `Boolean`: Para valores verdadero/falso
- `Buffer`: Para datos binarios
- `ObjectId`: Para IDs de MongoDB (referencias)
- `Array`: Para listas de valores
- `Map`: Para pares clave-valor
- `Schema.Types.Mixed`: Para cualquier tipo de datos
- `Schema.Types.Decimal128`: Para valores decimales de alta precisión

### 3. Validaciones y Opciones Comunes

```javascript
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre del producto es obligatorio'],
        trim: true,
        maxlength: [100, 'El nombre no puede tener más de 100 caracteres']
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'El precio no puede ser negativo']
    },
    description: String, // Tipo simple sin opciones adicionales
    inStock: {
        type: Boolean,
        default: true
    },
    category: {
        type: String,
        enum: {
            values: ['electrónica', 'ropa', 'hogar', 'alimentos'],
            message: '{VALUE} no es una categoría válida'
        }
    },
    tags: [String], // Array de strings
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Referencia al modelo User
        required: true
    },
    ratings: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            value: {
                type: Number,
                min: 1,
                max: 5
            },
            comment: String
        }
    ], // Array de objetos
    metadata: {
        type: Map,
        of: String
    } // Map de strings
});
```

## Métodos y Operaciones CRUD

### 1. Crear (Create)

```javascript
// Crear un documento
const createUser = async (userData) => {
    try {
        const newUser = await User.create(userData);
        return newUser;
    } catch (error) {
        throw new Error(`Error al crear usuario: ${error.message}`);
    }
};

// Alternativa con new y save
const createUserAlt = async (userData) => {
    try {
        const user = new User(userData);
        await user.save();
        return user;
    } catch (error) {
        throw new Error(`Error al crear usuario: ${error.message}`);
    }
};
```

### 2. Leer (Read)

```javascript
// Encontrar todos los documentos
const getAllUsers = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        throw new Error(`Error al obtener usuarios: ${error.message}`);
    }
};

// Encontrar por ID
const getUserById = async (id) => {
    try {
        const user = await User.findById(id);
        if (!user) throw new Error('Usuario no encontrado');
        return user;
    } catch (error) {
        throw new Error(`Error al obtener usuario: ${error.message}`);
    }
};

// Encontrar uno por criterio
const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email });
        if (!user) throw new Error('Usuario no encontrado');
        return user;
    } catch (error) {
        throw new Error(`Error al obtener usuario: ${error.message}`);
    }
};

// Consultas con filtros
const getActiveAdmins = async () => {
    try {
        const admins = await User.find({
            role: 'admin',
            active: true
        });
        return admins;
    } catch (error) {
        throw new Error(`Error al obtener administradores: ${error.message}`);
    }
};
```

### 3. Actualizar (Update)

```javascript
// Actualizar por ID
const updateUser = async (id, updateData) => {
    try {
        const user = await User.findByIdAndUpdate(
            id,
            updateData,
            {
                new: true, // Devuelve el documento actualizado
                runValidators: true // Ejecuta validadores de esquema
            }
        );
        if (!user) throw new Error('Usuario no encontrado');
        return user;
    } catch (error) {
        throw new Error(`Error al actualizar usuario: ${error.message}`);
    }
};

// Actualizar uno por criterio
const deactivateUserByEmail = async (email) => {
    try {
        const user = await User.findOneAndUpdate(
            { email },
            { active: false },
            { new: true }
        );
        if (!user) throw new Error('Usuario no encontrado');
        return user;
    } catch (error) {
        throw new Error(`Error al desactivar usuario: ${error.message}`);
    }
};

// Actualizar muchos
const promoteAllActiveUsers = async () => {
    try {
        const result = await User.updateMany(
            { active: true, role: 'user' },
            { role: 'admin' }
        );
        return result.modifiedCount; // Número de documentos modificados
    } catch (error) {
        throw new Error(`Error al promover usuarios: ${error.message}`);
    }
};
```

### 4. Eliminar (Delete)

```javascript
// Eliminar por ID
const deleteUser = async (id) => {
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) throw new Error('Usuario no encontrado');
        return user;
    } catch (error) {
        throw new Error(`Error al eliminar usuario: ${error.message}`);
    }
};

// Eliminar uno por criterio
const deleteInactiveUser = async (email) => {
    try {
        const user = await User.findOneAndDelete({
            email,
            active: false
        });
        if (!user) throw new Error('Usuario inactivo no encontrado');
        return user;
    } catch (error) {
        throw new Error(`Error al eliminar usuario: ${error.message}`);
    }
};

// Eliminar muchos
const deleteAllInactiveUsers = async () => {
    try {
        const result = await User.deleteMany({ active: false });
        return result.deletedCount; // Número de documentos eliminados
    } catch (error) {
        throw new Error(`Error al eliminar usuarios: ${error.message}`);
    }
};
```

## Consultas Avanzadas

### 1. Selección de Campos

```javascript
// Seleccionar solo ciertos campos
const getUserProfiles = async () => {
    try {
        // Solo incluye name, email y role
        const users = await User.find().select('name email role');
        return users;
    } catch (error) {
        throw new Error(`Error al obtener perfiles: ${error.message}`);
    }
};

// Excluir campos
const getUsersWithoutSensitiveData = async () => {
    try {
        // Excluye password
        const users = await User.find().select('-password');
        return users;
    } catch (error) {
        throw new Error(`Error al obtener usuarios: ${error.message}`);
    }
};
```

### 2. Ordenamiento

```javascript
// Ordenar resultados
const getUsersSortedByName = async () => {
    try {
        // Orden ascendente por nombre
        const users = await User.find().sort('name');
        return users;
    } catch (error) {
        throw new Error(`Error al obtener usuarios: ${error.message}`);
    }
};

// Ordenar por múltiples campos
const getRecentUsers = async () => {
    try {
        // Orden descendente por fecha de creación, luego ascendente por nombre
        const users = await User.find().sort('-createdAt name');
        return users;
    } catch (error) {
        throw new Error(`Error al obtener usuarios: ${error.message}`);
    }
};
```

### 3. Paginación

```javascript
// Implementar paginación
const getUsersPaginated = async (page = 1, limit = 10) => {
    try {
        const users = await User.find()
            .skip((page - 1) * limit) // Saltar documentos
            .limit(limit); // Limitar resultados
        
        const total = await User.countDocuments();
        
        return {
            users,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            totalUsers: total
        };
    } catch (error) {
        throw new Error(`Error al obtener usuarios: ${error.message}`);
    }
};
```

### 4. Operadores de Consulta

```javascript
// Consultas con operadores
const getAdvancedUserQuery = async () => {
    try {
        const users = await User.find({
            // AND lógico (todos estos criterios deben cumplirse)
            createdAt: { 
                $gte: new Date('2023-01-01'), // Mayor o igual que
                $lte: new Date('2023-12-31')  // Menor o igual que
            },
            $or: [ // OR lógico (al menos uno de estos criterios debe cumplirse)
                { role: 'admin' },
                { active: true }
            ],
            name: { $regex: '^A', $options: 'i' }, // Nombre empieza con A (case insensitive)
            age: { $exists: true, $gt: 18 } // Campo age existe y es mayor que 18
        });
        return users;
    } catch (error) {
        throw new Error(`Error en consulta avanzada: ${error.message}`);
    }
};
```

## Relaciones y Población (Populate)

### 1. Referencias entre Modelos

```javascript
// Esquema con referencia
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Referencia al modelo User
        required: true
    },
    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        text: String,
        date: {
            type: Date,
            default: Date.now
        }
    }]
});

const Post = mongoose.model('Post', postSchema);
```

### 2. Población Básica

```javascript
// Poblar una referencia
const getPostWithAuthor = async (postId) => {
    try {
        const post = await Post.findById(postId).populate('author');
        return post;
    } catch (error) {
        throw new Error(`Error al obtener post: ${error.message}`);
    }
};
```

### 3. Población Selectiva

```javascript
// Poblar solo ciertos campos
const getPostWithAuthorName = async (postId) => {
    try {
        const post = await Post.findById(postId).populate('author', 'name email');
        return post;
    } catch (error) {
        throw new Error(`Error al obtener post: ${error.message}`);
    }
};
```

### 4. Población Anidada

```javascript
// Poblar referencias anidadas
const getPostWithCommentsAndUsers = async (postId) => {
    try {
        const post = await Post.findById(postId)
            .populate('author', 'name')
            .populate('comments.user', 'name');
        return post;
    } catch (error) {
        throw new Error(`Error al obtener post: ${error.message}`);
    }
};
```

### 5. Población con Condiciones

```javascript
// Poblar con filtros
const getPostWithActiveCommenters = async (postId) => {
    try {
        const post = await Post.findById(postId).populate({
            path: 'comments.user',
            match: { active: true },
            select: 'name email'
        });
        return post;
    } catch (error) {
        throw new Error(`Error al obtener post: ${error.message}`);
    }
};
```

## Middleware y Hooks

### 1. Middleware de Documento

```javascript
// Pre-save hook
userSchema.pre('save', async function(next) {
    // 'this' se refiere al documento que se está guardando
    if (!this.isModified('password')) return next();
    
    try {
        // Ejemplo: Hashear contraseña antes de guardar
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Post-save hook
userSchema.post('save', function(doc, next) {
    console.log(`Usuario guardado: ${doc.name}`);
    next();
});
```

### 2. Middleware de Consulta

```javascript
// Pre-find hook
userSchema.pre('find', function() {
    // 'this' se refiere a la consulta
    this.find({ active: { $ne: false } });
});

// Pre-findOne hook
userSchema.pre('findOne', function() {
    this.find({ active: { $ne: false } });
});
```

### 3. Middleware de Agregación

```javascript
// Pre-aggregate hook
userSchema.pre('aggregate', function() {
    // 'this' se refiere al pipeline de agregación
    this.pipeline().unshift({ $match: { active: { $ne: false } } });
});
```

## Métodos Personalizados

### 1. Métodos de Instancia

```javascript
// Método de instancia (disponible en documentos)
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Uso
const user = await User.findById(id);
const isMatch = await user.comparePassword('miContraseña');
```

### 2. Métodos Estáticos

```javascript
// Método estático (disponible en el modelo)
userSchema.statics.findByEmail = function(email) {
    return this.findOne({ email });
};

// Uso
const user = await User.findByEmail('usuario@ejemplo.com');
```

### 3. Métodos de Consulta

```javascript
// Método de consulta (disponible en consultas)
userSchema.query.byRole = function(role) {
    return this.where({ role });
};

// Uso
const admins = await User.find().byRole('admin');
```

## Validación Avanzada

### 1. Validadores Personalizados

```javascript
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        validate: {
            validator: function(value) {
                return value > 0;
            },
            message: props => `${props.value} no es un precio válido. Debe ser mayor que cero.`
        }
    },
    sku: {
        type: String,
        validate: {
            validator: async function(value) {
                // Validación asíncrona
                const existingProduct = await mongoose.models.Product.findOne({ sku: value, _id: { $ne: this._id } });
                return !existingProduct; // Devuelve true si no existe otro producto con el mismo SKU
            },
            message: props => `El SKU ${props.value} ya está en uso.`
        }
    }
});
```

### 2. Validación Condicional

```javascript
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: function() {
            return this.role === 'business';
        }
    },
    role: {
        type: String,
        enum: ['personal', 'business'],
        default: 'personal'
    }
});
```

## Índices

### 1. Índices Básicos

```javascript
const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true // Crea un índice único
    },
    createdAt: {
        type: Date,
        index: true // Crea un índice simple
    }
});
```

### 2. Índices Compuestos

```javascript
// Definir índice compuesto
userSchema.index({ name: 1, email: 1 }, { unique: true });
```

### 3. Índices de Texto

```javascript
// Índice de texto para búsqueda full-text
productSchema.index({ name: 'text', description: 'text' });

// Uso
const searchProducts = async (searchTerm) => {
    return await Product.find({ $text: { $search: searchTerm } });
};
```

## Transacciones

```javascript
const transferFunds = async (fromAccountId, toAccountId, amount) => {
    // Iniciar sesión
    const session = await mongoose.startSession();
    
    try {
        // Iniciar transacción
        session.startTransaction();
        
        // Realizar operaciones
        const fromAccount = await Account.findByIdAndUpdate(
            fromAccountId,
            { $inc: { balance: -amount } },
            { new: true, session, runValidators: true }
        );
        
        if (fromAccount.balance < 0) {
            // Abortar si el balance es negativo
            throw new Error('Fondos insuficientes');
        }
        
        const toAccount = await Account.findByIdAndUpdate(
            toAccountId,
            { $inc: { balance: amount } },
            { new: true, session }
        );
        
        // Confirmar transacción
        await session.commitTransaction();
        
        return { fromAccount, toAccount };
    } catch (error) {
        // Revertir cambios en caso de error
        await session.abortTransaction();
        throw error;
    } finally {
        // Finalizar sesión
        session.endSession();
    }
};
```

## Agregaciones

```javascript
const getAverageUserAge = async () => {
    try {
        const result = await User.aggregate([
            {
                $match: { age: { $exists: true } } // Solo usuarios con edad
            },
            {
                $group: {
                    _id: null,
                    averageAge: { $avg: '$age' },
                    minAge: { $min: '$age' },
                    maxAge: { $max: '$age' },
                    totalUsers: { $sum: 1 }
                }
            }
        ]);
        
        return result[0] || { averageAge: 0, totalUsers: 0 };
    } catch (error) {
        throw new Error(`Error en agregación: ${error.message}`);
    }
};

const getUsersByRole = async () => {
    try {
        return await User.aggregate([
            {
                $group: {
                    _id: '$role',
                    count: { $sum: 1 },
                    users: { $push: { name: '$name', email: '$email' } }
                }
            },
            {
                $sort: { count: -1 }
            }
        ]);
    } catch (error) {
        throw new Error(`Error en agregación: ${error.message}`);
    }
};
```

## Mejores Prácticas

1. **Definir esquemas claros**: Usa tipos de datos apropiados y validaciones para mantener la integridad de los datos.

2. **Usar middleware para lógica común**: Implementa hooks para operaciones repetitivas como hashear contraseñas o actualizar timestamps.

3. **Implementar índices adecuados**: Crea índices para campos que se consultan frecuentemente para mejorar el rendimiento.

4. **Manejar errores adecuadamente**: Usa bloques try/catch para capturar y manejar errores de Mongoose.

5. **Usar transacciones para operaciones complejas**: Garantiza la integridad de los datos en operaciones que involucran múltiples documentos.

6. **Limitar el uso de populate**: La población excesiva puede afectar el rendimiento. Usa proyecciones para limitar los datos devueltos.

7. **Implementar paginación**: Evita cargar grandes conjuntos de datos usando skip y limit.

8. **Usar lean() para consultas de solo lectura**: Mejora el rendimiento cuando no necesitas instancias completas de documentos.

9. **Validar datos antes de las operaciones**: Usa validadores personalizados para lógica de negocio compleja.

10. **Considerar el rendimiento de las consultas**: Monitorea y optimiza consultas lentas.

## Recursos Adicionales

- [Documentación oficial de Mongoose](https://mongoosejs.com/docs/)
- [Guía de MongoDB](https://docs.mongodb.com/manual/)
- [Mongoose en GitHub](https://github.com/Automattic/mongoose)
- [Patrones de diseño con Mongoose](https://mongoosejs.com/docs/guide.html)
