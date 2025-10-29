import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // 🎨 Paleta de colores base
  colors: {
    mint: '#CDEAC0',
    lavender: '#E0BBE4',
    blue: '#A8DADC',
    beige: '#FAF3DD',
    white: '#FFFFFF',
    text: '#4A4A4A',
  },

  // 🪄 Contenedor principal del formulario
  authForm: {
    backgroundColor: '#FAF3DD',
    maxWidth: 360,
    width: '90%',
    alignSelf: 'center',
    marginTop: 50,
    padding: 30,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    alignItems: 'center',
  },

  // 🧩 Título
  title: {
    color: '#4A4A4A',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },

  // 🧾 Campos de texto
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 8,
    borderRadius: 10,
    backgroundColor: '#fff',
    fontSize: 15,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },

  // 🔘 Botón principal
  button: {
    width: '100%',
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: '#A8DADC', // degradado simplificado
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // ☑️ Checkbox / términos
  terms: {
    fontSize: 13,
    color: '#555',
    marginTop: 10,
    textAlign: 'left',
    width: '100%',
  },

  // ⚠️ Error
  error: {
    color: '#e74c3c',
    fontSize: 14,
    marginBottom: 10,
  },

  // 🌿 Imagen ilustrativa
  illustration: {
    width: 120,
    height: 120,
    marginBottom: 15,
    opacity: 0.9,
    resizeMode: 'contain',
  },

  // 📜 Footer (opcional)
  footer: {
    marginTop: 20,
    fontSize: 12,
    color: '#888',
  },

  optionButton: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 5,
  },

});
