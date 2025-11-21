// src/services/authService.js
const API_URL = 'https://backenddiseno.onrender.com/api/usuarios'; // Ajusta según tu server
import AsyncStorage from '@react-native-async-storage/async-storage';
// Registrar usuario
export async function registerUser({ nombre, email, password, edad, genero }) {
  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, email, password, edad, genero })
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Error al registrar usuario');
  }

  return res.json();
}

// 🔹 Login (guarda usuario en AsyncStorage)
export async function loginUser(email, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Error al iniciar sesión');
  }

  const user = await res.json();

  // ✅ Guardar datos del usuario en AsyncStorage
  await AsyncStorage.setItem('user', JSON.stringify(user));

  return user;
}

// 🔹 Obtener usuario guardado
export async function getUserFromStorage() {
  const data = await AsyncStorage.getItem('user');
  return data ? JSON.parse(data) : null;
}

// 🔹 Cerrar sesión
export async function logoutUser() {
  await AsyncStorage.removeItem('user');
}

// Actualizar usuario
export async function updateUser(email, newData) {
  const res = await fetch(`${API_URL}/update/${email}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newData)
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Error al actualizar usuario');
  }

  return res.json();
}

// Eliminar usuario
export async function deleteUser(email) {
  const res = await fetch(`${API_URL}/delete/${email}`, {
    method: 'DELETE'
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Error al eliminar usuario');
  }

  return true;
}
