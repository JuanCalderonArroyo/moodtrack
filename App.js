import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import LoginForm from './src/components/LoginForm';
import RegisterForm from './src/components/RegisterForm';
import Dashboard from './src/components/Dashboard';
import { styles } from './src/styles/styles';
import AdminPanel from './src/components/AdminPanel';
import FormularioScreen from './src/components/tabs/FormularioScreen';

export default function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('login'); // login | register | dashboard

  if (user) {
    // Si es el admin, mostrar interfaz diferente
if (user.rol === 'admin') {
  return (
    <AdminPanel
      user={user}
      onLogout={async () => {
        await AsyncStorage.removeItem('user');
        setUser(null);
      }}
    />
  );
}

    

    // Si no es admin, mostrar el dashboard normal
    return (
      <Dashboard
        user={user}
        onLogout={() => setUser(null)}
        onUserUpdate={setUser}
      />
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: styles.colors.beige,
        paddingVertical: 50,
      }}
    >
      {view === 'login' ? (
        <View style={{ alignItems: 'center', width: '100%' }}>
          <Image
            source={require('./src/assets/calm.png')}
            style={[styles.illustration, { width: 180, height: 180, marginBottom: 10 }]}
          />
          <Text style={styles.title}>Bienvenido a MoodTrack</Text>
          <Text style={{ color: styles.colors.text, marginBottom: 20 }}>
            Inicia sesión para continuar tu viaje emocional
          </Text>

          <LoginForm onLoginSuccess={setUser} />

          <Text style={{ color: styles.colors.text, marginTop: 15 }}>
            ¿No tienes cuenta?
          </Text>
          <TouchableOpacity onPress={() => setView('register')}>
            <Text style={{ color: styles.colors.blue, fontWeight: 'bold', marginTop: 5 }}>
              Regístrate
            </Text>
          </TouchableOpacity>

          <Text style={styles.footer}>
            MoodTrack © 2025 – Your emotions, safely tracked.
          </Text>
        </View>
      ) : (
        <View style={{ alignItems: 'center', width: '100%' }}>
          <RegisterForm onRegisterSuccess={() => setView('login')} />

          <Text style={{ color: styles.colors.text, marginTop: 15 }}>
            ¿Ya tienes cuenta?
          </Text>
          <TouchableOpacity onPress={() => setView('login')}>
            <Text style={{ color: styles.colors.blue, fontWeight: 'bold', marginTop: 5 }}>
              Inicia sesión
            </Text>
          </TouchableOpacity>

          <Text style={styles.footer}>
            MoodTrack © 2025 – Your emotions, safely tracked.
          </Text>
        </View>
      )}
    </ScrollView>
  );
}
