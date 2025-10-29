const mongoose = require('mongoose');

const RespuestaSchema = new mongoose.Schema({
  id_usuario: { type: String, required: true },
  id_resultado: { type: String, required: true },
  texto_pregunta: { type: String },
  tipo_pregunta: { type: String, enum: ['cuantitativa', 'cualitativa'] },
  respuesta: { type: String },
  valor: { type: Number },
  importancia_pregunta: { type: Number },
  nivel: { type: String, enum: ['basico', 'seguimiento'] },
  categoria: { type: String }
});

module.exports = mongoose.model('Respuesta', RespuestaSchema);
