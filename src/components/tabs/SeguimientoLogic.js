// src/components/tabs/SeguimientoLogic.js
import { getFormulario } from '../../services/FormularioService';

const MAX_PREGUNTAS = 10;

// Categorías y su criterio de gravedad
const categoriasCriticas = [
  'estrés',
  'ánimo o estado emocional',
  'relaciones o apoyo social',
  'salud física y hábitos',
  'autoestima o autopercepción',
  'propósito o motivación vital',
  'productividad o concentración'
];

export function generarFormularioSeguimiento(respuestasUltimoResultado, preguntasDisponibles) {

  // 🔥 Solo preguntas nivel seguimiento
  const preguntasSeguimiento = preguntasDisponibles.filter(p => p.nivel === 'seguimiento');

  // 1️⃣ Determinar gravedad por categoría
  let gravedadCategorias = respuestasUltimoResultado.estadisticas.map(cat => {
    let gravedad;
    if (cat.categoria === 'estrés') {
      gravedad = cat.promedio; // más alto = peor
    } else {
      gravedad = 5 - cat.promedio; // más bajo = peor
    }
    return { ...cat, gravedad };
  });

  // 2️⃣ Filtrar SOLO categorías que superen umbral mínimo
  gravedadCategorias = gravedadCategorias.filter(cat => {
    if (cat.categoria === 'estrés') {
      return cat.promedio >= 3;
    } else {
      return cat.promedio <= 2.5;
    }
  });

  // si ninguna categoría califica → sin preguntas
  if (gravedadCategorias.length === 0) {
    return {
      titulo: 'Formulario de seguimiento',
      descripcion: 'Basado en tu último resultado, estas preguntas buscan profundizar en las áreas críticas.',
      preguntas: []
    };
  }

  // 3️⃣ Ordenar por gravedad descendente
  gravedadCategorias.sort((a, b) => b.gravedad - a.gravedad);

  // 4️⃣ Seleccionar preguntas
  const preguntasSeleccionadas = [];
  const usadasPreguntas = new Set();

  gravedadCategorias.forEach((catStat, index) => {
    if (preguntasSeleccionadas.length >= MAX_PREGUNTAS) return;

    const preguntasCat = preguntasSeguimiento
      .filter(p => p.categoria === catStat.categoria && !usadasPreguntas.has(p._id))
      .sort((a, b) => b.importancia - a.importancia);

    const cuantitativas = preguntasCat.filter(p => p.tipo === 'cuantitativa');
    const cualitativas = preguntasCat.filter(p => p.tipo === 'cualitativa');

    // 2 cuantitativas mínimo
    for (let i = 0; i < 2 && i < cuantitativas.length && preguntasSeleccionadas.length < MAX_PREGUNTAS; i++) {
      preguntasSeleccionadas.push(cuantitativas[i]);
      usadasPreguntas.add(cuantitativas[i]._id);
    }

    // categoría más crítica → al menos 1 cualitativa
    if (index === 0 && cualitativas.length > 0 && preguntasSeleccionadas.length < MAX_PREGUNTAS) {
      preguntasSeleccionadas.push(cualitativas[0]);
      usadasPreguntas.add(cualitativas[0]._id);
    }

    // llenar resto según importancia
    for (const p of preguntasCat) {
      if (preguntasSeleccionadas.length >= MAX_PREGUNTAS) break;
      if (!usadasPreguntas.has(p._id)) {
        preguntasSeleccionadas.push(p);
        usadasPreguntas.add(p._id);
      }
    }
  });

  return {
    titulo: 'Formulario de seguimiento',
    descripcion: 'Basado en tu último resultado, estas preguntas buscan profundizar en las áreas críticas.',
    preguntas: preguntasSeleccionadas
  };
}
