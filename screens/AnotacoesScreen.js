import { useNavigation } from '@react-navigation/native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Header from '../components/Header';
import { auth, db } from '../config/firebaseInit';
import styles from '../styles/AppScreens.styles';

export default function AnotacoesScreen() {
  const navigation = useNavigation();
  const [anotacoes, setAnotacoes] = useState([]);
  const [busca, setBusca] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarAnotacoes = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, 'anotacoes'),
          where('uid', '==', auth.currentUser.uid)
        );
        const snapshot = await getDocs(q);
        const lista = [];

        snapshot.forEach(doc => {
          const dados = doc.data();
          lista.push({
            id: doc.id,
            texto: dados.texto,
            dataCriacao: dados.dataCriacao.toDate(),
            palavrasChave: dados.palavrasChave || [],
          });
        });

        setAnotacoes(lista);
      } catch (error) {
        console.error('Erro ao carregar anotações:', error);
      }
      setLoading(false);
    };

    carregarAnotacoes();
  }, []);

  const filtrar = () => {
    return anotacoes.filter(a =>
      busca === '' || a.palavrasChave.includes(busca.toLowerCase())
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('DetalheAnotacao', { anotacao: item })}
    >
      <Text style={styles.title}>
        {item.dataCriacao.toLocaleDateString('pt-BR')}
      </Text>
      <Text numberOfLines={2}>{item.texto}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title="Minhas Anotações" iconName="document-text-outline" />

      <TextInput
        style={styles.input}
        placeholder="Buscar por palavra-chave..."
        value={busca}
        onChangeText={setBusca}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={filtrar()}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}
