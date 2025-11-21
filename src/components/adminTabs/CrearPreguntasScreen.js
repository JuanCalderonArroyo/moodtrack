import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CrearPreguntasScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🧠 Sección de creación de preguntas</Text>
      <Text style={styles.subtext}>Próximamente podrás crear y editar preguntas.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4A90E2',
    textAlign: 'center',
    marginHorizontal: 20,
  },
  subtext: {
    fontSize: 16,
    color: '#555',
    marginTop: 10,
  },
});
