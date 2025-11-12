import { useNavigation } from '@react-navigation/native';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../components/Header';
import styles from '../styles/AppScreens.styles';

export default function TransporteScreen() {
  const navigation = useNavigation();
  const db = getFirestore();
  const [transportes, setTransportes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const carregarTransportes = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'transportes'));
      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTransportes(lista);
    } catch (error) {
      Alert.alert('Erro ao carregar transportes', error.message);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarTransportes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.destino}</Text>
      <Text>Horário: {item.horario}</Text>
      <Text>Tipo: {item.tipo === 'encomenda' ? 'Encomenda' : 'Pessoal'}</Text>
      <Text>Status: {item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Transporte" iconName="car-outline" />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('NovoTransporte')}
      >
        <Text style={styles.buttonText}>+ Solicitar transporte</Text>
      </TouchableOpacity>

      {carregando ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>Carregando transportes...</Text>
      ) : (
        <FlatList
          contentContainerStyle={styles.list}
          data={transportes}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', marginTop: 20 }}>
              Nenhum transporte solicitado ainda.
            </Text>
          }
        />
      )}
    </View>
  );
}
