// Simulamos una base de datos con un array de usuarios
const users = [
  { id: '1', name: 'Usuario 1', email: 'usuario1@test.com', role: 'user' },
  { id: '2', name: 'Usuario 2', email: 'usuario2@test.com', role: 'admin' },
  { id: '3', name: 'Usuario 3', email: 'usuario3@test.com', role: 'user' }
];

exports.getAllUsers = (req, res) => {
    console.log('Accediendo a getAllUsers');
    res.json({
        status: 'success',
        results: users.length,
        data: { users }
    });
};

exports.getUser = (req, res) => {
    console.log(req.query.enabled);
    console.log('Accediendo al usuario con id:' + req.params.id);
    const user = users.find(u => u.id === req.params.id);
    
    if (!user) {
        return res.status(404).json({
            status: 'fail',
            message: 'No se encontró el usuario con ese ID'
        });
    }
    
    res.json({
        status: 'success',
        data: { user }
    });
};

exports.createUser = (req, res) => {
    console.log('Accediendo a createUser');
    const newUser = {
        id: (users.length + 1).toString(),
        ...req.body
    };
    users.push(newUser);
    
    res.status(201).json({
        status: 'success',
        data: { user: newUser }
    });
};

exports.updateUser = (req, res) => {
    console.log('Accediendo a updateUser');
    const index = users.findIndex(u => u.id === req.params.id);
    
    if (index === -1) {
        return res.status(404).json({
            status: 'fail',
            message: 'No se encontró el usuario con ese ID'
        });
    }
    
    users[index] = { ...users[index], ...req.body };
    
    res.json({
        status: 'success',
        data: { user: users[index] }
    });
};

exports.deleteUser = (req, res) => {
    console.log('Accediendo a deleteUser');
    const index = users.findIndex(u => u.id === req.params.id);
    
    if (index === -1) {
        return res.status(404).json({
            status: 'fail',
            message: 'No se encontró el usuario con ese ID'
        });
    }
    
    users.splice(index, 1);
    
    res.status(204).json({
        status: 'success',
        data: null
    });
};