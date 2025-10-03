import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function AtividadeDetalheScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { atividade } = route.params;

  const [favorito, setFavorito] = useState(atividade.favorito || false);

  const toggleFavorito = () => {
    setFavorito((prev) => !prev);
    // Futuro: salvar favorito no perfil ou banco
  };

  const salvarNaAgenda = () => {
    Alert.alert(
      'Salvar na agenda',
      'Em breve você poderá escolher dia e horário para essa atividade.'
    );
    // Futuro: abrir modal de data/hora e salvar no Firebase ou AsyncStorage
  };

  return (
    <View style={[styles.container, { backgroundColor: atividade.color }]}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* 🔙 Voltar */}
        <TouchableOpacity style={styles.voltar} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={28} color="#007AFF" />
        </TouchableOpacity>

        {/* 🧠 Ícone e título */}
        <View style={styles.cabecalho}>
          <Ionicons name={atividade.icon} size={60} color="#007AFF" />
          <Text style={styles.titulo}>{atividade.title}</Text>
        </View>

        {/* 📖 Instrução */}
        <Text style={styles.instrucao}>{atividade.instrucao}</Text>

        {/* ❤️ Favoritar */}
        <TouchableOpacity style={styles.favoritoBotao} onPress={toggleFavorito}>
          <Ionicons
            name={favorito ? 'heart' : 'heart-outline'}
            size={28}
            color={favorito ? '#FF3366' : '#555'}
          />
          <Text style={styles.favoritoTexto}>
            {favorito ? 'Favoritado' : 'Favoritar'}
          </Text>
        </TouchableOpacity>

        {/* 💾 Salvar */}
        <TouchableOpacity style={styles.salvarBotao} onPress={salvarNaAgenda}>
          <Ionicons name="save-outline" size={24} color="#fff" />
          <Text style={styles.salvarTexto}>Salvar na agenda</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 30,
    paddingBottom: 60,
  },
  voltar: {
    marginBottom: 20,
  },
  cabecalho: {
    alignItems: 'center',
    marginBottom: 20,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
    textAlign: 'center',
    marginTop: 10,
  },
  instrucao: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 30,
    textAlign: 'justify',
  },
  favoritoBotao: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  favoritoTexto: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  salvarBotao: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  salvarTexto: {
    marginLeft: 10,
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});
