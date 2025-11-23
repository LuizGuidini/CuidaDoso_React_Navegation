import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import {
  Alert,
  Platform,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DataHoraAtual from '../components/DataHoraAtual';
import Header from '../components/Header';
import { auth, db } from '../config/firebaseInit';
import styles from '../styles/AppScreens.styles';
import gerarCompromissosMedicamento from '../utils/gerarCompromissosMedicamento'; // Parte 2
import { getUidPrincipal } from '../utils/uidHelper';

export default function NovoMedicamentoScreen() {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [horario, setHorario] = useState(new Date());
  const [observacoes, setObservacoes] = useState('');
  const [frequenciaHoras, setFrequenciaHoras] = useState('');
  const [duracaoDias, setDuracaoDias] = useState('');
  const [usoContinuo, setUsoContinuo] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  
  const salvarMedicamento = async () => {
    const uidFinal = await getUidPrincipal();
    
    if (!nome || !horario || !frequenciaHoras || (!usoContinuo && !duracaoDias)) {
      Alert.alert('Preencha todos os campos obrigatórios.');
      return;
    }

    try {
      const inicioDataHora = new Date();
      inicioDataHora.setHours(horario.getHours(), horario.getMinutes(), 0);

      await addDoc(collection(db, 'medicamentos'), {
        uid: uidFinal,
        autor: auth.currentUser.uid === uidFinal ? 'usuario' : 'amigo',
        nome,
        observacoes,
        frequenciaHoras: parseInt(frequenciaHoras),
        duracaoDias: usoContinuo ? null : parseInt(duracaoDias),
        usoContinuo,
        inicioDataHora: inicioDataHora.toISOString(),
      });

      await gerarCompromissosMedicamento({
        nome,
        frequenciaHoras: parseInt(frequenciaHoras),
        duracaoDias: usoContinuo ? null : parseInt(duracaoDias),
        inicioDataHora,
        usoContinuo,
      });

      Alert.alert('Medicamento salvo e compromissos gerados!');
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao salvar medicamento:', error);
      Alert.alert('Erro ao salvar medicamento.');
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Novo Medicamento" iconName="medkit-outline" />
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginLeft: 10 }}>
              <TouchableOpacity onPress={() => navigation.navigate("Medicamentos")}>
                <Ionicons name="arrow-back" size={24} color="#007AFF" />
              </TouchableOpacity>
              <DataHoraAtual />
            </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Nome do medicamento</Text>
        <TextInput
          style={styles.inputCriar}
          placeholder="Ex: Losartana"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.title}>Horário da primeira dose</Text>
        <TouchableOpacity style={styles.inputCriar} onPress={() => setShowTimePicker(true)}>
          <Text>{horario.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            value={horario}
            mode="time"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(event, selectedTime) => {
              setShowTimePicker(false);
              if (selectedTime) setHorario(selectedTime);
            }}
          />
        )}

        <Text style={styles.title}>Frequência (em horas)</Text>
        <TextInput
          style={styles.inputCriar}
          placeholder="Ex: 8"
          keyboardType="numeric"
          value={frequenciaHoras}
          onChangeText={setFrequenciaHoras}
        />

        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
          <Switch value={usoContinuo} onValueChange={setUsoContinuo} />
          <Text style={{ marginLeft: 10 }}>Medicamento de uso contínuo</Text>
        </View>

        {!usoContinuo && (
          <>
            <Text style={styles.title}>Duração (em dias)</Text>
            <TextInput
              style={styles.inputCriar}
              placeholder="Ex: 10"
              keyboardType="numeric"
              value={duracaoDias}
              onChangeText={setDuracaoDias}
            />
          </>
        )}

        <Text style={styles.title}>Observações</Text>
        <TextInput
          style={styles.inputCriar}
          placeholder="Ex: Tomar após o café"
          value={observacoes}
          onChangeText={setObservacoes}
        />

        <TouchableOpacity style={styles.button} onPress={salvarMedicamento}>
          <Text style={styles.buttonText}>Salvar medicamento</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
