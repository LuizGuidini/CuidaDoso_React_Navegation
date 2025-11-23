import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import DataHoraAtual from '../components/DataHoraAtual';
import Header from '../components/Header';
import { auth, db } from '../config/firebaseInit';
import { agendarNotificacao } from '../services/notificacaoService';
import styles from '../styles/AppScreens.styles';

export default function CriarCompromissoScreen() {
  const navigation = useNavigation();
  const [titulo, setTitulo] = useState('');
  const [tipo, setTipo] = useState('consulta');
  const [data, setData] = useState(new Date());
  const [hora, setHora] = useState(new Date());
  const [observacoes, setObservacoes] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const salvarCompromisso = async () => {
    if (!titulo || !tipo || !data || !hora) {
      Alert.alert('Preencha todos os campos obrigatórios.');
      return;
    }

    try {
      await addDoc(collection(db, 'agenda'), {
        uid: auth.currentUser.uid,
        titulo,
        tipo,
        data: data.toLocaleDateString('pt-BR'),
        hora: hora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        observacoes,
        confirmado: false,
      });

      await agendarNotificacao({ titulo, tipo, data, hora });

      Alert.alert('Compromisso salvo com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao salvar compromisso:', error);
      Alert.alert('Erro ao salvar compromisso.');
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Novo Compromisso" iconName="calendar-outline" />
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginLeft: 10 }}>
        <TouchableOpacity onPress={() => navigation.navigate("Agenda")}>
          <Ionicons name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <DataHoraAtual />
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Título</Text>
        <TextInput
          style={styles.inputCriar}
          placeholder="Ex: Consulta com Dr. Silva"
          value={titulo}
          onChangeText={setTitulo}
        />

        <Text style={styles.title}>Tipo</Text>
        <View style={styles.pickerCriar}>
          <Picker selectedValue={tipo} onValueChange={(itemValue) => setTipo(itemValue)}>
            <Picker.Item label="Consulta" value="consulta" />
            <Picker.Item label="Transporte" value="transporte" />
            <Picker.Item label="Medicamento" value="medicamento" />
            <Picker.Item label="Pessoal" value="pessoal" />
          </Picker>
        </View>

        <Text style={styles.title}>Data</Text>
        <TouchableOpacity style={styles.inputCriar} onPress={() => setShowDatePicker(true)}>
          <Text>{data.toLocaleDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={data}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) setData(selectedDate);
            }}
          />
        )}

        <Text style={styles.title}>Hora</Text>
        <TouchableOpacity style={styles.inputCriar} onPress={() => setShowTimePicker(true)}>
          <Text>{hora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            value={hora}
            mode="time"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(event, selectedTime) => {
              setShowTimePicker(false);
              if (selectedTime) setHora(selectedTime);
            }}
          />
        )}

        <Text style={styles.title}>Observações</Text>
        <TextInput
          style={styles.inputCriar}
          placeholder="Ex: Levar exames"
          value={observacoes}
          onChangeText={setObservacoes}
        />

        <TouchableOpacity style={styles.button} onPress={salvarCompromisso}>
          <Text style={styles.buttonText}>Salvar compromisso</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
