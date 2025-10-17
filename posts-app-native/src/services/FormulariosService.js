// src/services/FormulariosService.js

// Único formulario con preguntas ordenadas
let formulario = {
  id: 1,
  titulo: 'Formulario de bienestar emocional',
  descripcion: 'Evalúa tu estado emocional y hábitos recientes.',
  preguntas: [
    {
      id: 1,
      texto: '¿Cómo te sientes hoy?',
      tipo: 'opciones',
      opciones: ['Feliz', 'Triste', 'Ansioso', 'Relajado'],
      orden: 1,
      obligatoria: true
    },
    {
      id: 2,
      texto: '¿Cuánto dormiste anoche?',
      tipo: 'opciones',
      opciones: ['Menos de 5 horas', '5-7 horas', 'Más de 7 horas'],
      orden: 2,
      obligatoria: true
    },
    {
      id: 3,
      texto: '¿Has hecho ejercicio esta semana?',
      tipo: 'opciones',
      opciones: ['Sí', 'No'],
      orden: 3,
      obligatoria: true
    },
    {
      id: 4,
      texto: '¿Qué tan estresado te sientes actualmente?',
      tipo: 'opciones',
      opciones: ['Nada', 'Un poco', 'Moderado', 'Mucho'],
      orden: 4,
      obligatoria: true
    },
    {
      id: 5,
      texto: '¿Qué actividad te hizo sentir mejor esta semana?',
      tipo: 'opciones',
      opciones: ['Salir con amigos', 'Escuchar música', 'Hacer deporte', 'Descansar', 'Otra'],
      orden: 5,
      obligatoria: true
    },
    {
      id: 6,
      texto: '¿Tienes algún comentario o sugerencia adicional?',
      tipo: 'texto', // 🔹 tipo de pregunta abierta
      opciones: [],  // 🔹 no hay opciones predefinidas
      orden: 6,
      obligatoria: false // 🔹 respuesta opcional
    }
  ]
};

// 🔹 Obtener el formulario completo
export function getFormulario() {
  return formulario;
}

// 🔹 Obtener una pregunta por ID
export function getPreguntaById(id) {
  return formulario.preguntas.find(p => p.id === id);
}

// 🔹 Agregar una nueva pregunta
export function addPregunta(pregunta) {
  const newId = formulario.preguntas.length > 0
    ? formulario.preguntas[formulario.preguntas.length - 1].id + 1
    : 1;

  const nuevaPregunta = { ...pregunta, id: newId, orden: newId };
  formulario.preguntas.push(nuevaPregunta);
  return nuevaPregunta;
}

// 🔹 Actualizar una pregunta existente
export function updatePregunta(id, newData) {
  const index = formulario.preguntas.findIndex(p => p.id === id);
  if (index === -1) throw new Error('Pregunta no encontrada');
  formulario.preguntas[index] = { ...formulario.preguntas[index], ...newData };
  return formulario.preguntas[index];
}

// 🔹 Eliminar una pregunta
export function deletePregunta(id) {
  const index = formulario.preguntas.findIndex(p => p.id === id);
  if (index === -1) throw new Error('Pregunta no encontrada');
  formulario.preguntas.splice(index, 1);
  return true;
}
