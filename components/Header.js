import { Ionicons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { Alert, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getWeather } from '../services/weather';

export default function Header({ title, iconName, panicNumber = '190' }) {
  const [weather, setWeather] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permissão negada', 'Não foi possível acessar a localização.');
          return;
        }
        const loc = await Location.getCurrentPositionAsync({});
        const data = await getWeather(loc.coords.latitude, loc.coords.longitude);
        setWeather(data);
      } catch (error) {
        console.log('Erro ao buscar o tempo:', error);
      }
    };
    fetchWeather();
  }, []);

  const handlePanic = () => {
    Alert.alert(
      'Pânico',
      `Deseja ligar para ${panicNumber}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Ligar', onPress: () => Linking.openURL(`tel:${panicNumber}`) },
      ]
    );
  };

  const goHome = () => {
    navigation.navigate('MainDrawer', {
      screen: 'Tabs',
      params: { screen: 'Inicio' },
    });
  };

  return (
    <View style={styles.container}>
      {/* Topo: logo (volta para Home) e botão de pânico */}
      <View style={styles.topRow}>
        
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <Ionicons name="menu-outline" size={32} color="#374151" />
        </TouchableOpacity>

        <TouchableOpacity onPress={goHome}>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.panicButton} onPress={handlePanic}>
          <Ionicons name="alert-circle" size={28} color="#fff" />
          <Text style={styles.panicText}>PÂNICO</Text>
        </TouchableOpacity>
      </View>

      {/* Segunda linha: ícone da página, título e previsão */}
      <View style={styles.bottomRow}>
        <View style={styles.leftRow}>
          <Ionicons name={iconName} size={28} color="#007AFF" />
          <Text style={styles.title}>{title}</Text>
        </View>
        {weather && (
          <Text style={styles.weatherText}>
            {weather.temp}°C {weather.city}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 40,
    paddingHorizontal: 15,
    backgroundColor: '#f1f4f8',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: { width: 80, height: 80 },
  panicButton: {
    backgroundColor: '#e90404',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 50,
    elevation: 8,
  },
  panicText: { color: '#fff', fontWeight: 'bold', marginLeft: 6, fontSize: 14 },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  leftRow: { flexDirection: 'row', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#007AFF', marginLeft: 8 },
  weatherText: { fontSize: 14, color: '#555' },
});
