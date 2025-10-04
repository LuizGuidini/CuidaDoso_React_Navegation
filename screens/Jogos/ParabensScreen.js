import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Text, TouchableOpacity, View } from 'react-native';
import Header from '../../components/Header';
import styles from '../../styles/jogos.styles';

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

