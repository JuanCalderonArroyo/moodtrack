const API_URL = 'http://10.112.222.224:3000/api/preguntas';

export async function getFormulario() {
  const res = await fetch(`${API_URL}/basico`);
  if (!res.ok) throw new Error('Error al obtener las preguntas básicas');

  const preguntas = await res.json();

  return {
    id: 1,
    titulo: 'Formulario de bienestar emocional',
    descripcion: 'Evalúa tu estado emocional y hábitos recientes.',
    preguntas
  };
}
