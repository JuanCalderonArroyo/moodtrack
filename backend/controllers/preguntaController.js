const Pregunta = require('../models/Pregunta');

// Crear una nueva pregunta
exports.crearPregunta = async (req, res) => {
  try {
    const pregunta = new Pregunta(req.body);
    await pregunta.save();
    res.status(201).json(pregunta);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todas las preguntas
exports.obtenerPreguntas = async (req, res) => {
  try {
    const preguntas = await Pregunta.find();
    res.json(preguntas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una pregunta por ID
exports.obtenerPreguntaPorId = async (req, res) => {
  try {
    const pregunta = await Pregunta.findById(req.params.id);
    if (!pregunta) return res.status(404).json({ error: 'Pregunta no encontrada' });
    res.json(pregunta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// 🔹 Obtener SOLO preguntas de nivel "básico"
exports.getPreguntasBasicas = async (req, res) => {
  try {
    const preguntas = await Pregunta.find({ nivel: 'basico', activa: true });
    res.json(preguntas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Actualizar una pregunta
exports.actualizarPregunta = async (req, res) => {
  try {
    const pregunta = await Pregunta.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pregunta) return res.status(404).json({ error: 'Pregunta no encontrada' });
    res.json(pregunta);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar una pregunta
exports.eliminarPregunta = async (req, res) => {
  try {
    const pregunta = await Pregunta.findByIdAndDelete(req.params.id);
    if (!pregunta) return res.status(404).json({ error: 'Pregunta no encontrada' });
    res.json({ mensaje: 'Pregunta eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
