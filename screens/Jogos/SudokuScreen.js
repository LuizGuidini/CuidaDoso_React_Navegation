import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import sudoku from 'sudoku';
import Header from '../../components/Header';
import styles from '../../styles/jogos.styles';

export default function SudokuScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { tamanho } = route.params || { tamanho: 9 };

  const [puzzle, setPuzzle] = useState([]);
  const [solution, setSolution] = useState([]);
  const [resposta, setResposta] = useState([]);

  useEffect(() => {
    if (tamanho === 9) {
      const raw = sudoku.makepuzzle();
      const sol = sudoku.solvepuzzle(raw);

      const formatar = (arr) =>
        Array.from({ length: 9 }, (_, i) =>
          arr.slice(i * 9, i * 9 + 9).map((v) => (v === null ? '' : v + 1))
        );

      setPuzzle(formatar(raw));
      setSolution(formatar(sol));
      setResposta(formatar(raw));
    } else {
      // Tabuleiros fixos para 4x4 e 6x6
      const tabuleiros = {
        4: {
          puzzle: [
            [1, '', '', 4],
            ['', 3, 1, ''],
            ['', 1, 4, ''],
            [2, '', '', 3],
          ],
          solution: [
            [1, 2, 3, 4],
            [4, 3, 1, 2],
            [3, 1, 4, 2],
            [2, 4, 1, 3],
          ],
        },
        6: {
          puzzle: [
            [1, '', '', 4, '', 6],
            ['', 3, 1, '', 5, ''],
            ['', '', 4, '', '', ''],
            [2, '', '', 3, '', ''],
            ['', '', 6, '', 1, ''],
            [5, '', '', '', '', 2],
          ],
          solution: [
            [1, 2, 5, 4, 3, 6],
            [6, 3, 1, 2, 5, 4],
            [4, 5, 4, 6, 2, 1],
            [2, 1, 3, 3, 6, 5],
            [3, 4, 6, 5, 1, 2],
            [5, 6, 2, 1, 4, 3],
          ],
        },
      };

      const { puzzle: p, solution: s } = tabuleiros[tamanho];
      setPuzzle(p);
      setSolution(s);
      setResposta(p.map((linha) => linha.map((celula) => (celula === '' ? '' : celula))));
    }
  }, [tamanho]);

  const atualizarCelula = (linha, coluna, valor) => {
    const novo = resposta.map((row, i) =>
      row.map((cel, j) => (i === linha && j === coluna ? (valor === '' ? '' : parseInt(valor)) : cel))
    );
    setResposta(novo);
  };

  const verificar = () => {
    const correto = resposta.every((linha, i) =>
      linha.every((celula, j) => celula === solution[i][j])
    );

    if (correto) {
      navigation.navigate('Parabens', {
        jogo: 'Sudoku',
        mensagem: 'Você completou o Sudoku com sucesso!',
      });
    } else {
      Alert.alert('Ainda há erros', 'Tente novamente com calma.');
    }
  };

  const getCelulaStyle = () => {
    if (tamanho === 4) {
      return {
        width: 60,
        height: 60,
        fontSize: 24,
        margin: 2,
      };
    } else if (tamanho === 6) {
      return {
        width: 50,
        height: 50,
        fontSize: 20,
        margin: 1.5,
      };
    } else {
      return {
        width: 40,
        height: 40,
        fontSize: 16,
        margin: 0.5,
      };
    }
  };

  const renderCelula = (valor, linha, coluna) => {
    const original = puzzle[linha][coluna] !== '';
    const tamanhoEstilo = getCelulaStyle();

    return (
      <TextInput
        key={`${linha}-${coluna}`}
        style={[
          styles.celulaBase,
          tamanhoEstilo,
          original ? styles.celulaFixa : styles.celulaEditavel,
        ]}
        value={valor === '' ? '' : valor.toString()}
        editable={!original}
        keyboardType="number-pad"
        maxLength={1}
        onChangeText={(text) => atualizarCelula(linha, coluna, text)}
      />
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f1f4f8' }}>
      <Header title="Sudoku" iconName="help-circle-outline" />
      <View style={styles.voltarInline}>
        <TouchableOpacity style={styles.voltarBotao} onPress={() => navigation.navigate('Atividades')}>
          <Ionicons name="arrow-back-outline" size={28} color="#007AFF" />
          <Text style={styles.voltarTexto}>Voltar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.grade}>
        {resposta.map((linha, i) => (
          <View key={i} style={styles.linha}>
            {linha.map((valor, j) => renderCelula(valor, i, j))}
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.botao} onPress={verificar}>
        <Ionicons name="checkmark-circle-outline" size={24} color="#fff" />
        <Text style={styles.botaoTexto}>Verificar</Text>
      </TouchableOpacity>
      <TouchableOpacity
      style={[styles.botao, { backgroundColor: '#ffe0e0', marginTop: 10 }]}
      onPress={() => setResposta(puzzle.map((linha) => linha.map((celula) => (celula === '' ? '' : celula))))}>
        <Ionicons name="trash-outline" size={24} color="#fff" />
        <Text style={styles.botaoTexto}>Limpar</Text>
      </TouchableOpacity>
    </View>
  );
}
