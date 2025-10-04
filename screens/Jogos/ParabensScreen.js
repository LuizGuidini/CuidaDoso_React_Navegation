import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../../components/Header';

export default function ParabensScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { jogo, mensagem } = route.params;

  return (
    <View style={{ flex: 1, backgroundColor: '#f1f4f8' }}>
      <Header title="Parabéns!" iconName="sparkles-outline" />

      <TouchableOpacity style={styles.voltar} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-outline" size={28} color="#007AFF" />
      </TouchableOpacity>

      <View style={styles.conteudo}>
        <Ionicons name="trophy-outline" size={80} color="#FFD700" />
        <Text style={styles.jogo}>Você concluiu: {jogo}</Text>
        <Text style={styles.mensagem}>{mensagem}</Text>

        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate('MainDrawer', {screen: 'Atividades'})}
        >
          <Ionicons name="arrow-back-circle-outline" size={24} color="#fff" />
          <Text style={styles.botaoTexto}>Voltar para atividades</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  voltar: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
  },
  conteudo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  jogo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
    marginTop: 20,
    marginBottom: 10,
  },
  mensagem: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  botao: {
    flexDirection: 'row',
    backgroundColor: '#a3d5ff',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoTexto: {
    marginLeft: 10,
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
});
