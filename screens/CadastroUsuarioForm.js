import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../styles/AuthScreen.styles";

export default function CadastroUsuarioForm({
  amigo,
  telefoneAmigo,
  escolherContato,
  onVoltar,
}) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");

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
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
      
      {/* Botões sociais para cadastro */}
      <TouchableOpacity style={[styles.socialButton, { backgroundColor: "#fff" }]}>
        <Ionicons name="logo-google" size={20} color="#e90404" />
        <Text style={{ color: "#333", fontWeight: "bold" }}>   Entrar com Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.socialButton, { backgroundColor: "#000"}]}>
        <Ionicons name="logo-apple" size={20} color="#fff" />
        <Text style={{ color: "#fff", fontWeight: "bold" }}>   Entrar com Apple</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={onVoltar} style={{ marginTop: 10 }}>
        <Text style={{ color: "#2563eb", textAlign: "center" }}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}