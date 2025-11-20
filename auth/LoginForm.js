import { useNavigation } from '@react-navigation/native';
import { useState } from "react";
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native";
import { loginUsuario } from "../services/authService";
import styles from "../styles/AuthScreen.styles";

export default function LoginForm() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  const handleLogin = async () => {
    if (!email || !senha) {
      setErro("Preencha e-mail e senha");
      return;
    }

    setCarregando(true);
    setErro("");

    try {
      const { uid, tipo } = await loginUsuario(email, senha);
      console.log("Usuário detectado:", uid);

      if (tipo === "usuario" || tipo === "amigo") {
        navigation.replace("MainDrawer");
      } else if (tipo === "motorista") {
        navigation.replace("MotoristaDashboard");
      } else if (tipo === "clinica" || tipo === "consultorio") {
        navigation.replace("ClinicaDashboard");
      } else {
        setErro("Tipo de usuário não reconhecido");
      }
    } catch (error) {
      console.error("Erro ao logar:", error.message);
      setErro("Erro ao fazer login. Verifique e-mail e senha.");
    } finally {
      setCarregando(false);
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

      {erro ? <Text style={{ color: "red", marginBottom: 10 }}>{erro}</Text> : null}

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={carregando}>
        {carregando ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.loginButtonText}>Entrar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
