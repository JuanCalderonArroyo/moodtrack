import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../../styles/styles';

export default function AdminHomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }}
    >
      <Text style={[styles.title, { color: styles.colors.blue }]}>
        Bienvenido, Administrador 
      </Text>
      <Text style={[styles.text, { textAlign: 'center', marginTop: 10 }]}>
        Desde aquí podrás gestionar las preguntas y supervisar la aplicación.
      </Text>
    </View>
  );
}
