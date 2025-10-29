import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { updateUser, deleteUser, logoutUser } from '../services/authService';

const UserProfile = ({ user, onLogout, onUserUpdate }) => {
  const [formData, setFormData] = useState(user);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = () => {
    try {
      const updated = updateUser(user.email, formData);
      onUserUpdate(updated);
      Alert.alert('Éxito', 'Datos actualizados correctamente');
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Eliminar cuenta',
      '¿Seguro que deseas eliminar tu cuenta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            deleteUser(user.email);
            onLogout();
            Alert.alert('Cuenta eliminada');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil de usuario</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={formData.nombre}
        onChangeText={(value) => handleChange('nombre', value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Edad"
        keyboardType="numeric"
        value={String(formData.edad || '')}
        onChangeText={(value) => handleChange('edad', value)}
      />

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.genero}
          onValueChange={(value) => handleChange('genero', value)}
        >
          <Picker.Item label="Selecciona tu género" value="" />
          <Picker.Item label="Masculino" value="masculino" />
          <Picker.Item label="Femenino" value="femenino" />
          <Picker.Item label="Otro" value="otro" />
        </Picker>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={formData.password}
        onChangeText={(value) => handleChange('password', value)}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Guardar cambios</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.buttonText}>Eliminar cuenta</Text>
      </TouchableOpacity>

<TouchableOpacity
  style={styles.logoutButton}
  onPress={async () => {
    try {
      await logoutUser(); // ✅ elimina el usuario del AsyncStorage
      onLogout(); // ✅ cierra la sesión en el frontend (por ejemplo, vuelve al login)
      Alert.alert('Sesión cerrada', 'Has cerrado sesión correctamente');
    } catch (err) {
      Alert.alert('Error', 'No se pudo cerrar la sesión');
      console.error(err);
    }
  }}
>
  <Text style={styles.buttonText}>Cerrar sesión</Text>
</TouchableOpacity>

    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF3DD',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  pickerContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  saveButton: {
    backgroundColor: '#5E8C61',
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
  },
  logoutButton: {
    backgroundColor: '#444',
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
