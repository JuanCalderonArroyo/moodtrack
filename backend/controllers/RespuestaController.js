const Respuesta = require('../models/Respuesta');

// Crear una nueva respuesta
exports.crearRespuesta = async (req, res) => {
  try {
    const nuevaRespuesta = new Respuesta(req.body);
    const guardada = await nuevaRespuesta.save();
    res.status(201).json(guardada);
  } catch (error) {
    console.error('Error al crear respuesta:', error);
    res.status(400).json({ message: error.message });
  }
};

// Obtener todas las respuestas
exports.obtenerRespuestas = async (req, res) => {
  try {
    const respuestas = await Respuesta.find()
      .populate('id_usuario', 'nombre email')      // opcional, si tienes el modelo Usuario
      .populate('id_resultado', 'fecha_realizacion'); // opcional también
    res.json(respuestas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener una respuesta por ID
exports.obtenerRespuestaPorId = async (req, res) => {
  try {
    const respuesta = await Respuesta.findById(req.params.id);
    if (!respuesta) return res.status(404).json({ message: 'Respuesta no encontrada' });
    res.json(respuesta);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar una respuesta existente
exports.actualizarRespuesta = async (req, res) => {
  try {
    const actualizada = await Respuesta.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actualizada) return res.status(404).json({ message: 'Respuesta no encontrada' });
    res.json(actualizada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar una respuesta
exports.eliminarRespuesta = async (req, res) => {
  try {
    const eliminada = await Respuesta.findByIdAndDelete(req.params.id);
    if (!eliminada) return res.status(404).json({ message: 'Respuesta no encontrada' });
    res.json({ message: 'Respuesta eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

