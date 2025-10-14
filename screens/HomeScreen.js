import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Header from '../components/Header';
import { getWeather } from '../services/weather';
import verificarCompromissosMensais from '../utils/verificarCompromissosMensais';

const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 120) / 2; // espaçamento para 2 colunas

export default function HomeScreen() {
  const navigation = useNavigation();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const handlePanic = () => alert('Botão de pânico acionado!');

  useEffect(() => {
    const fetchWeather = async () => {
      const data = await getWeather();
      setWeather(data);
      setLoading(false);
    };
    fetchWeather();
    verificarCompromissosMensais();
  }, []);

  const features = [
    { id: '1', title: 'Agenda', icon: 'calendar-outline', screen: 'Agenda', color: '#a3d5ff' },
    { id: '2', title: 'Transporte', icon: 'car-outline', screen: 'Transporte', color: '#ffe0a3' },
    { id: '3', title: 'Meus Cuidados', icon: 'fitness-outline', screen: 'Medicamentos', color: '#d2ecff' },
    { id: '4', title: 'Perfil', icon: 'person-outline', screen: 'Perfil', color: '#ffd2ec' },
    { id: '5', title: 'Saúde e Bem-Estar', icon: 'bicycle-outline', screen: 'Atividades', color: '#d2ffd2' },
    { id: '6', title: 'Receitas', icon: 'restaurant-outline', screen: 'Receitas', color: '#ffe0e0' },
    { id: '7', title: 'Lugares', icon: 'map-outline', screen: 'Lugares', color: '#e0e0ff' },
    { id: '8', title: 'Amigo', icon: 'people-outline', screen: 'Amigo', color: '#ffb3b3' },
    { id: '9', title: 'Auth', icon: 'alert-circle-outline', screen: 'Auth', color: '#ffcccc' },
    { id: '10', title: 'MotoristaDashboard', icon: 'walk-outline', screen: 'MotoristaDashboard', color: '#ccffcc' },
  ];

  const renderCard = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: item.color }]}
      onPress={() => navigation.navigate(item.screen)}
    >
      <Ionicons name={item.icon} size={36} color="#007AFF" />
      <Text style={styles.cardText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header personalizado */}
      <Header
        title="Inicio"
        iconName="home-outline"
        onPanicPress={handlePanic}
        weather={weather}
      />

      {/* Conteúdo principal */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      ) : (
        <FlatList
          data={features}
          keyExtractor={(item) => item.id}
          renderItem={renderCard}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f4f8' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  listContainer: {
    paddingHorizontal: 35,
    paddingTop: 15,
    paddingBottom: 30,
  },
  card: {
    width: cardWidth,
    height: cardWidth,
    borderRadius: 12,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    elevation: 4,
    marginHorizontal: 10,    
  },
  cardText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: '#007AFF',
  },
});
