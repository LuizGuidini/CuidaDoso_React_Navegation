import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../components/Header';
import { memoriaItensFixos } from '../../data/memoriaItens';
import styles from '../../styles/jogos.styles';

export default function MemoriaScreen() {
  const getItensAleatorios = () => {
    return memoriaItensFixos.sort(() => 0.5 - Math.random()).slice(0, 6);
  };

  const [itensMemoria, setItensMemoria] = useState(getItensAleatorios());
  const [mostrarLista, setMostrarLista] = useState(true);
  const [respostas, setRespostas] = useState(Array(6).fill(''));
  const [acertos, setAcertos] = useState(null);
  const [revisou, setRevisou] = useState(false);
  const [contador, setContador] = useState(10);
  const [erros, setErros] = useState(Array(6).fill(false));

  useEffect(() => {
    let timer;
    if (mostrarLista) {
      setContador(10);
      timer = setInterval(() => {
        setContador((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setMostrarLista(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [mostrarLista]);

  const reverObjetos = () => {
    setMostrarLista(true);
    setRevisou(true);
    setErros(Array(6).fill(false));
    setAcertos(null);
  };

  const verificarResposta = () => {
    let acertosTemp = 0;
    const errosTemp = [...erros];

    itensMemoria.forEach((item, index) => {
      const resposta = respostas[index]?.trim().toLowerCase();
      const correta = item.palavra.toLowerCase();
      if (resposta === correta) {
        acertosTemp++;
        errosTemp[index] = false;
      } else {
        errosTemp[index] = true;
      }
    });

    setAcertos(acertosTemp);
    setErros(errosTemp);
    Alert.alert('Resultado', `Você acertou ${acertosTemp} de 6 objetos.`);
  };

  const jogarNovamente = () => {
    setItensMemoria(getItensAleatorios());
    setRespostas(Array(6).fill(''));
    setErros(Array(6).fill(false));
    setAcertos(null);
    setRevisou(false);
    setMostrarLista(true);
    setContador(10);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header title="Jogo Memória" iconName="school-outline" showBackButton />

      {mostrarLista ? (
        <>
          <Text style={styles.instruction}>Memorize os objetos abaixo:</Text>
          <Text style={styles.contador}>Tempo restante: {contador}s</Text>
          <View style={styles.cardContainer}>
            {itensMemoria.map((item, index) => (
              <View key={`${item.palavra}-${index}`} style={[styles.card, { backgroundColor: item.color }]}>
                <Text style={styles.cardIndex}>{index + 1}</Text>
                <Ionicons name={item.icon} size={32} color="#007AFF" />
                <Text style={styles.cardText}>{item.palavra}</Text>
              </View>
            ))}
          </View>
        </>
      ) : (
        <>
          <Text style={styles.instruction}>Digite os objetos que você lembra:</Text>
          {itensMemoria.map((item, index) => (
            <TextInput
              key={`${item.palavra}-${index}`}
              style={[
                styles.input,
                { backgroundColor: item.color },
                erros[index] && acertos !== null ? styles.inputErro : styles.inputCorreto,
              ]}
              placeholder={`Objeto ${index + 1}`}
              value={respostas[index]}
              onChangeText={(text) => {
                const novas = [...respostas];
                novas[index] = text;
                setRespostas(novas);
              }}
            />
          ))}

          {!revisou && (
            <TouchableOpacity style={styles.reverButton} onPress={reverObjetos}>
              <Text style={styles.reverText}>Rever objetos</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.verificarButton} onPress={verificarResposta}>
            <Text style={styles.verificarText}>Verificar</Text>
          </TouchableOpacity>
          {acertos !== null && (
            <Text style={styles.result}>Você acertou {acertos} de 6 objetos.</Text>
          )}
          {acertos !== null && (
            <TouchableOpacity style={styles.reiniciarButton} onPress={jogarNovamente}>
               <Text style={styles.reiniciarText}>Jogar novamente</Text>
            </TouchableOpacity>
          )}

        </>
      )}
    </ScrollView>
  );
}

