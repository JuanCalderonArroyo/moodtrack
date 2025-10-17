import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen({ user }) {

  const navigation = useNavigation(); 

  const hacerForm = () => {
    try {
      // En lugar de actualizar datos, ahora navegamos
      navigation.navigate('Formulario'); // Esto te lleva a FormularioScreen
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hola, {user?.nombre || 'Usuario'} 👋</Text>
      <Text style={{ textAlign: 'center', color: '#555' }}>
        Bienvenido a tu panel. Aquí podrás seguir tu progreso emocional.
      </Text>      
      <TouchableOpacity style={styles.FormButton} onPress={hacerForm}>
        <Text style={styles.buttonText}>Realizar formulario</Text>
      </TouchableOpacity>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF3DD',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  pickerContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  saveButton: {
    backgroundColor: '#5E8C61',
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
  },
  FormButton: {
    backgroundColor: '#2596ecff',
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
