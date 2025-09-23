import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
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

import Header from '../components/Header';
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

  const salvarCompromisso = () => {
    if (!titulo || !tipo || !data || !hora) {
      Alert.alert('Preencha todos os campos obrigatórios.');
      return;
    }

    console.log({
      titulo,
      tipo,
      data: data.toLocaleDateString(),
      hora: hora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      observacoes,
    });

    Alert.alert('Compromisso salvo com sucesso!');
  };

  return (
    <View style={styles.container}>
      <Header title="Novo Compromisso" iconName="calendar-outline" />
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Título</Text>
        <TextInput
          style={styles.inputCriar}
          placeholder="Ex: Consulta com Dr. Silva"
          value={titulo}
          onChangeText={setTitulo}
        />

        <Text style={styles.title}>Tipo</Text>
        <View style={styles.pickerCriar}>
          <Picker
            selectedValue={tipo}
            onValueChange={(itemValue) => setTipo(itemValue)}
          >
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
      </View>
        </ScrollView>
    </View>
  );
}
