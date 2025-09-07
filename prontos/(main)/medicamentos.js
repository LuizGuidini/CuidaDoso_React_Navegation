import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import Header from '../../components/Header';
import { getWeather } from '../../services/weather';

export default function Medicamentos() {
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

  const meds = [
    { title: 'Remédio A - 08:00', icon: 'medkit-outline' },
    { title: 'Remédio B - 12:00', icon: 'medkit-outline' },
    { title: 'Remédio C - 20:00', icon: 'medkit-outline' },
  ];

  return (
    <View style={styles.container}>
      <Header title="Medicamentos" iconName="medkit-outline" onPanicPress={handlePanic} weather={weather} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {loading && <ActivityIndicator size="large" color="#007AFF" style={{ marginVertical: 20 }} />}

        {meds.map((item, index) => (
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
  card: {
    width: '90%',
    borderRadius: 12,
    padding: 20,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d2ecff',
  },
  cardText: { marginLeft: 15, fontSize: 18, fontWeight: '600', color: '#007AFF' },
});
