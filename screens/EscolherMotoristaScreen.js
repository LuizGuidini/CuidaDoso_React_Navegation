import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../components/Header';
import styles from '../styles/AppScreens.styles';

export default function EscolherMotoristaScreen() {
    
  const navigation = useNavigation();
  const [motorista, setMotorista] = useState('qualquer');
  const [modo, setModo] = useState('agendar');
  const [horario, setHorario] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const motoristasDisponiveis = [
    { id: '1', nome: 'Carlos' },
    { id: '2', nome: 'Fernanda' },
    { id: '3', nome: 'João' },
  ];

  const continuar = () => {
    navigation.navigate('NovoTransporte', {
      motorista,
      horario: modo === 'agendar' ? horario : new Date(),
    });
  };

  return (
    <View style={styles.container}>
      <Header title="Escolher Motorista" iconName="car-outline" />
      
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginLeft: 10 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Motorista</Text>
        <View style={styles.pickerCriar}>
          <Picker
            selectedValue={motorista}
            onValueChange={(value) => setMotorista(value)}
          >
            <Picker.Item label="Qualquer disponível" value="qualquer" />
            {motoristasDisponiveis.map((m) => (
              <Picker.Item key={m.id} label={m.nome} value={m.nome} />
            ))}
          </Picker>
        </View>

        <Text style={styles.title}>Modo de chamada</Text>
        <View style={styles.pickerCriar}>
          <Picker
            selectedValue={modo}
            onValueChange={(value) => setModo(value)}
          >
            <Picker.Item label="Agendar horário" value="agendar" />
            <Picker.Item label="Chamar agora" value="agora" />
          </Picker>
        </View>

        {modo === 'agendar' && (
          <>
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
          </>
        )}

        <TouchableOpacity style={styles.button} onPress={continuar}>
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
