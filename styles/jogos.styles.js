import { StyleSheet } from "react-native";

export default StyleSheet.create({
//Comuns

  botao: {
    flexDirection: 'row',
    backgroundColor: '#a3d5ff',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginHorizontal: 60,
  },
  botaoTexto: {
    marginLeft: 10,
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  voltarBotao: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  voltarTexto: {
    marginLeft: 8,
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  voltarInline: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 5,
  },

//dificuldadeSudoku
    
  subtitulo: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginTop: 80,
    marginBottom: 20,
  },
  opcoes: {
    paddingHorizontal: 40,
    gap: 15,
  },

  //MemoriaScreen

  container: { padding: 20 },
  instruction: {
    textAlign: 'center',
    paddingVertical: 10,
    paddingBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007AFF',
  },
  contador: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF3B30',
    marginBottom: 10,
    textAlign: 'center',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '47%',
    height: 100,
    borderRadius: 12,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cardIndex: {
    position: 'absolute',
    top: 6,
    left: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  cardText: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  input: {
    height: 50,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputCorreto: {
    color: '#007AFF',
  },
  inputErro: {
    color: '#FF3B30',
  },
  reverButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  reverText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
  },
  verificarButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  verificarText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
  },
  result: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    textAlign: 'center',
  },
  reiniciarButton: {
      backgroundColor: '#34d399',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
    },
  reiniciarText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
  },

//ParabensScreen

  voltar: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
  },
  conteudo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  jogo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
    marginTop: 20,
    marginBottom: 10,
  },
  mensagem: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  
//SudokuScreen
  grade: {
    marginTop: 80,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  linha: {
    flexDirection: 'row',
  },
  celula: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center',
    fontSize: 16,
    margin: 0.5,
    borderRadius: 6,
  },
  celulaBase: {
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center',
    borderRadius: 6,
  },
  celulaFixa: {
    backgroundColor: '#d2ffd2',
    color: '#333',
    fontWeight: 'bold',
  },
  celulaEditavel: {
    backgroundColor: '#fff',
    color: '#007AFF',
    fontWeight: 'bold',
  },

});