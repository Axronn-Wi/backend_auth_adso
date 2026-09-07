const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Verificar que las funciones existan antes de asignarlas a las rutas
if (!authController.register || !authController.login) {
    console.error('❌ Error: authController no está exportando register o login correctamente.');
}

router.post('/register', authController.register);
router.post('/login', authController.login);

// LÍNEA CRÍTICA OBLIGATORIA:
module.exports = router;