import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Linking from "expo-linking";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth } from "../config/firebaseInit";
import { cadastrarUsuario } from "../services/authService";
import styles from "../styles/AuthScreen.styles";

export default function CadastroUsuarioForm({
  amigo,
  telefoneAmigo,
  escolherContato,
  onVoltar,
}) {
  const navigation = useNavigation();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");

  const handleSalvar = async () => {
  if (!email || !senha || !nome || !telefone || !amigo || !telefoneAmigo) {
    alert("Preencha todos os campos");
    return;
  }

  try {
    // Verificação extra para garantir que o auth está pronto
    if (!auth || !auth.app?.name) {
      alert("Firebase Auth não está pronto. Tente novamente em instantes.");
      return;
    }

    const { uid, tokenConvite } = await cadastrarUsuario({
      nome,
      email,
      telefone,
      senha,
      amigo,
      telefoneAmigo,
    });

    const mensagem = `Olá! Fui cadastrado no app CuidaDoso e gostaria de te convidar como meu amigo. Use este token: ${tokenConvite} para se cadastrar. Baixe o app aqui: https://seu-link-de-download.com`;
    const numeroFormatado = telefoneAmigo.replace(/\D/g, "");
    const url = `https://wa.me/55${numeroFormatado}?text=${encodeURIComponent(mensagem)}`;
    Linking.openURL(url);

    alert("Cadastro realizado com sucesso!");
    navigation.replace("MainDrawer");
  } catch (error) {
    console.error("Erro ao cadastrar:", error.message);
    alert("Erro ao cadastrar usuário");
  }
};


  return (
    <View>
      <Text style={styles.title}>Dados do Usuário</Text>

      <TextInput
        placeholder="Nome completo"
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        placeholder="E-mail"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Telefone"
        style={styles.input}
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="phone-pad"
      />
      <TextInput
        placeholder="Senha"
        secureTextEntry
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity onPress={escolherContato}>
        <TextInput
          placeholder="Amigo"
          style={[styles.input, { backgroundColor: "#f1f1f1" }]}
          value={amigo}
          editable={false}
          pointerEvents="none"
        />
        <Ionicons
          name="search"
          size={20}
          color="#888"
          style={{
            position: "absolute",
            right: 16,
            top: 18,
            zIndex: 1,
          }}
        />
      </TouchableOpacity>

      <TextInput
        placeholder="Telefone do Amigo"
        style={[styles.input, { backgroundColor: "#f1f1f1" }]}
        value={telefoneAmigo}
        editable={false}
        pointerEvents="none"
      />

      <TouchableOpacity style={styles.button} onPress={handleSalvar}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>

      {/* Botões sociais para cadastro */}
      {/*<TouchableOpacity
        style={[styles.socialButton, { backgroundColor: "#fff" }]}
        onPress={() => loginComGoogle(navigation, "Usuario")}
      >
        <Ionicons name="logo-google" size={20} color="#e90404" />
        <Text style={{ color: "#333", fontWeight: "bold" }}>   Entrar com Google</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.socialButton, { backgroundColor: "#000" }]}
        onPress={() => loginComApple(navigation, "Usuario")}
      >
        <Ionicons name="logo-apple" size={20} color="#fff" />
        <Text style={{ color: "#fff", fontWeight: "bold" }}>   Entrar com Apple</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onVoltar} style={{ marginTop: 10 }}>
        <Text style={{ color: "#2563eb", textAlign: "center" }}>Voltar</Text>
      </TouchableOpacity>
      */}
    </View>
  );
}
