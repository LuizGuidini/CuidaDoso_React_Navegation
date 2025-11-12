import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import { addDoc, collection, getFirestore, serverTimestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
  Alert,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../components/Header';
import styles from '../styles/AppScreens.styles';

export default function NovoTransporteScreen() {
  const navigation = useNavigation();
  const db = getFirestore();

  const [tipo, setTipo] = useState('pessoal');
  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [dataHora, setDataHora] = useState(new Date());
  const [mostrarPicker, setMostrarPicker] = useState(false);
  const [motorista, setMotorista] = useState('');
  const [motoristaInfo, setMotoristaInfo] = useState(null);

  // Geolocalização automática
  useEffect(() => {
    const buscarLocalizacao = async () => {
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
    };

    buscarLocalizacao();
  }, []);

  // Simulação de dados de motoristas
  const motoristasDisponiveis = [
    { nome: 'Carlos Silva', telefone: '11999999999', veiculo: 'Fiat Doblo' },
    { nome: 'Ana Souza', telefone: '11988888888', veiculo: 'Renault Kwid' },
    { nome: 'Qualquer disponível', telefone: '', veiculo: '' },
  ];

  const selecionarMotorista = (nome) => {
    setMotorista(nome);
    const info = motoristasDisponiveis.find((m) => m.nome === nome);
    setMotoristaInfo(info);
  };

  const solicitarTransporte = async () => {
    if (!destino || !dataHora || !motorista) {
      Alert.alert('Preencha todos os campos obrigatórios.');
      return;
    }

    try {
      await addDoc(collection(db, 'transportes'), {
        tipo,
        origem,
        destino,
        observacoes,
        horario: dataHora.toISOString(),
        motorista,
        status: 'pendente',
        criadoEm: serverTimestamp(),
      });

      Alert.alert('Transporte solicitado com sucesso!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro ao solicitar transporte', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Solicitar Transporte" iconName="car-outline" />

      <View style={styles.contentContainer}>
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
        <TouchableOpacity
          style={styles.inputCriar}
          onPress={() => setMostrarPicker(true)}
        >
          <Text>{dataHora.toLocaleString()}</Text>
        </TouchableOpacity>
        {mostrarPicker && (
          <DateTimePicker
            value={dataHora}
            mode="datetime"
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            onChange={(event, selectedDate) => {
              setMostrarPicker(false);
              if (selectedDate) setDataHora(selectedDate);
            }}
          />
        )}

        {/* Seleção de motorista */}
        <Text style={styles.title}>Motorista</Text>
        {motoristasDisponiveis.map((m) => (
          <TouchableOpacity
            key={m.nome}
            style={[
              styles.tipoButton,
              motorista === m.nome && styles.tipoButtonAtivo,
            ]}
            onPress={() => selecionarMotorista(m.nome)}
          >
            <Text style={styles.tipoButtonText}>{m.nome}</Text>
          </TouchableOpacity>
        ))}

        {/* Dados do motorista selecionado */}
        {motoristaInfo && motoristaInfo.telefone !== '' && (
          <View style={{ marginTop: 10 }}>
            <Text>📞 Telefone: {motoristaInfo.telefone}</Text>
            <Text>🚗 Veículo: {motoristaInfo.veiculo}</Text>
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
      </View>
    </View>
  );
}
