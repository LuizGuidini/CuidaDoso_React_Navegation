import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';

export default function ReceitaDetalheScreen({ route }) {
  const { recipe } = route.params;

  return (
    <View style={styles.container}>
      <Header title={recipe.title} iconName="restaurant-outline" />

      <ScrollView contentContainerStyle={styles.content}>
        <Image source={{ uri: recipe.image }} style={styles.image} />
        
        <Text style={styles.sectionTitle}>Ingredientes:</Text>
        {recipe.extendedIngredients?.map((ing, index) => (
          <Text key={index} style={styles.text}>• {ing.original}</Text>
        ))}

        <Text style={styles.sectionTitle}>Modo de preparo:</Text>
        <Text style={styles.text}>{recipe.instructions || 'Modo de preparo não disponível.'}</Text>

        <Text style={styles.sectionTitle}>Tempo de preparo:</Text>
        <Text style={styles.text}>{recipe.readyInMinutes} minutos</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f4f8' },
  content: { padding: 15, paddingBottom: 30 },
  image: { width: '100%', height: 200, borderRadius: 12, marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginVertical: 8, color: '#007AFF' },
  text: { fontSize: 16, marginBottom: 5 },
});
