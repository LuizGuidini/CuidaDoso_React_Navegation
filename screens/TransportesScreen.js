import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';
import { getWeather } from '../services/weather';

export default function TransportesScreen() {
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

  const rides = [
    { title: 'Motorista: Carlos - 09:00', icon: 'car-outline' },
    { title: 'Motorista: Marina - 12:00', icon: 'car-outline' },
    { title: 'Motorista: Pedro - 15:00', icon: 'car-outline' },
  ];

  return (
    <View style={styles.container}>
      <Header title="Transporte" iconName="car-outline" onPanicPress={handlePanic} weather={weather} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
          </View>
        )}

        {rides.map((item, index) => (
          <View key={index} style={styles.card}>
            <Ionicons name={item.icon} size={28} color="#007AFF" />
            <Text style={styles.cardText}>{item.title}</Text>
          </View>
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
    backgroundColor: '#ffe0a3',
  },
  cardText: { marginLeft: 15, fontSize: 18, fontWeight: '600', color: '#007AFF' },
});
