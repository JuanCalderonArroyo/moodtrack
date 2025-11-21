import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { editarPregunta } from '../../../services/preguntasService';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function EditarPreguntaScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { pregunta } = route.params;

  const [texto, setTexto] = useState(pregunta.texto);
  const [importancia, setImportancia] = useState(pregunta.importancia);
  const [opcionesText, setOpcionesText] = useState(
    pregunta.tipo === 'cuantitativa' ? pregunta.opciones.map(o => o.texto) : []
  );

  const generarValores = (n) => {
    if (n === 2) return [1, 5];
    if (n === 3) return [1, 3, 5];
    if (n === 4) return [1, 2, 4, 5];
    if (n === 5) return [1, 2, 3, 4, 5];
    return [];
  };

  const handleAgregarOpcion = () => {
    if (opcionesText.length >= 5) return;
    setOpcionesText([...opcionesText, '']);
  };

  const handleQuitarOpcion = (index) => {
    if (opcionesText.length <= 2) return;
    const newOpciones = opcionesText.filter((_, i) => i !== index);
    setOpcionesText(newOpciones);
  };

  const handleEditar = async () => {
    if (!texto.trim()) return Alert.alert('Error', 'El texto de la pregunta es obligatorio');

    let opciones = [];
    if (pregunta.tipo === 'cuantitativa') {
      if (opcionesText.some(o => !o.trim()))
        return Alert.alert('Error', 'Todas las opciones deben tener texto');
      const valores = generarValores(opcionesText.length);
      opciones = opcionesText.map((t, i) => ({ texto: t, valor: valores[i] }));
    }

    const data = { texto, importancia, opciones };
    try {
      await editarPregunta(pregunta._id, data);
      Alert.alert('Éxito', 'Pregunta editada correctamente', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'No se pudo editar la pregunta');
    }
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.label}>Texto de la pregunta</Text>
      <TextInput
        style={styles.input}
        value={texto}
        onChangeText={setTexto}
        placeholder="Escribe la pregunta"
      />

      <Text style={styles.label}>Importancia (1-5)</Text>
      <TextInput
        style={styles.input}
        value={importancia.toString()}
        onChangeText={(val) => {
          let num = Number(val);
          if (num < 1) num = 1;
          if (num > 5) num = 5;
          setImportancia(num);
        }}
        keyboardType="numeric"
        placeholder="Valor de importancia"
      />

      {pregunta.tipo === 'cuantitativa' && (
        <>
          <Text style={styles.label}>Opciones</Text>
          {opcionesText.map((opt, i) => (
            <View key={i} style={styles.opcionRow}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder={`Opción ${i + 1}`}
                value={opt}
                onChangeText={(text) => {
                  const newOpciones = [...opcionesText];
                  newOpciones[i] = text;
                  setOpcionesText(newOpciones);
                }}
              />
              <TouchableOpacity style={styles.quitarBtn} onPress={() => handleQuitarOpcion(i)}>
                <Text style={styles.quitarText}>–</Text>
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: '#555', marginTop: 10 }]}
            onPress={handleAgregarOpcion}
          >
            <Text style={styles.btnText}>Agregar opción</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity style={styles.btn} onPress={handleEditar}>
        <Text style={styles.btnText}>Guardar Cambios</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  label: { fontSize: 16, fontWeight: '600', marginVertical: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
  },
  btn: { backgroundColor: '#4A90E2', padding: 16, borderRadius: 10, marginTop: 20 },
  btnText: { color: '#fff', fontSize: 18, textAlign: 'center', fontWeight: '600' },
  opcionRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  quitarBtn: {
    backgroundColor: '#8b0000',
    width: 35,
    height: 35,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  quitarText: { color: '#fff', fontSize: 24, lineHeight: 24, textAlign: 'center' },
});
