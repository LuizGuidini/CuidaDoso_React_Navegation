import { useNavigation, useRoute } from '@react-navigation/native';
import { useState } from 'react';
import {
    Alert,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Header from '../components/Header';
import styles from '../styles/AppScreens.styles';

export default function NovoTransporteScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const { motorista, horario } = route.params || {};
  const [destino, setDestino] = useState('');
  const [observacoes, setObservacoes] = useState('');

  const solicitarTransporte = () => {
    if (!destino || !horario) {
      Alert.alert('Preencha o destino e horário.');
      return;
    }

    console.log({
      destino,
      motorista,
      horario: new Date(horario).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      observacoes,
    });

    Alert.alert('Transporte solicitado com sucesso!');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header title="Solicitar Transporte" iconName="car-outline" />

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Motorista escolhido</Text>
        <TextInput
          style={styles.inputCriar}
          value={motorista === 'qualquer' ? 'Qualquer disponível' : motorista}
          editable={false}
        />

        <Text style={styles.title}>Horário</Text>
        <TextInput
          style={styles.inputCriar}
          value={new Date(horario).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          editable={false}
        />

        <Text style={styles.title}>Destino</Text>
        <TextInput
          style={styles.inputCriar}
          placeholder="Ex: Clínica São Lucas"
          value={destino}
          onChangeText={setDestino}
        />

        <Text style={styles.title}>Observações</Text>
        <TextInput
          style={styles.inputCriar}
          placeholder="Ex: Levar cadeira de rodas"
          value={observacoes}
          onChangeText={setObservacoes}
        />

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
