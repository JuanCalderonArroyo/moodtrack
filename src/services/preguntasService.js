// src/services/preguntasService.js

const API_URL = 'https://backenddiseno.onrender.com/api/preguntas';

// obtener todas las preguntas
export async function getPreguntas() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Error al obtener preguntas');
  return await res.json();
}

// obtener filtrando por nivel en el frontend
export async function getPreguntasPorNivel(nivel) {
  const all = await getPreguntas();
  return all.filter(p => p.nivel === nivel);
}

// obtener filtrando por nivel y categoria
export async function getPreguntasPorCategoria(nivel, categoria) {
  const all = await getPreguntas();
  return all.filter(p => p.nivel === nivel && p.categoria === categoria);
}

// crear pregunta
export async function crearPregunta(pregunta) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pregunta)
  });

  if (!res.ok) throw new Error('Error al crear pregunta');

  return await res.json();
}

// actualizar pregunta
export async function editarPregunta(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (!res.ok) throw new Error('Error al editar pregunta');

  return await res.json();
}

// borrar pregunta
export async function borrarPregunta(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });

  if (!res.ok) throw new Error('Error al borrar pregunta');

  return await res.json();
}
