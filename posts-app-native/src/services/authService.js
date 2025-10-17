// src/services/authService.js
let users = [
  { email: 'admin@test.com', password: '1234', nombre: 'Admin', edad: 30, genero: 'otro' }, {email: 'a@gmail.com', password: '1234', nombre: 'Yo', edad: 21, genero: 'otro' }
];

// Registrar usuario
export function registerUser({ nombre, edad, genero, email, password }) {
  const existing = users.find(u => u.email === email);
  if (existing) {
    throw new Error('El usuario ya existe');
  }
  const newUser = { nombre, edad, genero, email, password };
  users.push(newUser);
  return newUser;
}

// Iniciar sesión
export function loginUser(email, password) {
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    throw new Error('Credenciales incorrectas');
  }
  return { nombre: user.nombre,edad: user.edad, genero: user.genero,email: user.email,password: user.password };
}

// Obtener usuarios (solo para debug)
export function getUsers() {
  return users;
}
// Actualizar datos del usuario
export function updateUser(email, newData) {
  const userIndex = users.findIndex(u => u.email === email);
  if (userIndex === -1) {
    throw new Error('Usuario no encontrado');
  }
  users[userIndex] = { ...users[userIndex], ...newData };
  return users[userIndex];
}

// Eliminar usuario
export function deleteUser(email) {
  const userIndex = users.findIndex(u => u.email === email);
  if (userIndex === -1) {
    throw new Error('Usuario no encontrado');
  }
  users.splice(userIndex, 1);
  return true;
}
