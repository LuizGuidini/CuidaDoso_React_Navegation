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
import Header from '../components/Header';
import { auth, db } from '../config/firebaseInit';
import styles from '../styles/AppScreens.styles';

export default function NovaAnotacaoScreen() {
  const navigation = useNavigation();
  const [texto, setTexto] = useState('');
  const [dataNotificacao, setDataNotificacao] = useState(null);
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

    const palavrasChave = extrairPalavrasChave(texto);
    const anotacao = {
      uid: auth.currentUser.uid,
      texto,
      dataCriacao: new Date(),
      palavrasChave,
      notificar: false,
      autor: 'usuario',
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
      const palavrasChave = extrairPalavrasChave(texto);
      const anotacao = {
        uid: auth.currentUser.uid,
        texto,
        dataCriacao: new Date(),
        palavrasChave,
        notificar: true,
        dataNotificacao: selectedDate,
        autor: 'usuario',
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

      <Text style={{ marginBottom: 10 }}>
        Data: {new Date().toLocaleDateString('pt-BR')}
      </Text>

      <TextInput
        style={[styles.input, { height: 120, textAlignVertical: 'top' }]}
        placeholder="Lembrei de..."
        multiline
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
