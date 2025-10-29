const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  edad: { type: Number },
  genero: { type: String },
  fecha_registro: { type: Date, default: Date.now },
  ultimo_acceso: { type: Date },
  rol: { type: String, default: 'usuario' }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
