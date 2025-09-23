import { Ionicons } from '@expo/vector-icons';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';
import { auth, db } from '../config/firebaseInit';

export default function AgendaScreen() {
  const [compromissos, setCompromissos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarAgenda = async () => {
      const uid = auth.currentUser?.uid;
      if (!uid) return;

      const agendaRef = collection(db, 'users', uid, 'agenda');
      const snapshot = await getDocs(agendaRef);
      const dados = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCompromissos(dados);
      setLoading(false);
    };

    carregarAgenda();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.itemHeader}>
        <Ionicons
          name={
            item.tipo === 'consulta' ? 'medkit-outline' :
            item.tipo === 'transporte' ? 'car-outline' :
            'calendar-outline'
          }
          size={20}
          color="#007AFF"
          style={{ marginRight: 8 }}
        />
        <Text style={styles.titulo}>{item.titulo}</Text>
      </View>
      <Text style={styles.info}>{item.data} às {item.hora}</Text>
      {item.tipo === 'transporte' && <Text style={styles.info}>Motorista: {item.motorista}</Text>}
      {item.tipo === 'consulta' && <Text style={styles.info}>Clínica: {item.clinica}</Text>}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="Agenda"
        iconName="calendar-outline"
        onPanicPress={() => {}}
        weather={null}
      />

      <View style={styles.content}>
        <Text style={styles.header}>Meus Compromissos</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={compromissos}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  item: {
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  titulo: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
  },
  info: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
});
