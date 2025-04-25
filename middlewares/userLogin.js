const userLogin = (req, res, next) => {
 
    let isLogin = true; // Simulación de autenticación

    if (isLogin) {
        console.log('Autenticado');
        next();
    } else {
        console.log('No autenticado');
        res.status(401).json({
            status: 'fail',
            message: 'No autenticado'
        });
    }
}

module.exports = userLogin;