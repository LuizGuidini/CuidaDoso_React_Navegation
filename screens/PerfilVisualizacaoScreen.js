import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Header from '../components/Header';
import { db } from '../config/firebaseInit';
import styles from '../styles/PerfilScreen.styles';
import { getUidPrincipal } from '../utils/uidHelper';

export default function PerfilVisualizacaoScreen() {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarPerfil = async () => {
      try {
        const uid = await getUidPrincipal();
        const docRef = doc(db, 'usuarios', uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      } catch (error) {
        console.error('Erro ao carregar perfil:', error);
      }
      setLoading(false);
    };

    carregarPerfil();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 40 }} />;
  }

  if (!userData) {
    return <Text style={{ margin: 20 }}>Perfil não encontrado.</Text>;
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#f1f4f8' }}>
      <Header title="Meu Perfil" iconName="person-circle-outline" />

      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.fotoContainer}>
          {userData.foto ? (
            <Image source={{ uri: userData.foto }} style={styles.foto} />
          ) : (
            <View style={styles.fotoPlaceholder}>
              <Ionicons name="person-outline" size={32} color="#555" />
              <Text style={styles.fotoTexto}>Sem foto</Text>
            </View>
          )}
        </View>

        <Text style={styles.label}>Nome: {userData.nome}</Text>
        <Text style={styles.label}>Cidade: {userData.cidade}</Text>
        <Text style={styles.label}>Estado: {userData.estado}</Text>
        <Text style={styles.label}>Tipo sanguíneo: {userData.tipoSanguineo}</Text>
        <Text style={styles.label}>Plano de saúde: {userData.planoSaude}</Text>
        <Text style={styles.label}>Condições médicas: {userData.condicoesMedicas}</Text>
        <Text style={styles.label}>Preferências de cuidado: {userData.preferenciasCuidado}</Text>
        <Text style={styles.label}>Emoji: {userData.emoji}</Text>
        <Text style={styles.label}>Frase emocional: {userData.fraseEmocional}</Text>

        <TouchableOpacity
          style={styles.botaoSalvar}
          onPress={() => navigation.navigate('PerfilEdicao', { dadosIniciais: userData })}
        >
          <Ionicons name="create-outline" size={24} color="#fff" />
          <Text style={styles.botaoTexto}>Editar perfil</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
