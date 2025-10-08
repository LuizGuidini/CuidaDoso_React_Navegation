import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { cadastrarAmigo } from "../services/authService";
import styles from "../styles/AuthScreen.styles";

export default function CadastroAmigoForm({ onVoltar }) {
  const navigation = useNavigation();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [codigo, setCodigo] = useState("");

  const handleSalvar = async () => {
    if (!nome || !email || !senha || !telefone || !codigo) {
      alert("Preencha todos os campos");
      return;
    }

    try {
      const { uid } = await cadastrarAmigo({
        nome,
        email,
        senha,
        telefone,
        token: codigo,
      });

      alert("Cadastro realizado com sucesso!");
      navigation.replace("MainDrawer");
    } catch (error) {
      console.error("Erro ao cadastrar amigo:", error.message);
      alert("Erro ao cadastrar amigo. Verifique o código de verificação.");
    }
  };

  return (
    <View>
      <Text style={styles.title}>Cadastro de Amigo</Text>
      <TextInput
        placeholder="Nome Completo"
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
        placeholder="Senha"
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <TextInput
        placeholder="Telefone"
        style={styles.input}
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="phone-pad"
      />
      <TextInput
        placeholder="Código de Verificação"
        style={styles.input}
        value={codigo}
        onChangeText={setCodigo}
        keyboardType="default"
      />
      <TouchableOpacity style={styles.button} onPress={handleSalvar}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onVoltar} style={{ marginTop: 10 }}>
        <Text style={{ color: "#007AFF", textAlign: "center" }}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}
