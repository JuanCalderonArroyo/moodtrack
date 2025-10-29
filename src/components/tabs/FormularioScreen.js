// src/components/tabs/FormularioScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { styles } from '../../styles/styles';
import { useNavigation } from '@react-navigation/native';
import { cargarDatosIniciales, enviarFormulario } from './FormularioLogic';

export default function FormularioScreen() {
  const navigation = useNavigation();
  const [formulario, setFormulario] = useState(null);
  const [respuestas, setRespuestas] = useState({});
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    cargarDatosIniciales(setFormulario, setUser, setLoading);
  }, []);

  const handleSelectOption = (preguntaId, opcion) => {
    setRespuestas(prev => ({ ...prev, [preguntaId]: opcion }));
  };

  const handleTextChange = (preguntaId, texto) => {
    setRespuestas(prev => ({ ...prev, [preguntaId]: texto }));
  };

  const handleSubmit = () => {
    enviarFormulario({ formulario, respuestas, user, navigation });
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Cargando formulario...</Text>
      </View>
    );
  }

  if (!formulario) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No se pudo cargar el formulario.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={styles.title}>{formulario.titulo}</Text>

      {formulario.preguntas.map(pregunta => (
        <View key={pregunta._id} style={{ marginVertical: 10 }}>
          <Text style={styles.subtitle}>{pregunta.texto}</Text>

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
              value={respuestas[pregunta._id] || ''}
              onChangeText={texto => handleTextChange(pregunta._id, texto)}
            />
          ) : (
            pregunta.opciones.map((opcion, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  respuestas[pregunta._id] === opcion && { backgroundColor: styles.colors.blue },
                ]}
                onPress={() => handleSelectOption(pregunta._id, opcion)}
              >
                <Text style={{ color: respuestas[pregunta._id] === opcion ? 'white' : styles.colors.text }}>
                  {opcion.texto || opcion}
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
