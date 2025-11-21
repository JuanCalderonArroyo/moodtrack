import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Modal,
} from 'react-native';
import { updateUser, deleteUser, logoutUser } from '../services/authService';

// Opciones de género (igual que en RegisterForm)
const GENERO_OPCIONES = [
  { label: 'Masculino', value: 'masculino' },
  { label: 'Femenino', value: 'femenino' },
  { label: 'Otro', value: 'otro' },
];

const UserProfile = ({ user, onLogout, onUserUpdate }) => {
  const [formData, setFormData] = useState(user);
  const [showGeneroModal, setShowGeneroModal] = useState(false);

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
      ],
    );
  };

  const generoSeleccionado =
    GENERO_OPCIONES.find((opt) => opt.value === formData.genero)?.label ||
    'Selecciona tu género';

  return (
    <View style={styles.container}>
      {/* TÍTULO */}
      <Text style={styles.title}>Perfil de usuario</Text>

      {/* NOMBRE */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Nombre completo</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre completo"
          value={formData.nombre}
          onChangeText={(value) => handleChange('nombre', value)}
        />
      </View>

      {/* EDAD */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Edad</Text>
        <TextInput
          style={styles.input}
          placeholder="Edad"
          keyboardType="numeric"
          value={String(formData.edad || '')}
          onChangeText={(value) => handleChange('edad', value)}
        />
      </View>

      {/* GÉNERO (mismo recuadro que en Crear cuenta) */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Género</Text>

        <TouchableOpacity
          onPress={() => setShowGeneroModal(true)}
          style={[styles.input, { justifyContent: 'center' }]}
        >
          <Text
            style={{
              color: formData.genero ? '#1F1F39' : '#A0A3B1',
              fontSize: 15,
            }}
          >
            {generoSeleccionado}
          </Text>
        </TouchableOpacity>
      </View>

      {/* CONTRASEÑA */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={formData.password}
          onChangeText={(value) => handleChange('password', value)}
        />
      </View>

      {/* BOTÓN GUARDAR */}
      <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
        <Text style={styles.saveButtonText}>Guardar cambios</Text>
      </TouchableOpacity>

      {/* BOTÓN ELIMINAR CUENTA */}
      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>Eliminar cuenta</Text>
      </TouchableOpacity>

      {/* BOTÓN CERRAR SESIÓN */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={async () => {
          try {
            await logoutUser();
            onLogout();
            Alert.alert('Sesión cerrada', 'Has cerrado sesión correctamente');
          } catch (err) {
            Alert.alert('Error', 'No se pudo cerrar la sesión');
            console.error(err);
          }
        }}
      >
        <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
      </TouchableOpacity>

      {/* MODAL DE SELECCIÓN DE GÉNERO */}
      <Modal
        visible={showGeneroModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowGeneroModal(false)}
      >
        <View className="modalOverlay" style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Selecciona tu género</Text>

            {GENERO_OPCIONES.map((opcion) => (
              <TouchableOpacity
                key={opcion.value}
                onPress={() => {
                  handleChange('genero', opcion.value);
                  setShowGeneroModal(false);
                }}
                style={styles.modalOption}
              >
                <Text style={styles.modalOptionText}>{opcion.label}</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity onPress={() => setShowGeneroModal(false)}>
              <Text style={styles.modalCancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // fondo blanco
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 24,
    textAlign: 'center',
    color: '#407BFF', // azul principal
  },

  // Inputs
  inputGroup: {
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 15,
    color: '#555555',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#D6D9E0',
    fontSize: 15,
    color: '#1F1F39',
  },

  // Botones
  saveButton: {
    backgroundColor: '#407BFF', // azul principal
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 20,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  deleteButton: {
    backgroundColor: '#FF4B4B', // rojo más moderno
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 10,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  logoutButton: {
    backgroundColor: '#3A3A3A', // gris oscuro elegante
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 10,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  // 🔹 Modal género
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    width: '80%',
    borderRadius: 16,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
    color: '#1F1F39',
  },
  modalOption: {
    paddingVertical: 10,
  },
  modalOptionText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#1F1F39',
  },
  modalCancelText: {
    marginTop: 15,
    textAlign: 'center',
    color: '#407BFF',
    fontWeight: '600',
  },
});
