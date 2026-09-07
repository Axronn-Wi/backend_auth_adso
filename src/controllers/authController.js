const AuthService = require('../services/authService');

const register = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;
        if (!nombre || !email || !password) {
            return res.status(400).json({ ok: false, mensaje: 'Todos los campos son obligatorios' });
        }
        const usuario = await AuthService.registrarUsuario({ nombre, email, password });
        return res.status(201).json({ ok: true, mensaje: 'Usuario registrado exitosamente', data: usuario });
    } catch (error) {
        return res.status(error.statusCode || 500).json({ ok: false, mensaje: error.message || 'Error interno del servidor' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ ok: false, mensaje: 'Debe proporcionar email y password' });
        }
        const usuario = await AuthService.loginUsuario({ email, password });
        return res.status(200).json({ ok: true, mensaje: 'Inicio de sesión exitoso', data: usuario });
    } catch (error) {
        return res.status(error.statusCode || 500).json({ ok: false, mensaje: error.message || 'Error interno del servidor' });
    }
};

// EXPORTACIÓN OBLIGATORIA DE AMBAS FUNCIONES:
module.exports = {
    register,
    login
};