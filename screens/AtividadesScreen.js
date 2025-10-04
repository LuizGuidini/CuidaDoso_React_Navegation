import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../components/Header';
import {
  atividadesCriativas,
  atividadesCulturais,
  atividadesFisicas,
  atividadesRelaxamento,
} from '../data/atividadesFisicas'; // ainda usando esse nome

const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 170) / 2;

export default function AtividadesScreen() {
  const navigation = useNavigation();

  const sortearAtividades = () => {
    const embaralhar = (lista) => [...lista].sort(() => 0.5 - Math.random());

    return [
      ...embaralhar(atividadesFisicas).slice(0, 2),
      ...embaralhar(atividadesRelaxamento).slice(0, 2),
      ...embaralhar(atividadesCriativas).slice(0, 1),
      ...embaralhar(atividadesCulturais).slice(0, 1),
    ];
  };

  const [atividadesSorteadas, setAtividadesSorteadas] = useState(sortearAtividades());

  const atividadesCognitivas = [
    { id: '1', title: 'Palavras cruzadas', icon: 'grid-outline', route: 'Palavras' },
    { id: '2', title: 'Sudoku', icon: 'help-circle-outline', route: 'DificuldadeSudoku' },
    { id: '3', title: 'Memória: lembrar 6 objetos', icon: 'school-outline', route: 'Memoria' },
    { id: '4', title: 'Jogo da Diferença', icon: 'color-palette-outline', route: 'Sequencia' },
  ];

  //useFocusEffect(
  //  useCallback(() => {
  //    setAtividadesSorteadas(sortearAtividades());
  //  }, [])
  //);
  useEffect(() => {
    setAtividadesSorteadas(sortearAtividades());
  }, []);

  const renderCardSorteado = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: item.color }]}
      onPress={() => navigation.navigate('AtividadeDetalhe', { atividade: item })}
    >
      <Ionicons name={item.icon} size={20} color="#007AFF" />
      <Text style={styles.cardText}>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderCardCognitiva = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: '#ffe0f0' }]}
      onPress={() => navigation.navigate(item.route)}
    >
      <Ionicons name={item.icon} size={20} color="#007AFF" />
      <Text style={styles.cardText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#f1f4f8' }}>
      <Header title="Atividades" iconName="barbell-outline" />

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Sugestões do dia</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Favoritas')}>
          <Ionicons name="heart-outline" size={20} color="#007AFF"/>
        </TouchableOpacity>
      </View>

      <FlatList
        data={atividadesSorteadas}
        keyExtractor={(item) => item.id}
        renderItem={renderCardSorteado}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={styles.listContainer}
      />

      <Text style={styles.sectionTitle}>Atividades Cognitivas</Text>
      <FlatList
        data={atividadesCognitivas}
        keyExtractor={(item) => item.id}
        renderItem={renderCardCognitiva}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 30,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginHorizontal: 15,
    marginVertical: 10,
  },
  card: {
    width: cardWidth + 45,
    height: cardWidth - 25,
    borderRadius: 15,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  cardText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 10,
  },
});
