import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';

export default function ReceitaDetalheScreen({ route }) {
  const { recipe } = route.params;

  return (
    <View style={{ flex: 1, backgroundColor: '#f1f4f8' }}>
      <Header title={recipe.receita} iconName="restaurant-outline" showBackButton />
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{ uri: recipe.link_imagem }} style={styles.image} />

        <Text style={styles.sectionTitle}>Ingredientes</Text>
        <Text style={styles.text}>{recipe.ingredientes || 'Não disponível.'}</Text>

        <Text style={styles.sectionTitle}>Modo de Preparo</Text>
        <Text style={styles.text}>{recipe.modo_preparo || 'Não disponível.'}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 15, paddingBottom: 30 },
  image: { width: '100%', height: 220, borderRadius: 12, marginBottom: 15 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 5,
    marginTop: 10,
  },
  text: { fontSize: 15, color: '#333', marginBottom: 8 },
});
