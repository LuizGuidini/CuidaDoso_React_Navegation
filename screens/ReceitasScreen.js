import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Linking,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../components/Header';
import {
  buscarReceitasAleatorias,
  buscarReceitasPorTipo
} from '../services/receitas';
import styles from '../styles/ReceitasScreen.styles';

export default function ReceitasScreen() {
  const navigation = useNavigation();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  const fetchRandomRecipes = async () => {
    console.log('useEffect chamado');
    setLoading(true);
    try {
      const data = await buscarReceitasAleatorias();
      setRecipes(data);
    } catch (error) {
      console.error('Erro ao buscar receitas aleatórias:', error.message);
    }
    setLoading(false);
  };

  const handleSearch = async () => {
  const termo = searchText.trim().toLowerCase();
  if (!termo) return fetchRandomRecipes();

  setLoading(true);
  try {
    const tipos = ['doce', 'salgado', 'agridoce'];
    const todas = await Promise.all(tipos.map((tipo) => buscarReceitasPorTipo(tipo)));
    const combinadas = todas.flat();
    const filtradas = combinadas.filter((r) =>
      r.receita.toLowerCase().includes(termo)
    );
    setRecipes(filtradas);
  } catch (error) {
    console.error('Erro ao buscar receitas por nome:', error.message);
  }
  setLoading(false);
};

  const buscarNoTudoGostoso = () => {
    if (!searchText.trim()) return;
    const url = `https://www.tudogostoso.com.br/busca?q=${encodeURIComponent(searchText)}`;
    Linking.openURL(url);
  };

  useFocusEffect(
    useCallback(() => {
      console.log('useFocusEffect chamado');
      setSearchText('');
      fetchRandomRecipes();
    }, [])
  );

  const renderCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ReceitaDetalhe', { recipe: item })}
    >
      <Image source={{ uri: item.link_imagem }} style={styles.image} />
      <Text style={styles.title}>{item.receita}</Text>
    </TouchableOpacity>
  );

  return (
    
    <FlatList
      data={recipes}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderCard}
      contentContainerStyle={styles.list}
      ListHeaderComponent={
        <View style={styles.headerContainer}>
          <Header title="Receitas" iconName="restaurant-outline" />
          
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginLeft: 10 }}>
            <TouchableOpacity onPress={() => navigation.navigate('Inicio')}>
              <Ionicons name="arrow-back" size={24} color="#007AFF" />
            </TouchableOpacity>
          </View>
          <View style={styles.filterContainer}>
            {['doce', 'salgado', 'agridoce'].map((tipo) => (
             <TouchableOpacity
                key={tipo}
                style={styles.filterButton}
                onPress={async () => {
                  setLoading(true);
                  const data = await buscarReceitasPorTipo(tipo);
                  setRecipes(data);
                  setSearchText('');
                 setLoading(false);
                }}
              >
                <Text style={styles.filterText}>{tipo.toUpperCase()}</Text>
            </TouchableOpacity>
          ))}
          </View>

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
          <TouchableOpacity style={styles.linkButton} onPress={buscarNoTudoGostoso}>
            <Text style={styles.linkButtonText}>Ver no TudoGostoso.com.br</Text>
          </TouchableOpacity>
        </View>
      }
      ListEmptyComponent={
        loading ? (
          <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />
        ) : (
          <Text style={styles.emptyText}>Nenhuma receita encontrada.</Text>
        )
      }
    />
  );
}


