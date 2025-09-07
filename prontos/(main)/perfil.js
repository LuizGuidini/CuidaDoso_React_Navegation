import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import Header from '../../components/Header';
import { getWeather } from '../../services/weather';

export default function Perfil() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const handlePanic = () => alert('Botão de pânico acionado!');

  const userInfo = { nome: 'João Silva', idade: 68, amigo: 'Maria Souza' };

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
      <Header title="Perfil" iconName="person-outline" onPanicPress={handlePanic} weather={weather} />

      {loading && <ActivityIndicator size="large" color="#007AFF" style={{ marginVertical: 20 }} />}

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Nome: {userInfo.nome}</Text>
        <Text style={styles.infoText}>Idade: {userInfo.idade}</Text>
        <Text style={styles.infoText}>Amigo/Contato: {userInfo.amigo}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f4f8' },
  infoContainer: { marginTop: 20, paddingHorizontal: 20 },
  infoText: { fontSize: 18, color: '#007AFF', marginVertical: 5 },
});
