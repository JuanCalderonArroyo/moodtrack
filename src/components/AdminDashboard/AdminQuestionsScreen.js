import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';

export default function AdminPanel({ user, onLogout }) {
  return (
    <View style={styles.screenContainer}>
      {/* Saludo principal */}
      <Text style={{ fontSize: 26, fontWeight: '800', color: '#1F1F39', textAlign: 'center', marginBottom: 6 }}>
        Hola, {user.nombre} 
      </Text>

      <Text style={{ fontSize: 15, color: '#6B6E8A', textAlign: 'center', marginBottom: 4 }}>
        Bienvenido a tu panel de administración.
      </Text>

      <Text style={{ fontSize: 15, color: '#6B6E8A', textAlign: 'center', marginBottom: 24 }}>
        Aquí podrás gestionar usuarios, datos y configuraciones del sistema.
      </Text>

      {/* Botón cerrar sesión */}
      <TouchableOpacity
        style={{
          backgroundColor: styles.colors.primary,
          paddingVertical: 16,
          paddingHorizontal: 60,
          borderRadius: 12,
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 10,
          elevation: 3,
        }}
        onPress={onLogout}
      >
        <Text style={{ color: '#FFFFFF', fontSize: 17, fontWeight: '700' }}>
          Cerrar sesión
        </Text>
      </TouchableOpacity>
    </View>
  );
}
