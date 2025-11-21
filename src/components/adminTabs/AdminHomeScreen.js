import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { logoutUser } from '../../services/authService';

export default function AdminHomeScreen({ onLogout }) {
  const handleLogout = async () => {
    try {
      await logoutUser(); // ✅ limpia el AsyncStorage
      onLogout(); // ✅ vuelve al login
      Alert.alert('Sesión cerrada', 'Has cerrado sesión correctamente');
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'No se pudo cerrar la sesión');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Bienvenido, Administrador</Text>
      <Text style={styles.subtitle}>
        Desde aquí podrás gestionar el sistema y crear nuevas preguntas.
      </Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  logoutButton: {
    backgroundColor: '#444',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  logoutText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
