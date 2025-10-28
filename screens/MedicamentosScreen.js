import { useNavigation } from '@react-navigation/native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Header from '../components/Header';
import { db } from '../config/firebaseInit';
import styles from '../styles/AppScreens.styles';
import { getUidPrincipal } from '../utils/uidHelper';

export default function MedicamentosScreen() {
  const navigation = useNavigation();
  const [medicamentos, setMedicamentos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarMedicamentos = async () => {
      setLoading(true);
      try {
        const uid = await getUidPrincipal();
        const q = query(collection(db, 'medicamentos'), where('uid', '==', uid));
        const snapshot = await getDocs(q);
        const lista = [];

        snapshot.forEach(doc => {
          const dados = doc.data();
          lista.push({
            id: doc.id,
            nome: dados.nome,
            frequenciaHoras: dados.frequenciaHoras,
            inicioDataHora: new Date(dados.inicioDataHora),
            observacoes: dados.observacoes || '',
            usoContinuo: dados.usoContinuo || false,
          });
        });

        setMedicamentos(lista);
      } catch (error) {
        console.error('Erro ao carregar medicamentos:', error);
      }
      setLoading(false);
    };

    carregarMedicamentos();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.nome}</Text>
      <Text>Frequência: a cada {item.frequenciaHoras}h</Text>
      <Text>
        Início: {item.inicioDataHora.toLocaleDateString('pt-BR')} às{' '}
        {item.inicioDataHora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Text>
      {item.usoContinuo && <Text>Uso contínuo ✅</Text>}
      {item.observacoes !== '' && <Text>Obs: {item.observacoes}</Text>}
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Medicamentos" iconName="medkit-outline" />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('NovoMedicamento')}
      >
        <Text style={styles.buttonText}>+ Novo medicamento</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={medicamentos}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
  
}
