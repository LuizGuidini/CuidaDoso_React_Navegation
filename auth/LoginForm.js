import { useNavigation } from '@react-navigation/native';
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { loginUsuario } from "../services/authService";
import styles from "../styles/AuthScreen.styles";

export default function LoginForm() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    if (!email || !senha) {
      alert("Preencha e-mail e senha");
      return;
    }

    try {
      const { uid, tipo } = await loginUsuario(email, senha);
      console.log("Usuário detectado:", uid);

      if (tipo === "usuario" || tipo === "amigo") {
        navigation.replace("MainDrawer");
      } else if (tipo === "motorista") {
        navigation.replace("MotoristaDashboardScreen");
      } else if (tipo === "clinica" || tipo === "consultorio") {
        navigation.replace("ClinicaDashboardScreen");
      } else {
        alert("Tipo de usuário não reconhecido");
      }
    } catch (error) {
      console.error("Erro ao logar:", error.message);
      alert("Erro ao fazer login. Verifique e-mail e senha.");
    }
  };

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
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Entrar</Text>
      </TouchableOpacity>

      {/* Botões sociais */}
      {/*<TouchableOpacity
        style={[styles.socialButton, { backgroundColor: "#fff" }]}
        onPress={() => loginComGoogle(navigation, null)}
      >
        <Ionicons name="logo-google" size={20} color="#e90404" />
        <Text style={{ color: "#333", fontWeight: "bold" }}>   Entrar com Google</Text>
      </TouchableOpacity>
      */}
      
    </View>
  );
}
