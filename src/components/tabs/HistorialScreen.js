// src/components/tabs/HistorialScreen.js
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { obtenerResultadosPorUsuario } from '../../services/resultadoService';
import { getUserFromStorage } from '../../services/authService';
import { styles as globalStyles } from '../../styles/styles';

export default function HistorialScreen() {
  const navigation = useNavigation();
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(true);

  async function cargarResultados() {
    try {
      setLoading(true);
      const user = await getUserFromStorage();
      if (!user) throw new Error('Usuario no autenticado');
      const data = await obtenerResultadosPorUsuario(user._id);
      setResultados(data);
    } catch (error) {
      console.error('Error cargando resultados:', error);
      Alert.alert('Error', 'No se pudieron cargar tus resultados');
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      cargarResultados();
    }, []),
  );

  if (loading) {
    return (
      <View style={localStyles.centered}>
        <ActivityIndicator size="large" color={globalStyles.colors.primary} />
        <Text style={localStyles.centerText}>Cargando historial...</Text>
      </View>
    );
  }

  if (resultados.length === 0) {
    return (
      <View style={localStyles.centered}>
        <Text style={localStyles.centerText}>
          Aún no tienes resultados registrados.
        </Text>
      </View>
    );
  }

  return (
    <View style={localStyles.container}>
      {/* CABECERA */}
      <Text style={[globalStyles.title, localStyles.headerTitle]}>
        Historial de resultados
      </Text>
      <Text style={localStyles.headerSubtitle}>
        Revisa los formularios que has completado y sus resultados.
      </Text>

      {/* LISTA */}
      <FlatList
        data={resultados}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingBottom: 24 }}
        renderItem={({ item }) => {
          const fechaTexto = new Date(item.fecha_iso).toLocaleString();

          return (
            <TouchableOpacity
              style={localStyles.card}
              onPress={() =>
                navigation.navigate('ResultadoScreen', { resultado: item })
              }
            >
              <View style={localStyles.cardHeaderRow}>
                <Text style={localStyles.levelPill}>
                  {item.nivel.toUpperCase()}
                </Text>
                <Text style={localStyles.dateText}>{fechaTexto}</Text>
              </View>

              <Text style={localStyles.categoriesText}>
                Categorías evaluadas:{' '}
                <Text style={{ fontWeight: '700' }}>
                  {item.estadisticas.length}
                </Text>
              </Text>

              <Text style={localStyles.cardHint}>
                Toca para ver el detalle de este resultado.
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 30,
  },

  // Cabecera
  headerTitle: {
    color: '#407BFF', // azul principal
    textAlign: 'center',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B6E8A',
    textAlign: 'center',
    marginBottom: 20,
  },

  // Estados centrados (loading / vacío)
  centered: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  centerText: {
    marginTop: 10,
    fontSize: 15,
    color: '#6B6E8A',
    textAlign: 'center',
  },

  // Tarjeta de resultado
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,

    // sombra suave
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },

  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  levelPill: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: '#E7F0FF',
    color: '#407BFF',
    fontWeight: '700',
    fontSize: 13,
  },

  dateText: {
    fontSize: 13,
    color: '#6B6E8A',
  },

  categoriesText: {
    fontSize: 14,
    color: '#1F1F39',
    marginBottom: 4,
  },

  cardHint: {
    fontSize: 12,
    color: '#A0A3B1',
  },
});
