import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  StyleSheet
} from 'react-native';

import { styles } from '../../styles/styles';
import { useNavigation } from '@react-navigation/native';
import { cargarDatosIniciales, enviarFormulario } from './FormularioLogic';
import { obtenerResultadosPorUsuario } from '../../services/resultadoService';
import { generarFormularioSeguimiento } from './SeguimientoLogic';
import { getFormularioBasico, getTodasPreguntas } from '../../services/FormularioService';

export default function FormularioScreen() {
  const navigation = useNavigation();
  const [formulario, setFormulario] = useState(null);
  const [respuestas, setRespuestas] = useState({});
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [modo, setModo] = useState(null);

  // Cargar usuario
  useEffect(() => {
    async function init() {
      const userData = await cargarDatosIniciales(null, setUser, null);
      setUser(userData);
    }
    init();
  }, []);

  // Cargar formulario según modo
  useEffect(() => {
    async function cargarFormulario() {
      if (!user || !modo) return;

      setLoading(true);

      try {
        if (modo === "basico") {
          const form = await getFormularioBasico();
          setFormulario(form);

        } else {
          const resultados = await obtenerResultadosPorUsuario(user._id);
          const ultimo = resultados.length > 0 ? resultados[resultados.length - 1] : null;

          if (!ultimo) {
            setModo(null);
            Alert.alert("Sin cuestionarios previos", "Primero debes completar un formulario básico.");
            setLoading(false);
            return;
          }

          const preguntas = await getTodasPreguntas();
          const form = generarFormularioSeguimiento(ultimo, preguntas);

          if (form?.preguntas?.length === 0) {
            setModo(null);
            Alert.alert("No se requiere seguimiento", "Tus resultados no presentan niveles críticos.");
            setLoading(false);
            return;
          }

          setFormulario(form);
        }
      } catch (err) {
        console.error(err);
        Alert.alert("Error", "No se pudo cargar el formulario");
      } finally {
        setLoading(false);
      }
    }

    cargarFormulario();
  }, [modo, user]);

  // Guardar respuestas
  const handleSelectOption = (id, opcion) => {
    setRespuestas(prev => ({ ...prev, [id]: opcion }));
  };

  const handleTextChange = (id, texto) => {
    setRespuestas(prev => ({ ...prev, [id]: texto }));
  };

  const handleSubmit = () => {
    enviarFormulario({ formulario, respuestas, user, navigation, modo });
  };

  // Pantalla de seleccionar tipo de formulario
  if (!modo) {
    return (
      <View style={localStyles.centerContainer}>
        <Text style={localStyles.selectorTitle}>Selecciona el tipo de formulario</Text>

        <TouchableOpacity
          style={[styles.button, localStyles.selectorButton]}
          onPress={() => setModo("basico")}
        >
          <Text style={styles.buttonText}>Formulario Básico</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, localStyles.selectorButton]}
          onPress={() => setModo("seguimiento")}
        >
          <Text style={styles.buttonText}>Formulario Seguimiento</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Cargando formulario
  if (loading || !formulario) {
    return (
      <View style={localStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#407BFF" />
        <Text style={{ marginTop: 10 }}>Cargando formulario...</Text>
      </View>
    );
  }

  // Pantalla de formulario
  return (
    <ScrollView contentContainerStyle={localStyles.container}>
      <Text style={localStyles.title}>{formulario.titulo}</Text>

      {formulario.preguntas.map(p => (
        <View key={p._id} style={localStyles.card}>
          <Text style={localStyles.questionText}>{p.texto}</Text>

          {p.tipo === "cualitativa" ? (
            <TextInput
              style={localStyles.textInput}
              placeholder="Escribe tu respuesta..."
              multiline
              value={respuestas[p._id] || ""}
              onChangeText={t => handleTextChange(p._id, t)}
            />
          ) : (
            p.opciones.map((op, i) => {
              const selected = respuestas[p._id]?.valor === op.valor;
              return (
                <TouchableOpacity
                  key={i}
                  style={[
                    localStyles.optionButton,
                    selected && localStyles.optionButtonSelected
                  ]}
                  onPress={() => handleSelectOption(p._id, op)}
                >
                  <Text style={[
                    localStyles.optionText,
                    selected && localStyles.optionTextSelected
                  ]}>
                    {op.texto}
                  </Text>
                </TouchableOpacity>
              );
            })
          )}
        </View>
      ))}

      <TouchableOpacity style={localStyles.submitBtn} onPress={handleSubmit}>
        <Text style={localStyles.submitText}>Enviar respuestas</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// ----------------------------
// ESTILOS LINDOS ✨
// ----------------------------

const localStyles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFF",
  },

  // Selector de tipo de formulario
  selectorTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
    color: "#1F1F39",
  },
  selectorButton: {
    width: "80%",
    marginBottom: 20,
  },

  // Loading
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  // Formulario
  title: {
    fontSize: 26,
    fontWeight: "800",
    textAlign: "center",
    color: "#1F1F39",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#F8F9FF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E0E4F0",
  },

  questionText: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#1F1F39",
  },

  // Input
  textInput: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D6D9E0",
    padding: 12,
    fontSize: 15,
    color: "#333",
    minHeight: 70,
  },

  // Opciones
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: "#ECEEF5",
    marginTop: 8,
  },
  optionButtonSelected: {
    backgroundColor: "#407BFF",
  },
  optionText: {
    fontSize: 15,
    color: "#1F1F39",
  },
  optionTextSelected: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  // Enviar
  submitBtn: {
    marginTop: 30,
    backgroundColor: "#407BFF",
    paddingVertical: 15,
    borderRadius: 12,
  },
  submitText: {
    color: "#FFF",
    fontSize: 17,
    fontWeight: "700",
    textAlign: "center",
  },
});
