import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Header from '../../components/Header';
import { palavras } from '../../data/palavras';
import styles from '../../styles/jogos.styles';

const alfabeto = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function ForcaScreen() {
  const navigation = useNavigation();
  const [palavra, setPalavra] = useState('');
  const [dica, setDica] = useState('');
  const [letrasAdivinhadas, setLetrasAdivinhadas] = useState([]);
  const [erros, setErros] = useState(0);
  const [fimDeJogo, setFimDeJogo] = useState(false);

  useEffect(() => {
    const sorteada = palavras[Math.floor(Math.random() * palavras.length)];
    setPalavra(sorteada.palavra.toUpperCase());
    setDica(sorteada.dica);
  }, []);

  const verificarLetra = (letra) => {
    if (fimDeJogo || letrasAdivinhadas.includes(letra)) return;

    setLetrasAdivinhadas([...letrasAdivinhadas, letra]);

    if (!palavra.includes(letra)) {
      setErros((prev) => prev + 1);
    }

    const todasLetras = palavra.split('').every((l) =>
      letrasAdivinhadas.includes(l) || l === letra
    );

    if (todasLetras) {
      setFimDeJogo(true);
      navigation.navigate('Parabens', {
        jogo: 'Jogo da Forca',
        mensagem: 'Você acertou todas as letras!',
      });
    } else if (erros + 1 >= 6 && !palavra.includes(letra)) {
      setFimDeJogo(true);
      navigation.navigate('Parabens', {
        jogo: 'Jogo da Forca',
        mensagem: `Você errou 6 vezes. A palavra era: ${palavra}`,
      });
    }
  };

  const renderPalavra = () =>
    palavra.split('').map((letra, index) => (
      <Text key={index} style={styles.letra}>
        {letrasAdivinhadas.includes(letra) ? letra : '_'}
      </Text>
    ));

  const sortearNovaPalavra = () => {
    const sorteada = palavras[Math.floor(Math.random() * palavras.length)];
    setPalavra(sorteada.palavra.toUpperCase());
    setDica(sorteada.dica);
    setLetrasAdivinhadas([]);
    setErros(0);
    setFimDeJogo(false);
  };

  return (
    <View style={styles.container}>
      <Header title="Jogo da Forca" iconName="game-controller-outline" />
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginLeft: 10 }}>
        <TouchableOpacity onPress={() => navigation.navigate("Atividades")}>
          <Ionicons name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <Text style={styles.dicaTitulo}>Dica:</Text><Text style={styles.dica}>{dica}</Text>
      <View style={styles.palavraContainer}>{renderPalavra()}</View>
      <Text style={styles.erros}>Erros: {erros} / 6</Text>

      <View style={styles.teclado}>
        {alfabeto.map((letra) => (
          <TouchableOpacity
            key={letra}
            style={[
              styles.botaoLetra,
              letrasAdivinhadas.includes(letra) && styles.botaoDesativado,
            ]}
            onPress={() => verificarLetra(letra)}
            disabled={letrasAdivinhadas.includes(letra) || fimDeJogo}
          >
            <Text style={styles.letraBotao}>{letra}</Text>
          </TouchableOpacity>
          
        ))}
      </View>
      <TouchableOpacity style={styles.reiniciarButton} onPress={sortearNovaPalavra}>
        <Text style={styles.reiniciarText}>Mudar palavra</Text>
      </TouchableOpacity>

    </View>
  );
}
