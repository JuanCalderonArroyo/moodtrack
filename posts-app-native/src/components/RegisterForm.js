import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { registerUser } from '../services/authService';
import { styles } from '../styles/styles';

export default function RegisterForm({ onRegisterSuccess }) {
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [genero, setGenero] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = () => {
    // --- Validaciones básicas ---
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

    // --- Si pasa todas las validaciones ---
    try {
      const newUser = registerUser({ nombre, edad, genero, email, password });
      onRegisterSuccess(newUser);
      Alert.alert('✅ Registro exitoso', 'Usuario registrado con éxito');
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <View style={styles.authForm}>
      <Image source={require('../../assets/leaf-balance.png')} style={styles.illustration} />
      <Text style={styles.title}>Crear cuenta</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput
        placeholder="Nombre completo"
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
      />
      <TextInput
        placeholder="Edad"
        value={edad}
        onChangeText={setEdad}
        keyboardType="numeric"
        style={styles.input}
      />

      {/* Picker para género */}
      <View style={{ width: '100%', backgroundColor: '#fff', borderRadius: 10, marginVertical: 8 }}>
        <Picker
          selectedValue={genero}
          onValueChange={setGenero}
          style={{ color: '#4A4A4A' }}
        >
          <Picker.Item label="Selecciona tu género" value="" />
          <Picker.Item label="Masculino" value="masculino" />
          <Picker.Item label="Femenino" value="femenino" />
          <Picker.Item label="Otro" value="otro" />
        </Picker>
      </View>

      <TextInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity onPress={() => setAceptaTerminos(!aceptaTerminos)}>
        <Text style={styles.terms}>
          {aceptaTerminos ? '☑️' : '⬜️'} Acepto los términos de privacidad
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarme</Text>
      </TouchableOpacity>
    </View>
  );
}
