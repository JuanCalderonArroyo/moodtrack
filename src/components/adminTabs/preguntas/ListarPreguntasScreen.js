import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getPreguntasPorCategoria } from '../../../services/preguntasService';

export default function ListarPreguntasScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { action, nivel, categoria } = route.params;

  const [preguntas, setPreguntas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPreguntas() {
      try {
        const data = await getPreguntasPorCategoria(nivel, categoria);
        setPreguntas(data);
      } catch (err) {
        Alert.alert('Error', 'No se pudieron cargar las preguntas');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchPreguntas();
  }, [nivel, categoria]);

  const handleAction = (pregunta) => {
    if (action === 'crear') {
      navigation.navigate('CrearPregunta', { nivel, categoria });
    } else if (action === 'editar') {
      navigation.navigate('EditarPregunta', { pregunta });
    } else if (action === 'borrar') {
      // Pasamos también todas las preguntas de la categoría para la validación
      navigation.navigate('BorrarPregunta', { pregunta, preguntasCategoria: preguntas });
    }
  };

  if (loading)
    return <ActivityIndicator size="large" style={{ flex: 1, justifyContent: 'center' }} />;

  if (preguntas.length === 0)
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>No hay preguntas en esta categoría.</Text>
        {action === 'crear' && (
          <TouchableOpacity style={styles.btn} onPress={() => handleAction(null)}>
            <Text style={styles.btnText}>Crear primera pregunta</Text>
          </TouchableOpacity>
        )}
      </View>
    );

  return (
    <View style={styles.container}>
      <FlatList
        data={preguntas}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.btn} onPress={() => handleAction(item)}>
            <Text style={styles.btnText}>{item.texto}</Text>
          </TouchableOpacity>
        )}
      />
      {action === 'crear' && (
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: '#4A90E2' }]}
          onPress={() => handleAction(null)}
        >
          <Text style={styles.btnText}>Crear nueva pregunta</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  btn: { backgroundColor: '#222', padding: 14, borderRadius: 10, marginBottom: 12 },
  btnText: { color: '#fff', fontSize: 16 },
  noDataText: { fontSize: 18, textAlign: 'center', marginVertical: 20, color: '#555' },
});
