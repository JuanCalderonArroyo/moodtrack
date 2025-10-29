const API_URL = 'http://10.112.222.224:3000/api/respuestas';

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
