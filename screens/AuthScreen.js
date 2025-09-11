import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Header from "../components/Header";

export default function AuthScreen() {
  const [tab, setTab] = useState("entrar"); // entrar | cadastrar
  const [tipoCadastro, setTipoCadastro] = useState(null);

  return (
    <View style={styles.container}>
      <Header title="Bem-vindo" />

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            tab === "entrar" ? styles.tabButtonActive : styles.tabButtonInactive,
          ]}
          onPress={() => {
            setTab("entrar");
            setTipoCadastro(null);
          }}
        >
          <Text
            style={[
              styles.tabButtonText,
              tab === "entrar" ? styles.tabButtonTextActive : styles.tabButtonTextInactive,
            ]}
          >
            Entrar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            tab === "cadastrar" ? styles.tabButtonActive : styles.tabButtonInactive,
          ]}
          onPress={() => setTab("cadastrar")}
        >
          <Text
            style={[
              styles.tabButtonText,
              tab === "cadastrar" ? styles.tabButtonTextActive : styles.tabButtonTextInactive,
            ]}
          >
            Cadastrar
          </Text>
        </TouchableOpacity>
      </View>

      {/* Conteúdo das Abas */}
      <View style={styles.contentContainer}>
        {tab === "entrar" ? (
          // Tela de Login
          <View>
            <Text style={styles.title}>Entrar na sua conta</Text>
            <TextInput
              placeholder="E-mail"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              placeholder="Senha"
              secureTextEntry
              style={styles.input}
            />
            <TouchableOpacity style={styles.loginButton}>
              <Text style={styles.loginButtonText}>Entrar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          // Tela de Cadastro
          <View>
            <Text style={styles.title}>Escolha o tipo de cadastro</Text>
            {tipoCadastro === null ? (
              <View style={styles.cardRow}>
                {["Usuário", "Amigo", "Parceiro"].map((tipo) => (
                  <TouchableOpacity
                    key={tipo}
                    style={styles.card}
                    activeOpacity={0.8}
                    onPress={() => setTipoCadastro(tipo)}
                  >
                    <Text style={styles.cardText}>{tipo}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : tipoCadastro === "Usuário" ? (
              // Formulário de cadastro de usuário
              <View>
                <Text style={styles.title}>Dados do Usuário</Text>
                <TextInput placeholder="Nome completo" style={styles.input} />
                <TextInput placeholder="E-mail" style={styles.input} />
                <TextInput placeholder="Telefone" style={styles.input} />
                <TextInput placeholder="Senha" secureTextEntry style={styles.input} />
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setTipoCadastro(null)} style={{ marginTop: 10 }}>
                  <Text style={{ color: "#2563eb", textAlign: "center" }}>Voltar</Text>
                </TouchableOpacity>
              </View>
            ) : (
              // Formulário genérico para Amigo/Parceiro (você pode personalizar)
              <View>
                <Text style={styles.title}>Cadastro de {tipoCadastro}</Text>
                {/* Adicione campos específicos para Amigo/Parceiro aqui */}
                <TouchableOpacity onPress={() => setTipoCadastro(null)} style={{ marginTop: 10 }}>
                  <Text style={{ color: "#2563eb", textAlign: "center" }}>Voltar</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
  },
  tabButton: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
  },
  tabButtonActive: {
    backgroundColor: "#2563eb",
  },
  tabButtonInactive: {
    backgroundColor: "#e5e7eb",
  },
  tabButtonText: {
    fontWeight: "600",
    fontSize: 16,
  },
  tabButtonTextActive: {
    color: "#fff",
  },
  tabButtonTextInactive: {
    color: "#374151",
  },
  contentContainer: {
    flex: 1,
    padding: 24,
  },
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
  loginButton: {
    backgroundColor: "#2563eb",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  cardRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    aspectRatio: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  cardText: {
    fontSize: 16,
    color: "#374151",
    fontWeight: "600",
    textAlign: "center",
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