import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Header from '../components/Header';
import styles from "../styles/AppScreens.styles";


export default function AgendaScreen() {
  const navigation = useNavigation();
  const [compromissos, setCompromissos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('');
  const [searchText, setSearchText] = useState('');

  const compromissosMock = [
    { id: '1', tipo: 'consulta', titulo: 'Consulta com Dr. Silva', data: '21/09', hora: '14:30' },
    { id: '2', tipo: 'transporte', titulo: 'Transporte para clínica', data: '21/09', hora: '13:30', motorista: 'Carlos' },
    { id: '3', tipo: 'medicamento', titulo: 'Tomar Losartana', data: '21/09', hora: '08:00' },
    { id: '4', tipo: 'pessoal', titulo: 'Caminhada no parque', data: '21/09', hora: '17:00' },
  ];

  const filtrarCompromissos = () => {
    let lista = compromissosMock;
    if (filtro) {
      lista = lista.filter(item => item.tipo === filtro);
    }
    if (searchText) {
      lista = lista.filter(item => item.titulo.toLowerCase().includes(searchText.toLowerCase()));
    }
    return lista;
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setCompromissos(compromissosMock);
      setLoading(false);
    }, 1000);
  }, []);

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

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CriarCompromisso')}
      >
      <Text style={styles.buttonText}>+ Novo compromisso</Text>
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
