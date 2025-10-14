import { useNavigation } from '@react-navigation/native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import DataHoraAtual from '../components/DataHoraAtual';
import Header from '../components/Header';
import { auth, db } from '../config/firebaseInit';
import styles from "../styles/AppScreens.styles";

export default function AgendaScreen() {
  const navigation = useNavigation();
  const [compromissos, setCompromissos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('');
  const [searchText, setSearchText] = useState('');

  // 🔍 Identifica o UID correto (principal se for amigo)
  const getUidPrincipal = async () => {
    const usuarioAtual = auth.currentUser.uid;
    const q = query(collection(db, 'usuarios'), where('uid', '==', usuarioAtual));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const dados = snapshot.docs[0].data();
      if (dados.tipo === 'amigo' && dados.vinculo) {
        return dados.vinculo;
      }
    }

    return usuarioAtual;
  };

  // 🔄 Carrega compromissos reais do Firestore
  useEffect(() => {
    const carregarCompromissos = async () => {
      setLoading(true);
      try {
        const uidFinal = await getUidPrincipal();
        const q = query(collection(db, 'agenda'), where('uid', '==', uidFinal));
        const snapshot = await getDocs(q);
        const lista = [];

        snapshot.forEach(doc => {
          const dados = doc.data();
          lista.push({
            id: doc.id,
            tipo: dados.tipo,
            titulo: dados.titulo,
            data: dados.data,
            hora: dados.hora,
            motorista: dados.motorista || null,
          });
        });

        setCompromissos(lista);
      } catch (error) {
        console.error('Erro ao carregar compromissos:', error);
      }
      setLoading(false);
    };

    carregarCompromissos();
  }, []);

  // 🔍 Filtros e busca
  const filtrarCompromissos = () => {
    let lista = compromissos;
    if (filtro) {
      lista = lista.filter(item => item.tipo === filtro);
    }
    if (searchText) {
      lista = lista.filter(item => item.titulo.toLowerCase().includes(searchText.toLowerCase()));
    }
    return lista;
  };

  // 🧾 Renderiza cada compromisso
  const renderCard = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.titulo}</Text>
      <Text>{item.data} às {item.hora}</Text>
      {item.tipo === 'transporte' && <Text>Motorista: {item.motorista}</Text>}
      <Text style={styles.tipo}>{item.tipo.toUpperCase()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Agenda" iconName="calendar-outline" />

      <DataHoraAtual />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CriarCompromisso')}
      >
        <Text style={styles.buttonText}>+ Novo compromisso</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AgendaSemanal')}
      >
        <Text style={styles.buttonText}>📅 Visualizar semana</Text>
      </TouchableOpacity>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Filtrar por título..."
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={() => {}}
        />
        <TouchableOpacity style={styles.searchButton} onPress={() => setFiltro('')}>
          <Text style={styles.searchButtonText}>Limpar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterRow}>
        {['consulta', 'transporte', 'medicamento', 'pessoal'].map(tipo => (
          <TouchableOpacity
            key={tipo}
            style={[
              styles.filterButton,
              filtro === tipo && styles.filterSelected
            ]}
            onPress={() => setFiltro(tipo)}
          >
            <Text style={filtro === tipo ? styles.filterTextSelected : styles.filterText}>
              {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={filtrarCompromissos()}
          keyExtractor={(item) => item.id}
          renderItem={renderCard}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}
