import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
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

export default function NovoMedicamentoScreen() {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [horario, setHorario] = useState(new Date());
  const [observacoes, setObservacoes] = useState('');
  const [showTimePicker, setShowTimePicker] = useState(false);

  const salvarMedicamento = () => {
    if (!nome || !horario) {
      Alert.alert('Preencha todos os campos obrigatórios.');
      return;
    }

    console.log({
      nome,
      horario: horario.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      observacoes,
    });

    Alert.alert('Medicamento salvo com sucesso!');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header title="Novo Medicamento" iconName="medkit-outline" />

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Nome do medicamento</Text>
        <TextInput
          style={styles.inputCriar}
          placeholder="Ex: Losartana"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.title}>Horário</Text>
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
