import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../components/Header';
import { getRandomRecipes, searchRecipes } from '../services/receitas';
import { translateText } from '../services/translate';

export default function ReceitasScreen() {
  const navigation = useNavigation();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  const fetchRandomRecipes = async () => {
    setLoading(true);
    const data = await getRandomRecipes(4);

    // traduz títulos
    const translated = await Promise.all(
      data.map(async (recipe) => ({
        ...recipe,
        title: await translateText(recipe.title, 'pt'),
      }))
    );

    setRecipes(translated);
    setLoading(false);
  };

  const handleSearch = async () => {
    if (!searchText) return fetchRandomRecipes();
    setLoading(true);

    const data = await searchRecipes(searchText, 4);

    // traduz títulos
    const translated = await Promise.all(
      data.map(async (recipe) => ({
        ...recipe,
        title: await translateText(recipe.title, 'pt'),
      }))
    );

    setRecipes(translated);
    setLoading(false);
  };

  useEffect(() => {
    fetchRandomRecipes();
  }, []);

  const renderCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ReceitaDetalhe', { recipe: item })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title="Receitas" iconName="restaurant-outline" />

      {/* barra de busca */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Pesquisar receitas..."
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCard}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    backgroundColor: '#fff',
  },
  searchButton: {
    marginLeft: 10,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  searchButtonText: { color: '#fff', fontWeight: 'bold' },
  list: { paddingHorizontal: 15, paddingBottom: 30 },
  card: {
    backgroundColor: '#d7d5ebff',
    borderRadius: 12,
    marginVertical: 8,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: { width: 80, height: 80, borderRadius: 8 },
  title: { marginLeft: 15, fontSize: 16, fontWeight: '600', flex: 1 },
});
