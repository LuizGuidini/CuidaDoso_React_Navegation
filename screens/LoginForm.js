import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../styles/AuthScreen.styles";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // Aqui você vai colocar a lógica de login com Firebase depois

  return (
    <View>
      <Text style={styles.title}>Entrar na sua conta</Text>
      <TextInput
        placeholder="E-mail"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Senha"
        secureTextEntry
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
      />
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Entrar</Text>
      </TouchableOpacity>

      {/* Botões sociais */}
      <TouchableOpacity style={[styles.socialButton, { backgroundColor: "#fff" }]}>
        <Ionicons name="logo-google" size={20} color="#e90404" />
        <Text style={{ color: "#333", fontWeight: "bold" }}>   Entrar com Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.socialButton, { backgroundColor: "#000"}]}>
        <Ionicons name="logo-apple" size={20} color="#fff" />
        <Text style={{ color: "#fff", fontWeight: "bold" }}>   Entrar com Apple</Text>
      </TouchableOpacity>
      
    </View>
  );
}