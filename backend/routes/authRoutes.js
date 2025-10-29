const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.get('/', authController.getUsers);
// Actualizar usuario
router.put('/update/:email', authController.updateUser);

// Eliminar usuario
router.delete('/delete/:email', authController.deleteUser);

module.exports = router;
