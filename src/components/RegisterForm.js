import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
} from 'react-native';

import { registerUser } from '../services/authService';
import { styles } from '../styles/styles';

// Opciones de género (label = lo que se ve, value = lo que se guarda)
const GENERO_OPCIONES = [
  { label: 'Masculino', value: 'masculino' },
  { label: 'Femenino', value: 'femenino' },
  { label: 'Otro', value: 'otro' },
];

export default function RegisterForm({ onRegisterSuccess }) {
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [genero, setGenero] = useState('');      // guarda el value
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [error, setError] = useState('');
  const [showGeneroModal, setShowGeneroModal] = useState(false);

  const handleRegister = () => {
    if (!nombre.trim() || !edad.trim() || !genero || !email.trim() || !password.trim()) {
      setError('Por favor completa todos los campos.');
      return;
    }

    const edadNum = parseInt(edad, 10);
    if (isNaN(edadNum) || edadNum < 10 || edadNum > 120) {
      setError('Por favor ingresa una edad válida.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('El correo electrónico no es válido.');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (!aceptaTerminos) {
      setError('Debes aceptar los términos de privacidad.');
      return;
    }

    try {
      const newUser = registerUser({ nombre, edad, genero, email, password });
      onRegisterSuccess(newUser);
      Alert.alert('Registro exitoso', 'Usuario creado correctamente');
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  // Texto que se muestra en el recuadro de género
  const generoSeleccionado =
    GENERO_OPCIONES.find((opt) => opt.value === genero)?.label ||
    'Selecciona tu género';

  return (
    <View style={styles.authContainer}>
      <View style={styles.authForm}>

        {/* ICONO SUPERIOR */}
        <Image
          source={require('../img/medical-logo.png')}
          style={styles.illustration}
        />

        <Text style={styles.title}>Crear cuenta</Text>

        {/* ERROR */}
        {error ? <Text style={styles.error}>{error}</Text> : null}

        {/* NOMBRE */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Nombre completo</Text>
          <TextInput
            placeholder="Nombre completo"
            value={nombre}
            onChangeText={setNombre}
            style={styles.input}
          />
        </View>

        {/* EDAD */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Edad</Text>
          <TextInput
            placeholder="Edad"
            value={edad}
            onChangeText={setEdad}
            keyboardType="numeric"
            style={styles.input}
          />
        </View>

        {/* GÉNERO (FAKE PICKER DEL TAMAÑO DE UN INPUT) */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Género</Text>

          <TouchableOpacity
            onPress={() => setShowGeneroModal(true)}
            style={[
              styles.input,
              {
                justifyContent: 'center',
              },
            ]}
          >
            <Text
              style={{
                color: genero ? '#1F1F39' : '#A0A3B1',
                fontSize: 15,
              }}
            >
              {generoSeleccionado}
            </Text>
          </TouchableOpacity>
        </View>

        {/* EMAIL */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Correo electrónico</Text>
          <TextInput
            placeholder="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />
        </View>

        {/* CONTRASEÑA */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Contraseña</Text>
          <TextInput
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
        </View>

        {/* ACEPTAR TÉRMINOS */}
        <TouchableOpacity onPress={() => setAceptaTerminos(!aceptaTerminos)}>
          <Text
            style={{
              textAlign: 'left',
              width: '100%',
              marginTop: 6,
              marginBottom: 10,
              color: '#4A4A4A',
            }}
          >
            {aceptaTerminos ? '☑️' : '⬜️'} Acepto los términos de privacidad
          </Text>
        </TouchableOpacity>

        {/* BOTÓN */}
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrarme</Text>
        </TouchableOpacity>

      </View>

      {/* MODAL DE SELECCIÓN DE GÉNERO */}
      <Modal
        visible={showGeneroModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowGeneroModal(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.4)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              backgroundColor: '#FFFFFF',
              width: '80%',
              borderRadius: 16,
              padding: 20,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: '700',
                marginBottom: 12,
                textAlign: 'center',
              }}
            >
              Selecciona tu género
            </Text>

            {GENERO_OPCIONES.map((opcion) => (
              <TouchableOpacity
                key={opcion.value}
                onPress={() => {
                  setGenero(opcion.value);
                  setShowGeneroModal(false);
                }}
                style={{ paddingVertical: 10 }}
              >
                <Text style={{ fontSize: 16, textAlign: 'center' }}>
                  {opcion.label}
                </Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity onPress={() => setShowGeneroModal(false)}>
              <Text
                style={{
                  marginTop: 15,
                  textAlign: 'center',
                  color: '#407BFF',
                  fontWeight: '600',
                }}
              >
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
