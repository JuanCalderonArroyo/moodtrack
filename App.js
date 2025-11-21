import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginForm from './src/components/LoginForm';
import RegisterForm from './src/components/RegisterForm';
import Dashboard from './src/components/Dashboard';
import AdminDashboard from './src/components/AdminDashboard';
import { styles } from './src/styles/styles';

export default function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('login'); // login | register

  // Cargar usuario guardado
  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };
    loadUser();
  }, []);

  // Si ya está logueado
  if (user) {
    if (user.rol === 'admin') {
      return (
        <AdminDashboard
          user={user}
          onLogout={async () => {
            await AsyncStorage.removeItem('user');
            setUser(null);
          }}
        />
      );
    }

    return (
      <Dashboard
        user={user}
        onLogout={async () => {
          await AsyncStorage.removeItem('user');
          setUser(null);
        }}
        onUserUpdate={setUser}
      />
    );
  }

  // Pantallas de Login / Registro
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#FFFFFF' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',   // 🔥 CENTRADO VERTICAL
          alignItems: 'center',       // 🔥 CENTRADO HORIZONTAL
          paddingVertical: 40,
          paddingHorizontal: 16,
          backgroundColor: '#FFFFFF',
        }}
        keyboardShouldPersistTaps="handled"
      >
        {view === 'login' ? (
          <View style={{ alignItems: 'center', width: '100%' }}>
            {/* TITULOS SUPERIORES */}

            {/* FORMULARIO LOGIN */}
            <LoginForm onLoginSuccess={setUser} />

            {/* TEXTO REGISTRO */}
            <Text style={{ color: '#555', marginTop: 25 }}>
              ¿No tienes cuenta?
            </Text>

            <TouchableOpacity onPress={() => setView('register')}>
              <Text
                style={{
                  color: '#407BFF',
                  fontWeight: 'bold',
                  marginTop: 6,
                }}
              >
                Regístrate
              </Text>
            </TouchableOpacity>

            {/* FOOTER */}
            <Text style={[styles.footer, { marginTop: 20 }]}>
              MoodTrack © 2025 – Your emotions, safely tracked.
            </Text>
          </View>
        ) : (
          <View style={{ alignItems: 'center', width: '100%' }}>

            <RegisterForm onRegisterSuccess={() => setView('login')} />

            <Text style={{ color: '#555', marginTop: 20 }}>
              ¿Ya tienes cuenta?
            </Text>

            <TouchableOpacity onPress={() => setView('login')}>
              <Text
                style={{
                  color: '#407BFF',
                  fontWeight: 'bold',
                  marginTop: 6,
                }}
              >
                Inicia sesión
              </Text>
            </TouchableOpacity>

            <Text style={[styles.footer, { marginTop: 20 }]}>
              MoodTrack © 2025 – Your emotions, safely tracked.
            </Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
