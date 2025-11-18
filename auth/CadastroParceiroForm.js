import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { cadastrarParceiro } from "../services/authService";
import styles from "../styles/AuthScreen.styles";

export default function CadastroParceiroForm({ onVoltar }) {
  const navigation = useNavigation();
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("Clinica");
  const [identificacao, setIdentificacao] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSalvar = async () => {
    if (!nome || !tipo || !identificacao || !telefone || !email || !senha) {
      alert("Preencha todos os campos");
      return;
    }

    try {
      const { uid } = await cadastrarParceiro({
        nome,
        tipo,
        identificacao,
        telefone,
        email,
        senha,
      });

      alert("Cadastro realizado com sucesso!");

      // Redireciona conforme tipo
      if (tipo === "Motorista") {
        navigation.replace("MotoristaDashboardScreen");
      } else if (tipo === "Clinica" || tipo === "Consultorio") {
        navigation.replace("ClinicaDashboardScreen");
      }else {
        navigation.replace("ClinicaDashboardScreen"); 
      }  
    } catch (error) {
      console.error("Erro ao cadastrar parceiro:", error.message);
      alert("Erro ao cadastrar parceiro");
    }
  };

  return (
    <View>
      <Text style={styles.title}>Cadastro de Parceiro</Text>
      <TextInput
        placeholder="Nome ou Razão Social"
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />
      <View style={[styles.input, { padding: 0 }]}>
        <Picker
          selectedValue={tipo}
          onValueChange={setTipo}
          style={{ height: 50, width: "100%" }}
        >
          <Picker.Item label="Clínica" value="Clinica" />
          <Picker.Item label="Consultório" value="Consultorio" />
          <Picker.Item label="Motorista" value="Motorista" />
          <Picker.Item label="Profissional Liberal" value="Profissional Liberal" />
        </Picker>
      </View>
      <TextInput
        placeholder="Identificação (CNH ou CNPJ)"
        style={styles.input}
        value={identificacao}
        onChangeText={setIdentificacao}
      />
      <TextInput
        placeholder="Telefone"
        style={styles.input}
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="phone-pad"
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
      <TouchableOpacity style={styles.button} onPress={handleSalvar}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onVoltar} style={{ marginTop: 10 }}>
        <Text style={{ color: "#007AFF", textAlign: "center" }}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}
