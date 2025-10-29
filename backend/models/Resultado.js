const mongoose = require('mongoose');

const ResultadoSchema = new mongoose.Schema({
  id_usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  fecha_iso: { type: Date, default: Date.now },

  nivel: { type: String, enum: ['basico', 'seguimiento'] },
  estadisticas: { type: Array, default: [] },
  comentario_ai: { type: String }
});

module.exports = mongoose.model('Resultado', ResultadoSchema);
