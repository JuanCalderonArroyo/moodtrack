import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { obtenerResultadosPorUsuario } from '../../services/resultadoService';
import { getUserFromStorage } from '../../services/authService';
import { styles } from '../../styles/styles';

export default function HistorialScreen() {
  const navigation = useNavigation();
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(true);

  async function cargarResultados() {
    try {
      setLoading(true);
      const user = await getUserFromStorage();
      if (!user) throw new Error("Usuario no autenticado");
      const data = await obtenerResultadosPorUsuario(user._id);
      setResultados(data);
    } catch (error) {
      console.error('Error cargando resultados:', error);
      Alert.alert('Error', 'No se pudieron cargar tus resultados');
    } finally {
      setLoading(false);
    }
  }

  // 👇 Esto hace que se recargue cada vez que entres a esta pantalla
  useFocusEffect(
    useCallback(() => {
      cargarResultados();
    }, [])
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={styles.colors.blue} />
        <Text>Cargando historial...</Text>
      </View>
    );
  }

  if (resultados.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: styles.colors.text }}>Aún no tienes resultados registrados.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 20 }}>
      <Text style={[styles.title, { marginBottom: 15 }]}>Historial de resultados</Text>

      <FlatList
        data={resultados}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              backgroundColor: '#f2f2f2',
              borderRadius: 12,
              padding: 15,
              marginBottom: 10,
            }}
            onPress={() =>
              navigation.navigate('ResultadoScreen', { resultado: item })
            }
          >
            <Text style={[styles.subtitle, { fontSize: 16 }]}>
              {item.nivel.toUpperCase()} — {new Date(item.fecha_realizacion).toLocaleString()}
            </Text>
            <Text style={{ color: styles.colors.text, marginTop: 5 }}>
              Categorías: {item.estadisticas.length}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
