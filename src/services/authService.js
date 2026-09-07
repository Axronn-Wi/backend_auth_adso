/**
 * Servicio de Autenticación: Lógica para interactuar con la base de datos
 */
const pool = require('../config/db');
const bcrypt = require('bcryptjs');

// Registrar nuevo usuario
const registrarUsuario = async ({ nombre, email, password }) => {
    // 1. Verificar si el usuario ya existe
    const [existentes] = await pool.query('SELECT id FROM usuarios WHERE email = ?', [email]);
    if (existentes.length > 0) {
        const error = new Error('El correo electrónico ya se encuentra registrado');
        error.statusCode = 400;
        throw error;
    }

    // 2. Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // 3. Insertar registro
    const [resultado] = await pool.query(
        'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)',
        [nombre, email, passwordHash]
    );

    return { id: resultado.insertId, nombre, email };
};

// Iniciar sesión
const loginUsuario = async ({ email, password }) => {
    // 1. Buscar usuario por correo
    const [filas] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (filas.length === 0) {
        const error = new Error('Credenciales inválidas');
        error.statusCode = 401;
        throw error;
    }

    const usuario = filas[0];

    // 2. Validar contraseña
    const esValida = await bcrypt.compare(password, usuario.password);
    if (!esValida) {
        const error = new Error('Credenciales inválidas');
        error.statusCode = 401;
        throw error;
    }

    return { id: usuario.id, nombre: usuario.nombre, email: usuario.email };
};

module.exports = {
    registrarUsuario,
    loginUsuario
};