// src/components/tabs/ResultadoScreen.js
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styles } from '../../styles/styles';

export default function ResultadoScreen({ route }) {
  const { resultado } = route.params;

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={styles.title}>Resultado del cuestionario</Text>
      <Text style={[styles.subtitle, { marginBottom: 10 }]}>
        Nivel: {resultado.nivel}
      </Text>

      {resultado.estadisticas.map((item, index) => (
        <View
          key={index}
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
            padding: 10,
            marginVertical: 5,
          }}
        >
          <Text style={{ fontWeight: 'bold' }}>{item.categoria}</Text>
          <Text>Promedio: {item.promedio.toFixed(2)}</Text>
        </View>
      ))}

      <View style={{ marginTop: 20 }}>
        <Text style={styles.subtitle}>Comentario del sistema</Text>
        <Text>{resultado.comentario_ai}</Text>
      </View>
    </ScrollView>
  );
}
