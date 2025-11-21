import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { editarPregunta } from '../../../services/preguntasService';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function BorrarPreguntaScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { pregunta, preguntasCategoria } = route.params; // todas las preguntas de esa categoria y nivel

  const handleBorrar = async () => {
    // Contar cuántas preguntas activas del mismo tipo
    const activasMismoTipo = preguntasCategoria.filter(p => p.tipo === pregunta.tipo && p.activa);

    if (pregunta.tipo === 'cuantitativa' && activasMismoTipo.length <= 2) {
      return Alert.alert(
        'No permitido',
        'Debe haber al menos 2 preguntas cuantitativas activas en esta categoría.'
      );
    }

    if (pregunta.tipo === 'cualitativa' && activasMismoTipo.length <= 1) {
      return Alert.alert(
        'No permitido',
        'Debe haber al menos 1 pregunta cualitativa activa en esta categoría.'
      );
    }

    // Si pasa validación, desactivar
    try {
      await editarPregunta(pregunta._id, { activa: false });
      Alert.alert('Éxito', 'Pregunta desactivada correctamente', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'No se pudo desactivar la pregunta');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.warning}>
        ¿Estás seguro que deseas desactivar esta pregunta?
      </Text>
      <Text style={styles.question}>{pregunta.texto}</Text>

      <TouchableOpacity style={[styles.btn, { backgroundColor: '#8b0000' }]} onPress={handleBorrar}>
        <Text style={styles.btnText}>Desactivar Pregunta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' },
  warning: { fontSize: 18, fontWeight: '600', marginBottom: 20, textAlign: 'center', color: '#555' },
  question: { fontSize: 16, textAlign: 'center', marginBottom: 40 },
  btn: { padding: 16, borderRadius: 10 },
  btnText: { color: '#fff', fontSize: 18, textAlign: 'center', fontWeight: '600' },
});
