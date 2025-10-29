// src/components/Dashboard.js
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './tabs/HomeScreen';
import TrackingScreen from './tabs/TrackingScreen';
import ProfileScreen from './tabs/ProfileScreen';
import FormularioScreen from './tabs/FormularioScreen';
import ResultadoScreen from './tabs/ResultadoScreen';
import HistorialScreen from './tabs/HistorialScreen'; // ✅ Import añadido

import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs({ currentUser, onLogout, onUserUpdate }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#4A90E2',
        tabBarInactiveTintColor: '#777',
        tabBarStyle: {
          backgroundColor: '#f8f8f8',
          height: 70,
          paddingBottom: 10,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Inicio') iconName = 'home-outline';
          else if (route.name === 'Seguimiento') iconName = 'stats-chart-outline';
          //else if (route.name === 'Historal') iconName = 'time-outline'; // ⏱️ Nuevo icono
          else if (route.name === 'Perfil') iconName = 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Inicio">
        {() => <HomeScreen user={currentUser} />}
      </Tab.Screen>
      {/*<Tab.Screen name="Seguimiento" component={TrackingScreen} />

      {/* 🕓 Nuevo tab de historial */}
      <Tab.Screen name="Seguimiento" component={HistorialScreen} />

      <Tab.Screen
        name="Perfil"
        component={ProfileScreen}
        initialParams={{
          user: currentUser,
          onLogout,
          onUserUpdate,
        }}
      />
    </Tab.Navigator>
  );
}

export default function Dashboard({ user, onLogout }) {
  const [currentUser, setCurrentUser] = React.useState(user);

  const onUserUpdate = (updatedUser) => {
    setCurrentUser(updatedUser);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
      <NavigationContainer independent={true}>
        <Stack.Navigator>
          {/* 🏠 Tus pestañas principales */}
          <Stack.Screen name="MainTabs" options={{ headerShown: false }}>
            {() => (
              <MainTabs
                currentUser={currentUser}
                onLogout={onLogout}
                onUserUpdate={onUserUpdate}
              />
            )}
          </Stack.Screen>

          {/* 🧠 Pantalla del formulario */}
          <Stack.Screen
            name="Formulario"
            component={FormularioScreen}
            options={{
              title: 'Formulario emocional',
              headerTintColor: '#4A90E2',
              headerBackTitle: 'Volver',
            }}
          />

          {/* 📊 Pantalla de resultados */}
          <Stack.Screen
            name="ResultadoScreen"
            component={ResultadoScreen}
            options={{
              title: 'Resultados',
              headerTintColor: '#4A90E2',
              headerBackTitle: 'Volver',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
