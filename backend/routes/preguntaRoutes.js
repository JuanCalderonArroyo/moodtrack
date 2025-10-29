const express = require('express');
const router = express.Router();
const preguntaController = require('../controllers/preguntaController');

// ⚠️ IMPORTANTE: primero las rutas específicas (como /basico)
router.get('/basico', preguntaController.getPreguntasBasicas);

// 🧩 CRUD general
router.post('/', preguntaController.crearPregunta);
router.get('/', preguntaController.obtenerPreguntas);
router.get('/:id', preguntaController.obtenerPreguntaPorId);
router.put('/:id', preguntaController.actualizarPregunta);
router.delete('/:id', preguntaController.eliminarPregunta);

module.exports = router;
