import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const categorias = [
  'estrés',
  'ánimo o estado emocional',
  'relaciones o apoyo social',
  'salud física y hábitos',
  'autoestima o autopercepción',
  'propósito o motivación vital',
  'productividad o concentración',
];

export default function SelectCategoriaScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { action, nivel } = route.params;

  const handleCategoriaSelect = (categoria) => {
    if (action === 'crear') {
      // Navega directamente a la pantalla de creación
      navigation.navigate('CrearPregunta', { nivel, categoria });
    } else {
      // Para editar o borrar, muestra la lista de preguntas
      navigation.navigate('ListarPreguntas', { action, nivel, categoria });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona la categoría</Text>

      <FlatList
        data={categorias}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.btn} onPress={() => handleCategoriaSelect(item)}>
            <Text style={styles.btnText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  btn: { backgroundColor: '#222', padding: 14, borderRadius: 10, marginBottom: 12 },
  btnText: { color: '#fff', fontSize: 16, textAlign: 'center' },
});
