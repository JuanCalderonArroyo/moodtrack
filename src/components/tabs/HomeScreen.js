import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen({ user }) {

  const navigation = useNavigation(); 

  const hacerForm = () => {
    try {
      navigation.navigate('Formulario');
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  return (
    <View style={localStyles.container}>

      {/* Saludo */}
      <Text style={localStyles.title}>
        Hola, {user?.nombre || 'Usuario'} 
      </Text>

      {/* Subtítulo */}
      <Text style={localStyles.subtitle}>
        Bienvenido a tu panel. Aquí podrás seguir tu progreso emocional.
      </Text>

      {/* Botón */}
      <TouchableOpacity style={localStyles.button} onPress={hacerForm}>
        <Text style={localStyles.buttonText}>Realizar formulario</Text>
      </TouchableOpacity>

    </View>
  );
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // 👈 FONDO BLANCO FORZADO
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1F1F39',
    textAlign: 'center',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 15,
    color: '#6B6E8A',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 20,
  },

  button: {
    backgroundColor: '#407BFF',
    paddingVertical: 16,
    width: '80%',
    borderRadius: 12,
    alignItems: 'center',

    // sombra bonita estilo iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
  },
});
