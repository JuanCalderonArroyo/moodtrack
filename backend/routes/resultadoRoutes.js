const express = require('express');
const router = express.Router();
const resultadoController = require('../controllers/resultadoController');

router.post('/', resultadoController.crearResultado);
router.get('/', resultadoController.obtenerResultados);
router.get('/:id', resultadoController.obtenerResultadoPorId);
router.put('/:id', resultadoController.actualizarResultado);
router.delete('/:id', resultadoController.eliminarResultado);

module.exports = router;
