const Resultado = require('../models/Resultado');

// Crear resultado
exports.crearResultado = async (req, res) => {
  try {
    // Obtener la fecha actual y formatearla como "dd/mm/yyyy hh:mm"
    const ahora = new Date();
    const dia = String(ahora.getDate()).padStart(2, '0');
    const mes = String(ahora.getMonth() + 1).padStart(2, '0');
    const anio = ahora.getFullYear();
    const horas = String(ahora.getHours()).padStart(2, '0');
    const minutos = String(ahora.getMinutes()).padStart(2, '0');
    const fechaFormateada = `${dia}/${mes}/${anio} ${horas}:${minutos}`;

    // Crear el resultado con la fecha ya formateada
    const nuevoResultado = new Resultado({
      ...req.body,
      fecha_realizacion: fechaFormateada
    });

    const resultadoGuardado = await nuevoResultado.save();
    res.status(201).json(resultadoGuardado);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear el resultado', error: error.message });
  }
};


// Obtener todos los resultados
exports.obtenerResultados = async (req, res) => {
  try {
    const resultados = await Resultado.find().populate('id_usuario');
    res.status(200).json(resultados);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los resultados', error: error.message });
  }
};

// Obtener resultado por ID
exports.obtenerResultadoPorId = async (req, res) => {
  try {
    const resultado = await Resultado.findById(req.params.id).populate('id_usuario');
    if (!resultado) {
      return res.status(404).json({ mensaje: 'Resultado no encontrado' });
    }
    res.status(200).json(resultado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el resultado', error: error.message });
  }
};

// Actualizar resultado
exports.actualizarResultado = async (req, res) => {
  try {
    const resultadoActualizado = await Resultado.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!resultadoActualizado) {
      return res.status(404).json({ mensaje: 'Resultado no encontrado' });
    }
    res.status(200).json(resultadoActualizado);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar el resultado', error: error.message });
  }
};

// Eliminar resultado
exports.eliminarResultado = async (req, res) => {
  try {
    const resultadoEliminado = await Resultado.findByIdAndDelete(req.params.id);
    if (!resultadoEliminado) {
      return res.status(404).json({ mensaje: 'Resultado no encontrado' });
    }
    res.status(200).json({ mensaje: 'Resultado eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el resultado', error: error.message });
  }
};
