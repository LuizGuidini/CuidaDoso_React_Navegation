import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Agenda } from 'react-native-calendars';
import Header from '../components/Header';
import { auth, db } from '../config/firebaseInit';
import styles from '../styles/AppScreens.styles';

export default function AgendaSemanalScreen() {
  const [items, setItems] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const carregarAgenda = async () => {
      try {
        const q = query(collection(db, 'agenda'), where('uid', '==', auth.currentUser.uid));
        const snapshot = await getDocs(q);
        const dados = {};

        snapshot.forEach(doc => {
          const { data, hora, titulo, tipo } = doc.data();
          const key = formatarDataISO(data);
          if (!dados[key]) dados[key] = [];
          dados[key].push({ name: `${titulo} às ${hora}`, tipo });
        });

        setItems(dados);

        // Define a data selecionada apenas uma vez
        const primeiraData = Object.keys(dados)[0];
        if (primeiraData) {
          setSelectedDate(primeiraData);
        }
      } catch (error) {
        console.error('Erro ao carregar agenda semanal:', error);
      }
    };

    carregarAgenda();
  }, []); // Executa apenas uma vez ao montar

  const formatarDataISO = (dataBR) => {
    const [dia, mes, ano] = dataBR.split('/');
    return `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Header title="Agenda Semanal" iconName="calendar-outline" />
      {selectedDate && (
        <Agenda
          items={items}
          selected={selectedDate}
          renderItem={(item) => (
            <View style={styles.card}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.tipo}>{item.tipo.toUpperCase()}</Text>
            </View>
          )}
          renderEmptyDate={() => (
            <View style={styles.card}>
              <Text style={styles.title}>Nenhum compromisso</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}
