import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { crearPregunta } from '../../../services/preguntasService';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function CrearPreguntaScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { categoria, nivel } = route.params;

  const [texto, setTexto] = useState('');
  const [tipo, setTipo] = useState('cuantitativa'); // 'cuantitativa' o 'cualitativa'
  const [importancia, setImportancia] = useState(3);
  const [opcionesText, setOpcionesText] = useState(['', '']); // mínimo 2

  // Genera los valores automáticos según número de opciones
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

  const handleCrear = async () => {
    if (!texto.trim()) return Alert.alert('Error', 'El texto de la pregunta es obligatorio');

    let opciones = [];
    if (tipo === 'cuantitativa') {
      if (opcionesText.some((o) => !o.trim()))
        return Alert.alert('Error', 'Todas las opciones deben tener texto');
      const valores = generarValores(opcionesText.length);
      opciones = opcionesText.map((t, i) => ({ texto: t, valor: valores[i] }));
    }

    const nuevaPregunta = { texto, tipo, categoria, nivel, importancia, opciones, activa: true };

    try {
      await crearPregunta(nuevaPregunta);
      Alert.alert('Éxito', 'Pregunta creada correctamente', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'No se pudo crear la pregunta');
    }
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.label}>Categoría: {categoria}</Text>

      <Text style={styles.label}>Tipo de pregunta</Text>
      <View style={styles.tipoContainer}>
        <TouchableOpacity
          style={[styles.tipoBtn, tipo === 'cuantitativa' && styles.tipoSelected]}
          onPress={() => setTipo('cuantitativa')}
        >
          <Text style={styles.tipoText}>Cuantitativa</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tipoBtn, tipo === 'cualitativa' && styles.tipoSelected]}
          onPress={() => setTipo('cualitativa')}
        >
          <Text style={styles.tipoText}>Cualitativa</Text>
        </TouchableOpacity>
      </View>

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
      />

      {tipo === 'cuantitativa' && (
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
              <TouchableOpacity
                style={styles.quitarBtn}
                onPress={() => handleQuitarOpcion(i)}
              >
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

      <TouchableOpacity style={styles.btn} onPress={handleCrear}>
        <Text style={styles.btnText}>Crear Pregunta</Text>
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
  tipoContainer: { flexDirection: 'row', marginBottom: 12 },
  tipoBtn: { flex: 1, padding: 12, borderWidth: 1, borderColor: '#222', borderRadius: 8, marginHorizontal: 4 },
  tipoSelected: { backgroundColor: '#222' },
  tipoText: { color: '#fff', textAlign: 'center', fontWeight: '600' },
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
