import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// pantallas de preguntas (las iremos llenando)
import PreguntasDashboardScreen from './PreguntasDashboardScreen';
import SelectNivelScreen from './SelectNivelScreen';
import SelectCategoriaScreen from './SelectCategoriaScreen';
import ListarPreguntasScreen from './ListarPreguntasScreen';
import CrearPreguntaScreen from './CrearPreguntaScreen';
import EditarPreguntaScreen from './EditarPreguntaScreen';
import BorrarPreguntaScreen from './BorrarPreguntaScreen';

const Stack = createStackNavigator();

export default function PreguntasStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PreguntasDashboard" component={PreguntasDashboardScreen} />
      <Stack.Screen name="SelectNivel" component={SelectNivelScreen} />
      <Stack.Screen name="SelectCategoria" component={SelectCategoriaScreen} />
      <Stack.Screen name="ListarPreguntas" component={ListarPreguntasScreen} />
      <Stack.Screen name="CrearPregunta" component={CrearPreguntaScreen} />
      <Stack.Screen name="EditarPregunta" component={EditarPreguntaScreen} />
      <Stack.Screen name="BorrarPregunta" component={BorrarPreguntaScreen} />
    </Stack.Navigator>
  );
}
