import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Header from '../components/Header';
import { db } from '../config/firebaseInit';
import styles from '../styles/PerfilScreen.styles';
import { getUidPrincipal } from '../utils/uidHelper';

export default function AmigoScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const [dados, setDados] = useState(null);

  useEffect(() => {
    if (route.params?.dadosIniciais) {
      setDados(route.params.dadosIniciais);
    } else {
      setDados({
        nome: '',
        foto: null,
        telefone: '',
        telefoneAmigo: '',
        cep: '',
        rua: '',
        numeroCasa: '',
        bairro: '',
        cidade: '',
        estado: '',
        tipo: '',
        parentesco: '',
        emoji: '',
        fraseEmocional: '',
      });
    }
  }, [route.params?.dadosIniciais]);

  if (!dados) {
    return <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 40 }} />;
  }

  //const emojis = ['😀', '😢', '😴', '😡', '😍', '😐'];
  //const frasesSugeridas = [
  //  'Hoje estou tranquilo',
  //  'Preciso de apoio',
  //  'Me sinto animado',
  //  'Estou cansado',
  //  'Quero ficar sozinho',
  //  'Estou bem, obrigado'
  //];

  const atualizarCampo = (campo, valor) => {
    setDados((prev) => ({ ...prev, [campo]: valor }));
  };

  const escolherFoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      atualizarCampo('foto', result.assets[0].uri);
    }
  };

  const buscarEnderecoPorCEP = async () => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${dados.cep}/json/`);
      const data = await response.json();
      if (data.erro) throw new Error('CEP inválido');
      setDados((prev) => ({
        ...prev,
        rua: data.logradouro,
        bairro: data.bairro,
        cidade: data.localidade,
        estado: data.uf
      }));
    } catch {
      Alert.alert('Erro ao buscar CEP', 'Verifique o CEP informado.');
    }
  };

  const buscarEnderecoPorLocalizacao = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Não foi possível acessar a localização.');
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      const geo = await Location.reverseGeocodeAsync(loc.coords);
      const endereco = geo[0];
      setDados((prev) => ({
        ...prev,
        rua: endereco.street || '',
        bairro: endereco.subregion || '',
        cidade: endereco.city || '',
        estado: endereco.region || ''
      }));
    } catch {
      Alert.alert('Erro ao obter localização', 'Não foi possível preencher o endereço.');
    }
  };

  const salvarAmigo = async () => {
    try {
      const uidUsuario = await getUidPrincipal();
      const docUsuario = await getDoc(doc(db, 'usuarios', uidUsuario));
      const dadosUsuario = docUsuario.data();

      const uidAmigo = dadosUsuario.uidAmigo;
      if (!uidAmigo) {
        Alert.alert('Usuário não possui amigo vinculado.');
        return;
     }

      await setDoc(doc(db, 'usuarios', uidAmigo), dados, { merge: true });
      Alert.alert('Dados do amigo atualizados!');
      navigation.replace('Amigo')
    } catch (error) {
      Alert.alert('Erro ao salvar dados.');
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f1f4f8' }}>
      <Header title="Editar Amigo" iconName="heart-outline" />

      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {/* Foto */}
        <TouchableOpacity style={styles.fotoContainer} onPress={escolherFoto}>
          {dados.foto ? (
            <Image source={{ uri: dados.foto }} style={styles.foto} />
          ) : (
            <View style={styles.fotoPlaceholder}>
              <Ionicons name="camera-outline" size={32} color="#555" />
              <Text style={styles.fotoTexto}>Adicionar foto</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Dados pessoais */}
        <View style={styles.campo}>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            value={dados.nome}
            onChangeText={(text) => atualizarCampo('nome', text)}
            placeholder="Nome completo"
          />
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Telefone</Text>
          <TextInput
            style={styles.input}
            value={dados.telefone}
            onChangeText={(text) => atualizarCampo('telefone', text)}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Outro contato</Text>
          <TextInput
            style={styles.input}
            value={dados.telefoneAmigo}
            onChangeText={(text) => atualizarCampo('telefoneAmigo', text)}
            keyboardType="phone-pad"
          />
        </View>

        {/* Endereço */}
        <Text style={styles.secao}>Endereço</Text>

        <View style={styles.campo}>
          <Text style={styles.label}>CEP</Text>
          <TextInput
            style={styles.input}
            value={dados.cep}
            onChangeText={(text) => atualizarCampo('cep', text)}
            placeholder="XXXXX-XXX"
            keyboardType="numeric"
          />
          <View style={styles.botaoLinha}>
            <TouchableOpacity style={styles.botaoMini} onPress={buscarEnderecoPorCEP}>
              <Text style={styles.botaoMiniTexto}>Buscar por CEP</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botaoMini} onPress={buscarEnderecoPorLocalizacao}>
              <Text style={styles.botaoMiniTexto}>Usar localização</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Rua</Text>
          <TextInput style={styles.input} value={dados.rua} editable={false} />
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Número</Text>
          <TextInput
            style={styles.input}
            value={dados.numeroCasa}
            onChangeText={(text) => atualizarCampo('numeroCasa', text)}
            placeholder="Número da casa"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Bairro</Text>
          <TextInput style={styles.input} value={dados.bairro} editable={false} />
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Cidade</Text>
          <TextInput style={styles.input} value={dados.cidade} editable={false} />
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Estado</Text>
          <TextInput style={styles.input} value={dados.estado} editable={false} />
        </View>

        {/* Vínculo */}
        <Text style={styles.secao}>Vínculo</Text>

        <View style={styles.campo}>
          <Text style={styles.label}>Tipo</Text>
          <TextInput
            style={styles.input}
            value={dados.tipo}
            onChangeText={(text) => atualizarCampo('tipo', text)}
          />
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Parentesco</Text>
          <TextInput
            style={styles.input}
            value={dados.parentesco}
            onChangeText={(text) => atualizarCampo('parentesco', text)}
          />
        </View>

        {/* Salvar */}
        <TouchableOpacity style={styles.botaoSalvar} onPress={salvarAmigo}>
          <Ionicons name="save-outline" size={24} color="#fff" />
          <Text style={styles.botaoTexto}>Salvar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
