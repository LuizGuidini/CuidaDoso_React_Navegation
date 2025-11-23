import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DataHoraAtual from '../components/DataHoraAtual';
import Header from '../components/Header';
import styles from '../styles/AppScreens.styles';

export default function NovoTransporteScreen() {
  const navigation = useNavigation();
  const db = getFirestore();

  // Estados do formulário
  const [tipo, setTipo] = useState('pessoal');
  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const [observacoes, setObservacoes] = useState('');

  // Data/hora
  const [dataHora, setDataHora] = useState(new Date());
  const [mostrarPickerData, setMostrarPickerData] = useState(false);
  const [mostrarPickerHora, setMostrarPickerHora] = useState(false);

  // Motoristas
  const [motorista, setMotorista] = useState('');
  const [motoristaInfo, setMotoristaInfo] = useState(null);
  const [motoristasDisponiveis, setMotoristasDisponiveis] = useState([]);
  const [loadingMotoristas, setLoadingMotoristas] = useState(true);

  // Geolocalização automática
  useEffect(() => {
    const buscarLocalizacao = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permissão negada para acessar localização');
          return;
        }

        const local = await Location.getCurrentPositionAsync({});
        const endereco = await Location.reverseGeocodeAsync(local.coords);
        const rua = endereco[0]?.street || '';
        const numero = endereco[0]?.name || '';
        const cidade = endereco[0]?.city || '';
        setOrigem(`${rua}, ${numero} - ${cidade}`);
      } catch (e) {
        console.log('Erro ao obter localização:', e);
      }
    };

    buscarLocalizacao();
  }, []);

  // Buscar motoristas na coleção "usuarios" com tipo "motorista"
  useEffect(() => {
    const carregarMotoristas = async () => {
      try {
        const q = query(collection(db, 'usuarios'), where('tipo', '==', 'motorista'));
        const snapshot = await getDocs(q);
        const lista = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(), // espera { nome, telefone, veiculo, tipo }
        }));
        setMotoristasDisponiveis(lista);
      } catch (error) {
        console.error('Erro ao carregar motoristas:', error);
        Alert.alert('Erro ao carregar motoristas');
      } finally {
        setLoadingMotoristas(false);
      }
    };

    carregarMotoristas();
  }, [db]);

  const selecionarMotorista = (m) => {
    setMotorista(m.nome);
    setMotoristaInfo(m);
  };

  const solicitarTransporte = async () => {
    if (!destino || !motorista) {
      Alert.alert('Preencha destino e motorista.');
      return;
    }

    try {
      await addDoc(collection(db, 'transportes'), {
        tipo,
        origem,
        destino,
        observacoes,
        horario: dataHora.toISOString(),
        motoristaNome: motorista,
        motoristaId: motoristaInfo?.id || null,
        status: 'pendente',
        criadoEm: serverTimestamp(),
      });

      Alert.alert('Transporte solicitado com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Erro ao solicitar transporte', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Solicitar Transporte" iconName="car-outline" />

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginLeft: 10 }}>
        <TouchableOpacity onPress={() => navigation.navigate('Transportes')}>
          <Ionicons name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <DataHoraAtual />
      </View>

      <ScrollView style={styles.contentContainer} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Tipo de transporte */}
        <Text style={styles.title}>Tipo de transporte</Text>
        <View style={{ flexDirection: 'row', marginBottom: 12 }}>
          <TouchableOpacity
            style={[styles.tipoButton, tipo === 'pessoal' && styles.tipoButtonAtivo]}
            onPress={() => setTipo('pessoal')}
          >
            <Text style={styles.tipoButtonText}>Para mim</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tipoButton, tipo === 'encomenda' && styles.tipoButtonAtivo]}
            onPress={() => setTipo('encomenda')}
          >
            <Text style={styles.tipoButtonText}>Encomenda</Text>
          </TouchableOpacity>
        </View>

        {/* Origem automática */}
        <Text style={styles.title}>Origem</Text>
        <TextInput style={styles.inputCriar} value={origem} editable={false} />

        {/* Destino */}
        <Text style={styles.title}>Destino</Text>
        <TextInput
          style={styles.inputCriar}
          placeholder="Ex: Clínica São Lucas"
          value={destino}
          onChangeText={setDestino}
        />

        {/* Data e horário */}
        <Text style={styles.title}>Data e horário</Text>
        <TouchableOpacity style={styles.inputCriar} onPress={() => setMostrarPickerData(true)}>
          <Text>{dataHora.toLocaleDateString()}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.inputCriar} onPress={() => setMostrarPickerHora(true)}>
          <Text>{dataHora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
        </TouchableOpacity>

        {/* Picker de data */}
        {mostrarPickerData && (
          <DateTimePicker
            value={dataHora}
            mode="date"
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            onChange={(event, selectedDate) => {
              setMostrarPickerData(false);
              if (event.type === 'set' && selectedDate) {
                const nova = new Date(dataHora);
                nova.setFullYear(selectedDate.getFullYear());
                nova.setMonth(selectedDate.getMonth());
                nova.setDate(selectedDate.getDate());
                setDataHora(nova);
              }
            }}
          />
        )}

        {/* Picker de hora */}
        {mostrarPickerHora && (
          <DateTimePicker
            value={dataHora}
            mode="time"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(event, selectedTime) => {
              setMostrarPickerHora(false);
              if (event.type === 'set' && selectedTime) {
                const nova = new Date(dataHora);
                nova.setHours(selectedTime.getHours());
                nova.setMinutes(selectedTime.getMinutes());
                setDataHora(nova);
              }
            }}
          />
        )}

        {/* Motorista */}
        <Text style={styles.title}>Motorista</Text>
        {loadingMotoristas ? (
          <ActivityIndicator size="small" color="#007AFF" />
        ) : motoristasDisponiveis.length === 0 ? (
          <Text style={{ marginBottom: 12 }}>Nenhum motorista cadastrado.</Text>
        ) : (
          motoristasDisponiveis.map((m) => (
            <TouchableOpacity
              key={m.id}
              style={[styles.tipoButton, motorista === m.nome && styles.tipoButtonAtivo]}
              onPress={() => selecionarMotorista(m)}
            >
              <Text style={styles.tipoButtonText}>{m.nome}</Text>
            </TouchableOpacity>
          ))
        )}

        {/* Dados do motorista selecionado */}
        {motoristaInfo && (
          <View style={{ marginTop: 10 }}>
            {!!motoristaInfo.telefone && <Text>📞 Telefone: {motoristaInfo.telefone}</Text>}
            {!!motoristaInfo.veiculo && <Text>🚗 Veículo: {motoristaInfo.veiculo}</Text>}
          </View>
        )}

        {/* Observações */}
        <Text style={styles.title}>Observações</Text>
        <TextInput
          style={styles.inputCriar}
          placeholder="Ex: Levar cadeira de rodas"
          value={observacoes}
          onChangeText={setObservacoes}
        />

        {/* Botões */}
        <TouchableOpacity style={styles.button} onPress={solicitarTransporte}>
          <Text style={styles.buttonText}>Solicitar transporte</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
