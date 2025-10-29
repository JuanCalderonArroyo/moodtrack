const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');

// Registrar
exports.registerUser = async (req, res) => {
  try {
    const { nombre, email, password, edad, genero } = req.body;
    const existing = await Usuario.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Usuario ya existe' });

    const hashed = await bcrypt.hash(password, 10);
    const user = new Usuario({ nombre, email, password: hashed, edad, genero, rol: "usuario" });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Usuario.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Contraseña incorrecta' });

    // 🔹 Incluir el _id en la respuesta
    res.json({
      _id: user._id,
      nombre: user.nombre,
      email: user.email,
      edad: user.edad,
      genero: user.genero,
      rol: user.rol
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener todos usuarios
exports.getUsers = async (req, res) => {
  const users = await Usuario.find();
  res.json(users);
};
// Actualizar usuario
exports.updateUser = async (req, res) => {
  try {
    const { email } = req.params;
    const newData = req.body;

    // Si envían password, encriptarlo
    if (newData.password) {
      const bcrypt = require('bcryptjs');
      newData.password = await bcrypt.hash(newData.password, 10);
    }

    const user = await Usuario.findOneAndUpdate({ email }, newData, { new: true });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar usuario
exports.deleteUser = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await Usuario.findOneAndDelete({ email });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
