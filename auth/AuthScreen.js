import { Ionicons } from "@expo/vector-icons";
import * as Contacts from "expo-contacts";
import { useState } from "react";
import { Alert, FlatList, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import Header from "../components/Header";
import styles from "../styles/AuthScreen.styles";
import CadastroAmigoForm from "./CadastroAmigoForm";
import CadastroParceiroForm from "./CadastroParceiroForm";
import CadastroUsuarioForm from "./CadastroUsuarioForm";
import LoginForm from "./LoginForm";


export default function AuthScreen() {
  const [tab, setTab] = useState("entrar");
  const [tipoCadastro, setTipoCadastro] = useState(null);
  const [amigo, setAmigo] = useState("");
  const [telefoneAmigo, setTelefoneAmigo] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [contatos, setContatos] = useState([]);
  const [busca, setBusca] = useState("");

  // Função para abrir contatos
  const escolherContato = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão negada", "Não foi possível acessar os contatos.");
      return;
    }
    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.PhoneNumbers],
    });
    if (data.length === 0) {
      Alert.alert("Nenhum contato encontrado");
      return;
    }
    const contatosComTelefone = data.filter(
      (c) => c.phoneNumbers && c.phoneNumbers.length > 0
    );
    setContatos(contatosComTelefone);
    setBusca("");
    setModalVisible(true);
  };

  // Função para selecionar contato
  const selecionarContato = (contato) => {
    setAmigo(contato.name);
    setTelefoneAmigo(contato.phoneNumbers[0].number);
    setModalVisible(false);
  };

  // Filtra contatos conforme busca
  const contatosFiltrados = contatos.filter((c) =>
    c.name.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Header title="Bem-vindo" />

      {/* Modal para escolher contato */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={{ flex: 1, backgroundColor: "#fff", padding: 24 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 16 }}>
            Selecione um amigo
          </Text>
          {/* lupa */}
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            marginBottom: 16,
            paddingHorizontal: 8,
            backgroundColor: "#f1f1f1"
          }}>
            <Ionicons name="search" size={20} color="#888" style={{ marginRight: 6 }} />
            <TextInput
              placeholder="Buscar contato"
              style={{ flex: 1, height: 40 }}
              value={busca}
              onChangeText={setBusca}
              autoFocus
            />
          </View>
          <FlatList
            data={contatosFiltrados}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  padding: 12,
                  borderBottomWidth: 1,
                  borderBottomColor: "#eee",
                }}
                onPress={() => selecionarContato(item)}
              >
                <Text style={{ fontSize: 16 }}>{item.name}</Text>
                <Text style={{ color: "#666" }}>
                  {item.phoneNumbers[0].number}
                </Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            style={[styles.button, { marginTop: 24 }]}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Tabs de navegação */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            tab === "entrar" ? styles.tabButtonActive : styles.tabButtonInactive,
          ]}
          onPress={() => {
            setTab("entrar");
            setTipoCadastro(null);
          }}
        >
          <Text
            style={[
              styles.tabButtonText,
              tab === "entrar" ? styles.tabButtonTextActive : styles.tabButtonTextInactive,
            ]}
          >
            Entrar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            tab === "cadastrar" ? styles.tabButtonActive : styles.tabButtonInactive,
          ]}
          onPress={() => setTab("cadastrar")}
        >
          <Text
            style={[
              styles.tabButtonText,
              tab === "cadastrar" ? styles.tabButtonTextActive : styles.tabButtonTextInactive,
            ]}
          >
            Cadastrar
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.contentContainer} keyboardShouldPersistTaps="handled">
        {tab === "entrar" ? (
          <LoginForm />
        ) : (
          <View>
            <Text style={styles.title}>Escolha o tipo de cadastro</Text>
            {tipoCadastro === null ? (
              <View style={styles.cardRow}>
                {["Usuário", "Amigo", "Parceiro"].map((tipo) => (
                  <TouchableOpacity
                    key={tipo}
                    style={styles.card}
                    activeOpacity={0.8}
                    onPress={() => setTipoCadastro(tipo)}
                  >
                    <Text style={styles.cardText}>{tipo}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : tipoCadastro === "Usuário" ? (
              <CadastroUsuarioForm
                amigo={amigo}
                telefoneAmigo={telefoneAmigo}
                escolherContato={escolherContato}
                onVoltar={() => setTipoCadastro(null)}
              />
            ) : tipoCadastro === "Amigo" ? (
              <CadastroAmigoForm onVoltar={() => setTipoCadastro(null)} />
            ) : (
              <CadastroParceiroForm onVoltar={() => setTipoCadastro(null)} />
            )}
          </View>
        )}
      </ScrollView>
      <View style={{ alignItems: "center", padding: 12, backgroundColor: "#f8fafc" }}>
        <Text style={{ color: "#888", fontSize: 14 }}>CuidaDoso by L2M DeploySmart</Text>
      </View>
    </View>
  );
}