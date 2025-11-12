import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f4f8' },

  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginVertical: 10,
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 56,
    fontSize: 18,
    backgroundColor: '#fff',
  },

  inputCriar: {
  backgroundColor: '#fff',
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 12,
  paddingHorizontal: 16,
  paddingVertical: 12,
  fontSize: 18,
  height: 56,
  marginBottom: 20,
  marginHorizontal: 16,
},

pickerCriar: {
  backgroundColor: '#fff',
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 12,
  justifyContent: 'center',
  height: 56,
  marginBottom: 20,
  marginHorizontal: 16,
},

  button: {
    marginHorizontal: 20,
    height: 40,
    backgroundColor: '#d2ffd2',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 12,
  },

  buttonText: {
    color: '#007AFF',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },

  backButton: {
    marginHorizontal: 20,
    height: 48,
    backgroundColor: '#f1f4f8',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 8,
  },

  backButtonText: {
    color: '#516785',
    fontSize: 18,
    fontWeight: '600',
  },

  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    paddingHorizontal: 10,
  },

  searchButton: {
    marginLeft: 10,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },

  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },

  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#eee',
    borderRadius: 20,
  },

  filterSelected: {
    backgroundColor: '#007AFF',
  },

  filterText: {
    color: '#333',
  },

  filterTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },

  list: {
    paddingHorizontal: 15,
    paddingBottom: 30,
  },

  card: {
    backgroundColor: '#d8e6eeff',
    borderRadius: 12,
    marginVertical: 8,
    padding: 12,
  },

 title: {
  fontSize: 18,
  fontWeight: '600',
  marginBottom: 6,
  marginLeft: 17,
  marginTop: 12,
  color: '#374151',
},

  tipo: {
    marginTop: 6,
    fontSize: 14,
    color: '#555',
  },
  containerData: { 
    paddingHorizontal: 20,
    paddingBottom: 10 
  },
  dataText: { 
    fontSize: 16,
    color: '#555' 
  },
  horaText: {
    fontSize: 14,
    color: '#888' 
  },
  tipoButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
  },
  tipoButtonAtivo: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  tipoButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
});
