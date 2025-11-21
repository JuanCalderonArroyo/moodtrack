const API_URL = 'https://backenddiseno.onrender.com/api/respuestas';

// 🔹 Crear una nueva respuesta
export const crearRespuesta = async (respuestaData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(respuestaData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al crear respuesta:', error);
    throw error;
  }
};
