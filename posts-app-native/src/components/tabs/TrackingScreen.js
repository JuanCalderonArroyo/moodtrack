import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../../styles/styles';

export default function TrackingScreen() {
  return (
    <View style={styles.authForm}>
      <Text style={styles.title}>Seguimiento</Text>
      <Text style={{ textAlign: 'center', color: '#555' }}>
        Aquí podrás ver tus estadísticas y registros emocionales.
      </Text>
    </View>
  );
}
