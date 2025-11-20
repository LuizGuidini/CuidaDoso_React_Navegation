import { useNavigation } from '@react-navigation/native';
import { collection, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import AuthHeader from '../../components/AuthHeader'; // substitui Header
import CardChamado from '../../components/CardChamado';
import { auth, db } from '../../config/firebaseInit';
import styles from '../../styles/Dashboard.styles';

export default function ClinicaDashboardScreen() {
  const navigation = useNavigation();
  const [agendamentosPendentes, setAgendamentosPendentes] = useState([]);
  const [agendaClinica, setAgendaClinica] = useState([]);
  const uidClinica = auth.currentUser?.uid;

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'agendamentos'), (snapshot) => {
      const pendentes = [];
      const agenda = [];

      snapshot.forEach((docSnap) => {
        const dados = docSnap.data();
        if (dados.status === 'pendente') {
          pendentes.push({ id: docSnap.id, ...dados });
        } else if (dados.idClinica === uidClinica) {
          agenda.push({ id: docSnap.id, ...dados });
        }
      });

      setAgendamentosPendentes(pendentes);
      setAgendaClinica(agenda);
    });

    return () => unsub();
  }, []);

  const aceitarAgendamento = async (agendamento) => {
    const ref = doc(db, 'agendamentos', agendamento.id);
    await updateDoc(ref, {
      status: 'aceito',
      idClinica: uidClinica,
    });
  };

  const recusarAgendamento = async (agendamento) => {
    const ref = doc(db, 'agendamentos', agendamento.id);
    await updateDoc(ref, {
      status: 'recusado',
      idClinica: uidClinica,
    });
  };

  const logoff = async () => {
    await auth.signOut();
    navigation.replace('Auth'); // volta para login
  };

  return (
    <View style={styles.container}>
      <AuthHeader title="Dashboard Clínica" iconName="medkit-outline" />

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('ClinicaPerfilScreen')}
      >
        <Text style={styles.botaoTexto}>Meu Perfil</Text>
      </TouchableOpacity>

      <Text style={styles.secao}>Agendamentos pendentes</Text>
      {agendamentosPendentes.length === 0 ? (
        <Text style={styles.vazio}>Nenhum agendamento no momento.</Text>
      ) : (
        <FlatList
          data={agendamentosPendentes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CardChamado
              chamado={item}
              onAceitar={() => aceitarAgendamento(item)}
              onRecusar={() => recusarAgendamento(item)}
            />
          )}
        />
      )}

      <Text style={styles.secao}>Minha agenda</Text>
      {agendaClinica.length === 0 ? (
        <Text style={styles.vazio}>Nenhum atendimento agendado.</Text>
      ) : (
        <FlatList
          data={agendaClinica}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.cardAgenda}>
              <Text style={styles.agendaTexto}>
                {item.data} às {item.hora} — {item.paciente}
              </Text>
              <Text style={styles.agendaStatus}>Status: {item.status}</Text>
            </View>
          )}
        />
      )}
      <TouchableOpacity
        style={styles.botaoLogoff}
        onPress={logoff}
      >
        <Text style={styles.botaoTexto}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}
