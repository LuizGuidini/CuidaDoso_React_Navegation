import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import * as Location from 'expo-location';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Header from '../components/Header';
import { geocodeCity } from '../services/opencage';
import { searchPlaces } from '../services/overpass';
import { getWeather } from '../services/weather';
import styles from '../styles/LugaresScreen.styles';

export default function LugaresScreen({ navigation }) {
  const [weather, setWeather] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(true);

  const [city, setCity] = useState('');
  const [places, setPlaces] = useState([]);
  const [loadingPlaces, setLoadingPlaces] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('hospital');
  const inputRef = useRef(null);

  const categories = [
    { label: 'Hospitais', value: 'hospital', icon: 'medkit-outline', color: '#ffb3b3' },
    { label: 'Farmácias', value: 'pharmacy', icon: 'medkit-outline', color: '#b3e5ff' },
    { label: 'Academias', value: 'gym', icon: 'fitness-outline', color: '#b3ffb3' },
    { label: 'Restaurantes', value: 'restaurant', icon: 'restaurant-outline', color: '#ffd9b3' },
    { label: 'Turismo', value: 'tourism', icon: 'map-outline', color: '#e0b3ff' },
  ];

  const handlePanic = () => alert('🚨 Botão de pânico acionado!');

  useFocusEffect(useCallback(() => setCity(''), []));

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

  const fetchPlacesHandler = useCallback(async (category = selectedCategory, cityOverride = city) => {
    try {
      setLoadingPlaces(true);
      let lat, lon;

      if (cityOverride.trim()) {
        const coords = await geocodeCity(cityOverride.trim());
        if (!coords) return;
        lat = coords.lat;
        lon = coords.lon;
      } else {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permissão negada', 'Não foi possível acessar a localização.');
          return;
        }

        const loc = await Location.getCurrentPositionAsync({});
        lat = loc.coords.latitude;
        lon = loc.coords.longitude;
      }

      const data = await searchPlaces(category, lat, lon);
      setPlaces(data);
      return data;
    } catch (error) {
      console.log('Erro ao buscar lugares:', error);
      Alert.alert('Erro', 'Não foi possível buscar os lugares.');
      return [];
    } finally {
      setLoadingPlaces(false);
    }
  }, [city, selectedCategory]);

  // Busca ao alterar categoria
  useEffect(() => {
    fetchPlacesHandler(selectedCategory, city);
  }, [selectedCategory, city, fetchPlacesHandler]);

  // Botão de localização
  const handleLocationPress = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Não foi possível acessar a localização.');
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      const cityName = await Location.reverseGeocodeAsync(loc.coords);
      const cidadeDetectada = cityName[0]?.city;

      if (cidadeDetectada) {
        setCity(cidadeDetectada);
        Alert.alert('Localização detectada', `Cidade atual: ${cidadeDetectada}`);
        fetchPlacesHandler(selectedCategory, cidadeDetectada);
      }
    } catch (error) {
      console.log('Erro ao obter localização:', error);
      Alert.alert('Erro', 'Não foi possível obter a localização.');
    }
  };

  return (
  <View style={styles.container}>
    <Header 
      title="Lugares" 
      iconName="location-outline" 
      onPanicPress={handlePanic} 
      weather={weather} 
    />
    {loadingWeather && (
      <ActivityIndicator size="large" color="#007AFF" style={{ marginVertical: 20 }} />
    )}
    
    <ScrollView style={styles.container}>
      
      <View style={styles.searchContainer}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder="Digite a cidade"
          value={city}
          onChangeText={setCity}
        />
        <TouchableOpacity style={styles.searchButton} onPress={() => fetchPlacesHandler(selectedCategory, city)}>
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
            <View>
              <Text style={styles.placeText}>{item.name}</Text>
              <Text style={styles.placeAddress}>{item.address}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  </View>
  );
}

  