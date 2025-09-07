import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../../components/Header';
import { getWeather } from '../../services/weather';

export default function Home() {
  const router = useRouter();
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
  }, []);

  const features = [
    { title: 'Agenda', icon: 'calendar-outline', screen: 'agenda', color: '#a3d5ff' },
    { title: 'Transporte', icon: 'car-outline', screen: 'transporte', color: '#ffe0a3' },
    { title: 'Medicamentos', icon: 'medkit-outline', screen: 'medicamentos', color: '#d2ecff' },
    { title: 'Perfil', icon: 'person-outline', screen: 'perfil', color: '#ffd2ec' },
    { title: 'Atividades', icon: 'fitness-outline', screen: 'atividades', color: '#d2ffd2' },
    { title: 'Receitas', icon: 'restaurant-outline', screen: 'receitas', color: '#ffe0e0' },
    { title: 'Lugares', icon: 'map-outline', screen: 'lugares', color: '#e0e0ff' },
  ];

  return (
    <View style={styles.container}>
      {/* Header personalizado */}
      <Header
        title="Home"
        iconName="home-outline"
        onPanicPress={handlePanic}
        weather={weather}
      />

      {/* Conteúdo principal */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
          </View>
        )}

        {/* Cards das funcionalidades */}
        {features.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, { backgroundColor: item.color }]}
            onPress={() => router.push(item.screen)}
          >
            <Ionicons name={item.icon} size={36} color="#007AFF" />
            <Text style={styles.cardText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f4f8' },
  scrollContainer: { paddingVertical: 15, alignItems: 'center', paddingBottom: 30 },
  loadingContainer: { width: '100%', marginVertical: 20, alignItems: 'center' },
  card: {
    width: '90%',
    borderRadius: 12,
    padding: 20,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardText: { marginLeft: 15, fontSize: 18, fontWeight: '600', color: '#007AFF' },
});
