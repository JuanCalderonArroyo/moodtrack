import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';

export default function AdminPanel({ user, onLogout }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: styles.colors.beige }}>
      <Text style={styles.title}>Bienvenido, {user.nombre}</Text>
      <Text style={{ marginVertical: 10, fontSize: 16 }}>Panel de administración</Text>
      <Text style={{ marginBottom: 30 }}>Aquí podrás gestionar usuarios, datos, etc.</Text>

      <TouchableOpacity style={styles.button} onPress={onLogout}>
        <Text style={styles.buttonText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}