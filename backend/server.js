const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const preguntaRoutes = require('./routes/preguntaRoutes');
const RespuestaRoutes = require('./routes/RespuestaRoutes');
const resultadoRoutes = require('./routes/resultadoRoutes');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch(err => console.error('❌ Error MongoDB:', err));

// Rutas
app.use('/api/usuarios', authRoutes);
app.use('/api/preguntas', preguntaRoutes);
app.use('/api/respuestas', RespuestaRoutes);
app.use('/api/resultados', resultadoRoutes);
app.get('/', (req, res) => res.send('Servidor funcionando'));
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
