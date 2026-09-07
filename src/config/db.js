/**
 * Configuración del Pool de Conexiones a MySQL con Soporte de Promesas
 */
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'adso_auth_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Probar conexión inicial
pool.getConnection()
    .then(connection => {
        console.log('✅ Conexión exitosa a MySQL (adso_auth_db)');
        connection.release();
    })
    .catch(err => {
        console.error('❌ Error de conexión a la base de datos:', err.message);
    });

// EXPORTACIÓN OBLIGATORIA DEL POOL
module.exports = pool;