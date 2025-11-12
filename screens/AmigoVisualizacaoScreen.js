import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Header from '../components/Header';
import { db } from '../config/firebaseInit';
import styles from '../styles/PerfilScreen.styles';
import { getUidPrincipal } from '../utils/uidHelper';

export default function AmigoVisualizacaoScreen() {
  const navigation = useNavigation();
  //const route = useRoute();
  const [amigoData, setAmigoData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const carregarAmigo = async () => {
    try {
      const uidUsuario = await getUidPrincipal();
      const docUsuario = await getDoc(doc(db, 'usuarios', uidUsuario));

      if (!docUsuario.exists()) {
        setLoading(false);
        return;
      }

      const dadosUsuario = docUsuario.data();
      const uidAmigo = dadosUsuario.uidAmigo;

      if (!uidAmigo) {
        setLoading(false);
        return;
      }

      const docAmigo = await getDoc(doc(db, 'usuarios', uidAmigo));
      if (docAmigo.exists()) {
        setAmigoData(docAmigo.data());
      }
    } catch (error) {
      console.error('Erro ao carregar dados do amigo:', error);
    }
    setLoading(false);
  };

  carregarAmigo();
}, []);


  if (loading) {
    return <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 40 }} />;
  }

  if (!amigoData) {
    return <Text style={{ margin: 20 }}>Dados do amigo não encontrados.</Text>;
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#f1f4f8' }}>
      <Header title="Amigo" iconName="heart-outline" />
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginLeft: 10 }}>
        <TouchableOpacity onPress={() => navigation.navigate("Inicio")}>
          <Ionicons name="arrow-back" size={24} color="#007AFF" />
       </TouchableOpacity>
              
      </View>

      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.fotoContainer}>
          {amigoData.foto ? (
            <Image source={{ uri: amigoData.foto }} style={styles.foto} />
          ) : (
            <View style={styles.fotoPlaceholder}>
              <Ionicons name="person-outline" size={32} color="#555" />
              <Text style={styles.fotoTexto}>Sem foto</Text>
            </View>
          )}
        </View>

        <Text style={styles.label}>Nome: {amigoData.nome}</Text>
        <Text style={styles.label}>Email: {amigoData.email}</Text>
        <Text style={styles.label}>Telefone: {amigoData.telefone}</Text>
        <Text style={styles.label}>Outro contato: {amigoData.telefoneAmigo}</Text>
        <Text style={styles.label}>CEP: {amigoData.cep}</Text>
        <Text style={styles.label}>Bairro: {amigoData.bairro}</Text>
        <Text style={styles.label}>Cidade: {amigoData.cidade}</Text>
        <Text style={styles.label}>Número da casa: {amigoData.numeroCasa}</Text>
        <Text style={styles.label}>Tipo: {amigoData.tipo}</Text>
        {amigoData.amigo && <Text style={styles.label}>Parentesco: {amigoData.amigo}</Text>}

        <TouchableOpacity
          style={styles.botaoSalvar}
          onPress={() => navigation.navigate('AmigoEdicao', { dadosIniciais: amigoData })}
        >
          <Ionicons name="create-outline" size={24} color="#fff" />
          <Text style={styles.botaoTexto}>Editar dados</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
