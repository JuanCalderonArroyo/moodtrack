import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../../styles/styles';
import AdminHomeScreen from './AdminHomeScreen';
import AdminQuestionsScreen from './AdminQuestionsScreen';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Encabezado */}
      <View
        style={{
          backgroundColor: styles.colors.blue,
          paddingVertical: 20,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#fff', fontSize: 22, fontWeight: 'bold' }}>
          Panel de Administración
        </Text>
      </View>

      {/* Contenido dinámico */}
      <View style={{ flex: 1 }}>
        {activeTab === 'home' && <AdminHomeScreen />}
        {activeTab === 'preguntas' && <AdminQuestionsScreen />}
      </View>

      {/* Menú inferior */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          backgroundColor: '#f2f2f2',
          paddingVertical: 10,
          borderTopWidth: 1,
          borderColor: '#ccc',
        }}
      >
        <TouchableOpacity onPress={() => setActiveTab('home')}>
          <Text
            style={{
              color: activeTab === 'home' ? styles.colors.blue : '#475569',
              fontWeight: activeTab === 'home' ? 'bold' : 'normal',
            }}
          >
            Inicio
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveTab('preguntas')}>
          <Text
            style={{
              color: activeTab === 'preguntas' ? styles.colors.blue : '#475569',
              fontWeight: activeTab === 'preguntas' ? 'bold' : 'normal',
            }}
          >
            Preguntas
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
