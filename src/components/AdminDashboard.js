import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Pantallas del admin
import AdminHomeScreen from './adminTabs/AdminHomeScreen';
// IMPORTANTE: este ya NO
// import CrearPreguntasScreen from './adminTabs/CrearPreguntasScreen';

// nuevo stack de preguntas
import PreguntasStack from './adminTabs/preguntas/PreguntasStack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function AdminTabs({ onLogout }) {
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
          else if (route.name === 'Preguntas') iconName = 'create-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Inicio"
        children={() => <AdminHomeScreen onLogout={onLogout} />}
      />

      {/* AHORA este apunta al stack interno */}
      <Tab.Screen name="Preguntas" component={PreguntasStack} />
    </Tab.Navigator>
  );
}

export default function AdminDashboard({ onLogout }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
      <NavigationContainer independent={true}>
        <Stack.Navigator>
          <Stack.Screen name="AdminTabs" options={{ headerShown: false }}>
            {() => <AdminTabs onLogout={onLogout} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
