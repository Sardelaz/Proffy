import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f7',
  },

  teacherList: {
    marginTop: 40,
    marginBottom: 16, 
  },

  searchForm: {
    marginBottom: 24,
  },

  label: {
    color: '#333',
    fontFamily: 'Poppins_400Regular',
    marginBottom: 8,
  },

  inputGroup: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },

  inputBlock: {
    width: '100%',
    marginBottom: 16,
  },

  input: {
    height: 54,
    backgroundColor: '#FFF',
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginTop: 4,
  },

  picker: {
    height: 54,
    backgroundColor: '#FFF',
    borderRadius: 20,
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginTop: 4,
    marginBottom: 16,
  },

  scheduleItem: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e6e6f0',
    borderRadius: 8,
    padding: 16,
  },

  scheduleButton: {
    marginTop: 32, 
    backgroundColor: '#04d361',
    borderRadius: 8,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },

  saveButton: {
    marginTop: 40, 
    backgroundColor: '#8257e5',
    borderRadius: 8,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },

  removeButton: {
    marginTop: 16,
    backgroundColor: '#e63946',
    borderRadius: 8,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontFamily: 'Archivo_700Bold',
    color: '#FFF',
    fontSize: 16,
    lineHeight: 37,
    maxWidth: 180,
  },

  avatarButton: {
    backgroundColor: '#c1bccc',
    borderRadius: 8,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },

  avatarText: {
    marginTop: 16,
    fontFamily: 'Archivo_400'
  },
  
  avatarPreview: {
    marginTop: 16,
    alignItems: 'center',
  },
  
  avatarImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginTop: 8,
  },
  
  placeholderText: {
    color: '#c1bccc',
    textAlign: 'center',
    marginTop: 8,
  },
  
})

export default styles;
