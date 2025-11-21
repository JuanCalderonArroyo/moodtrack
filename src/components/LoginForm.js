import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';

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
      const user = await loginUser(email.trim(), password);
      onLoginSuccess(user);
      Alert.alert('Inicio de sesión exitoso', `Bienvenido, ${user.nombre}`);
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    }
  };

  return (
    <View style={styles.authContainer}>
      {/* RECUADRO */}
      <View style={styles.authForm}>
        {/* ICONO MÉDICO */}
        <Image
          source={require('../img/medical-logo.png')}
          style={styles.illustration}
        />

        <Text style={styles.title}>Iniciar sesión</Text>

        {/* ERROR */}
        {error ? <Text style={styles.error}>{error}</Text> : null}

        {/* EMAIL */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Correo electrónico</Text>
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
        </View>

        {/* PASSWORD */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Contraseña</Text>
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
        </View>

        {/* BOTÓN */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
