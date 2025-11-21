// src/components/tabs/ResultadoScreen.js
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { styles as globalStyles } from '../../styles/styles';

export default function ResultadoScreen({ route }) {
  const { resultado } = route.params;

  const comentario = resultado.comentario_ai || '';
  const isGenerating =
    !comentario ||
    comentario.toLowerCase().includes('generando');

  return (
    <ScrollView
      contentContainerStyle={localStyles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* TÍTULO */}
      <Text style={[globalStyles.title, localStyles.title]}>
        Resultado del cuestionario
      </Text>

      {/* NIVEL */}
      <View style={localStyles.levelRow}>
        <Text style={localStyles.levelLabel}>Nivel</Text>
        <Text style={localStyles.levelPill}>
          {resultado.nivel?.toUpperCase() || 'N/A'}
        </Text>
      </View>

      {/* LISTA DE CATEGORÍAS */}
      <Text style={localStyles.sectionLabel}>Resumen por categorías</Text>

      {resultado.estadisticas.map((item, index) => (
        <View key={index} style={localStyles.card}>
          <Text style={localStyles.cardTitle}>{item.categoria}</Text>
          <Text style={localStyles.cardSubtitle}>
            Promedio:{' '}
            <Text style={localStyles.cardAvg}>
              {item.promedio.toFixed(2)}
            </Text>
          </Text>
        </View>
      ))}

      {/* COMENTARIO DEL SISTEMA */}
      <View style={localStyles.commentCard}>
        <Text style={localStyles.commentTitle}>
          Comentario del sistema (IA)
        </Text>

        {isGenerating ? (
          <Text style={localStyles.commentPlaceholder}>
            Estamos generando un comentario personalizado para ti... 💭
          </Text>
        ) : (
          <Text style={localStyles.commentText}>{comentario}</Text>
        )}
      </View>
    </ScrollView>
  );
}

const localStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 32,
    backgroundColor: '#FFFFFF',
  },

  title: {
    textAlign: 'center',
    marginBottom: 20,
  },

  // Nivel
  levelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  levelLabel: {
    fontSize: 15,
    color: '#555555',
    marginRight: 8,
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

  sectionLabel: {
    fontSize: 15,
    color: '#6B6E8A',
    marginBottom: 10,
  },

  // Tarjetas de categorías
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 8,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 1,
  },
  cardTitle: {
    fontWeight: '700',
    fontSize: 15,
    color: '#1F1F39',
    marginBottom: 4,
    textTransform: 'lowercase',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#555555',
  },
  cardAvg: {
    fontWeight: '700',
    color: '#1F1F39',
  },

  // Comentario IA
  commentCard: {
    marginTop: 22,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#F5F7FF',
  },
  commentTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F1F39',
    marginBottom: 6,
  },
  commentText: {
    fontSize: 14,
    color: '#4A4A4A',
    lineHeight: 20,
  },
  commentPlaceholder: {
    fontSize: 14,
    color: '#A0A3B1',
    fontStyle: 'italic',
  },
});
