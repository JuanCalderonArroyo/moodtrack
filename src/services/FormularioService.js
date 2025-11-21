import { getPreguntas, getPreguntasPorNivel } from './preguntasService';

const API_URL = 'https://backenddiseno.onrender.com/api/preguntas';

// Devuelve el formulario básico para el usuario
export async function getFormularioBasico() {
  const preguntas = await getPreguntasPorNivel('basico');

  return {
    id: 1,
    titulo: 'Formulario de bienestar emocional',
    descripcion: 'Evalúa tu estado emocional y hábitos recientes.',
    preguntas
  };
}

// Devuelve **todas las preguntas disponibles**, sin filtrar por nivel
// Esto sirve para seguimiento
export async function getTodasPreguntas() {
  const preguntas = await getPreguntas();
  return preguntas;
}
