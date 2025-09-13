import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../styles/AuthScreen.styles";

export default function CadastroParceiroForm({ onVoltar }) {
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("Clinica");
  const [identificacao, setIdentificacao] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");

  return (
    <View>
      <Text style={styles.title}>Cadastro de Parceiro</Text>
      <TextInput
        placeholder="Nome ou Razão Social"
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />
      {/* Seleção do tipo de parceiro */}
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
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onVoltar} style={{ marginTop: 10 }}>
        <Text style={{ color: "#007AFF", textAlign: "center" }}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}