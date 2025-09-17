import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../components/Header';
import { auth } from '../config/firebaseConfig';
import { cadastrarUsuarioTeste } from '../services/authService';
import { criarUsuarioTesteSemAuth } from '../services/testFirestore';
import { getWeather } from '../services/weather';

console.log("Auth UID:", auth?.currentUser?.uid);


export default function PerfilScreen() {
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

  const info = [
    { title: 'Nome: Maria Guidini', icon: 'person-outline' },
    { title: 'Idade: 38 anos', icon: 'person-outline' },
    { title: 'Telefone: (11) 99999-9999', icon: 'call-outline' },
  ];

  return (
    <View style={styles.container}>
      <Header title="Perfil" iconName="person-outline" onPanicPress={handlePanic} weather={weather} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
          </View>
        )}

        {info.map((item, index) => (
          <View key={index} style={styles.card}>
            <Ionicons name={item.icon} size={28} color="#007AFF" />
            <Text style={styles.cardText}>{item.title}</Text>
          </View>
        ))}
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
          cadastrarUsuarioTeste(
            'teste@cuidadoso.com',
            '123456',
            'Maria Teste',
            '11999999999'
          )
        }
        >
          <Text style={styles.cardText}>Criar Usuário de Teste</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
          criarUsuarioTesteSemAuth()
        }
        >
          <Text style={styles.cardText}>Criar Usuário de Teste sem Auth</Text>
        </TouchableOpacity>

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
    backgroundColor: '#ffd2ec',
  },
  cardText: { marginLeft: 15, fontSize: 18, fontWeight: '600', color: '#007AFF' },
});
