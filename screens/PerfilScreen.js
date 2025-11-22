import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { doc, setDoc } from 'firebase/firestore';
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

export default function PerfilScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  //const { dadosIniciais } = route.params || {};
  const [userData, setUserData] = useState(null);

  
  useEffect(() => {
    if (route.params?.dadosIniciais) {
      setUserData(route.params.dadosIniciais);
    } else {
      setUserData({
        nome: '',
        foto: null,
        cep: '',
        rua: '',
        numeroCasa: '',
        bairro: '',
        cidade: '',
        estado: '',
        tipoSanguineo: '',
        planoSaude: '',
        condicoesMedicas: '',
        historicoMedico: '',
        vacinas: '',
        preferenciasCuidado: '',
        emoji: '',
        fraseEmocional: '',
      });
    }
  }, [route.params?.dadosIniciais]);

  if (!userData) {
    return <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 40 }} />;
  }  
  //const [userData, setUserData] = useState(dadosIniciais || {
  //  nome: '',
  //  foto: null,
  //  cep: '',
  //  rua: '',
  //  numeroCasa: '',
  //  bairro: '',
  //  cidade: '',
  //  estado: '',
  //  tipoSanguineo: '',
  //  planoSaude: '',
  //  condicoesMedicas: '',
  //  historicoMedico: '',
  //  vacinas: '',
  //  preferenciasCuidado: '',
  //  emoji: '',
  //  fraseEmocional: '',
  //});
  
  const emojis = ['😀', '😢', '😴', '😡', '😍', '😐'];
  const frasesSugeridas = [
    'Hoje estou tranquilo',
    'Preciso de apoio',
    'Me sinto animado',
    'Estou cansado',
    'Quero ficar sozinho',
    'Estou bem, obrigado'
  ];

  const escolherFoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setUserData((prev) => ({ ...prev, foto: result.assets[0].uri }));
    }
  };

  const buscarEnderecoPorCEP = async () => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${userData.cep}/json/`);
      const data = await response.json();
      if (data.erro) throw new Error('CEP inválido');
      setUserData((prev) => ({
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
      setUserData((prev) => ({
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

  const salvarPerfil = async () => {
    try {
      const uid = await getUidPrincipal();
      await setDoc(doc(db, 'usuarios', uid), userData, { merge: true });
      Alert.alert('Perfil atualizado com sucesso!');
      navigation.replace('Perfil');
    } catch (error) {
      Alert.alert('Erro ao salvar perfil.');
      console.error(error);
    }
  };
  
  return (

  <View style={{ flex: 1, backgroundColor: '#f1f4f8' }}>
    <Header title="Meu Perfil" iconName="person-circle-outline" /> 
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginLeft: 10 }}>
     <TouchableOpacity onPress={() => navigation.goBack()}>
       <Ionicons name="arrow-back" size={24} color="#007AFF" />
     </TouchableOpacity>
    </View>
  
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* 👤 Nome e Foto */}
      <TouchableOpacity style={styles.fotoContainer} onPress={escolherFoto}>
        {userData.foto ? (
          <Image source={{ uri: userData.foto }} style={styles.foto} />
        ) : (
          <View style={styles.fotoPlaceholder}>
            <Ionicons name="camera-outline" size={32} color="#555" />
            <Text style={styles.fotoTexto}>Adicionar foto</Text>
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.campo}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          value={userData.nome}
          onChangeText={(text) => setUserData((prev) => ({ ...prev, nome: text }))}
        />
      </View>

      {/* 📍 Endereço */}
      <Text style={styles.secao}>Endereço</Text>

      <View style={styles.campo}>
        <Text style={styles.label}>CEP</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={userData.cep}
          onChangeText={(text) => setUserData((prev) => ({ ...prev, cep: text }))}
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
        <TextInput style={styles.input} value={userData.rua} editable={false} />
      </View>

      <View style={styles.campo}>
        <Text style={styles.label}>Número</Text>
        <TextInput
          style={styles.input}
          value={userData.numeroCasa}
          onChangeText={(text) => setUserData((prev) => ({ ...prev, numeroCasa: text }))}
        />
      </View>

      <View style={styles.campo}>
        <Text style={styles.label}>Bairro</Text>
        <TextInput style={styles.input} value={userData.bairro} editable={false} />
      </View>

      <View style={styles.campo}>
        <Text style={styles.label}>Cidade</Text>
        <TextInput style={styles.input} value={userData.cidade} editable={false} />
      </View>

      <View style={styles.campo}>
        <Text style={styles.label}>Estado</Text>
        <TextInput style={styles.input} value={userData.estado} editable={false} />
      </View>

      {/* 🩺 Saúde */}
      <Text style={styles.secao}>Saúde</Text>

      <View style={styles.campo}>
        <Text style={styles.label}>Tipo sanguíneo</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: O+, A-, AB+"
          value={userData.tipoSanguineo}
          onChangeText={(text) => setUserData((prev) => ({ ...prev, tipoSanguineo: text }))}
        />
      </View>

      <View style={styles.campo}>
        <Text style={styles.label}>Plano de saúde</Text>
        <TextInput
          style={styles.input}
          placeholder='Ex: Unimed, Bradesco'
          value={userData.planoSaude}
          onChangeText={(text) => setUserData((prev) => ({ ...prev, planoSaude: text }))}
        />
      </View>

      <View style={styles.campo}>
        <Text style={styles.label}>Condições médicas</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder='Ex: Diabetes, Hipertensão'
          multiline
          value={userData.condicoesMedicas}
          onChangeText={(text) => setUserData((prev) => ({ ...prev, condicoesMedicas: text }))}
        />
      </View>

      <View style={styles.campo}>
        <Text style={styles.label}>Histórico médico</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder='Ex: Cirurgias, alergias'
          multiline
          value={userData.historicoMedico}
          onChangeText={(text) => setUserData((prev) => ({ ...prev, historicoMedico: text }))}
        />
      </View>

      <View style={styles.campo}>
        <Text style={styles.label}>Vacinas recentes</Text>
        <TextInput
          style={styles.input}
          placeholder='Ex: Gripe, COVID-19'
          value={userData.vacinas}
          onChangeText={(text) => setUserData((prev) => ({ ...prev, vacinas: text }))}
        />
      </View>

      {/* 🧘 Preferências */}
      <Text style={styles.secao}>Preferências de cuidado</Text>

      <View style={styles.campo}>
        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder='Ex: Prefiro cuidados mais calmos e pacientes'
          multiline
          value={userData.preferenciasCuidado}
          onChangeText={(text) => setUserData((prev) => ({ ...prev, preferenciasCuidado: text }))}
        />
      </View>

      {/* 😀 Emoções */}
      <Text style={styles.secao}>Emoções</Text>

      <View style={styles.campo}> 
        <Text style={styles.label}>Escolha um emoji</Text>
      <View style={styles.emojiContainer}>
        {emojis.map((e) => (
        <TouchableOpacity
          key={e}
          style={[
            styles.emojiBotao,
            userData.emoji === e && styles.emojiSelecionado
          ]}
          onPress={() => setUserData((prev) => ({ ...prev, emoji: e }))}
        >
          <Text style={styles.emojiTexto}>{e}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
  <View style={styles.campo}>
    <Text style={styles.label}>Frase emocional</Text>
    <View style={styles.frasesContainer}>
      {frasesSugeridas.map((frase) => (
        <TouchableOpacity
          key={frase}
          style={[
            styles.fraseBotao,
            userData.fraseEmocional === frase && styles.fraseSelecionada
          ]}
          onPress={() => setUserData((prev) => ({ ...prev, fraseEmocional: frase }))}
        >
          <Text style={styles.fraseTexto}>{frase}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>

  <TouchableOpacity style={styles.botaoSalvar} onPress={salvarPerfil}>
    <Ionicons name="save-outline" size={24} color="#fff" />
    <Text style={styles.botaoTexto}>Salvar perfil</Text>
  </TouchableOpacity>

</ScrollView>
</View>
);
} 
