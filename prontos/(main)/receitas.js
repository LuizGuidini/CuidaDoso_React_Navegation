import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import Header from '../../components/Header';
import { getWeather } from '../../services/weather';

export default function Receitas() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const handlePanic = () => alert('Botão de pânico acionado!');

  const recipes = [
    'Salada de frutas',
    'Suco verde detox',
    'Omelete de legumes',
    'Iogurte com aveia',
    'Sopa nutritiva',
  ];

  useEffect(() => {
    const fetchWeather = async () => {
      const data = await getWeather();
      setWeather(data);
      setLoading(false);
    };
    fetchWeather();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Header title="Receitas" iconName="restaurant-outline" onPanicPress={handlePanic} weather={weather} />

      {loading && <ActivityIndicator size="large" color="#007AFF" style={{ marginVertical: 20 }} />}

      <View style={styles.listContainer}>
        {recipes.map((item, index) => (
          <View key={index} style={styles.card}>
            <Ionicons name="restaurant-outline" size={28} color="#007AFF" />
            <Text style={styles.cardText}>{item}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f4f8' },
  listContainer: { paddingHorizontal: 20, paddingVertical: 15 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffe0e0',
    borderRadius: 12,
    padding: 15,
    marginVertical: 8,
  },
  cardText: { marginLeft: 12, fontSize: 18, fontWeight: '600', color: '#007AFF' },
});
