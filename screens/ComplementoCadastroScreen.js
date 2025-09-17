import { Picker } from "@react-native-picker/picker";
import { useNavigation, useRoute } from "@react-navigation/native";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth, db } from "../config/firebaseConfig";
import styles from "../styles/AuthScreen.styles";

export default function ComplementoCadastroScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const tipoInicial = route.params?.tipoInicial || null;

  const [tipo, setTipo] = useState(tipoInicial);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");

  // Campos específicos
  const [senha, setSenha] = useState(""); // para Amigo
  const [codigo, setCodigo] = useState(""); // para Amigo
  const [tipoParceiro, setTipoParceiro] = useState("Clinica"); // para Parceiro
  const [identificacao, setIdentificacao] = useState(""); // para Parceiro

  const handleSalvar = async () => {
    try {
      const uid = auth.currentUser.uid;

      const dados = {
        uid,
        nome,
        telefone,
        email,
        tipo,
        criadoEm: new Date(),
        ...(tipo === "Amigo" && { senha, codigo }),
        ...(tipo === "Parceiro" && { tipoParceiro, identificacao }),
      };

      await setDoc(doc(db, "usuarios", uid), dados);

      alert("Cadastro completo!");
      navigation.navigate("Inicio"); // ou qualquer tela principal
    } catch (error) {
      console.error("Erro ao salvar:", error.message);
      alert("Erro ao salvar dados");
    }
  };

  return (
    <ScrollView style={styles.contentContainer}>
      <Text style={styles.title}>Complemento de Cadastro</Text>

      {!tipo ? (
        <View style={styles.cardRow}>
          {["Usuário", "Amigo", "Parceiro"].map((opcao) => (
            <TouchableOpacity
              key={opcao}
              style={styles.card}
              activeOpacity={0.8}
              onPress={() => setTipo(opcao)}
            >
              <Text style={styles.cardText}>{opcao}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View>
          <TextInput
            placeholder="Nome completo"
            style={styles.input}
            value={nome}
            onChangeText={setNome}
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

          {tipo === "Amigo" && (
            <>
              <TextInput
                placeholder="Senha"
                secureTextEntry
                style={styles.input}
                value={senha}
                onChangeText={setSenha}
              />
              <TextInput
                placeholder="Código de convite"
                style={styles.input}
                value={codigo}
                onChangeText={setCodigo}
              />
            </>
          )}

          {tipo === "Parceiro" && (
            <>
              <Picker
                selectedValue={tipoParceiro}
                style={styles.input}
                onValueChange={(itemValue) => setTipoParceiro(itemValue)}
              >
                <Picker.Item label="Clínica" value="Clinica" />
                <Picker.Item label="Consultório" value="Consultorio" />
                <Picker.Item label="Motorista" value="Motorista" />
                <Picker.Item label="Profissional Liberal" value="Profissional Liberal" />
              </Picker>
              <TextInput
                placeholder="Identificação (CNH ou CNPJ)"
                style={styles.input}
                value={identificacao}
                onChangeText={setIdentificacao}
              />
            </>
          )}

          <TouchableOpacity style={styles.button} onPress={handleSalvar}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 10 }}>
            <Text style={{ color: "#2563eb", textAlign: "center" }}>Voltar</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}
