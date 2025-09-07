import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import * as Location from 'expo-location';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Header from '../../components/Header';
import { getPlaces } from '../../services/geoapify';
import { getWeather } from '../../services/weather';

export default function Lugares() {
  const [weather, setWeather] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(true);

  const [city, setCity] = useState('');
  const [places, setPlaces] = useState([]);
  const [loadingPlaces, setLoadingPlaces] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('hospital');

  const categories = [
    { label: 'Hospitais', value: 'hospital', icon: 'medkit-outline', color: '#ffb3b3' },
    { label: 'Farmácias', value: 'pharmacy', icon: 'medkit-outline', color: '#b3e5ff' },
    { label: 'Academias', value: 'gym', icon: 'fitness-outline', color: '#b3ffb3' },
    { label: 'Restaurantes', value: 'restaurant', icon: 'restaurant-outline', color: '#ffd9b3' },
    { label: 'Turismo', value: 'tourism', icon: 'map-outline', color: '#e0b3ff' },
  ];

  const handlePanic = () => alert('🚨 Botão de pânico acionado!');

  // Limpa a cidade ao entrar na aba Lugares
  useFocusEffect(
    React.useCallback(() => {
      setCity('');
    }, [])
  );

  // Busca clima
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permissão negada', 'Não foi possível acessar a localização.');
          setLoadingWeather(false);
          return;
        }

        const loc = await Location.getCurrentPositionAsync({});
        const cityName = await Location.reverseGeocodeAsync(loc.coords);
        if (cityName[0]?.city) setCity(cityName[0].city);

        const data = await getWeather(loc.coords.latitude, loc.coords.longitude);
        setWeather(data);
      } catch (error) {
        console.log('Erro ao buscar o tempo:', error);
      } finally {
        setLoadingWeather(false);
      }
    };
    fetchWeather();
  }, []);

  // Função fetchPlaces com useCallback para eliminar warning
  
  //const fetchPlacesHandler = useCallback(async (searchCity = city, category = selectedCategory) => {
  //  try {
  //    setLoadingPlaces(true);
  //    const data = await getPlaces(searchCity, category);
  //    setPlaces(data);
  //    return data;
  //  } catch (error) {
  //    console.log('Erro ao buscar lugares:', error);
  //    Alert.alert('Erro', 'Não foi possível buscar os lugares.');
  //    return [];
  //  } finally {
  //    setLoadingPlaces(false);
  //  }
  //}, [city, selectedCategory]);
  const fetchPlacesHandler = useCallback(async (category = selectedCategory) => {
  try {
    setLoadingPlaces(true);

    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Não foi possível acessar a localização.');
      return;
    }

    const loc = await Location.getCurrentPositionAsync({});
    const lat = loc.coords.latitude;
    const lon = loc.coords.longitude;

    const data = await getPlaces(lat, lon, category);
    setPlaces(data);
    return data;
  } catch (error) {
    console.log('Erro ao buscar lugares:', error);
    Alert.alert('Erro', 'Não foi possível buscar os lugares.');
    return [];
  } finally {
    setLoadingPlaces(false);
  }
  }, [selectedCategory]);
  
  // Busca ao alterar cidade ou categoria
  useEffect(() => {
    fetchPlacesHandler();
  }, [ selectedCategory, fetchPlacesHandler]);

  // Botão de localização ao lado da lupa
  const handleLocationPress = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Não foi possível acessar a localização.');
      return;
    }

    const loc = await Location.getCurrentPositionAsync({});
    const cityName = await Location.reverseGeocodeAsync(loc.coords);
    if (cityName[0]?.city) setCity(cityName[0].city);

    // Chama a busca por lugares com coordenadas
    fetchPlacesHandler();
  } catch (error) {
    console.log('Erro ao obter localização:', error);
    Alert.alert('Erro', 'Não foi possível obter a localização.');
  }
};

  return (
    <ScrollView style={styles.container}>
      <Header 
        title="Lugares" 
        iconName="location-outline" 
        onPanicPress={handlePanic} 
        weather={weather} 
      />

      {loadingWeather && (
        <ActivityIndicator size="large" color="#007AFF" style={{ marginVertical: 20 }} />
      )}

      {/* Caixa de pesquisa de cidade com lupa e botão de localização */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite a cidade"
          value={city}
          onChangeText={setCity}
        />
        <TouchableOpacity style={styles.searchButton} onPress={() => fetchPlacesHandler()}>
          <Ionicons name="search" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.locationButton} onPress={handleLocationPress}> 
          <Ionicons name="locate-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Botões de categorias */}
      <View style={styles.categoriesContainer}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.value}
            style={[
              styles.categoryButton,
              { backgroundColor: cat.color },
              selectedCategory === cat.value && styles.categorySelected
            ]}
            onPress={() => setSelectedCategory(cat.value)}
          >
            <Ionicons name={cat.icon} size={24} color="#007AFF" />
            <Text style={styles.categoryText}>{cat.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Lista de lugares */}
      {loadingPlaces && <ActivityIndicator size="large" color="#007AFF" style={{ marginVertical: 20 }} />}

      <View style={styles.placesContainer}>
        {places.length === 0 && !loadingPlaces && (
          <Text style={{ textAlign: 'center', marginTop: 20, color: '#555' }}>Nenhum lugar encontrado.</Text>
        )}
        {places.map((item, index) => (
          <View key={index} style={styles.placeCard}>
            <Ionicons name="location-outline" size={28} color="#007AFF" />
            <Text style={styles.placeText}>{item.name}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f4f8' },
  searchContainer: { flexDirection: 'row', padding: 15, alignItems: 'center' },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  searchButton: {
    marginLeft: 10,
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  locationButton: {
    marginLeft: 10,
    backgroundColor: '#00C851',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  categoriesContainer: { paddingHorizontal: 15, marginBottom: 10 },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginVertical: 5
  },
  categorySelected: { borderWidth: 2, borderColor: '#007AFF' },
  categoryText: { marginLeft: 10, fontSize: 16, fontWeight: '600', color: '#007AFF' },
  placesContainer: { paddingHorizontal: 20, paddingBottom: 30 },
  placeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0ff',
    borderRadius: 12,
    padding: 15,
    marginVertical: 8,
  },
  placeText: { marginLeft: 12, fontSize: 18, fontWeight: '600', color: '#007AFF' }
});
