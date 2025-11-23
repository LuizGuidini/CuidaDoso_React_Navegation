import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import DataHoraAtual from '../components/DataHoraAtual';
import Header from '../components/Header';
import { auth, db } from '../config/firebaseInit';
import styles from '../styles/AppScreens.styles';
import { getUidPrincipal } from '../utils/uidHelper';

export default function NovaAnotacaoScreen() {
  const navigation = useNavigation();
  const [texto, setTexto] = useState('');
  //const [dataNotificacao, setDataNotificacao] = useState(null);
  const [mostrarPicker, setMostrarPicker] = useState(false);

  const extrairPalavrasChave = (texto) => {
    const comuns = ['de', 'do', 'da', 'a', 'o', 'e', 'com', 'para', 'em', 'no', 'na'];
    return texto
      .toLowerCase()
      .replace(/[.,!?]/g, '')
      .split(' ')
      .filter(p => p.length > 2 && !comuns.includes(p));
  };

  const gravarAnotacao = async () => {
    if (texto.trim() === '') {
      Alert.alert('Digite algo na anotação.');
      return;
    }

    const uidFinal = await getUidPrincipal();
    const palavrasChave = extrairPalavrasChave(texto);

    const anotacao = {
      uid: uidFinal,
      texto,
      dataCriacao: new Date(),
      palavrasChave,
      notificar: false,
      autor: auth.currentUser.uid === uidFinal ? 'usuario' : 'amigo',
    };

    try {
      await addDoc(collection(db, 'anotacoes'), anotacao);
      Alert.alert('Anotação salva com sucesso!');
      setTexto('');
    } catch (error) {
      Alert.alert('Erro ao salvar anotação.');
      console.error(error);
    }
  };


  const agendarNotificacao = async () => {
    if (texto.trim() === '') {
      Alert.alert('Digite a anotação antes de agendar.');
      return;
    }
    setMostrarPicker(true);
  };

  const onEscolherData = async (event, selectedDate) => {
    setMostrarPicker(false);
    if (selectedDate) {
      const uidFinal = await getUidPrincipal();
      const palavrasChave = extrairPalavrasChave(texto);

      const anotacao = {
        uid: uidFinal,
        texto,
        dataCriacao: new Date(),
        palavrasChave,
        notificar: true,
        dataNotificacao: selectedDate,
        autor: auth.currentUser.uid === uidFinal ? 'usuario' : 'amigo',
      };

      try {
        await addDoc(collection(db, 'anotacoes'), anotacao);
        Alert.alert('Notificação agendada!');
        setTexto('');
      } catch (error) {
        Alert.alert('Erro ao agendar notificação.');
        console.error(error);
      }
    }
  };


  return (
    <View style={styles.container}>
      <Header title="Nova Anotação" iconName="document-text-outline" />
      
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginLeft: 10 }}>
        <TouchableOpacity onPress={() => navigation.navigate('Anotacoes')}>
          <Ionicons name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <DataHoraAtual />
      </View>

      <TextInput
        style={[styles.input, { minHeight: 60, maxHeight: 120, textAlignVertical: 'top' }]}
        placeholder="Lembrei de..."
        multiline
        scrollEnabled={true}
        value={texto}
        onChangeText={setTexto}
      />

      <TouchableOpacity style={styles.button} onPress={gravarAnotacao}>
        <Text style={styles.buttonText}>Gravar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={agendarNotificacao}>
        <Text style={styles.buttonText}>Notificar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#ccc' }]}
        onPress={() => navigation.navigate('Anotacoes')}
      >
        <Text style={styles.buttonText}>Ver Anotações</Text>
      </TouchableOpacity>

      {mostrarPicker && (
        <DateTimePicker
          value={new Date()}
          mode="datetime"
          display="default"
          onChange={onEscolherData}
        />
      )}
    </View>
  );
}
