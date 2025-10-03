import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#f1f4f8' 
  },
  content: { padding: 20 },
  fotoContainer: { 
    alignItems: 'center', 
    marginBottom: 20 
  },
  foto: { 
    width: 120, 
    height: 120, 
    borderRadius: 60, 
    borderWidth: 2, 
    borderColor: '#007AFF' 
  },
  fotoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fotoTexto: { 
    marginTop: 6, 
    fontSize: 14, 
    color: '#555' 
  },
  campo: { marginBottom: 15 },
  label: { fontSize: 16, 
    fontWeight: '600', 
    marginBottom: 6, 
    color: '#333' 
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  secao: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 25,
    marginBottom: 10,
    color: '#007AFF',
  },
  botaoSalvar: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  botaoTexto: {
    marginLeft: 10,
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  emojiContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  marginTop: 10,
  },
  emojiBotao: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  emojiSelecionado: {
    backgroundColor: '#007AFF',
  },
    emojiTexto: {
    fontSize: 24,
  },
  frasesContainer: {
    marginTop: 10,
  },
  fraseBotao: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  fraseSelecionada: {
    backgroundColor: '#007AFF',
  },
  fraseTexto: {
    fontSize: 16,
    color: '#333',
  },
  botaoLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  botaoMini: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  botaoMiniTexto: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },

});