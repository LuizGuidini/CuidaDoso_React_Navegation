import { useNavigation } from '@react-navigation/native';
import { addDoc, collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import CardChamado from '../components/CardChamado';
import Header from '../components/Header';
import { auth, db } from '../config/firebaseInit';

export default function MotoristaDashboardScreen() {
  const navigation = useNavigation();
  const [chamadosPendentes, setChamadosPendentes] = useState([]);
  const [agendaMotorista, setAgendaMotorista] = useState([]);
  const uidMotorista = auth.currentUser?.uid;

  useEffect(() => {
    const carregarChamados = async () => {
      const snapshot = await getDocs(collection(db, 'pedidosTransporte'));
      const pendentes = [];
      const agenda = [];

      snapshot.forEach((docSnap) => {
        const dados = docSnap.data();
        if (dados.status === 'pendente') {
          pendentes.push({ id: docSnap.id, ...dados });
        } else if (dados.idMotorista === uidMotorista) {
          agenda.push({ id: docSnap.id, ...dados });
        }
      });

      setChamadosPendentes(pendentes);
      setAgendaMotorista(agenda);
    };

    carregarChamados();
  }, []);

  const aceitarChamado = async (chamado) => {
    const ref = doc(db, 'pedidosTransporte', chamado.id);
    await updateDoc(ref, {
      status: 'aceito',
      idMotorista: uidMotorista,
    });

    // Cria evento na agenda do usuário
    await addDoc(collection(db, 'agenda'), {
      uidUsuario: chamado.idUsuario,
      tipo: 'transporte',
      destino: chamado.destino,
      data: chamado.data,
      hora: chamado.hora,
      motorista: uidMotorista,
    });

    // Atualiza localmente
    setChamadosPendentes((prev) => prev.filter((c) => c.id !== chamado.id));
    setAgendaMotorista((prev) => [...prev, { ...chamado, status: 'aceito', idMotorista: uidMotorista }]);
  };

  return (
    <View style={styles.container}>
      <Header title="Painel do Motorista" iconName="car-outline" />

      <Text style={styles.secao}>Chamados pendentes</Text>
      {chamadosPendentes.length === 0 ? (
        <Text style={styles.vazio}>Nenhum chamado no momento.</Text>
      ) : (
        <FlatList
          data={chamadosPendentes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CardChamado chamado={item} onAceitar={() => aceitarChamado(item)} />
          )}
        />
      )}

      <Text style={styles.secao}>Minha agenda</Text>
      {agendaMotorista.length === 0 ? (
        <Text style={styles.vazio}>Nenhuma viagem agendada.</Text>
      ) : (
        <FlatList
          data={agendaMotorista}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.cardAgenda}>
              <Text style={styles.agendaTexto}>
                {item.data} às {item.hora} — {item.destino}
              </Text>
              <Text style={styles.agendaStatus}>Status: {item.status}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f4f8', padding: 20 },
  secao: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 10,
    color: '#007AFF',
  },
  vazio: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  cardAgenda: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  agendaTexto: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  agendaStatus: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
});
