import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { loginUser } from '../services/authService';
import { styles } from '../styles/styles';

export default function LoginForm({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

const handleLogin = async () => {
  setError('');

  if (!email || !password) {
    setError('Por favor ingresa tu correo y contraseña');
    return;
  }

  try {
    const user = await loginUser(email.trim(), password); // 👈 AWAIT aquí
    onLoginSuccess(user);
    Alert.alert('Inicio de sesión exitoso', `Bienvenido, ${user.nombre}`);
  } catch (err) {
    setError(err.message || 'Error al iniciar sesión');
  }
};


  return (
    <View style={styles.authForm}>
      <Image
        source={require('../../assets/leaf-balance.png')}
        style={styles.illustration}
      />

      <Text style={styles.title}>Iniciar sesión</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          if (error) setError('');
        }}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          if (error) setError('');
        }}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>¿Olvidaste tu contraseña?</Text>
    </View>
  );
}
