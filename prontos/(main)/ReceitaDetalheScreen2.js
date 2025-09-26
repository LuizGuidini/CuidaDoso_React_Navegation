import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Header from "../components/Header";
import { translateText } from "../services/translate";

export default function ReceitaDetalheScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { recipe } = route.params;
  const [translatedRecipe, setTranslatedRecipe] = useState(null);

  useEffect(() => {
    const translateRecipe = async () => {
      try {
        const translatedTitle = await translateText(recipe.title, "pt");
        const translatedSummary = recipe.summary
          ? await translateText(recipe.summary, "pt")
          : "";

        const translatedIngredients = recipe.extendedIngredients
          ? await Promise.all(
              recipe.extendedIngredients.map(async (ing) =>
                translateText(ing.original, "pt")
              )
            )
          : [];

        const translatedInstructions = recipe.instructions
          ? await translateText(recipe.instructions, "pt")
          : "Sem instruções disponíveis";

        setTranslatedRecipe({
          ...recipe,
          title: translatedTitle,
          summary: translatedSummary,
          ingredients: translatedIngredients,
          instructions: translatedInstructions,
        });
      } catch (error) {
        console.error("Erro ao traduzir detalhes:", error.message);
        setTranslatedRecipe(recipe);
      }
    };

    translateRecipe();
  }, [recipe]);

  if (!translatedRecipe) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Traduzindo receita...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Detalhes da Receita" iconName="book-outline" />

      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>{translatedRecipe.title}</Text>
        <Image source={{ uri: translatedRecipe.image }} style={styles.image} />

        <Text style={styles.sectionTitle}>Resumo</Text>
        <Text style={styles.text}>
          {translatedRecipe.summary || "Sem resumo disponível"}
        </Text>

        <Text style={styles.sectionTitle}>Ingredientes</Text>
        {translatedRecipe.ingredients?.length > 0 ? (
          translatedRecipe.ingredients.map((ing, index) => (
            <Text key={index} style={styles.text}>• {ing}</Text>
          ))
        ) : (
          <Text style={styles.text}>Sem ingredientes disponíveis</Text>
        )}

        <Text style={styles.sectionTitle}>Instruções</Text>
        <Text style={styles.text}>{translatedRecipe.instructions}</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => alert("Receita salva com sucesso!")}
          >
            <Text style={styles.saveButtonText}>Salvar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scroll: { padding: 20 },
  loading: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 15,
    marginBottom: 5,
  },
  text: { fontSize: 16, lineHeight: 22, textAlign: "justify" },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
  },
  saveButton: {
    flex: 1,
    marginRight: 10,
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: { color: "#fff", fontWeight: "bold" },
  backButton: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  backButtonText: { color: "#fff", fontWeight: "bold" },
});
