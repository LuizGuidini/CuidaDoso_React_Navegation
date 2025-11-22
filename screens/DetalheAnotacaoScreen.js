import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { deleteDoc, doc } from 'firebase/firestore';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Header from '../components/Header';
import { db } from '../config/firebaseInit';
import styles from '../styles/AppScreens.styles';

export default function DetalheAnotacaoScreen({ route }) {
  const navigation = useNavigation();
  const { anotacao } = route.params;

  const apagarAnotacao = async () => {
    try {
      await deleteDoc(doc(db, 'anotacoes', anotacao.id));
      Alert.alert('Anotação apagada com sucesso!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro ao apagar anotação.');
      console.error(error);
    }
  };

  // Tratamento seguro da data
  const formatarData = () => {
    if (!anotacao.dataCriacao) return 'Data não disponível';
    if (anotacao.dataCriacao instanceof Date) {
      return anotacao.dataCriacao.toLocaleDateString('pt-BR');
    }
    if (anotacao.dataCriacao.toDate) {
      return anotacao.dataCriacao.toDate().toLocaleDateString('pt-BR');
    }
    return new Date(anotacao.dataCriacao).toLocaleDateString('pt-BR');
  };

  return (
    <View style={styles.container}>
      <Header title="Anotação" iconName="document-text-outline" />

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginLeft: 10 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={{ fontSize: 16, marginLeft: 10 }}>
          {formatarData()}
        </Text>
      </View>

      <View style={{ marginTop: 20, marginHorizontal: 20 }}>
        <Text style={{ fontWeight: 'bold' }}>Autor:</Text>
        <Text>{anotacao.autor === "amigo" ? "Amigo" : "Usuário Principal"}</Text>
      </View>

      <ScrollView style={{ marginTop: 10, marginHorizontal: 20 }}>
        <Text style={{ fontSize: 16, lineHeight: 24 }}>
          {anotacao.texto}
        </Text>

        {anotacao.palavrasChave?.length > 0 && (
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontWeight: 'bold' }}>Palavras-chave:</Text>
            <Text>{anotacao.palavrasChave.join(', ')}</Text>
          </View>
        )}
      </ScrollView>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#FF3B30', margin: 20 }]}
        onPress={apagarAnotacao}
      >
        <Text style={styles.buttonText}>🗑️ Apagar Anotação</Text>
      </TouchableOpacity>
    </View>
  );
}
