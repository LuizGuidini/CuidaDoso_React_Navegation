import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../components/Header';

const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 170) / 2; // Margens e espaçamento

export default function AtividadesScreen() {
  const navigation = useNavigation();

  const atividadesFisicas = [
    { id: '1', title: 'Caminhada leve de 15 minutos', icon: 'walk-outline' },
    { id: '2', title: 'Alongamento matinal', icon: 'body-outline' },
    { id: '3', title: 'Subir escadas devagar', icon: 'fitness-outline' },
    { id: '4', title: 'Exercícios de respiração e postura', icon: 'heart-outline' },
  ];

  const atividadesMentais = [
    { id: '1', title: 'Palavras cruzadas', icon: 'grid-outline' },
    { id: '2', title: 'Sudoku', icon: 'help-circle-outline' },
    { id: '3', title: 'Memória: lembrar 10 objetos', icon: 'school-outline' },
  ];

  const renderCardFisica = ({ item }) => (
    <TouchableOpacity style={[styles.card, { backgroundColor: '#d2ecff' }]}>
      <Ionicons name={item.icon} size={30} color="#007AFF" />
      <Text style={styles.cardText}>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderCardMental = ({ item }) => (
    <TouchableOpacity style={[styles.card, { backgroundColor: '#d2ffd2' }]}>
      <Ionicons name={item.icon} size={30} color="#007AFF" />
      <Text style={styles.cardText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#f1f4f8' }}>
      <Header title="Atividades" iconName="barbell-outline" />

      <Text style={styles.sectionTitle}>Atividades Físicas</Text>
      <FlatList
        data={atividadesFisicas}
        keyExtractor={(item) => item.id}
        renderItem={renderCardFisica}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={styles.listContainer}
      />

      <Text style={styles.sectionTitle}>Atividades Mentais</Text>
      <FlatList
        data={atividadesMentais}
        keyExtractor={(item) => item.id}
        renderItem={renderCardMental}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 55,
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
    width: cardWidth,
    height: cardWidth,
    borderRadius: 15,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  
  cardText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
  },
});
