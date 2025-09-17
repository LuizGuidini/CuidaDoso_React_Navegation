import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../styles/AuthScreen.styles";

import { loginComApple } from '../auth/authApple';
import { loginComGoogle } from '../auth/authGoogle';


export default function CadastroAmigoForm({ onVoltar }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [codigo, setCodigo] = useState("");

  
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
        keyboardType="number-pad"
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onVoltar} style={{ marginTop: 10 }}>
        <Text style={{ color: "#007AFF", textAlign: "center" }}>Voltar</Text>
      </TouchableOpacity>

      {/* Botões sociais */}
      <TouchableOpacity
        style={[styles.socialButton, { backgroundColor: "#fff" }]}
        onPress={() => loginComGoogle(navigation, null)}
      >
      <Ionicons name="logo-google" size={20} color="#e90404" />
        <Text style={{ color: "#333", fontWeight: "bold" }}>   Entrar com Google</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.socialButton, { backgroundColor: "#000" }]}
        onPress={() => loginComApple(navigation, null)}
      >
      <Ionicons name="logo-apple" size={20} color="#fff" />
        <Text style={{ color: "#fff", fontWeight: "bold" }}>   Entrar com Apple</Text>
      </TouchableOpacity>

    </View>
  );
}