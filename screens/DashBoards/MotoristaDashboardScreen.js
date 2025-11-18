import { useNavigation } from '@react-navigation/native';
import { addDoc, collection, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import CardChamado from '../../components/CardChamado';
import Header from '../../components/Header';
import { auth, db } from '../../config/firebaseInit';
import styles from '../../styles/Dashboard.styles';

export default function MotoristaDashboardScreen() {
  const navigation = useNavigation();
  const [chamadosPendentes, setChamadosPendentes] = useState([]);
  const [agendaMotorista, setAgendaMotorista] = useState([]);
  const uidMotorista = auth.currentUser?.uid;

  useEffect(() => {
    // Listener em tempo real
    const unsub = onSnapshot(collection(db, 'pedidosTransporte'), (snapshot) => {
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
    });

    return () => unsub(); // limpa listener ao desmontar
  }, [uidMotorista]);

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
  };

  const recusarChamado = async (chamado) => {
    const ref = doc(db, 'pedidosTransporte', chamado.id);
    await updateDoc(ref, {
      status: 'recusado',
      idMotorista: uidMotorista,
    });
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
            <CardChamado
              chamado={item}
              onAceitar={() => aceitarChamado(item)}
              onRecusar={() => recusarChamado(item)}
            />
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
