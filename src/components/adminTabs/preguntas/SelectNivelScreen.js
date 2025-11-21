import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function SelectNivelScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { action } = route.params; // 'editar'

  const handleNivelSelect = (nivel) => {
    navigation.navigate('SelectCategoria', { action, nivel });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona el nivel</Text>

      <TouchableOpacity style={styles.btn} onPress={() => handleNivelSelect('basico')}>
        <Text style={styles.btnText}>Básico</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => handleNivelSelect('seguimiento')}>
        <Text style={styles.btnText}>Seguimiento</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  btn: { backgroundColor: '#222', padding: 16, borderRadius: 10, marginBottom: 18 },
  btnText: { color: '#fff', fontSize: 18, textAlign: 'center', fontWeight: '600' },
});
