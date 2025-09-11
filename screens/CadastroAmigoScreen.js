import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Header from "../components/Header";

export default function CadastroUsuarioScreen() {
  return (
    <View style={styles.container}>
      <Header title="Cadastro - Usuário" iconName="person-outline" />

      <View style={styles.content}>
        <Text style={styles.title}>
          Dados do Usuário
        </Text>

        <TextInput
          placeholder="Nome completo"
          style={styles.input}
        />
        <TextInput
          placeholder="E-mail"
          style={styles.input}
        />
        <TextInput
          placeholder="Telefone"
          style={styles.input}
        />
        <TextInput
          placeholder="Senha"
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },
  content: { padding: 24 },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#2563eb",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});