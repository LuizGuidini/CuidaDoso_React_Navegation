import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Header from '../components/Header';
import { translateText } from '../services/translate';

export default function ReceitaDetalheScreen({ route, navigation }) {
  const { recipe } = route.params;
  const [translatedSummary, setTranslatedSummary] = useState('');
  const [translatedInstructions, setTranslatedInstructions] = useState('');

  useEffect(() => {
    const translateRecipe = async () => {
      if (recipe.summary) {
        setTranslatedSummary(
          await translateText(recipe.summary.replace(/<[^>]+>/g, ''), 'pt')
        );
      }
      if (recipe.instructions) {
        setTranslatedInstructions(
          await translateText(recipe.instructions.replace(/<[^>]+>/g, ''), 'pt')
        );
      }
    };
    translateRecipe();
  }, [recipe]);

  const handleSave = () => {
    Alert.alert('Salvar', 'Funcionalidade de salvar será implementada com Firebase.');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f1f4f8' }}>
      <Header title={recipe.title} iconName="restaurant-outline" />

      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{ uri: recipe.image }} style={styles.image} />

        {/* botões voltar/salvar */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={24} color="#fff" />
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Ionicons name="bookmark-outline" size={24} color="#fff" />
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Resumo</Text>
        <Text style={styles.text}>
          {translatedSummary || recipe.summary?.replace(/<[^>]+>/g, '') || 'Não disponível.'}
        </Text>

        <Text style={styles.sectionTitle}>Instruções</Text>
        <Text style={styles.text}>
          {translatedInstructions ||
            recipe.instructions?.replace(/<[^>]+>/g, '') ||
            'Não disponível.'}
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 15, paddingBottom: 30 },
  image: { width: '100%', height: 220, borderRadius: 12, marginBottom: 15 },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 50,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', marginLeft: 6 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 5,
  },
  text: { fontSize: 15, color: '#333', marginBottom: 15 },
});
