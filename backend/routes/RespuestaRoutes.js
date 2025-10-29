const express = require('express');
const router = express.Router();
const RespuestaController = require('../controllers/RespuestaController');

router.post('/', RespuestaController.crearRespuesta);
router.get('/', RespuestaController.obtenerRespuestas);
router.get('/:id', RespuestaController.obtenerRespuestaPorId);
router.put('/:id', RespuestaController.actualizarRespuesta);
router.delete('/:id', RespuestaController.eliminarRespuesta);

module.exports = router;
