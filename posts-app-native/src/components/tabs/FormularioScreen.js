import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { getFormulario } from '../../services/FormulariosService';
import { styles } from '../../styles/styles';
import { useNavigation } from '@react-navigation/native';

export default function FormularioScreen() {
  const navigation = useNavigation(); 
  const formulario = getFormulario(); // obtenemos el formulario del servicio
  const [respuestas, setRespuestas] = useState({});

  // Función para guardar la respuesta seleccionada
  const handleSelectOption = (preguntaId, opcion) => {
    setRespuestas(prev => ({ ...prev, [preguntaId]: opcion }));
  };

  // Función para manejar texto libre (preguntas abiertas)
  const handleTextChange = (preguntaId, texto) => {
    setRespuestas(prev => ({ ...prev, [preguntaId]: texto }));
  };

  // Función para enviar el formulario
  const handleSubmit = () => {
    const faltantes = formulario.preguntas.filter(
      p => p.obligatoria && !respuestas[p.id]
    );
    if (faltantes.length > 0) {
      Alert.alert('Formulario incompleto', 'Por favor responde todas las preguntas obligatorias');
      return;
    }

    Alert.alert('Formulario enviado', JSON.stringify(respuestas, null, 2), [{ text: 'Aceptar', onPress: () => navigation.goBack() }]);
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={styles.title}>{formulario.titulo}</Text>

      {formulario.preguntas.map(pregunta => (
        <View key={pregunta.id} style={{ marginVertical: 10 }}>
          <Text style={styles.subtitle}>
            {pregunta.orden}. {pregunta.texto}
            {!pregunta.obligatoria && <Text style={{ color: 'gray' }}> (opcional)</Text>}
          </Text>

          {/* 🔹 Si la pregunta es de texto libre */}
          {pregunta.tipo === 'texto' ? (
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 8,
                padding: 10,
                marginTop: 8,
                color: '#333',
              }}
              placeholder="Escribe tu respuesta aquí..."
              multiline
              value={respuestas[pregunta.id] || ''}
              onChangeText={texto => handleTextChange(pregunta.id, texto)}
            />
          ) : (
            // 🔹 Si la pregunta tiene opciones
            pregunta.opciones.map((opcion, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  respuestas[pregunta.id] === opcion && {
                    backgroundColor: styles.colors.blue,
                  },
                ]}
                onPress={() => handleSelectOption(pregunta.id, opcion)}
              >
                <Text
                  style={{
                    color:
                      respuestas[pregunta.id] === opcion
                        ? 'white'
                        : styles.colors.text,
                  }}
                >
                  {opcion}
                </Text>
              </TouchableOpacity>
            ))
          )}
        </View>
      ))}

      <TouchableOpacity style={[styles.button, { marginTop: 30 }]} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Enviar respuestas</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
