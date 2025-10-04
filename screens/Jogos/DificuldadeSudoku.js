import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity, View } from 'react-native';
import Header from '../../components/Header';
import styles from '../../styles/jogos.styles';

export default function DificuldadeSudoku() {
  const navigation = useNavigation();

  const iniciarSudoku = (tamanho) => {
    navigation.navigate('Sudoku', { tamanho });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f1f4f8' }}>
      <Header title="Escolha dificuldade" iconName="help-circle-outline" />
      <View style={styles.voltarInline}>
      <TouchableOpacity style={styles.voltarBotao} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-outline" size={28} color="#007AFF" />
        <Text style={styles.voltarTexto}>Voltar</Text>
      </TouchableOpacity>
      </View>
      <Text style={styles.subtitulo}>Qual tamanho de Sudoku você quer jogar?</Text>

      <View style={styles.opcoes}>
        <TouchableOpacity style={styles.botao} onPress={() => iniciarSudoku(4)}>
          <Ionicons name="grid-outline" size={24} color="#fff" />
          <Text style={styles.botaoTexto}>Fácil (4x4)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={() => iniciarSudoku(6)}>
          <Ionicons name="grid-outline" size={24} color="#fff" />
          <Text style={styles.botaoTexto}>Médio (6x6)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={() => iniciarSudoku(9)}>
          <Ionicons name="grid-outline" size={24} color="#fff" />
          <Text style={styles.botaoTexto}>Difícil (9x9)</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

