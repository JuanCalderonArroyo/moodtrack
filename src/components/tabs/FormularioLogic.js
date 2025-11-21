// src/components/tabs/FormularioLogic.js
import { Alert } from 'react-native';
import { getFormularioBasico } from '../../services/FormularioService';
import { crearRespuesta } from '../../services/RespuestasService';
import { crearResultado, updateResultado, obtenerResultadosPorUsuario } from '../../services/resultadoService';
import { getUserFromStorage } from '../../services/authService';

// Completa categorías faltantes en seguimiento
function completarCategoriasFaltantes(respuestasGuardadas, ultimoResultado, modo) {
  if (!ultimoResultado || !Array.isArray(ultimoResultado.estadisticas)) return [];

  const categoriasExistentes = respuestasGuardadas.map(r => r.categoria);
  const categoriasFaltantes = ultimoResultado.estadisticas.filter(
    c => !categoriasExistentes.includes(c.categoria)
  );

  return categoriasFaltantes.map(c => ({
    id_usuario: ultimoResultado.id_usuario?._id || null,
    id_resultado: null, // se establecerá luego al crear resultado
    texto_pregunta: null,
    tipo_pregunta: 'cuantitativa',
    respuesta: null,
    valor: c.promedio,
    importancia_pregunta: null,
    nivel: modo,
    categoria: c.categoria,
  }));
}

// Calcula promedio por categoría
export const calcularEstadisticas = (respuestas) => {
  const categorias = {};

  respuestas.forEach(r => {
    if (!r || !r.categoria) return;
    if (!categorias[r.categoria]) categorias[r.categoria] = [];
    if (r.valor !== null && r.valor !== undefined) {
      categorias[r.categoria].push(Number(r.valor));
    }
  });

  return Object.entries(categorias).map(([categoria, valores]) => ({
    categoria,
    promedio: valores.length ? valores.reduce((a, b) => a + b, 0) / valores.length : 0,
  }));
};

// Carga formulario y usuario al iniciar
export async function cargarDatosIniciales(setFormulario, setUser, setLoading) {
  try {
    const [formData, userData] = await Promise.all([
      getFormularioBasico(),
      getUserFromStorage()
    ]);
    if (setFormulario) setFormulario(formData);
    if (setUser) setUser(userData);
    return userData;
  } catch (error) {
    console.error('Error cargando datos:', error);
    Alert.alert('Error', 'No se pudo cargar el formulario o el usuario');
  } finally {
    if (setLoading) setLoading(false);
  }
}

// Enviar formulario y generar resultado
export async function enviarFormulario({ formulario, respuestas, user, navigation, modo }) {
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
    // Obtener último resultado anterior en seguimiento
    let ultimoResultadoAnterior = null;
    if (modo === 'seguimiento') {
      const resultadosUsuario = await obtenerResultadosPorUsuario(user._id);
      if (resultadosUsuario && resultadosUsuario.length > 0) {
        ultimoResultadoAnterior = resultadosUsuario[resultadosUsuario.length - 1];
      }
    }

    // Crear resultado base vacío
    const resultadoBase = { id_usuario: user._id, nivel: modo, estadisticas: [], comentario_ai: null };
    const resultadoCreado = await crearResultado(resultadoBase);

    // Guardar respuestas del formulario
    const respuestasGuardadas = [];
    for (const pregunta of formulario.preguntas) {
      const respuesta = respuestas[pregunta._id];
      if (respuesta === undefined || respuesta === null) continue;

      const nuevaRespuesta = {
        id_usuario: user._id,
        id_resultado: resultadoCreado._id,
        texto_pregunta: pregunta.texto,
        tipo_pregunta: pregunta.tipo,
        respuesta: (typeof respuesta === 'object' && respuesta.texto !== undefined)
          ? String(respuesta.texto)
          : String(respuesta),
        valor: (pregunta.tipo === 'cuantitativa')
          ? Number(
              (typeof respuesta === 'object' && respuesta.valor !== undefined)
                ? respuesta.valor
                : (isNaN(Number(respuesta)) ? null : Number(respuesta))
            )
          : null,
        importancia_pregunta: pregunta.importancia,
        nivel: pregunta.nivel || modo,
        categoria: pregunta.categoria,
      };

      const guardada = await crearRespuesta(nuevaRespuesta);
      respuestasGuardadas.push(guardada);
    }

    // Completar categorías faltantes en seguimiento
    if (modo === 'seguimiento' && ultimoResultadoAnterior) {
      const completadas = completarCategoriasFaltantes(respuestasGuardadas, ultimoResultadoAnterior, modo);
      completadas.forEach(r => { if (!r.id_resultado) r.id_resultado = resultadoCreado._id; });
      respuestasGuardadas.push(...completadas);
    }

    // Calcular estadísticas finales
    const estadisticas = calcularEstadisticas(respuestasGuardadas);
    let resultadoActualizado = { ...resultadoCreado, estadisticas, comentario_ai: 'Generando comentario AI...' };

    // Llamada al backend AI para generar comentario
    try {
      console.log('🌐 Enviando resultado al backend para comentario AI:', resultadoActualizado);
      const res = await fetch('https://backenddiseno.onrender.com/api/ai/comentario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resultado: { ...resultadoActualizado, respuestas: respuestasGuardadas } })
      });
      console.log('🌐 Enviando resultado al backend para comentario AI:', resultadoActualizado);
      const data = await res.json();
      console.log('💬 Comentario AI recibido:', data);
      if (data.comentario) resultadoActualizado.comentario_ai = data.comentario;
    } catch (err) {
      console.error('Error generando comentario AI:', err);
      resultadoActualizado.comentario_ai = 'No se pudo generar el comentario AI.';
    }

    // Actualizar resultado con comentario AI
    await updateResultado(resultadoCreado._id, resultadoActualizado);

    // Navegar a pantalla de resultados
    navigation.navigate('ResultadoScreen', { resultado: resultadoActualizado });

  } catch (error) {
    console.error('Error enviando respuestas:', error);
    Alert.alert('Error', 'No se pudieron enviar las respuestas');
  }
}
