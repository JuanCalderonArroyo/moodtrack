import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // 🎨 Paleta de colores base
  colors: {
    primary: '#407BFF',
    lightBlue: '#E7F0FF',
    textDark: '#1F1F39',
    textLight: '#A0A3B1',
    white: '#FFFFFF',
    background: '#FFFFFF', // 👈 fondo global blanco
  },

  // 🔹 Contenedor genérico de pantalla (úsalo en Dashboard, AdminPanel, etc.)
  screenContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF', // 👈 aquí fuerzas blanco
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },

  // Contenedor del formulario (solo para centrar el recuadro)
  authContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 24, // espacio entre título y tarjeta
  },

  // 🟦 Tarjeta grande del login / registro
  authForm: {
    backgroundColor: '#FFFFFF',
    width: '100%',          // ocupa todo el ancho disponible del padre
    maxWidth: 420,          // ancho ideal tipo diseño
    paddingHorizontal: 32,  // espacio interno
    paddingVertical: 40,
    borderRadius: 28,

    // Sombra
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 22,
    elevation: 10,
  },

  // Títulos superiores (fuera del recuadro)
  welcomeTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1F1F39',
    textAlign: 'center',
    marginBottom: 6,
  },

  welcomeSubtitle: {
    fontSize: 15,
    color: '#6B6E8A',
    textAlign: 'center',
  },

  // Icono médico
  illustration: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 15,
  },

  // Título dentro del recuadro
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1F1F39',
    textAlign: 'center',
    marginBottom: 22,
  },

  // Contenedor inputs
  inputGroup: {
    marginBottom: 12,
  },

  inputLabel: {
    fontSize: 15,
    color: '#555555',
    marginBottom: 6,
  },

  input: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D6D9E0',
    backgroundColor: '#F9FAFF',
    fontSize: 16,
    color: '#1F1F39',
  },

  // Botón principal
  button: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#407BFF',
    marginTop: 25,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },

  // Error
  error: {
    color: '#e74c3c',
    fontSize: 14,
    marginBottom: 8,
    textAlign: 'center',
  },

  // Footer (texto pequeño de abajo)
  footer: {
    marginTop: 18,
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
  },
});
