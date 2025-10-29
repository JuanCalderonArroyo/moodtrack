const mongoose = require('mongoose');

const PreguntaSchema = new mongoose.Schema({
  texto: { type: String, required: true },
  tipo: { type: String, enum: ['cuantitativa', 'cualitativa'], required: true },
  categoria: { type: String, required: true },
  nivel: { type: String, enum: ['basico', 'seguimiento'], required: true },
  importancia: { type: Number, min: 1, max: 5, required: true },
  opciones: { type: Array, default: [] },
  activa: { type: Boolean, default: true }
});

module.exports = mongoose.model('Pregunta', PreguntaSchema);
