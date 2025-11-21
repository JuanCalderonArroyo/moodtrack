import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function PreguntasDashboardScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Administrar Preguntas</Text>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('SelectCategoria', { action: 'crear', nivel: 'seguimiento' })
}
      >
        <Text style={styles.btnText}>Crear Pregunta</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('SelectNivel', { action: 'editar' })}
      >
        <Text style={styles.btnText}>Editar Pregunta</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btn, { backgroundColor:'#8b0000' }]}
        onPress={() => navigation.navigate('SelectCategoria', { action: 'borrar', nivel: 'seguimiento' })}
      >
        <Text style={styles.btnText}>Borrar Pregunta</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:20,
    justifyContent:'center',
    backgroundColor:'#fff'
  },
  title:{
    fontSize:25,
    fontWeight:'bold',
    marginBottom:40,
    textAlign:'center'
  },
  btn:{
    backgroundColor:'#222',
    padding:16,
    borderRadius:10,
    marginBottom:18
  },
  btnText:{
    fontSize:19,
    color:'#fff',
    textAlign:'center',
    fontWeight:'600'
  }
});

