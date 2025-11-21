const API_URL = 'https://backenddiseno.onrender.com/api/resultados';

export const crearResultado = async (resultado) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(resultado),
    });
    return await response.json();
  } catch (error) {
    console.error('Error al crear resultado:', error);
    throw error;
  }
};

export const obtenerResultadosPorUsuario = async (idUsuario) => {
  try {
    const response = await fetch(API_URL);
    const todos = await response.json();
    // Filtramos solo los resultados de ese usuario
    return todos.filter((r) => r.id_usuario && r.id_usuario._id === idUsuario);
  } catch (error) {
    console.error('Error al obtener resultados:', error);
    throw error;
  }
};
export const updateResultado = async (id, data) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error('Error al actualizar resultado:', error);
    throw error;
  }
};
