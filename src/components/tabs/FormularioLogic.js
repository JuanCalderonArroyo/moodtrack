// src/components/tabs/FormularioLogic.js
import { Alert } from 'react-native';
import { getFormulario } from '../../services/FormulariosService';
import { crearRespuesta } from '../../services/RespuestasService';
import { crearResultado, updateResultado } from '../../services/resultadoService';
import { getUserFromStorage } from '../../services/authService';

export const calcularEstadisticas = (respuestas) => {
  const categorias = {};

  respuestas.forEach(r => {
    if (!categorias[r.categoria]) categorias[r.categoria] = [];
    if (r.valor !== null && r.valor !== undefined) {
      categorias[r.categoria].push(r.valor);
    }
  });

  return Object.entries(categorias).map(([categoria, valores]) => ({
    categoria,
    promedio: valores.reduce((a, b) => a + b, 0) / valores.length,
  }));
};

// 🔹 Inicializar formulario y usuario
export async function cargarDatosIniciales(setFormulario, setUser, setLoading) {
  try {
    const [formData, userData] = await Promise.all([
      getFormulario(),
      getUserFromStorage()
    ]);
    setFormulario(formData);
    setUser(userData);
  } catch (error) {
    console.error('Error cargando datos:', error);
    Alert.alert('Error', 'No se pudo cargar el formulario o el usuario');
  } finally {
    setLoading(false);
  }
}

// 🔹 Enviar respuestas y crear resultado
export async function enviarFormulario({
  formulario,
  respuestas,
  user,
  navigation,
}) {
  if (!user) {
    Alert.alert('Error', 'No se encontró usuario autenticado');
    return;
  }

  const faltantes = formulario.preguntas.filter(
    p => p.obligatoria && !respuestas[p._id]
  );
  if (faltantes.length > 0) {
    Alert.alert('Formulario incompleto', 'Por favor responde todas las preguntas obligatorias');
    return;
  }

  try {
    // 1️⃣ Crear resultado base
    const resultadoBase = {
      id_usuario: user._id,
      nivel: formulario.nivel || 'basico',
      estadisticas: [],
      comentario_ai: null,
    };
    const resultadoCreado = await crearResultado(resultadoBase);
    const respuestasGuardadas = [];

    // 2️⃣ Guardar respuestas
    for (const pregunta of formulario.preguntas) {
      const respuesta = respuestas[pregunta._id];
      if (respuesta) {
        const nuevaRespuesta = {
          id_usuario: user._id,
          id_resultado: resultadoCreado._id,
          texto_pregunta: pregunta.texto,
          tipo_pregunta: pregunta.tipo,
          respuesta: respuesta.texto || respuesta,
          valor: respuesta.valor || null,
          importancia_pregunta: pregunta.importancia,
          nivel: pregunta.nivel,
          categoria: pregunta.categoria,
        };
        const guardada = await crearRespuesta(nuevaRespuesta);
        respuestasGuardadas.push(guardada);
      }
    }

    // 3️⃣ Calcular estadísticas y actualizar resultado
    const estadisticas = calcularEstadisticas(respuestasGuardadas);
    const resultadoActualizado = {
      ...resultadoCreado,
      estadisticas,
      comentario_ai: 'Aún no implementado',
    };
    await updateResultado(resultadoCreado._id, resultadoActualizado);

    // 4️⃣ Navegar
    navigation.navigate('ResultadoScreen', { resultado: resultadoActualizado });
  } catch (error) {
    console.error('Error enviando respuestas:', error);
    Alert.alert('Error', 'No se pudieron enviar las respuestas');
  }
}
